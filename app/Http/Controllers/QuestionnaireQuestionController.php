<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\QuestionnaireQuestion;
use App\Http\Resources\QuestionnaireQuestion as QuestionnaireQuestionResource;

class QuestionnaireQuestionController extends Controller
{
    public function store(Request $request) {   
        $question = new QuestionnaireQuestion();
        $question->questionnaire_id = $request->questionnaire_id;
        $question->questionnaire_domain_id = $request->questionnaire_domain_id;
        $question->question_id = $request->question_id;
        $question->as_meta = $request->as_meta;
        $question->is_required = $request->is_required;
        
        if($question->save()) {
            return new QuestionnaireQuestionResource($question);
        } else {
            return ['success'=>false];
        }
    }
    
    public function get(Request $request) {
        return QuestionnaireQuestionResource::collection(QuestionnaireQuestion::all());
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$question = QuestionnaireQuestion::find($id);
        $question->$field = $value;
        
        if($question->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
	}
    
    public function delete(Request $request) {
        if(QuestionnaireQuestion::destroy($request->ids)) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
}
