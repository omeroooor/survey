<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Answer;
use App\AnswerSet;
use App\AnswerSetValue;
use App\Question;

class QuestionReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $answers = Answer::where('questionnaire_id',$this->questionnaire_id)
        ->where('domain_id', $this->questionnaire_domain_id)
        ->where('question_id',$this->question_id)
        ->get();
        $question = Question::find($this->question_id);
        $answer_set = AnswerSet::find($question->answer_set_id);
        
        $labels = [];
        if($answer_set->type != 'text') {
            $labels = AnswerSetValueReviewResource::collection(AnswerSetValue::where('answer_set_id', $this->question->answer_set_id)->get());
        } elseif ($answer_set->type == 'text') {
            $labels[0] = ['name'=>$this->question->name];
        }
         
        
        return array(
            'id' => $this->question->id,
            'name' => $this->question->name,
            'is_required' => $this->is_required,
            'meta' => $this->as_meta,
            'labels' => $labels,
            'answers' => AnswerResource::collection($answers)
        );
    }
}
