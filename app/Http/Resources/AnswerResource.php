<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
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
            'answer_id' => $this->answer_set_value_id,
            'label' => $this->answer_name,
            'value' => $this->answer_set_value
        );
    }
}
