<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\QuestionnaireQuestion as Question;

class QuestionnaireDomain extends JsonResource
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
            'id' => $this->id,
            'minimum' => $this->minimum,
            'as_meta' => $this->as_meta,
            'is_required' => $this->is_required,
            'domain' => new Domain($this->domain),
            'questions' => QuestionnaireQuestion::collection($questions)
        );
    }
}
