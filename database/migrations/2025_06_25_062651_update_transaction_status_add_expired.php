<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Hanya jalankan statement MODIFY jika bukan SQLite (misal: MySQL di lokal/production asli)
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement("ALTER TABLE transactions MODIFY status ENUM('pending', 'processing', 'success', 'rejected', 'expired') DEFAULT 'pending'");
        }

        // Tambahkan kolom expired_at setelah payment_proof jika belum ada
        if (!Schema::hasColumn('transactions', 'expired_at')) {
            Schema::table('transactions', function (Blueprint $table) {
                $table->timestamp('expired_at')->nullable()->after('payment_proof');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement("ALTER TABLE transactions MODIFY status ENUM('pending', 'processing', 'success', 'failed') DEFAULT 'pending'");
        }

        if (Schema::hasColumn('transactions', 'expired_at')) {
            Schema::table('transactions', function (Blueprint $table) {
                $table->dropColumn('expired_at');
            });
        }
    }
};