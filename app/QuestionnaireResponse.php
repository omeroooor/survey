<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionnaireResponse extends Model
{
    protected $fillables = ['questionnaire_id'];
    
    public function answers() {
        return $this->hasMany('App\Answer');
    }
}
