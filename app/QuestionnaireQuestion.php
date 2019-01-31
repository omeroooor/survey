<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionnaireQuestion extends Model
{
    protected $fillables = ['questionnaire_id', 'questionnaire_domain_id', 'question_id', 'is_required', 'as_meta'];
    
    public function question() {
        return $this->belongsTo('App\Question');
    }
    
    public function domain() {
        return $this->belongsTo('App\QuestionnaireDomain');
    }
}
