<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\AnswerSetValue;

class Answer extends JsonResource
{
    private $value;
    private $max;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {  
        return array(
            'domain' => $this->domain->name,
            'question' => $this->question->name,
            'answer_set_value_id' => $this->answer_set_value_id,
            'label' => $this->answerSetValue->name,
            'value' => $this->getValue(),
            'max' => $this->getMax(),
            'percentage' => $this->getPercentage()
        );
    }
    
    private function getValue() {
        $this->value = $this->answerSet->type == 'radiogroup'? $this->answerSetValue->value: $this->answer_name;
        return $this->value;
    }
    
    private function getMax() {
        $max = 0;
        if($this->answerSet->type == 'radiogroup') {
            $values = AnswerSetValue::where('answer_set_id', $this->answer_set_id)->get();   
            $max = 0;
            foreach($values as $value) {
                if($value->value > $max) {
                    $max += $value->value;
                }
            }
        } else {
            $max = 1;
        }
        $this->max = $max;
        return $max;
    }
    
    private function getPercentage() {
        if($this->max > 0) {
            return round(($this->value/$this->max), 2)*100;
        } else {
            return 100;
        }
    }
}
