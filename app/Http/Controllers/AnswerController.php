<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Questionnaire;
use App\QuestionnaireResponse;
use App\Domain;
use App\Question;
use App\AnswerSet;
use App\AnswerSetValue;
use App\Answer;
use App\QuestionnaireDomain;

use App\Http\Resources\QuestionnaireReviewResource;

use App\QuestionnaireQuestion;
use App\Http\Resources\QuestionnaireQuestion as QuestionnaireQuestionResource;

use App\Http\Resources\FilterResource;

use App\Http\Resources\Answer as AnswerResource;

class AnswerController extends Controller
{
    public function store(Request $request) {
        $questionnaire_id = $request->questionnaire_id;
        $lines = [];
        foreach($request->result as $key => $val) {
            $str = $key;
            $strArray = explode('-', $key);
            $lines[] = ['domain'=>$strArray[0], 'question'=>$strArray[1], 'value'=>$val];
        };
        
        DB::transaction(function () use ($questionnaire_id, $lines) {
            try {
                $questionnaireResponse = new QuestionnaireResponse();
                $questionnaireResponse->questionnaire_id = $questionnaire_id;
                $questionnaireResponse->save();
                
                foreach($lines as $line) {
                    $question = Question::find($line['question']);
                    $answer_set = AnswerSet::find($question->answer_set_id);
                    
                    $answer = new Answer();
                    $answer->questionnaire_id = $questionnaire_id;
                    $answer->questionnaire_response_id = $questionnaireResponse->id;
                    $answer->domain_id = $line['domain'];
                    $answer->question_id = $line['question'];
                    
                    $answer->answer_set_id = $question->answer_set_id;
                    
                    if($answer_set->type != 'text') {
                        $answer_set_value = AnswerSetValue::find($line['value']);                       
                        $answer->answer_set_value_id = $line['value'];
                        $answer->answer_set_value = $answer_set_value->value;                        
                        $answer->answer_name = $answer_set_value->name;
                    } elseif($answer_set->type == 'text') {                        
                        $answer->answer_set_value_id = 0;  
                        $answer->answer_set_value = 0;                     
                        $answer->answer_name = $line['value'];
                    }
                    
                    $answer->save();
                }
                return ['success' => true];
            } catch(Exception $e) {
                return ['success'=> false];
            }
        });
        
        return $lines;
    }
    
    public function review(Request $request) {
        $responseIds = [];
        
        $domains = QuestionnaireDomain::where('questionnaire_id', $request->questionnaireId)->get();
        $metaDomains = [];
        foreach($domains as $domain) {
            if($domain->as_meta) {
                $metaDomains[] = $domain->domain_id;
            }
        }
        //print_r($metaDomains);
        
        $questionnaire = Questionnaire::find($request->questionnaireId);
        
        $responses = QuestionnaireResponse::where('questionnaire_id', $request->questionnaireId)->get();
        
        foreach($responses as $response) {
            $excluded = false;
            foreach($request->filters as $filter) {
                foreach($response->answers as $answer) {
                    if($filter['answer'] != 0 && $answer->question_id == $filter['question_id']) {
                        $question = Question::find($answer->question_id);
                        $answerSet = AnswerSet::find($question->answer_set_id);
                         if($answerSet->type == 'radiogroup') {
                            if($answer->answer_set_value_id != $filter['answer']){
                                $excluded = true;
                                continue;
                            }
                         } else {
                            if($answer->answer_name != $filter['answer']) {
                                $excluded = true;
                                continue;
                            } 
                         }
                    }
                }
            }
            
            if(!$excluded) {
                $responseIds[] = $response->id;
            }
        }
        
        $answers = Answer::whereIn('questionnaire_response_id', $responseIds)->whereNotIn('domain_id', $metaDomains)->get();
        return AnswerResource::collection($answers);
        
        
        //$questionnaire = new QuestionnaireReviewResource(Questionnaire::find($request->questionnaireId));
        //return $questionnaire;
    }
    
    public function getMetaQuestions($id, Request $request) {
        $questions = QuestionnaireQuestion::where('questionnaire_id',$id)->where('as_meta',1)->get();
        $metaQuestions = FilterResource::collection($questions);
        return view('review', ['questions'=>json_encode($metaQuestions), 'id'=>$id]);
    }
    
    public function reviewSurveyDomains($id, Request $request) {
        $questions = QuestionnaireQuestion::where('questionnaire_id',$id)->where('as_meta',1)->get();
        $metaQuestions = FilterResource::collection($questions);
        return view('review_domains', ['questions'=>json_encode($metaQuestions), 'id'=>$id]);
    }
    
    public function getPivotMetaQuestions($id, Request $request) {
        $questions = QuestionnaireQuestion::where('questionnaire_id',$id)->where('as_meta',1)->get();
        $metaQuestions = FilterResource::collection($questions);
        return view('pivot', ['questions'=>json_encode($metaQuestions), 'id'=>$id]);
    }
    
}
