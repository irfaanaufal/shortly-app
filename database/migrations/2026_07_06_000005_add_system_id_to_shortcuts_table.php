<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('shortcuts', function (Blueprint $table) {
            $table->foreignId('system_id')->nullable()->constrained('system_ptsam')->nullOnDelete();
            $table->boolean('is_active')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('shortcuts', function (Blueprint $table) {
            $table->dropForeign(['system_id']);
            $table->dropColumn(['system_id', 'is_active']);
        });
    }
};
