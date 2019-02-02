<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEnhancementPlanActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enhancement_plan_activities', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('enhancement_plan_id');
            $table->string('name');
            $table->string('responsible');
            $table->integer('duration');
            $table->date('start_date');
            $table->date('end_date');
            $table->float('percentage');
            $table->text('resources');
            $table->float('budget');
            $table->text('indicators');
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
        Schema::dropIfExists('enhancement_plan_activities');
    }
}
