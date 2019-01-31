<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $filleable = [
        'questionnaire_id', 
        'domain_id', 
        'question_id',
        'answer_set_id',
        'answer_set_value_id',
        'answer_name',
        'answer_set_value'
    ];
    
    public function domain() {
        return $this->belongsTo('App\Domain');
    }
    
    public function question() {
        return $this->belongsTo('App\Question');
    }
    
    public function answerSet() {
        return $this->belongsTo('App\AnswerSet');
    }
    
    public function answerSetValue() {
        return $this->belongsTo('App\AnswerSetValue');
    }
}
