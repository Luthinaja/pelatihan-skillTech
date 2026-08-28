<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Sahlan muzaqi',
            'nama_ibu' => 'Sahlan',
            'nik' => '12345678901234567',
            'phone_number' => '085848773284',
            'role' => 'user',
            'email' => 'shlnmzqlocko@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        User::factory()->create([
            'name' => 'nopal',
            'nama_ibu' => 'nopal',
            'nik' => '12345678901234567',
            'phone_number' => '085848773284',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678')
        ]);
    }
}
