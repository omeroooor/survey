<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EnhancementPlanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array (
            'id' => $this->id,
            'minimum' => $this->minimum,
            'result' => $this->result,
            'domain' => new QuestionnaireDomain($this->questionnaireDomain),
            'activities' => $this->activities
        );
    }
}
