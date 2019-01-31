<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\AnswerSetValue;

use App\Http\Resources\AnswerSetValue as AnswerSetValueResource;

class AnswerSetValueController extends Controller
{
    public function store(Request $request) {
        
        $answerSetValue = new AnswerSetValue();
        $answerSetValue->answer_set_id = $request->answer_set_id;
        $answerSetValue->name = $request->name;
        $answerSetValue->text_color = $request->text_color;
        $answerSetValue->bg_color = $request->bg_color;
        $answerSetValue->value = $request->value;
        
        if($answerSetValue->save()) {
            return new AnswerSetValueResource($answerSetValue);
        } else {
            return ['success'=>false];
        }
    }
    
    public function getAnswerSetValues(Request $request) {
        return AnswerSetResource::collection(AnswerSet::all());
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$answerSetValue = AnswerSetValue::find($id);
        $answerSetValue->$field = $value;
        
        if($answerSetValue->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
	}
    
    public function delete(Request $request) {
        if(AnswerSetValue::destroy($request->ids)) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
}
