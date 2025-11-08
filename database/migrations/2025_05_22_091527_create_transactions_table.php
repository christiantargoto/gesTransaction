<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('numero_compte');
        $table->enum('type', ['versement', 'retrait']);
        $table->decimal('montant', 12, 2);
        $table->timestamps();

        $table->foreign('numero_compte')
              ->references('numero_compte')
              ->on('clients')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
