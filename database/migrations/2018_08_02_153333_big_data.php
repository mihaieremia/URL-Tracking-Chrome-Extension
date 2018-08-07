<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BigData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bigdata', function (Blueprint $table) {
            $table->increments('id');
            $table->string('host');
            $table->string('url');
            $table->string('uniqueID');
            $table->double('open', 15, 1);
            $table->double('close', 15, 1);
            $table->double('time', 15, 1);
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
        
        Schema::dropIfExists('bigdata');
    }
}
