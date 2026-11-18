<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Etudiant;
use App\Models\FraisScolarite;
use App\Models\Echeancier;
use App\Models\Echeance;
use App\Models\Paiement;
use App\Models\Recu;
use App\Models\Relance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Compte Administrateur par défaut
        $admin = User::firstOrCreate(
            ['email' => 'admin@zen.local'],
            [
                'nom' => 'Administrateur',
                'prenom' => 'Principal',
                'password' => Hash::make('password'),
                'role' => 'administrateur',
            ]
        );

        // 2. Frais de scolarité types
        $fraisAnnuel = FraisScolarite::create([
            'libelle' => 'Scolarité Annuelle IL - S5/S6',
            'montant' => 25000.00,
            'description' => 'Frais de scolarité complets pour l\'année universitaire 2026/2027.',
        ]);

        $fraisInscription = FraisScolarite::create([
            'libelle' => 'Frais d\'inscription et assurance',
            'montant' => 3000.00,
            'description' => 'Frais administratifs, adhésion et assurance obligatoire.',
        ]);

        $fraisRattrapage = FraisScolarite::create([
            'libelle' => 'Frais de certification & ateliers',
            'montant' => 1500.00,
            'description' => 'Accès aux modules de certification IT et ateliers pratiques.',
        ]);

        // 3. Comptes Étudiants
        $user1 = User::create([
            'nom' => 'Alami',
            'prenom' => 'Yassine',
            'email' => 'etudiant1@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);
        $etu1 = Etudiant::create([
            'user_id' => $user1->id,
            'numero_etudiant' => 'ETU2026001',
            'filiere' => 'Ingénierie Logicielle',
            'niveau' => 'S5',
        ]);

        $user2 = User::create([
            'nom' => 'Bennani',
            'prenom' => 'Fatima Zahra',
            'email' => 'etudiant2@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);
        $etu2 = Etudiant::create([
            'user_id' => $user2->id,
            'numero_etudiant' => 'ETU2026002',
            'filiere' => 'Ingénierie Logicielle',
            'niveau' => 'S5',
        ]);

        $user3 = User::create([
            'nom' => 'Chraibi',
            'prenom' => 'Mehdi',
            'email' => 'etudiant3@zen.local',
            'password' => Hash::make('password'),
            'role' => 'etudiant',
        ]);
        $etu3 = Etudiant::create([
            'user_id' => $user3->id,
            'numero_etudiant' => 'ETU2026003',
            'filiere' => 'Ingénierie Logicielle',
            'niveau' => 'S5',
        ]);

        // 4. Échéancier complet de démonstration pour Yassine Alami
        $echeancier = Echeancier::create([
            'etudiant_id' => $etu1->id,
            'frais_scolarite_id' => $fraisAnnuel->id,
            'date_creation' => now()->subMonths(2),
            'montant_total' => 25000.00,
            'statut' => 'En cours',
        ]);

        // Échéance 1 : 10 000 DH - Réglée totalement
        $ech1 = Echeance::create([
            'echeancier_id' => $echeancier->id,
            'date_limite' => now()->subMonth(),
            'montant' => 10000.00,
            'montant_paye' => 10000.00,
            'statut' => 'Payé',
        ]);

        $paiement1 = Paiement::create([
            'etudiant_id' => $etu1->id,
            'echeance_id' => $ech1->id,
            'date_paiement' => now()->subMonth()->addDays(2),
            'montant' => 10000.00,
            'reference' => 'PAY-2026-001',
            'statut' => 'Validé',
        ]);

        Recu::create([
            'paiement_id' => $paiement1->id,
            'numero' => 'REC-2026-001',
            'date_generation' => now()->subMonth()->addDays(2),
            'chemin_fichier' => 'recus/REC-2026-001.pdf',
        ]);

        // Échéance 2 : 10 000 DH - Réglée partiellement (5 000 DH payés)
        $ech2 = Echeance::create([
            'echeancier_id' => $echeancier->id,
            'date_limite' => now()->addDays(15),
            'montant' => 10000.00,
            'montant_paye' => 5000.00,
            'statut' => 'Partiellement payé',
        ]);

        Paiement::create([
            'etudiant_id' => $etu1->id,
            'echeance_id' => $ech2->id,
            'date_paiement' => now()->subDays(5),
            'montant' => 5000.00,
            'reference' => 'PAY-2026-002',
            'statut' => 'Validé',
        ]);

        // Échéance 3 : 5 000 DH - En retard non payée avec relance
        $ech3 = Echeance::create([
            'echeancier_id' => $echeancier->id,
            'date_limite' => now()->subDays(3),
            'montant' => 5000.00,
            'montant_paye' => 0.00,
            'statut' => 'En retard',
        ]);

        Relance::create([
            'echeance_id' => $ech3->id,
            'date_envoi' => now()->subDays(1),
            'message' => 'Rappel : votre échéance d\'un montant de 5000.00 DH était due le ' . $ech3->date_limite->format('d/m/Y') . '. Merci de régulariser votre situation.',
            'canal' => 'Notification interne',
            'statut' => 'Envoyée',
        ]);
    }
}
