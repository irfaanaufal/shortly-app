<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call(AdminSeeder::class);

        $shortcuts = [
            [
                'name' => 'Ceklis-QC',
                'url' => 'https://hfg093wdn44.sn.mynetname.net/ceklisqc/index.php/login',
                'description' => 'Quality Control System',
                'icon' => 'ClipboardList',
                'color' => 'from-red-500 to-red-700',
                'category' => 'Quality Control',
            ],
            [
                'name' => 'Admin',
                'url' => 'https://hfg093wdn44.sn.mynetname.net/login.php?accesscheck=%2Findex.php',
                'description' => 'Admin Dashboard',
                'icon' => 'UserCog',
                'color' => 'from-green-500 to-emerald-600',
                'category' => 'Administrasi',
            ],
            [
                'name' => 'Purchase',
                'url' => 'https://hfg093wdn44.sn.mynetname.net/purchaseSA/index.php/login',
                'description' => 'Purchase Request',
                'icon' => 'ShoppingCart',
                'color' => 'from-red-500 to-orange-500',
                'category' => 'Pengadaan',
            ],
            [
                'name' => 'Inventory',
                'url' => 'https://sindangasih-server.com/inventorySA/index.php/login',
                'description' => 'Inventory Management',
                'icon' => 'Package',
                'color' => 'from-purple-500 to-pink-500',
                'category' => 'Inventaris',
            ],
            [
                'name' => 'Ekspedisi',
                'url' => 'https://hfg093wdn44.sn.mynetname.net/login.php?b=/ekspedisi/',
                'description' => 'Ekspedisi',
                'icon' => 'Truck',
                'color' => 'from-indigo-500 to-violet-600',
                'category' => 'Ekspedisi',
            ],
            [
                'name' => 'Absensi',
                'url' => 'https://hfg093wdn44.sn.mynetname.net/absen/',
                'description' => 'Absensi',
                'icon' => 'Calendar',
                'color' => 'from-yellow-500 to-amber-500',
                'category' => 'HRD',
            ],
        ];

        foreach ($shortcuts as $shortcut) {
            \App\Models\Shortcut::create($shortcut);
        }
    }
}
