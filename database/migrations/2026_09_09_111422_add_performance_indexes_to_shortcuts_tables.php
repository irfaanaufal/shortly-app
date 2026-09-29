<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasIndex('shortcuts', ['system_id'])) {
            Schema::table('shortcuts', function (Blueprint $table) {
                $table->index('system_id');
            });
        }

        if (!Schema::hasIndex('shortcuts', ['is_active'])) {
            Schema::table('shortcuts', function (Blueprint $table) {
                $table->index('is_active');
            });
        }

        if (!Schema::hasIndex('shortcuts', ['user_id'])) {
            Schema::table('shortcuts', function (Blueprint $table) {
                $table->index('user_id');
            });
        }

        if (!Schema::hasIndex('shortcut_user', ['user_id', 'position'])) {
            Schema::table('shortcut_user', function (Blueprint $table) {
                $table->index(['user_id', 'position']);
            });
        }
    }

    public function down(): void
    {
        Schema::table('shortcuts', function (Blueprint $table) {
            $table->dropIndex(['system_id']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['user_id']);
        });

        Schema::table('shortcut_user', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'position']);
        });
    }
};
