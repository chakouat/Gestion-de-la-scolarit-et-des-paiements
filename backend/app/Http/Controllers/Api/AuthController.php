<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Authentification d'un utilisateur (Admin ou Étudiant)
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::with('etudiant')->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants invalides. Veuillez réessayer.'],
            ]);
        }

        // Création du token Sanctum
        $token = $user->createToken('zen_auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Connexion réussie.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'nom_complet' => $user->nom_complet,
                'email' => $user->email,
                'role' => $user->role,
                'etudiant' => $user->etudiant,
            ],
        ]);
    }

    /**
     * Récupération du profil de l'utilisateur connecté
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('etudiant');

        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'nom_complet' => $user->nom_complet,
                'email' => $user->email,
                'role' => $user->role,
                'etudiant' => $user->etudiant,
            ],
        ]);
    }

    /**
     * Déconnexion (révocation du token)
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Déconnexion réussie.',
        ]);
    }
}

