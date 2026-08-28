<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = 'ketegori';

    protected $fillable = [
        'name',
        'image',
        'desc',
    ];
}