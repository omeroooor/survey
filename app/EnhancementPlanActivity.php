<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EnhancementPlanActivity extends Model
{
    protected $filleable = ['enhancement_plan_id', 'name', 'responsible', 'duration', 'start_date', 'end_date', 'percentage', 'resources', 'budget', 'indicators'];
    
    public function plan() {
        return $this->belongsTo('EnhancementPlan');
    }
}
