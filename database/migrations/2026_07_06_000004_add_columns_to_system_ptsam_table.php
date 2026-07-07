<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('system_ptsam', function (Blueprint $table) {
            $table->string('icon')->default('Server');
            $table->string('color')->default('from-blue-500 to-cyan-500');
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('system_ptsam', function (Blueprint $table) {
            $table->dropColumn(['icon', 'color', 'category', 'is_active']);
        });
    }
};
