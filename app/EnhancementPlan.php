<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EnhancementPlan extends Model
{
    protected $filleable = ['questionnaire_domain_id', 'minimum', 'result'];
    
    public function activities() {
        return $this->hasMany('App\EnhancementPlanActivity');
    }
    
    public function questionnaireDomain() {
        return $this->belongsTo('App\QuestionnaireDomain');
    }
    
    public function domain() {
        return $this->hasManyThrough('App\Domain', 'App\QuestionnaireDomain');
    }
}
