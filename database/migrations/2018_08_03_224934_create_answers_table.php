<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('questionnaire_id');
            $table->integer('questionnaire_response_id');
            $table->integer('domain_id');
            $table->integer('question_id');
            $table->integer('answer_set_id');
            $table->integer('answer_set_value_id');
            $table->string('answer_name');
            $table->integer('answer_set_value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
