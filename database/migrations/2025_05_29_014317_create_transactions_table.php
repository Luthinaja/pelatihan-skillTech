<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('kelas_id')->constrained('kelas')->onDelete('cascade'); 
            $table->foreignId('payment_method_id')->nullable()->constrained('payment_methods')->onDelete('set null'); 
            $table->integer('total_price')->default(0);
            $table->string('payment_proof')->nullable(); 
            $table->enum('status', ['pending', 'processing', 'success', 'failed'])->default('pending');
            $table->foreignId('admin_verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
