<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionnaireReviewResource extends JsonResource
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
            'name' => $this->name,
            'about' => $this->about,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'domains' => DomainReviewResource::collection($this->domains)
        );
    }
}
