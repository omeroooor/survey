<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\EnhancementPlan;
use App\Http\Resources\EnhancementPlanResource;

class EnhancementPlanController extends Controller
{
    public function store(Request $request) {
        $questionnaire_domain_id = $request->get('questionnaire_domain_id');
        $minimum = $request->get('minimum');
        $result = $request->get('result');
        
        $oldPlan = EnhancementPlan::where('questionnaire_domain_id', $questionnaire_domain_id)->get();
        if(sizeOf($oldPlan) <= 0) {
            $plan = new EnhancementPlan();
            $plan->questionnaire_domain_id = $questionnaire_domain_id;
            $plan->minimum = $minimum;
            $plan->result = $result;
            if($plan->save()) {
                return ['success' => true];
            } else {
                return ['success' => false];
            }
        } else {
            return ['success' => false, 'code' => 'exist'];
        }
    }

    public function get(Request $request) {
        $plans = EnhancementPlan::all();
        return EnhancementPlanResource::collection($plans);
    }
}
