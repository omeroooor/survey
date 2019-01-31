<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionnaireDomain extends Model
{
    protected $fillables = ['questionnaire_id', 'domain_id', 'minimum', 'is_required', 'as_meta'];
    
    public function domain() {
        return $this->belongsTo('App\Domain');
    }
    
    public function questionnaire() {
        return $this->belongsTo('App\Questionnaire');
    }
    
    public function questions() {
        return $this->hasMany('App\QuestionnaireQuestion', 'questionnaire_domain_id');
    }
}
