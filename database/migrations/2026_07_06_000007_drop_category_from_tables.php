<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('system_ptsam', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('shortcuts', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }

    public function down(): void
    {
        Schema::table('system_ptsam', function (Blueprint $table) {
            $table->string('category')->nullable();
        });

        Schema::table('shortcuts', function (Blueprint $table) {
            $table->string('category')->nullable();
        });
    }
};
