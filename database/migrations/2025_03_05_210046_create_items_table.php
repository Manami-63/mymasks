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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->unsignedBigInteger('brand_id')->index();
            $table->string('details')->nullable();
            $table->string('product_number')->nullable();
            $table->string('image')->nullable();
            $table->decimal('price', 8, 2)->default(0);
            $table->unsignedTinyInteger('sheet_per_packet')->default(0);
            $table->unsignedSmallInteger('stock')->default(1);
            $table->unsignedSmallInteger('num_likes')->default(0)->index();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
