<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Echeancier extends Model
{
    use HasFactory;

    protected $table = 'echeanciers';

    protected $fillable = [
        'etudiant_id',
        'frais_scolarite_id',
        'date_creation',
        'montant_total',
        'statut',
    ];

    protected $casts = [
        'date_creation' => 'date',
        'montant_total' => 'decimal:2',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function fraisScolarite()
    {
        return $this->belongsTo(FraisScolarite::class, 'frais_scolarite_id');
    }

    public function echeances()
    {
        return $this->hasMany(Echeance::class, 'echeancier_id');
    }

    public function calculerTotal(): float
    {
        return (float) $this->echeances()->sum('montant');
    }

    public function mettreAJourStatut(): void
    {
        $echeances = $this->echeances;
        if ($echeances->isEmpty()) {
            $this->statut = 'En attente';
        } elseif ($echeances->every(fn($e) => $e->statut === 'Payé')) {
            $this->statut = 'Soldé';
        } elseif ($echeances->some(fn($e) => $e->verifierRetard())) {
            $this->statut = 'En retard';
        } else {
            $this->statut = 'En cours';
        }
        $this->save();
    }
}
