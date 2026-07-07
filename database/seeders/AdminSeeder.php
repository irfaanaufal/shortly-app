<?php

namespace Database\Seeders;

use App\Models\Role;
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
        $superadminRole = Role::firstOrCreate(['name' => 'superadmin']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'user']);

        User::updateOrCreate(
            ['email' => 'irfaanaufal04@gmail.com'],
            [
                'name' => 'Irfaanaufal',
                'username' => 'Irfaanaufal',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
            ]
        );
        User::updateOrCreate(
            ['email' => 'hendi@gmail.com'],
            [
                'name' => 'hendi',
                'username' => 'hendi',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
            ]
        );
    }
}
