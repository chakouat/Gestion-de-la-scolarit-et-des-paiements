<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $table = 'paiements';

    protected $fillable = [
        'etudiant_id',
        'echeance_id',
        'date_paiement',
        'montant',
        'reference',
        'statut',
    ];

    protected $casts = [
        'date_paiement' => 'datetime',
        'montant' => 'decimal:2',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function echeance()
    {
        return $this->belongsTo(Echeance::class, 'echeance_id');
    }

    public function recu()
    {
        return $this->hasOne(Recu::class, 'paiement_id');
    }
}

