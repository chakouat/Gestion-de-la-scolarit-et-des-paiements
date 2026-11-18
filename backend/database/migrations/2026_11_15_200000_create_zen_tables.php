<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Table Etudiants
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('numero_etudiant')->unique();
            $table->string('filiere');
            $table->string('niveau');
            $table->timestamps();
        });

        // 2. Table Frais de Scolarité
        Schema::create('frais_scolarite', function (Blueprint $table) {
            $table->id();
            $table->string('libelle');
            $table->decimal('montant', 10, 2);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 3. Table Echéanciers
        Schema::create('echeanciers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            $table->foreignId('frais_scolarite_id')->nullable()->constrained('frais_scolarite')->onDelete('set null');
            $table->date('date_creation');
            $table->decimal('montant_total', 10, 2);
            $table->string('statut')->default('En attente');
            $table->timestamps();
        });

        // 4. Table Echéances
        Schema::create('echeances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('echeancier_id')->constrained('echeanciers')->onDelete('cascade');
            $table->date('date_limite');
            $table->decimal('montant', 10, 2);
            $table->decimal('montant_paye', 10, 2)->default(0.00);
            $table->string('statut')->default('Non payé');
            $table->timestamps();
        });

        // 5. Table Paiements
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            $table->foreignId('echeance_id')->constrained('echeances')->onDelete('cascade');
            $table->dateTime('date_paiement');
            $table->decimal('montant', 10, 2);
            $table->string('reference')->unique();
            $table->string('statut')->default('Validé');
            $table->timestamps();
        });

        // 6. Table Reçus
        Schema::create('recus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paiement_id')->unique()->constrained('paiements')->onDelete('cascade');
            $table->string('numero')->unique();
            $table->dateTime('date_generation');
            $table->string('chemin_fichier');
            $table->timestamps();
        });

        // 7. Table Relances
        Schema::create('relances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('echeance_id')->constrained('echeances')->onDelete('cascade');
            $table->dateTime('date_envoi');
            $table->text('message');
            $table->string('canal')->default('Notification interne');
            $table->string('statut')->default('Envoyée');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relances');
        Schema::dropIfExists('recus');
        Schema::dropIfExists('paiements');
        Schema::dropIfExists('echeances');
        Schema::dropIfExists('echeanciers');
        Schema::dropIfExists('frais_scolarite');
        Schema::dropIfExists('etudiants');
    }
};
