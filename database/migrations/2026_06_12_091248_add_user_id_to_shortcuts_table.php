<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('shortcuts', 'user_id')) {
            Schema::table('shortcuts', function (Blueprint $table) {
                $table->foreignId('user_id')->nullable()->after('id')->constrained()->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shortcuts', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
        });
    }
};
