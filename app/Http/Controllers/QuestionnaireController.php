<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Questionnaire;
use App\Http\Resources\Questionnaire as QuestionnaireResource;
use App\Http\Resources\QuestionnaireDomainEnhancementResource;

use App\QuestionnaireDomain;
use App\QuestionnaireQuestion;


use App\Domain;
use App\Answer;
use App\AnswerSet;

class QuestionnaireController extends Controller
{
    public function store(Request $request) {   
        $questionnaire = new Questionnaire();
        $questionnaire->name = $request->name;
        $questionnaire->about = $request->about;
        $questionnaire->start_date = $request->start_date;
        $questionnaire->end_date = $request->end_date;
        $questionnaire->type = $request->type;
        
        if($questionnaire->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
    
    public function getQuestionnaires(Request $request) {
        return QuestionnaireResource::collection(Questionnaire::all());
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$questionnaire = Questionnaire::find($id);
        $questionnaire->$field = $value;
        
        if($questionnaire->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
	}
    
    public function delete(Request $request) {
        DB::transaction(function () use ($request) {
            try {
                    $ids = $request->ids;
                    foreach($ids as $id) {
                        $questionnaire = Questionnaire::find($id);
                        $domains = QuestionnaireDomain::where('questionnaire_id', $questionnaire->id)
                        ->get();
                        foreach($domains as $domain) {
                            $questions = QuestionnaireQuestion::where('questionnaire_id', $domain->questionnaire_id)
                            ->where('questionnaire_domain_id',$domain->domain_id)
                            ->delete();
                            $domain->delete();
                        }
                        $questionnaire->delete();
                        
                    }
                    return ['success' => true];
            } catch(Exception $e) {
                return ['success'=> false];
            }
        });
    }
    
    function getAvailableQuestionnaires($type, Request $request) {
        return QuestionnaireResource::collection(Questionnaire::where('type', $type)->get());
        //return view('questionnaires', ['questionnaires'=>$questionnaires]);
    }
    
    function getQuestionnaireDomains($id, Request $request) {
        return QuestionnaireDomainEnhancementResource::collection(QuestionnaireDomain::where('questionnaire_id', $id)->get());
    }
    
    public function compare($ids, Request $request) {
        //return ['ids'=>$ids];
        $ids = explode("0", $ids);
        $first_questionnaire = Questionnaire::find($ids[0]);
        $second_questionnaire = Questionnaire::find($ids[1]);
        
        $first_domains = QuestionnaireDomain::where('questionnaire_id', $ids[0])->get();
        $second_domains = QuestionnaireDomain::where('questionnaire_id', $ids[1])->get();
        $domain_ids = [];
        foreach($first_domains as $f_domain) {
            foreach($second_domains as $s_domain) {
                if ($f_domain->domain_id == $s_domain->domain_id) {
                    $domain_ids[] = $f_domain->domain_id;
                }
            }
        }
        
        $result = [];
        foreach($domain_ids as $id) {
            $domain = Domain::find($id);
            
            #$first_max = $this->get_domain_max_mark($ids[0], $id);
            #$second_max = $this->get_domain_max_mark($ids[1], $id);
            
            $f_responses = Answer::where('questionnaire_id', $ids[0])->where('domain_id', $id)->get();
            $total = 0;
            $total_max = 0;
            foreach($f_responses as $answer) {
                $total += $answer->answer_set_value;
                $total_max += $this->getAnswerSetMax($answer->answer_set_id);
            }
            
            $f_result = $total;
            $f_result_max = $total_max;
            if ($f_result_max > 0) {
                $f_percentage = round(($f_result / $f_result_max), 2)*100;
            } else {
                $f_percentage = $f_result;
            }
            
            $s_responses = Answer::where('questionnaire_id', $ids[1])->where('domain_id', $id)->get();
            $total = 0;
            $total_max = 0;
            foreach($s_responses as $answer) {
                $total += $answer->answer_set_value;
                $total_max += $this->getAnswerSetMax($answer->answer_set_id);
            }
            
            $s_result = $total;
            $s_result_max = $total_max;
            if ($s_result_max > 0) {
                $s_percentage = round(($s_result / $s_result_max), 2)*100;
            } else {
                $s_percentage = $s_result;
            }
            
            $result[] = [ 
                'domain' => $domain->name,
                'questionnaire' => $first_questionnaire->name,
                'count'=>count($f_responses), 
                'total'=>$f_result, 
                'total_max'=>$f_result_max, 
                'percentage'=>$f_percentage
            ];
            
            $result[] = [ 
                'domain' => $domain->name,
                'questionnaire' => $second_questionnaire->name,
                'count'=>count($s_responses), 
                'total'=>$s_result, 
                'total_max'=>$s_result_max, 
                'percentage'=>$s_percentage
            ];
        }
        return json_encode($result);
        #return view('compare', ['result'=>json_encode($result), 'ids'=>$ids]);
    }
    
    function get_domain_max_mark($questionnaire, $domain) {
        $questions = QuestionnaireQuestion::where('questionnaire_id', $questionnaire)->where('questionnaire_domain_id',$domain)->get();
        $total = 0;
        foreach($questions as $question) {
            $q = $question->question;
            $answerSet = $q->answerSet;
            $values = $answerSet->values;
            $max = 0;
            foreach($values as $value) {
                if($value->value > $max) {
                    $max = $value->value;
                }
            }
            $total += $max;
        }
        return $total;
    }
    
    function getAnswerSetMax($id) {
        $answerSet = AnswerSet::find($id);
        $values = $answerSet->values;
        $max = 0;
        foreach($values as $value) {
            if($value->value > $max) {
                $max = $value->value;
            }
        }
        return $max;
    }
}
