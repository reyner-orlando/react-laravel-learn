<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pesertas', function (Blueprint $table) {
            $table->text('deskripsi')->nullable(); // tambahkan kolom nama
            $table->datetime('waktu_tenggat')->nullable(); // tambahkan kolom nama
            $table->integer('selesai')->default(0); // tambahkan kolom nama
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pesertas', function (Blueprint $table) {
        $table->dropColumn('deskripsi'); // rollback
        $table->dropColumn('waktu_tenggat'); // rollback
        $table->dropColumn('selesai'); // rollback
    });

    }
};
