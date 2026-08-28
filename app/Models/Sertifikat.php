<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sertifikat extends Model
{
    //
    protected $table = 'sertifikat';

    protected $fillable = [
        'id_sertifikat',
        'kelas_id',
        'user_id',
        'status',
        'persentase'
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
