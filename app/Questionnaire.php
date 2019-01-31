<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questionnaire extends Model
{
    protected $fillables = ['name', 'about', 'start_date', 'end_date'];
    
    public function domains() {
        return $this->hasMany('App\QuestionnaireDomain');
    }
    
    public function questions() {
        return $this->hasMany('App\QuestionnaireQuestion');
    }
    
    public function answers() {
        return $this->hasManyThrough('App\Answer', 'App\QuestionnaireQuestion');
    }
}
