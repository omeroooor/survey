<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/domains', function (Request $request) {
    return App\Http\Resources\Domain::collection(App\Domain::all());
});

Route::get('/questions', function (Request $request) {
    return App\Http\Resources\Question::collection(App\Question::all());
});

Route::get('/ansert_sets', function (Request $request) {
    return App\Http\Resources\AnswerSet::collection(App\AnswerSet::all());
});

Route::get('/questionnaires/{id}', function ($id, Request $request) {
    if($id) {    
        return new App\Http\Resources\Questionnaire(App\Questionnaire::find($id));
    } else {
        return App\Http\Resources\Questionnaire::collection(App\Questionnaire::all());
    }
});

Route::post('/answer', 'AnswerController@store');
Route::post('/questionnaire-results', 'AnswerController@review');
