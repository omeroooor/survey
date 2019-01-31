<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\AnswerSet;
use App\AnswerSetValue;
use App\Question;
use App\Answer;
 
class FilterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $question = Question::find($this->question_id);
        $answerSet = AnswerSet::find($question->answer_set_id);
        $answerSetvalues = AnswerSetValue::where('answer_set_id',$question->answer_set_id)->get();
        
        $textAnswers = [];
        if($answerSet->type == 'text') {
            $answers = Answer::where('questionnaire_id', $this->questionnaire_id)->where('question_id', $question->id)->get();
            foreach($answers as $answer) {
                $textAnswers[] = $answer->answer_name;
            }
        }
        
        return array(
            'id' => $this->id,
            'question_id' => $question->id,
            'name' => $question->name,
            'type' => $answerSet->type,
            'values' => $answerSetvalues,
            'textAnswers' => $textAnswers
        );
    }
}
