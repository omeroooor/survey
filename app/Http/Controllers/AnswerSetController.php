<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\AnswerSet;
use App\Http\Resources\AnswerSet as AnswerSetResource;
use App\AnswerSetValue;

class AnswerSetController extends Controller
{
    public function store(Request $request) {
        
        DB::transaction(function () use ($request) {
            try {
                    $answerSet = new AnswerSet();
                    $answerSet->name = $request->name;
                    $answerSet->description = $request->description;
                    $answerSet->type = $request->type;
                    $answerSet->save();
                    $values = json_decode($request->values);
                    if($answerSet->type == 'radiogroup' || $answerSet->type == 'checkbox') {
                        foreach($values as $value) {
                            $answerSetValue = new AnswerSetValue();
                            $answerSetValue->answer_set_id = $answerSet->id;
                            $answerSetValue->name = $value->name;
                            $answerSetValue->text_color = $value->text_color;
                            $answerSetValue->bg_color = $value->bg_color;
                            $answerSetValue->value = $value->value;
                            $answerSetValue->save();
                        }
                    }
                    return ['success' => true];
            } catch(Exception $e) {
                return ['success'=> false];
            }
        });
    }
    
    public function getAnswerSets(Request $request) {
        return AnswerSetResource::collection(AnswerSet::all());
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$answerSet = AnswerSet::find($id);
        $answerSet->$field = $value;
        
        if($answerSet->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
	}
    
    public function delete(Request $request) {
        DB::transaction(function () use ($request) {
            try {
                    $ids = $request->ids;
                    foreach($ids as $id) {
                        $answerSet = AnswerSet::find($id);
                        $values = AnswerSetValue::where('answer_set_id', $answerSet->questionnaire_id)
                        ->delete();
                        $answerSet->delete();
                    }
                    return ['success' => true];
            } catch(Exception $e) {
                return ['success'=> false];
            }
        });
    }
}
    

