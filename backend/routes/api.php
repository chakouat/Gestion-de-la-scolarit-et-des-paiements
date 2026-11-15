<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route de vérification de l'API (Healthcheck Phase 1)
Route::get('/status', function () {
    return response()->json([
        'status' => 'success',
        'application' => 'ZEN - Scolarité & Paiements',
        'phase' => 1,
        'backend' => 'Laravel 12 (API REST)',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
