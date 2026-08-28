<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentMethod extends Model
{
    use HasFactory;
    protected $table = 'payment_methods';

    protected $fillable = [
        'name',
        'account_name',
        'account_number',
        'logo',
        'is_active',
        'duration_minutes',    
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}

?>