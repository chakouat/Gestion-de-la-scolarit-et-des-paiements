# ZEN — Application de gestion de la scolarité et des paiements

Application web dynamique développée dans le cadre du module **Programmation Web Dynamique (S5 IL)** à l'Université Ibn Zohr, Faculté des Sciences Agadir (Centre d'Excellence IT).

---

## 1. Technologies utilisées

* **Frontend :** React 19 + Vite (JavaScript), Tailwind CSS, Lucide Icons, support Dark/Light mode.
* **Backend :** Laravel (PHP 8.2+), API REST, Laravel Sanctum.
* **Base de données :** MySQL 8.0 avec volume de persistance.
* **Architecture Docker :** 3 conteneurs orchestrés avec Docker Compose (`frontend`, `backend`, `database`).

---

## 2. Structure du projet

```text
ZEN/
├── frontend/                # Application React + Vite (Port 5173)
├── backend/                 # Application Laravel API (Port 8000)
├── docs/
│   └── uml/                 # Diagrammes UML validés (Use Case, Classes, Séquences, Activités)
├── docker-compose.yml       # Configuration des 3 conteneurs
├── .env.example             # Modèle des variables d'environnement
└── README.md                # Documentation générale
```

---

## 3. Lancement rapide avec Docker

### Prérequis
* Docker & Docker Compose installés sur votre machine.

### Démarrage des conteneurs
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/chakouat/Gestion-de-la-scolarit-et-des-paiements.git
   cd Gestion-de-la-scolarit-et-des-paiements
   ```

2. Configurer les variables d'environnement :
   ```bash
   cp .env.example .env
   ```

3. Lancer les 3 conteneurs :
   ```bash
   docker compose up -d --build
   ```

4. Accéder à l'application :
   * **Frontend React :** [http://localhost:5173](http://localhost:5173)
   * **Backend API Laravel :** [http://localhost:8000](http://localhost:8000)
   * **Base de données MySQL :** `localhost:3306`

---

## 4. Statut des phases

- [x] **Phase 1 : Socle technique & Conteneurisation Docker (En cours de validation)**
- [ ] **Phase 2 : Schéma relationnel BDD, Migrations & Seeders**
- [ ] **Phase 3 : Authentification & Contrôle d'accès RBAC (Admin / Étudiant)**
- [ ] **Phase 4 : API Métier (Frais, Échéanciers, Paiements, Situation financière)**
- [ ] **Phase 5 : Interface Utilisateur & Tableaux de bord (Dark/Light mode)**
- [ ] **Phase 6 : Reçus PDF & Module de Relance**
- [ ] **Phase 7 : Recette, Tests finaux & Documentation**
