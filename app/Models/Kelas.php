<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    // Nama tabel yang digunakan oleh model ini
    protected $table = 'kelas';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'name',
        'desc',
        'kategori',
        'image',
        'drive',
    ];

    public function question()
    {
        return $this->hasMany(Question::class);
    }

    public function learning_path()
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function learningPaths()
    {
        return $this->hasMany(LearningPath::class, 'kelas_id');
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori'); // karena field-nya 'kategori', bukan 'kategori_id'
    }

}
