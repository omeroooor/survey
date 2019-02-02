<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\QuestionnaireQuestion as Question;
use App\Answer;
use App\AnswerSet;

class QuestionnaireDomainEnhancementResource extends JsonResource
{
    private $percentage;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $answers = Answer::where('questionnaire_id', $this->questionnaire_id)->where('domain_id', $this->domain->id)->get();
        $total = 0;
        $max_total = 0;
        $this->percentage = 100;
        if(!$this->as_meta) {
            foreach($answers as $answer) {
                $max = 0;
                $answerSet = AnswerSet::find($answer->answer_set_id);
                if($answerSet->type == 'radiogroup') {
                    $max = 0;
                    foreach($answerSet->values as $value) {
                        if($value->value > $max) {
                            $max = $value->value;
                        }
                    }
                    $total += $answer->answer_set_value;
                    $max_total += $max;
                }
            }
            //print_r($total);
            if($max_total > 0) {
                $this->percentage = round((($total/$max_total)*100), 2);
            }
            
            
            
            return array(
                'id' => $this->id,
                'minimum' => $this->minimum,
                'as_meta' => $this->as_meta,
                'is_required' => $this->is_required,
                'domain' => new Domain($this->domain),
                'percentage' => $this->percentage
            );
        }
    }
}
