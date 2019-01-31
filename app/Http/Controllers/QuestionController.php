<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Question;
use App\Http\Resources\Question as QuestionResource;

class QuestionController extends Controller
{
    public function store(Request $request) {   
        $question = new Question();
        $question->name = $request->name;
        $question->answer_set_id = $request->answerSet;
        
        if($question->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
    
    public function getQuestions(Request $request) {
        return QuestionResource::collection(Question::all());
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$question = Question::find($id);
        $question->$field = $value;
        
        if($question->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
	}
    
    public function delete(Request $request) {
        if(Question::destroy($request->ids)) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
    
}
