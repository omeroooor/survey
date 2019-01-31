<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnswerSetValue extends Model
{
    protected $fillables = ['name', 'description', 'text_color', 'bg_color', 'value', 'answer_set_id'];
    
    public function answerSet() {
        return $this->belongsTo('AnswerSet');
    }
}
