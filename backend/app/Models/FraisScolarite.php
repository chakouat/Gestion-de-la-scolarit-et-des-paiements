<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FraisScolarite extends Model
{
    use HasFactory;

    protected $table = 'frais_scolarite';

    protected $fillable = [
        'libelle',
        'montant',
        'description',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
    ];

    public function echeanciers()
    {
        return $this->hasMany(Echeancier::class, 'frais_scolarite_id');
    }
}

