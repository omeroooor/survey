<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Domain;
use App\Http\Resources\Domain as DomainResource;

class DomainController extends Controller
{
    public function store(Request $request) {   
        $domain = new Domain();
        $domain->name = $request->name;
        $domain->description = $request->description;
        $domain->pass = $request->pass;
        
        if($domain->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
    
    public function getDomains(Request $request) {
        return DomainResource::collection(Domain::all());
    }
    
    public function update(Request $request) {
        
		$id = $request->id;
		$field = $request->field;
        $value = $request->value;
        
		$domain = Domain::find($id);
        $domain->$field = $value;
        
        if($domain->save()) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
	}
    
    public function delete(Request $request) {
        if(Domain::destroy($request->ids)) {
            return ['success'=>true];
        } else {
            return ['success'=>false];
        }
    }
}
