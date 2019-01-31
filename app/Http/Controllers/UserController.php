<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Verification;
use App\Mail\GroupCreated;

use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function store(Request $request) {
		$user = new User();
		$user->name = $request->get('name','Default Name');
		$user->email = $request->email;
		$user->password = md5($request->password);
		
		if($user->save()) {
			return ['success'=>true, 'email'=> $user->email];
		} else {
			return ['success'=>false];
		}
	}
	
	
	
	public function login(Request $request) {
		$user = User::where('email', $request->email)
		->where('password', md5($request->password))
		->first();
		if(is_object($user)) {
			session(['user_id' => $user->id]);
			return $user;
		} else {
			return ['success'=>false];
		}
	}
	
	public function logout(Request $request) {
		session()->forget('user_id');
		session()->flush();
		session()->save();
		header('location:/');
		exit;
	}
}
