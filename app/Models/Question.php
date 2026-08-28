<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'question';

    protected $fillable = [
        'kelas_id',
        'question_text',
        
    ];

    /**
     * Relasi ke model Options
     */
    public function options()
    {
        return $this->hasMany(Options::class, 'question_id');
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}