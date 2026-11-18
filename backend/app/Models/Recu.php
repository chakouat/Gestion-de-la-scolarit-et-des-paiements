<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recu extends Model
{
    use HasFactory;

    protected $table = 'recus';

    protected $fillable = [
        'paiement_id',
        'numero',
        'date_generation',
        'chemin_fichier',
    ];

    protected $casts = [
        'date_generation' => 'datetime',
    ];

    public function paiement()
    {
        return $this->belongsTo(Paiement::class, 'paiement_id');
    }
}

