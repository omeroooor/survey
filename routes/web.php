<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Route::get('/', function () {
    return view('welcome');
});
*/

Route::get('/', function () {
    return view('home');
});
Route::get('/auth', function () {
    return view('login');
});
Route::get('/dashboard', function () {
    return view('dashboard');
});
Route::get('/logout', function () {
    return view('logout');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::get('/countries', 'CountryController@getCountries');
Route::get('/universities', 'UniversityController@getUniversities');
Route::get('/faculties', 'FacultyController@getFaculties');
Route::get('/supervisors', 'SupervisorController@getSupervisors');

Route::get('/plan-item-types', function() {
	return App\PlanItemType::all();
});

Route::post('/group', 'GroupController@store');
Route::post('/verify', 'GroupController@verify');

Route::post('/plan-item', 'PlanController@store');
Route::get('/plan-items', 'PlanController@getPlanItems');
Route::post('/update-plan-item', 'PlanController@update');


Route::post('/user', 'UserController@store');
Route::post('/login', 'UserController@login');
Route::get('/logout', 'UserController@logout');

Route::get('/mailable', function () {
    $group = App\Group::find(7);
	$verification = App\Verification::where('group_id', $group->id)->first();
    return new App\Mail\GroupCreated($group, $verification->token);
});





Route::post('/answer-set', 'AnswerSetController@store');
Route::get('/answer-sets', 'AnswerSetController@getAnswerSets');
Route::post('/update-answer-set', 'AnswerSetController@update');
Route::post('/delete-answer-set', 'AnswerSetController@delete');

Route::post('/answer-set-value', 'AnswerSetValueController@store');
Route::post('/update-answer-set-value', 'AnswerSetValueController@update');
Route::post('/delete-answer-set-value', 'AnswerSetValueController@delete');

Route::post('/domain', 'DomainController@store');
Route::get('/domains', 'DomainController@getDomains');
Route::post('/update-domain', 'DomainController@update');
Route::post('/delete-domain', 'DomainController@delete');

Route::post('/question', 'QuestionController@store');
Route::get('/get-questions', 'QuestionController@getQuestions');
Route::post('/update-question', 'QuestionController@update');
Route::post('/delete-question', 'QuestionController@delete');

Route::post('/questionnaire', 'QuestionnaireController@store');
Route::get('/questionnaires', 'QuestionnaireController@getQuestionnaires');
Route::post('/update-questionnaire', 'QuestionnaireController@update');
Route::post('/delete-questionnaire', 'QuestionnaireController@delete');
Route::post('/questionnaire-domain', 'QuestionnaireDomainController@store');
Route::post('/update-questionnaire-domain', 'QuestionnaireDomainController@update');
Route::post('/delete-questionnaire-domain', 'QuestionnaireDomainController@delete');
Route::post('/questionnaire-question', 'QuestionnaireQuestionController@store');
Route::post('/update-questionnaire-question', 'QuestionnaireQuestionController@update');
Route::post('/delete-questionnaire-question', 'QuestionnaireQuestionController@delete');

Route::get('/questionnaire-domains/{id}', 'QuestionnaireController@getQuestionnaireDomains');


Route::get('/compare/{ids}', function($ids) {
    $data['ids'] = $ids;
    return view('compare', $data);
});
Route::get('/questionnaire-compare-results/{ids}', 'QuestionnaireController@compare');


Route::get('/survey', function () {
    return view('home');
});
Route::get('/run-survey/{id}', function ($id) {
    return view('survey', ['id'=>$id]);
});

Route::get('/review-survey-meta-questions/{id}', 'AnswerController@getQuestions');
Route::get('/review-survey/{id}', 'AnswerController@getMetaQuestions');
Route::get('/review-survey-domains/{id}', 'AnswerController@reviewSurveyDomains');
Route::get('/review-survey-pivot/{id}', 'AnswerController@getPivotMetaQuestions');

Route::get('/get-available-questionnaires/{type}', 'QuestionnaireController@getAvailableQuestionnaires');


Route::get('/enhancement-plan', 'EnhancementPlanController@get');
Route::post('/enhancement-plan', 'EnhancementPlanController@store');