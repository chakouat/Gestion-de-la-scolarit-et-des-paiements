<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $table = 'etudiants';

    protected $fillable = [
        'user_id',
        'numero_etudiant',
        'filiere',
        'niveau',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function echeanciers()
    {
        return $this->hasMany(Echeancier::class, 'etudiant_id');
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'etudiant_id');
    }
}

