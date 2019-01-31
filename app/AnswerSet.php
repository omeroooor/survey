<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnswerSet extends Model
{
    protected $fillables = ['name', 'description'];
    
    public function values() {
        return $this->hasMany('App\AnswerSetValue');
    }
}
