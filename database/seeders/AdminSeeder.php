<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'irfaanaufal04@gmail.com'],
            [
                'name' => 'Irfaanaufal',
                'username' => 'Irfaanaufal',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        User::updateOrCreate(
            ['email' => 'hendi@gmail.com'],
            [
                'name' => 'hendi',
                'username' => 'hendi',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
    }
}
