<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillables = ['name', 'type', 'answer_set_id'];
    
    public function answerSet() {
        return $this->belongsTo('App\AnswerSet');
    }
}
