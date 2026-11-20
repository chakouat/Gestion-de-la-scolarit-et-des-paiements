<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Etudiant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_and_receive_token(): void
    {
        $admin = User::create([
            'nom' => 'Administrateur',
            'prenom' => 'Principal',
            'email' => 'admin@zen.local',
            'password' => Hash::make('password'),
            'role' => 'administrateur',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@zen.local',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'access_token',
                'user' => ['id', 'nom', 'prenom', 'email', 'role'],
            ])
            ->assertJson([
                'status' => 'success',
                'user' => [
                    'email' => 'admin@zen.local',
                    'role' => 'administrateur',
                ],
            ]);
    }

    public function test_student_can_login_with_student_profile(): void
    {
        $user = User::create([
            'nom' => 'Alami',
            'prenom' => 'Yassine',
            'email' => 'etudiant1@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);

        Etudiant::create([
            'user_id' => $user->id,
            'numero_etudiant' => 'ETU2026001',
            'filiere' => 'Ingénierie Logicielle',
            'niveau' => 'S5',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'etudiant1@zen.local',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'user' => [
                    'role' => 'etudiant',
                    'etudiant' => [
                        'numero_etudiant' => 'ETU2026001',
                        'filiere' => 'Ingénierie Logicielle',
                        'niveau' => 'S5',
                    ],
                ],
            ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::create([
            'nom' => 'Alami',
            'prenom' => 'Yassine',
            'email' => 'etudiant1@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'etudiant1@zen.local',
            'password' => 'mauvais_mot_de_passe',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_authenticated_user_can_access_me_and_logout(): void
    {
        $user = User::create([
            'nom' => 'Alami',
            'prenom' => 'Yassine',
            'email' => 'etudiant1@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);

        $token = $user->createToken('test_token')->plainTextToken;

        // Test /api/me
        $meResponse = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/me');

        $meResponse->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'user' => ['email' => 'etudiant1@zen.local'],
            ]);

        // Test /api/logout
        $logoutResponse = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/logout');

        $logoutResponse->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    public function test_student_cannot_access_admin_protected_route(): void
    {
        $user = User::create([
            'nom' => 'Alami',
            'prenom' => 'Yassine',
            'email' => 'etudiant1@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);

        $token = $user->createToken('test_token')->plainTextToken;

        // Tentative d'accès à la route admin par un étudiant -> 403 attendu
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/admin/check');

        $response->assertStatus(403);
    }
}
