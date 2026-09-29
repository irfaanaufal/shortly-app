<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('system_ptsam')) {
            Schema::create('system_ptsam', function (Blueprint $table) {
                $table->id();
                $table->string('nama_sistem');
                $table->string('link_sistem')->nullable();
                $table->string('icon')->default('Server');
                $table->string('color')->default('from-blue-500 to-cyan-500');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('system_ptsam');
    }
};
