<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = ['numero_compte', 'type', 'montant', 'date'];

    public function client()
    {
        return $this->belongsTo(Client::class, 'numero_compte', 'numero_compte');
    }
}
