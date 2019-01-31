<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\QuestionnaireQuestion as Question;

class DomainReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $questions = Question::where('questionnaire_id', $this->questionnaire_id)->where('questionnaire_domain_id',$this->domain_id)->get();
        return array(
            'id' => $this->domain->id,
            'name' => $this->domain->name,
            'questions' => QuestionReviewResource::collection($questions)
        );
    }
}
