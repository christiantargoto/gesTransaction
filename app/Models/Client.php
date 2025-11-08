<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['nom', 'numero_compte'];
    use HasFactory;
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'numero_compte', 'numero_compte');
    }
}
