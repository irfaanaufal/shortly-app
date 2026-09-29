<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('system_ptsam', 'icon')) {
            Schema::table('system_ptsam', function (Blueprint $table) {
                $table->string('icon')->default('Server');
            });
        }

        if (!Schema::hasColumn('system_ptsam', 'color')) {
            Schema::table('system_ptsam', function (Blueprint $table) {
                $table->string('color')->default('from-blue-500 to-cyan-500');
            });
        }

        if (!Schema::hasColumn('system_ptsam', 'category')) {
            Schema::table('system_ptsam', function (Blueprint $table) {
                $table->string('category')->nullable();
            });
        }

        if (!Schema::hasColumn('system_ptsam', 'is_active')) {
            Schema::table('system_ptsam', function (Blueprint $table) {
                $table->boolean('is_active')->default(true);
            });
        }
    }

    public function down(): void
    {
        Schema::table('system_ptsam', function (Blueprint $table) {
            $table->dropColumn(['icon', 'color', 'category', 'is_active']);
        });
    }
};
