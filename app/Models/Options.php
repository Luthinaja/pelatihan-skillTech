<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Options extends Model
{
    // Nama tabel yang digunakan oleh model ini
    protected $table = 'options';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'question_id',
        'option_text',
        'is_correct',
    ];

    /**
     * Relasi ke model Question
     */
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}