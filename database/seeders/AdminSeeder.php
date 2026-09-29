<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Role::whereNull('level')->delete();

        $roles = [
            ['name' => 'IT', 'level' => 1],
            ['name' => 'Direktur Utama', 'level' => 2],
            ['name' => 'Head Admin', 'level' => 3],
            ['name' => 'HRD', 'level' => 4],
            ['name' => 'Admin', 'level' => 5],
            ['name' => 'Teknisi', 'level' => 6],
            ['name' => 'QA', 'level' => 7],
            ['name' => 'QC', 'level' => 8],
            ['name' => 'Ekspedisi', 'level' => 9],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], ['level' => $role['level']]);
        }

        $itRole = Role::where('name', 'IT')->first();
        $adminRole = Role::where('name', 'Admin')->first();

        User::updateOrCreate(
            ['email' => env('IT_EMAIL', 'it@ptsam.co.id')],
            [
                'name' => 'IT Admin',
                'username' => 'itadmin',
                'password' => Hash::make(env('IT_PASSWORD', 'password')),
                'role_id' => $itRole->id,
            ]
        );

        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@ptsam.co.id')],
            [
                'name' => 'Admin',
                'username' => 'admin',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
                'role_id' => $adminRole->id,
            ]
        );
    }
}
