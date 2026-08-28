<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kelas_id',
        'payment_method_id',
        'total_price',
        'payment_proof',
        'status',
        'admin_verified_by',
        'expired_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'admin_verified_by');
    }

    public function enrollment()
    {
        return $this->hasOne(Enrollment::class);
    }
}
?>