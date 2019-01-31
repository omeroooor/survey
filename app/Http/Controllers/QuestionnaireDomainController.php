<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\QuestionnaireDomain;
use App\Http\Resources\QuestionnaireDomain as QuestionnaireDomainResource;

use App\QuestionnaireQuestion;

class QuestionnaireDomainController extends Controller
{
    public function store(Request $request) {   
        $domain = new QuestionnaireDomain();
        $domain->questionnaire_id = $request->questionnaire_id;
        $domain->domain_id = $request->domain_id;
        $domain->minimum = $request->minimum;
        $domain->as_meta = $request->as_meta;
        $domain->is_required = $request->is_required;
        
        if($domain->save()) {
            return new QuestionnaireDomainResource($domain);
        } else {
            return ['success'=>false];
        }
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$domain = QuestionnaireDomain::find($id);
        $domain->$field = $value;
        
        if($domain->save()) {
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
                        $domain = QuestionnaireDomain::find($id);
                        $questions = QuestionnaireQuestion::where('questionnaire_id', $domain->questionnaire_id)
                        ->where('questionnaire_domain_id',$domain->domain_id)
                        ->delete();
                        $domain->delete();
                    }
                    return ['success' => true];
            } catch(Exception $e) {
                return ['success'=> false];
            }
        });
    }
}
