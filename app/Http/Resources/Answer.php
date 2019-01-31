<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Answer extends JsonResource
{
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
            'value' => $this->answerSet->type == 'radiogroup'? $this->answerSetValue->value: $this->answer_name
        );
    }
}
