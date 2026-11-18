<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relance extends Model
{
    use HasFactory;

    protected $table = 'relances';

    protected $fillable = [
        'echeance_id',
        'date_envoi',
        'message',
        'canal',
        'statut',
    ];

    protected $casts = [
        'date_envoi' => 'datetime',
    ];

    public function echeance()
    {
        return $this->belongsTo(Echeance::class, 'echeance_id');
    }
}

