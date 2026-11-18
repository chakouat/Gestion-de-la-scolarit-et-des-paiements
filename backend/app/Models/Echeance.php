<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Echeance extends Model
{
    use HasFactory;

    protected $table = 'echeances';

    protected $fillable = [
        'echeancier_id',
        'date_limite',
        'montant',
        'montant_paye',
        'statut',
    ];

    protected $casts = [
        'date_limite' => 'date',
        'montant' => 'decimal:2',
        'montant_paye' => 'decimal:2',
    ];

    protected $appends = [
        'reste_a_payer',
    ];

    public function echeancier()
    {
        return $this->belongsTo(Echeancier::class, 'echeancier_id');
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'echeance_id');
    }

    public function relances()
    {
        return $this->hasMany(Relance::class, 'echeance_id');
    }

    public function getResteAPayerAttribute(): float
    {
        return max(0.00, (float) ($this->montant - $this->montant_paye));
    }

    public function calculerReste(): float
    {
        return $this->reste_a_payer;
    }

    public function verifierRetard(): bool
    {
        return $this->statut !== 'Payé' && $this->date_limite < now()->startOfDay();
    }
}

