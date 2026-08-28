<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id(); 
            $table->string('name', 100); 
            $table->string('account_name', 100)->nullable();
            $table->string('account_number', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('duration_minutes')->nullable();
            $table->timestamps();
        });

        // ✅ Tambah data dummy langsung setelah create
        DB::table('payment_methods')->insert([
            [
                'name' => 'BCA BISAGA',
                'account_name' => 'Naufal Lutfi',
                'account_number' => '8237383991',
                'is_active' => true,
                'duration_minutes' => 60,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'OVO',
                'account_name' => 'Naufal OVO',
                'account_number' => '081234567890',
                'is_active' => true,
                'duration_minutes' => 45,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
    }
};

