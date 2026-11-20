<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// 1. Routes publiques
Route::get('/status', function () {
    return response()->json([
        'status' => 'success',
        'application' => 'ZEN - Scolarité & Paiements',
        'phase' => 3,
        'backend' => 'Laravel 12 (API REST)',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

// 2. Routes protégées par authentification Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes de contrôle des rôles
    Route::middleware('role:administrateur')->prefix('admin')->group(function () {
        Route::get('/check', function () {
            return response()->json([
                'status' => 'success',
                'message' => 'Accès autorisé à l\'espace Administrateur.',
            ]);
        });
    });

    Route::middleware('role:etudiant')->prefix('etudiant')->group(function () {
        Route::get('/check', function () {
            return response()->json([
                'status' => 'success',
                'message' => 'Accès autorisé à l\'espace Étudiant.',
            ]);
        });
    });
});
