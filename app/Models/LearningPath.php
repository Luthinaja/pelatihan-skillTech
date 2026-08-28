<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningPath extends Model
{
    use HasFactory;

    // Tentukan nama tabel
    protected $table = 'learning_path';

    // Tentukan kolom yang dapat diisi
    protected $fillable = [
        'kelas_id',
        'text',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}