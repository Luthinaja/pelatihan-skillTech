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
        DB::statement("ALTER TABLE transactions MODIFY status ENUM('pending', 'processing', 'success', 'rejected', 'expired') DEFAULT 'pending'");

        // Tambahkan kolom expired_at setelah payment_proof
        Schema::table('transactions', function (Blueprint $table) {
            $table->timestamp('expired_at')->nullable()->after('payment_proof');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE transactions MODIFY status ENUM('pending', 'processing', 'success', 'failed') DEFAULT 'pending'");

        // Hapus kolom expired_at
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('expired_at');
        });
    }
};
