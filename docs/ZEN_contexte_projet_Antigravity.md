# ZEN --- Gestion de la scolarité et des paiements

> **Document de référence du projet --- à fournir à Antigravity**
>
> Ce document décrit le contexte métier, les besoins, la conception
> attendue, l'organisation du code, l'interface et l'environnement
> technique du projet ZEN. Il doit être lu avant toute génération ou
> modification de code.
>
> **Version :** 1.0 --- 11 novembre 2026\
> **Module :** Programmation Web Dynamique --- S5, Filière IL\
> **Établissement indiqué dans le sujet :** Université Ibn Zohr, Faculté
> des Sciences Agadir, Centre d'excellence IT\
> **État :** cadrage fonctionnel et technique. Les diagrammes UML
> validés seront ajoutés dans le dossier prévu à cet effet.

------------------------------------------------------------------------

## 0. Instructions importantes pour Antigravity

Agis comme un assistant de développement senior chargé d'accompagner la
réalisation de ZEN.

1.  Lis entièrement ce document avant de proposer une architecture ou du
    code.
2.  Respecte les exigences du professeur et les décisions de conception
    validées.
3.  **Ne commence pas directement à coder.** La première étape est de
    comprendre le projet, vérifier les diagrammes et préparer un plan
    d'implémentation.
4.  Ne crée pas de fonctionnalités métier, d'acteurs, de statuts ou de
    règles de calcul qui ne sont pas définis. Lorsqu'une information
    manque, signale-la et demande une décision.
5.  Les diagrammes UML placés dans `docs/uml/` sont la référence de
    conception. En cas de différence entre une proposition générée et un
    diagramme validé, le diagramme validé prévaut.
6.  Respecte la séparation frontend/backend et les trois services Docker
    demandés.
7.  Garde une interface simple, lisible, cohérente et responsive.
    Utilise au maximum **deux couleurs principales**.
8.  Utilise les composants shadcn/ui lorsque cela est pertinent, sans
    installer une bibliothèque de composants supplémentaire inutile.
9.  N'ajoute pas de dépendance sans expliquer son utilité.
10. Après chaque étape, présente les fichiers créés/modifiés, les
    commandes exécutées et les vérifications effectuées.

------------------------------------------------------------------------

# 1. Présentation détaillée du sujet

## 1.1 Intitulé du projet

**ZEN --- Application web de gestion de la scolarité et des paiements**

## 1.2 Contexte

ZEN est un projet académique réalisé dans le cadre du module
Programmation Web Dynamique. Il consiste à concevoir et développer une
application web dynamique destinée à organiser la gestion de la
scolarité et le suivi des paiements.

Le sujet porte principalement sur la gestion des **frais**, des
**échéanciers**, des **requêtes** et des **relances**. L'application
doit regrouper ces opérations dans un espace numérique unique, avec une
interface permettant aux utilisateurs autorisés de consulter les
informations et d'effectuer les opérations correspondant à leurs
responsabilités.

Le projet ne se limite donc pas à afficher des données. Il doit proposer
une véritable application de gestion : authentification, accès selon les
rôles, formulaires, consultation des informations, opérations CRUD,
recherche, filtres, pagination et outils de suivi.

## 1.3 Problématique

La gestion des frais de scolarité implique plusieurs informations qui
doivent rester cohérentes : les frais à régler, les échéances prévues,
les paiements effectués ou restant à effectuer, les demandes liées à la
situation scolaire ou financière et les relances nécessaires.

Lorsque ces informations sont suivies séparément, il devient plus
difficile d'avoir une vision globale de la situation, de retrouver
rapidement un dossier et de savoir quelles actions restent à effectuer.

ZEN vise à centraliser ces informations et à faciliter leur suivi au
moyen d'une application web structurée, sécurisée et accessible selon
les autorisations de chaque utilisateur.

## 1.4 Objectif général

Concevoir et développer une application web permettant de gérer les
informations de scolarité liées aux frais et aux paiements, de suivre
les échéanciers, de traiter les requêtes et d'organiser les relances.

## 1.5 Objectifs spécifiques

-   Centraliser les informations nécessaires à la gestion des frais de
    scolarité.
-   Organiser les échéanciers et faciliter le suivi des échéances.
-   Permettre l'enregistrement et le suivi des requêtes.
-   Faciliter le suivi des relances liées aux paiements ou aux
    échéances.
-   Sécuriser l'accès aux fonctionnalités par authentification.
-   Adapter les fonctionnalités disponibles au rôle de l'utilisateur.
-   Présenter les informations importantes dans un tableau de bord.
-   Faciliter la recherche et le filtrage des données.
-   Fournir des statistiques et des possibilités d'export lorsque cela
    est prévu.
-   Conserver les données dans une base relationnelle MySQL.

## 1.6 Périmètre fonctionnel principal

Les quatre domaines métier retenus pour le sujet sont les suivants.

### A. Gestion des frais

Cette partie concerne les frais liés à la scolarité. L'application doit
permettre de gérer et de consulter les informations relatives à ces
frais.

Exemples d'opérations à préciser selon les règles métier : - consulter
la liste des frais ; - afficher le détail d'un frais ; - ajouter un
frais ; - modifier un frais ; - supprimer un frais lorsque cela est
autorisé ; - rechercher et filtrer les frais.

Les catégories de frais, les règles de calcul, les montants et les
conditions d'application doivent être définis dans la conception.
Antigravity ne doit pas inventer ces règles.

### B. Gestion des échéanciers

Cette partie concerne la planification et le suivi des échéances de
paiement.

Elle doit permettre de visualiser les échéances et de suivre leur état.
Les règles exactes relatives aux dates, aux montants, aux retards et aux
statuts doivent être celles définies dans les diagrammes et les
décisions métier.

### C. Gestion des requêtes

Cette partie concerne les demandes soumises dans le cadre de la gestion
scolaire ou financière.

L'application doit permettre de retrouver les requêtes et d'en suivre le
traitement selon les droits des utilisateurs. Les types de requêtes, les
statuts et le circuit de traitement restent à préciser dans la
conception détaillée.

### D. Gestion des relances

Cette partie concerne le suivi des actions de relance, notamment
lorsqu'une échéance nécessite une intervention.

L'application doit permettre de consulter et de suivre les relances. Les
conditions de déclenchement, les destinataires, les canaux de
communication et les éventuelles automatisations doivent être décidés
explicitement avant leur implémentation.

> **Important --- terminologie :** le sujet de travail retient «
> requêtes » comme domaine fonctionnel. Le document du professeur décrit
> les exigences générales du projet, mais ne détaille pas les règles
> métier propres à ZEN. Toute autre fonctionnalité évoquée pendant les
> échanges (par exemple les reçus) doit être confirmée dans les
> diagrammes ou par l'équipe avant d'être considérée comme une exigence.

## 1.7 Fonctionnalités transversales

Les consignes de cadrage données pour le projet demandent de prévoir les
fonctionnalités transversales suivantes :

-   **Authentification :** connexion et déconnexion ; inscription
    uniquement si elle est retenue dans la conception.
-   **Tableau de bord :** vue synthétique des informations utiles à
    l'utilisateur.
-   **CRUD :** création, consultation, modification et suppression des
    ressources autorisées.
-   **Recherche :** recherche d'enregistrements.
-   **Filtres :** filtrage selon les champs pertinents.
-   **Pagination :** navigation dans les listes volumineuses.
-   **Rôles et permissions :** contrôle des actions accessibles à chaque
    profil.
-   **Notifications :** information de l'utilisateur sur les événements
    prévus par le projet.
-   **Statistiques :** indicateurs utiles au suivi.
-   **Export :** export PDF et/ou Excel selon les besoins retenus.

Ces fonctionnalités doivent être appliquées aux modules concernés, sans
ajouter automatiquement chaque opération à chaque entité.

## 1.8 Authentification et contrôle d'accès

Une règle importante a été confirmée par le professeur pendant la
validation du diagramme de cas d'utilisation :

**Les deux acteurs du diagramme ne peuvent réaliser aucune action
fonctionnelle avant de s'être authentifiés.**

Cette règle doit être appliquée dans toute l'application : - un visiteur
non authentifié ne peut pas accéder aux fonctionnalités métier protégées
; - après connexion, l'utilisateur accède uniquement aux fonctionnalités
permises par son rôle ; - les routes frontend doivent protéger
l'affichage des pages privées ; - les API Laravel doivent vérifier
l'authentification et les autorisations ; - la sécurité ne doit jamais
dépendre uniquement du masquage des boutons dans React.

Les noms exacts des deux acteurs et les permissions détaillées doivent
être repris des diagrammes validés. Ne pas créer arbitrairement de
nouveaux rôles.

------------------------------------------------------------------------

# 2. Référentiel des exigences du professeur

Le fichier fourni par le professeur, **« Projet IL5 PWD 2026 »**,
constitue la référence pour les exigences techniques et les livrables.

## 2.1 Technologies imposées

Le professeur demande : - **React** pour le frontend ; - **Laravel**
pour le backend, la logique métier et les API ; - **MySQL** pour la base
de données relationnelle ; - **GitHub** pour la gestion des versions.

L'application doit séparer clairement le frontend et le backend.

## 2.2 Fonctionnalités minimales du sujet officiel

Le document officiel demande : - l'authentification : inscription d'un
utilisateur, connexion, déconnexion et accès réservé aux utilisateurs
authentifiés ; - la gestion des données par opérations CRUD ; -
l'utilisation de MySQL ; - la création des tables nécessaires et des
relations entre les tables ; - la gestion des données à travers Laravel.

Les fonctionnalités métier spécifiques à ZEN sont décrites dans la
section 1 de ce document.

## 2.3 Modélisation UML demandée

Le professeur cite : - un diagramme de cas d'utilisation ; - un
diagramme de classes ; - un ou plusieurs diagrammes de séquence ; - un
modèle de données représentant les tables et leurs relations.

Dans le travail de conception de ZEN, un **diagramme d'activité** est
également prévu. Il doit être conservé dans la documentation s'il fait
partie des diagrammes réalisés/validés par l'équipe.

## 2.4 Organisation du dépôt indiquée par le professeur

Le document officiel propose cette organisation :

``` text
Projet-webNumero/
├── frontend/
│   └── React
├── backend/
│   └── Laravel
└── README.md
```

La structure détaillée proposée dans la section 5 respecte cette
séparation et ajoute les dossiers nécessaires à la documentation et à
Docker.

## 2.5 Livrables attendus

1.  **Code source :** application complète hébergée sur GitHub avec un
    historique de commits clair.
2.  **Modélisation UML :** diagrammes réalisés pendant l'analyse et la
    conception.
3.  **Rapport :** contexte, objectifs, analyse des besoins, répartition
    du travail, UML, architecture, technologies, conception de la base
    de données, frontend, backend, communication React/Laravel,
    fonctionnalités, tests, difficultés et solutions, Git/GitHub,
    conclusion et perspectives.
4.  **Démonstration :** démonstration de l'application réellement
    exécutée. Les fonctionnalités présentées doivent être développées,
    testées et opérationnelles.

------------------------------------------------------------------------

# 3. Conception et modélisation UML

Cette section est réservée aux diagrammes de conception de ZEN. Les
diagrammes doivent être ajoutés sous forme d'images exportées ou de
fichiers source (PlantUML, Mermaid ou autre format utilisé par
l'équipe).

**Règle : les diagrammes validés par le professeur sont prioritaires.**
Antigravity doit les lire et les respecter, et non les redessiner selon
ses propres suppositions.

## 3.1 Organisation des fichiers UML

``` text
docs/
└── uml/
    ├── use-case.png
    ├── use-case.puml
    ├── class-diagram.png
    ├── class-diagram.puml
    ├── sequence/
    │   ├── sequence-authentication.png
    │   └── ...
    ├── activity/
    │   └── ...
    └── database/
        ├── er-diagram.png
        └── er-diagram.mmd
```

Les extensions sont indicatives : conserver les formats réellement
utilisés.

## 3.2 Diagramme de cas d'utilisation

**À insérer :** diagramme validé de cas d'utilisation.

Points de contrôle : - conserver les deux acteurs validés ; - aucun
acteur ne réalise une action métier sans authentification ; - présenter
les fonctionnalités correspondant au périmètre réel de ZEN ; - respecter
les relations UML (`include`, `extend`, généralisations) telles qu'elles
ont été validées ; - ne pas ajouter de cas d'utilisation non décidé.

## 3.3 Diagramme de classes

**À insérer :** diagramme de classes validé.

Il constitue la référence pour : - les classes métier ; - les attributs
et opérations ; - les associations ; - les cardinalités ; - les
responsabilités des classes.

Les modèles Laravel et les relations Eloquent devront rester cohérents
avec ce diagramme et avec le modèle relationnel final.

## 3.4 Diagrammes de séquence

**À insérer :** un fichier par scénario étudié.

Ils décrivent les échanges entre les acteurs, le frontend, le backend et
la base de données pour les scénarios retenus. Les contrôleurs, services
et endpoints seront conçus à partir de ces interactions, sans inventer
des étapes métier absentes des diagrammes.

## 3.5 Diagrammes d'activité

**À insérer :** diagrammes d'activité réalisés pour les processus
retenus.

Ils décrivent l'enchaînement des actions et les décisions métier. Les
conditions représentées doivent être reprises dans l'implémentation.

## 3.6 Modèle de données / diagramme entité-association

**À insérer :** modèle de données final.

Il doit préciser les tables, les clés primaires, les clés étrangères,
les relations et les cardinalités. La structure SQL et les migrations
Laravel doivent respecter ce modèle.

------------------------------------------------------------------------

# 4. Architecture générale de l'application

## 4.1 Architecture logique

ZEN utilise une architecture frontend/backend séparée :

``` text
┌───────────────────────────────┐
│       Utilisateur             │
│   Navigateur Web / Interface  │
└───────────────┬───────────────┘
                │ HTTP / HTTPS
                ▼
┌───────────────────────────────┐
│          FRONTEND             │
│       React + Vite            │
│  Pages, composants, formulaires│
│  navigation, appels API       │
└───────────────┬───────────────┘
                │ API HTTP / JSON
                ▼
┌───────────────────────────────┐
│           BACKEND             │
│           Laravel             │
│ Routes API, middleware,       │
│ contrôleurs, services,        │
│ validation, logique métier    │
└───────────────┬───────────────┘
                │ SQL / Eloquent
                ▼
┌───────────────────────────────┐
│          DATABASE             │
│             MySQL             │
│ Tables, relations, données    │
└───────────────────────────────┘
```

## 4.2 Responsabilités

### Frontend --- React

-   afficher les pages et les composants ;
-   gérer la navigation ;
-   collecter et valider les données côté interface pour améliorer
    l'expérience utilisateur ;
-   appeler les API Laravel ;
-   afficher les résultats, erreurs, états de chargement et
    notifications ;
-   appliquer les règles de navigation selon l'état d'authentification
    et le rôle.

Le frontend ne doit pas contenir la logique métier qui doit être
contrôlée par le serveur.

### Backend --- Laravel

-   exposer les endpoints API ;
-   authentifier les utilisateurs ;
-   vérifier les rôles et permissions ;
-   valider les données reçues ;
-   appliquer les règles métier ;
-   communiquer avec MySQL ;
-   retourner des réponses JSON cohérentes ;
-   gérer les erreurs et les opérations sensibles.

### Base de données --- MySQL

-   stocker les utilisateurs et les données métier ;
-   garantir les relations entre les entités ;
-   appliquer les contraintes d'intégrité ;
-   conserver les données de manière persistante.

------------------------------------------------------------------------

# 5. Stack technique

## 5.1 Stack principale

  -----------------------------------------------------------------------
  Couche                  Technologie             Rôle
  ----------------------- ----------------------- -----------------------
  Frontend                React                   Construction de
                                                  l'interface

  Outil frontend          Vite                    Serveur de
                                                  développement et build

  Langage frontend        JavaScript ou           Logique de l'interface
                          TypeScript              

  Backend                 Laravel                 API et logique métier

  Langage backend         PHP                     Développement Laravel

  Base de données         MySQL                   Persistance
                                                  relationnelle

  Conteneurisation        Docker                  Environnement
                                                  reproductible

  Orchestration locale    Docker Compose          Lancement coordonné des
                                                  trois services

  Versionnement           Git + GitHub            Historique et
                                                  collaboration

  Composants UI           shadcn/ui               Composants d'interface
                                                  réutilisables
  -----------------------------------------------------------------------

**Important :** React, Laravel et MySQL sont les technologies
explicitement demandées par le professeur. Vite, TypeScript, Docker
Compose et shadcn/ui sont des choix d'organisation/implémentation
proposés pour réaliser proprement le projet. Si une version ou un choix
a déjà été fixé par l'équipe, le conserver.

## 5.2 Frontend

Stack proposée : - React ; - Vite ; - TypeScript de préférence si le
projet démarre sur une base TypeScript ; sinon conserver JavaScript sans
mélanger inutilement les deux ; - React Router pour les routes si une
bibliothèque de routage est nécessaire ; - Tailwind CSS pour le style
; - shadcn/ui pour les composants d'interface ; - une solution légère et
cohérente pour les appels API.

Ne pas ajouter automatiquement Redux, Zustand, TanStack Query ou
plusieurs bibliothèques concurrentes. Choisir une solution uniquement
lorsque le besoin réel est identifié.

## 5.3 shadcn/ui

Référence officielle : https://ui.shadcn.com/docs/cli

Les composants shadcn/ui peuvent être utilisés pour construire une
interface cohérente et accessible. Ils sont ajoutés au projet via leur
CLI et restent personnalisables dans le code source.

Composants potentiellement utiles : - Button ; - Input ; - Label ; -
Textarea ; - Select ; - Checkbox ; - Dialog ; - Alert Dialog ; -
Dropdown Menu ; - Table ; - Tabs ; - Card ; - Badge ; - Calendar / Date
Picker ; - Sheet ; - Sidebar ; - Pagination ; - Toast / Sonner.

Cette liste est indicative. Installer uniquement les composants
effectivement utilisés. Respecter la documentation officielle et la
configuration réelle du projet.

## 5.4 Backend

Stack proposée : - Laravel ; - PHP ; - API REST retournant du JSON ; -
validation des requêtes côté serveur ; - Eloquent ORM ; - migrations et
seeders ; - middleware d'authentification et de contrôle d'accès.

Pour l'authentification d'une SPA React séparée, **Laravel Sanctum peut
être étudié** comme solution. Son adoption doit tenir compte de la
configuration réelle des domaines, cookies, sessions et CORS. Ne pas
mélanger plusieurs mécanismes d'authentification.

## 5.5 Base de données

-   SGBD : MySQL.
-   Définition du schéma par migrations Laravel.
-   Relations définies à partir du diagramme de classes et du modèle de
    données.
-   Clés primaires et étrangères explicites.
-   Contraintes d'intégrité et index lorsque nécessaires.
-   Données de démonstration via seeders, sans données personnelles
    réelles.

Ne pas créer les tables métier avant d'avoir vérifié le modèle de
données validé.

------------------------------------------------------------------------

# 6. Docker --- Architecture à trois conteneurs

Le professeur a précisé une organisation Docker avec **trois conteneurs
distincts** :

1.  un conteneur pour le frontend ;
2.  un conteneur pour le backend ;
3.  un conteneur pour la base de données.

Cette séparation doit être respectée.

## 6.1 Vue des conteneurs

``` text
┌──────────────────────────────┐
│       Docker Compose         │
│                              │
│  ┌────────────────────────┐  │
│  │  frontend              │  │
│  │  React + Vite          │  │
│  │  Port hôte : 5173      │  │
│  └───────────┬────────────┘  │
│              │ API           │
│  ┌───────────▼────────────┐  │
│  │  backend               │  │
│  │  Laravel / PHP         │  │
│  │  Port hôte : 8000      │  │
│  └───────────┬────────────┘  │
│              │ SQL           │
│  ┌───────────▼────────────┐  │
│  │  database              │  │
│  │  MySQL                 │  │
│  │  Port interne : 3306   │  │
│  └────────────────────────┘  │
│                              │
│  Volume persistant MySQL     │
└──────────────────────────────┘
```

Les ports indiqués sont des ports de développement proposés, à ajuster
selon les configurations réelles.

## 6.2 Responsabilité de chaque conteneur

### `frontend`

-   contient l'application React ;
-   installe les dépendances frontend ;
-   lance le serveur Vite en développement ;
-   communique avec le backend via l'URL de l'API configurée.

### `backend`

-   contient l'application Laravel ;
-   exécute PHP et le serveur adapté à l'environnement ;
-   expose les endpoints API ;
-   se connecte au service MySQL par le nom de service Docker, par
    exemple `database`, et non par `localhost`.

### `database`

-   exécute MySQL ;
-   conserve les données dans un volume Docker nommé ;
-   n'est accessible qu'aux services autorisés ;
-   peut exposer son port à l'hôte uniquement si cela est nécessaire au
    développement.

## 6.3 Organisation Docker proposée

``` text
ZEN/
├── frontend/
│   └── Dockerfile
├── backend/
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

Le fichier `docker-compose.yml` doit définir les trois services
`frontend`, `backend` et `database`, un réseau commun et un volume
persistant pour MySQL.

## 6.4 Bonnes pratiques Docker

-   Utiliser des variables d'environnement pour la configuration.
-   Ne jamais versionner les secrets ou mots de passe réels.
-   Fournir un `.env.example` sans secret.
-   Ajouter un volume nommé pour les données MySQL.
-   Définir les dépendances de démarrage et un healthcheck MySQL si
    nécessaire.
-   Utiliser les noms de services Docker pour la communication
    inter-conteneurs.
-   Documenter les commandes de démarrage, arrêt, logs et migrations.
-   Ne pas ajouter un quatrième conteneur pour Redis, Nginx ou un autre
    service sans validation préalable : le cadre annoncé par le
    professeur est de trois conteneurs.

------------------------------------------------------------------------

# 7. Structure du projet

La structure suivante reprend l'organisation frontend/backend du
professeur et la complète avec les dossiers de documentation et de
Docker.

``` text
ZEN/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/                 # composants shadcn/ui
│   │   │   ├── layout/             # sidebar, header, navigation
│   │   │   └── shared/             # composants communs
│   │   ├── pages/                  # pages de l'application
│   │   ├── features/               # fonctionnalités organisées par domaine
│   │   │   ├── frais/
│   │   │   ├── echeanciers/
│   │   │   ├── requetes/
│   │   │   └── relances/
│   │   ├── hooks/
│   │   ├── services/               # client HTTP et appels API
│   │   ├── contexts/               # contexte global si nécessaire
│   │   ├── routes/
│   │   ├── types/                  # si TypeScript
│   │   ├── lib/
│   │   ├── App.jsx ou App.tsx
│   │   └── main.jsx ou main.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js ou vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   ├── Models/
│   │   └── Services/               # si une couche service est utile
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/
│   │   └── api.php
│   ├── tests/
│   ├── Dockerfile
│   ├── composer.json
│   └── .env.example
│
├── docs/
│   ├── uml/
│   │   ├── use-case/
│   │   ├── class/
│   │   ├── sequence/
│   │   ├── activity/
│   │   └── database/
│   ├── architecture/
│   └── decisions/
│
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

### 7.1 Règles d'organisation

-   Le dossier `frontend/` contient uniquement le code React et ses
    ressources.
-   Le dossier `backend/` contient uniquement l'application Laravel.
-   Les appels HTTP du frontend sont centralisés dans `services/`.
-   Les composants visuels réutilisables sont placés dans `components/`.
-   Les composants shadcn/ui sont placés dans `components/ui/`.
-   Les fonctionnalités métier sont organisées de manière claire et
    cohérente.
-   Les migrations Laravel représentent l'évolution du schéma de la
    base.
-   Les diagrammes et documents de conception sont conservés dans
    `docs/`.
-   Éviter les fichiers trop volumineux et les composants qui mélangent
    plusieurs responsabilités.

Cette structure est une proposition de travail. Si le professeur fournit
une structure plus détaillée ou si le dépôt existant impose déjà une
organisation, il faut conserver la structure validée et adapter les
sous-dossiers sans casser le projet.

------------------------------------------------------------------------

# 8. Direction artistique et règles UI/UX

## 8.1 Objectif visuel

L'interface de ZEN doit être **simple, professionnelle, moderne, lisible
et facile à utiliser**. Il s'agit d'une application de gestion : la
priorité est la clarté des informations et l'efficacité des opérations,
pas les animations ou les effets décoratifs.

## 8.2 Palette de couleurs

Utiliser au maximum **deux couleurs principales** : - une couleur
principale pour les actions importantes, les liens actifs et les
éléments de marque ; - une seconde couleur d'accent, utilisée avec
parcimonie.

Les couleurs neutres (blanc, gris, noir ou nuances de fond) peuvent être
utilisées pour la structure, le texte, les bordures et les surfaces.
Elles ne doivent pas conduire à multiplier les couleurs d'accent.

**Proposition de palette :** - couleur principale : bleu profond
`#1D4ED8` ; - couleur secondaire : turquoise `#0F766E` ; - fond :
`#F8FAFC` ; - surface : `#FFFFFF` ; - texte principal : `#0F172A` ; -
texte secondaire : `#64748B` ; - bordures : `#E2E8F0`.

Cette palette est une proposition initiale, modifiable si une charte
graphique est décidée. Les couleurs de statut (succès, avertissement,
erreur) doivent rester limitées, cohérentes et accessibles ; elles ne
doivent pas devenir des couleurs principales de l'identité visuelle.

## 8.3 Principes d'interface

-   Mise en page aérée, avec une hiérarchie visuelle claire.
-   Typographie lisible et tailles cohérentes.
-   Contraste suffisant entre texte et arrière-plan.
-   Sidebar simple pour la navigation principale sur desktop.
-   Header contenant le titre de la page et les actions globales utiles.
-   Tableaux lisibles pour les listes de données.
-   Formulaires courts, bien étiquetés et avec des messages d'erreur
    explicites.
-   Boutons primaires réservés aux actions principales.
-   Dialogues de confirmation pour les suppressions ou actions
    sensibles.
-   États vides, chargement et erreur prévus.
-   Interface responsive sur ordinateur, tablette et mobile.
-   Éviter les dégradés, les ombres excessives, les animations inutiles
    et les décorations qui gênent la lecture.

## 8.4 Composants

Privilégier shadcn/ui pour les composants standards : - boutons, champs
de saisie et labels ; - cartes et tableaux ; - menus et fenêtres de
dialogue ; - badges de statut ; - sélecteurs et filtres ; - pagination
; - notifications/toasts ; - sidebar et éléments de navigation.

Les composants doivent être réutilisés et personnalisés dans le style
global de ZEN. Ne pas recopier plusieurs versions du même composant.

------------------------------------------------------------------------

# 9. Qualité, sécurité et règles de développement

## 9.1 Sécurité

-   Vérifier l'authentification côté backend pour chaque endpoint
    protégé.
-   Vérifier les permissions selon le rôle.
-   Valider les entrées côté serveur.
-   Ne jamais faire confiance aux données envoyées par le frontend.
-   Protéger les secrets dans les fichiers `.env`, exclus de Git.
-   Utiliser des mots de passe hachés via les mécanismes Laravel.
-   Éviter d'exposer des informations sensibles dans les réponses API ou
    les logs.
-   Gérer correctement CORS et les paramètres d'authentification.
-   Prévoir des confirmations pour les opérations destructives.

## 9.2 API

-   Utiliser des routes API cohérentes et des méthodes HTTP adaptées.
-   Retourner des réponses JSON structurées.
-   Utiliser des codes HTTP appropriés.
-   Centraliser et documenter les appels API côté frontend.
-   Gérer les erreurs réseau, validation et autorisation.
-   Ne pas appeler directement MySQL depuis React.

## 9.3 Base de données

-   Respecter le modèle relationnel validé.
-   Définir les clés étrangères et contraintes nécessaires.
-   Éviter les duplications de données inutiles.
-   Utiliser les migrations pour versionner le schéma.
-   Prévoir des seeders pour les données de démonstration.
-   Réfléchir aux suppressions en tenant compte des dépendances et de
    l'intégrité des données.

## 9.4 Git et GitHub

-   Utiliser des commits petits et explicites.
-   Écrire des messages de commit descriptifs.
-   Ne jamais committer les fichiers `.env` contenant des secrets.
-   Utiliser des branches si cela facilite le travail en binôme.
-   Mettre à jour le README lors de changements importants.
-   Garder le dépôt organisé selon les dossiers frontend et backend.

Exemples de messages :

``` text
feat(auth): add login endpoint
feat(frais): implement fees listing
feat(echeanciers): add schedule management
fix(api): handle validation errors
docs(uml): add class diagram
```

------------------------------------------------------------------------

# 10. Méthode de réalisation recommandée

Le développement doit suivre les étapes ci-dessous. L'équipe doit
valider chaque étape avant de passer à la suivante.

1.  **Compréhension du sujet :** lire ce document et le sujet officiel.
2.  **Conception :** intégrer et vérifier les diagrammes UML validés.
3.  **Modèle de données :** vérifier les entités, relations et
    contraintes à partir de la conception.
4.  **Initialisation du dépôt :** créer ou vérifier `frontend/`,
    `backend/`, `docs/` et les fichiers Docker.
5.  **Environnement Docker :** faire démarrer les trois conteneurs et
    vérifier leur communication.
6.  **Backend :** configurer Laravel, la base, les migrations,
    l'authentification et les API.
7.  **Frontend :** configurer React, la navigation, le layout et le
    système de composants.
8.  **Intégration :** connecter les pages aux API Laravel.
9.  **Fonctionnalités métier :** développer frais, échéanciers, requêtes
    et relances selon les diagrammes et règles validés.
10. **Fonctionnalités transversales :** recherche, filtres, pagination,
    notifications, statistiques et exports selon le périmètre retenu.
11. **Tests :** tester les parcours, les autorisations, les validations
    et les erreurs.
12. **Documentation et démonstration :** compléter README, rapport et
    scénarios de démonstration.

------------------------------------------------------------------------

# 11. Critères de validation

Avant de considérer le projet comme prêt, vérifier les points suivants.

## Fonctionnel

-   [ ] Les fonctionnalités correspondent au sujet et aux diagrammes.
-   [ ] Les utilisateurs doivent être authentifiés avant toute action
    protégée.
-   [ ] Les rôles et permissions sont contrôlés côté backend.
-   [ ] Les opérations CRUD prévues fonctionnent.
-   [ ] Les recherches, filtres et paginations prévus fonctionnent.
-   [ ] Les règles métier sont appliquées et testées.

## Technique

-   [ ] React communique avec les API Laravel.
-   [ ] Laravel communique avec MySQL.
-   [ ] Les trois conteneurs Docker sont opérationnels.
-   [ ] Les données MySQL persistent après redémarrage.
-   [ ] Les migrations peuvent être exécutées sur une base propre.
-   [ ] Les secrets ne sont pas présents dans Git.

## Interface

-   [ ] L'interface est lisible et responsive.
-   [ ] Deux couleurs principales au maximum sont utilisées.
-   [ ] Les composants sont cohérents et réutilisables.
-   [ ] Les états de chargement, erreur et absence de données sont
    traités.

## Livraison

-   [ ] Le dépôt GitHub est propre et documenté.
-   [ ] Les diagrammes UML sont présents.
-   [ ] Le README explique l'installation et le lancement.
-   [ ] Les fonctionnalités montrées en démonstration sont réellement
    opérationnelles.

------------------------------------------------------------------------

# 12. Informations à compléter par l'équipe

Les points suivants ne sont pas entièrement définis par le sujet
officiel. Ils doivent être complétés à partir des diagrammes et des
décisions de l'équipe avant de coder :

-   [ ] Noms exacts des deux acteurs du diagramme de cas d'utilisation.
-   [ ] Rôles définitifs et matrice des permissions.
-   [ ] Règles détaillées de gestion des frais.
-   [ ] Règles de création et de suivi des échéanciers.
-   [ ] Types, statuts et circuit de traitement des requêtes.
-   [ ] Conditions, destinataires et canaux des relances.
-   [ ] Décision sur la gestion des reçus, si cette fonctionnalité est
    retenue.
-   [ ] Entités, attributs, relations et contraintes définitifs de la
    base.
-   [ ] Choix final JavaScript ou TypeScript.
-   [ ] Choix final du mécanisme d'authentification.
-   [ ] Répartition du travail entre les membres du binôme.

Ne pas combler ces éléments par des hypothèses silencieuses. Les
présenter comme des questions à résoudre.

------------------------------------------------------------------------

# 13. Consigne finale à Antigravity

À partir de ce document et des diagrammes UML ajoutés dans `docs/uml/`,
commence par produire une **analyse structurée du projet**, sans générer
immédiatement toute l'application.

La première réponse attendue doit contenir :

1.  un résumé fidèle du besoin et du périmètre fonctionnel ;
2.  la liste des acteurs et de leurs permissions, uniquement si les
    diagrammes les définissent ;
3.  une lecture des diagrammes UML et les éventuelles incohérences à
    résoudre ;
4.  une proposition d'architecture frontend/backend/base de données
    conforme aux choix imposés ;
5.  la structure de dossiers proposée, en respectant celle du professeur
    ;
6.  le plan Docker composé exactement des trois services frontend,
    backend et database ;
7.  les questions métier qui restent à clarifier ;
8.  un plan de réalisation par étapes.

**Attendre la validation de l'équipe avant de commencer
l'implémentation.** Ne pas inventer de règles métier, ne pas modifier
les diagrammes validés et ne pas ajouter de technologies ou de
conteneurs sans justification et validation.
