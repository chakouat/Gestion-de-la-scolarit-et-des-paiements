# Projet ZEN — Gestion de la scolarité et des paiements
## Dossier de conception UML — Code PlantUML

Ce fichier regroupe les diagrammes UML du projet dans un ordre logique : cas d’utilisation, classes, séquences, puis activités.

**Format :** PlantUML  
**Utilisation :** copier chaque bloc séparément dans PlantUML (extension `.puml`) ou dans un éditeur compatible.

> **Règle métier centrale :** les acteurs Administrateur et Étudiant doivent obligatoirement s’authentifier avant d’accéder aux fonctionnalités. Les fonctionnalités sont ensuite accessibles selon le rôle de l’utilisateur.

---

# 1. Diagramme de cas d’utilisation

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
skinparam shadowing false

actor "Administrateur" as Admin
actor "Étudiant" as Etudiant

rectangle "Système ZEN\nGestion de la scolarité et des paiements" {
  usecase "S'authentifier" as UC_Auth

  usecase "Gérer les étudiants" as UC_Etudiants
  usecase "Gérer les frais de scolarité" as UC_Frais
  usecase "Gérer les échéanciers" as UC_Echeanciers
  usecase "Consulter les paiements" as UC_ConsulterPaiements
  usecase "Enregistrer un paiement" as UC_Paiement
  usecase "Générer un reçu" as UC_Recu
  usecase "Gérer les relances" as UC_Relances
  usecase "Consulter sa situation financière" as UC_Situation
}

' Authentification obligatoire pour les deux acteurs
Admin --> UC_Auth
Etudiant --> UC_Auth

' Fonctionnalités de l'administrateur
Admin --> UC_Etudiants
Admin --> UC_Frais
Admin --> UC_Echeanciers
Admin --> UC_ConsulterPaiements
Admin --> UC_Paiement
Admin --> UC_Recu
Admin --> UC_Relances

' Fonctionnalités de l'étudiant
Etudiant --> UC_Situation
Etudiant --> UC_ConsulterPaiements
Etudiant --> UC_Recu

note bottom of UC_Auth
  L'authentification est obligatoire avant l'accès
  à toute fonctionnalité.
  L'accès dépend du rôle de l'utilisateur.
end note
@enduml
```

---

# 2. Diagramme de classes

```plantuml
@startuml
skinparam classAttributeIconSize 0
skinparam shadowing false

abstract class Utilisateur {
  - id : int
  - nom : String
  - prenom : String
  - email : String
  - motDePasse : String
  + s'authentifier() : boolean
  + seDeconnecter() : void
}

class Administrateur {
  + gererEtudiants() : void
  + gererFrais() : void
  + gererEcheanciers() : void
  + gererRelances() : void
}

class Etudiant {
  - numeroEtudiant : String
  - filiere : String
  - niveau : String
  + consulterSituation() : void
  + consulterPaiements() : void
}

class FraisScolarite {
  - id : int
  - libelle : String
  - montant : decimal
  - description : String
  + ajouter() : void
  + modifier() : void
  + supprimer() : void
}

class Echeancier {
  - id : int
  - dateCreation : Date
  - montantTotal : decimal
  - statut : String
  + calculerTotal() : decimal
  + mettreAJourStatut() : void
}

class Echeance {
  - id : int
  - dateLimite : Date
  - montant : decimal
  - montantPaye : decimal
  - statut : String
  + calculerReste() : decimal
  + verifierRetard() : boolean
}

class Paiement {
  - id : int
  - datePaiement : Date
  - montant : decimal
  - reference : String
  - statut : String
  + enregistrer() : void
  + valider() : void
}

class Recu {
  - id : int
  - numero : String
  - dateGeneration : Date
  - cheminFichier : String
  + genererPDF() : void
}

class Relance {
  - id : int
  - dateEnvoi : Date
  - message : String
  - canal : String
  - statut : String
  + envoyer() : void
}

Utilisateur <|-- Administrateur
Utilisateur <|-- Etudiant

Etudiant "1" -- "0..*" Echeancier : possède
FraisScolarite "1" -- "0..1" Echeancier : définit
Echeancier "1" *-- "1..*" Echeance : contient
Etudiant "1" -- "0..*" Paiement : effectue
Echeance "1" -- "0..*" Paiement : est réglée par
Paiement "1" -- "0..1" Recu : donne lieu à
Echeance "1" -- "0..*" Relance : peut déclencher

note bottom
  Le montant payé peut être inférieur au montant de l'échéance :
  le paiement partiel est donc représenté par plusieurs paiements
  associés à une même échéance.
  La classe Paiement ne contient pas d'attribut typePaiement.
end note
@enduml
```

---

# 3. Diagrammes de séquence

## 3.1. Séquence — Authentification

```plantuml
@startuml
autonumber
actor "Utilisateur\n(Administrateur ou Étudiant)" as User
boundary "Interface de connexion" as UI
control "ServiceAuthentification" as Auth
database "Base de données" as DB

User -> UI : Saisir email et mot de passe
User -> UI : Valider le formulaire
UI -> Auth : authentifier(email, motDePasse)
Auth -> DB : rechercherUtilisateur(email)
DB --> Auth : données utilisateur

alt Utilisateur trouvé et mot de passe valide
  Auth -> Auth : vérifierMotDePasse()
  Auth -> Auth : déterminerRôle()
  Auth --> UI : authentification réussie + rôle
  UI --> User : Afficher le tableau de bord adapté
else Identifiants invalides
  Auth --> UI : échec d'authentification
  UI --> User : Afficher un message d'erreur
end
@enduml
```

## 3.2. Séquence — Gestion des frais et des échéanciers

```plantuml
@startuml
autonumber
actor Administrateur as Admin
boundary "Interface d'administration" as UI
control "ServiceFrais" as SF
control "ServiceEcheancier" as SE
database "Base de données" as DB

Admin -> UI : Ouvrir la gestion des frais
UI --> Admin : Afficher la liste des frais
Admin -> UI : Ajouter ou modifier un frais
UI -> SF : enregistrerFrais(données)
SF -> DB : INSERT / UPDATE FraisScolarite
DB --> SF : confirmation
SF --> UI : résultat de l'opération
UI --> Admin : Afficher la confirmation

Admin -> UI : Créer un échéancier pour un étudiant
UI -> SE : creerEcheancier(étudiant, frais, échéances)
SE -> DB : Vérifier les données de l'étudiant et des frais
DB --> SE : données valides
SE -> DB : Enregistrer l'échéancier et ses échéances
DB --> SE : confirmation
SE --> UI : échéancier créé
UI --> Admin : Afficher l'échéancier
@enduml
```

## 3.3. Séquence — Enregistrement d'un paiement

```plantuml
@startuml
autonumber
actor Administrateur as Admin
boundary "Interface de paiement" as UI
control "ServicePaiement" as SP
control "ServiceEcheance" as SE
database "Base de données" as DB

Admin -> UI : Sélectionner un étudiant et une échéance
UI -> SE : consulterEcheance(idEcheance)
SE -> DB : rechercherEcheance(idEcheance)
DB --> SE : informations de l'échéance
SE --> UI : montant dû et montant restant
UI --> Admin : Afficher la situation

Admin -> UI : Saisir le montant du paiement
UI -> SP : enregistrerPaiement(données)
SP -> DB : Vérifier l'échéance et le montant
DB --> SP : données de l'échéance

alt Montant valide et inférieur ou égal au reste dû
  SP -> DB : Enregistrer le paiement
  SP -> SE : mettreAJourSituation(idEcheance, montant)
  SE -> DB : Mettre à jour montant payé et statut
  DB --> SE : confirmation
  SE --> SP : situation mise à jour
  SP --> UI : paiement enregistré
  UI --> Admin : Afficher la confirmation
else Montant invalide
  SP --> UI : erreur de validation
  UI --> Admin : Afficher le message d'erreur
end
@enduml
```

## 3.4. Séquence — Génération d'un reçu

```plantuml
@startuml
autonumber
actor Administrateur as Admin
boundary "Interface de paiement" as UI
control "ServiceRecu" as SR
database "Base de données" as DB
collections "Générateur PDF" as PDF

Admin -> UI : Demander le reçu d'un paiement
UI -> SR : genererRecu(idPaiement)
SR -> DB : rechercherPaiement(idPaiement)
DB --> SR : informations du paiement

alt Paiement existant et validé
  SR -> PDF : créerDocument(informations)
  PDF --> SR : fichier PDF
  SR -> DB : Enregistrer les informations du reçu
  DB --> SR : confirmation
  SR --> UI : reçu généré
  UI --> Admin : Afficher / télécharger le reçu
else Paiement introuvable ou non validé
  SR --> UI : génération impossible
  UI --> Admin : Afficher un message d'erreur
end
@enduml
```

## 3.5. Séquence — Gestion des relances

```plantuml
@startuml
autonumber
actor Administrateur as Admin
boundary "Interface d'administration" as UI
control "ServiceRelance" as SR
control "ServiceEcheance" as SE
database "Base de données" as DB
participant "Service de notification" as SN

Admin -> UI : Ouvrir la gestion des relances
UI -> SR : rechercherEcheancesEnRetard()
SR -> SE : obtenirEcheancesEnRetard()
SE -> DB : Rechercher les échéances échues non réglées
DB --> SE : liste des échéances en retard
SE --> SR : liste des échéances
SR --> UI : afficher les échéances concernées
UI --> Admin : Présenter la liste

Admin -> UI : Sélectionner une échéance et envoyer une relance
UI -> SR : envoyerRelance(idEcheance, message, canal)
SR -> DB : Enregistrer la relance
DB --> SR : relance enregistrée
SR -> SN : envoyerNotification(étudiant, message, canal)
SN --> SR : résultat de l'envoi

alt Notification envoyée
  SR -> DB : Mettre à jour le statut de la relance
  SR --> UI : relance envoyée
  UI --> Admin : Afficher la confirmation
else Échec de l'envoi
  SR -> DB : Enregistrer l'échec
  SR --> UI : échec de l'envoi
  UI --> Admin : Afficher un message d'erreur
end
@enduml
```

---

# 4. Diagrammes d'activité

## 4.1. Activité — Authentification

```plantuml
@startuml
start
:Afficher la page de connexion;
:Saisir email et mot de passe;
:Soumettre le formulaire;
:Vérifier les identifiants;

if (Identifiants valides ?) then (Oui)
  :Identifier le rôle;
  :Créer la session;
  if (Rôle Administrateur ?) then (Oui)
    :Afficher le tableau de bord administrateur;
  else (Non)
    :Afficher le tableau de bord étudiant;
  endif
else (Non)
  :Afficher un message d'erreur;
  :Redemander les identifiants;
endif

stop
@enduml
```

## 4.2. Activité — Gestion des frais et des échéanciers

```plantuml
@startuml
start
:Administrateur authentifié;
:Accéder à la gestion des frais;

if (Opération sur les frais ?) then (Ajouter)
  :Saisir les informations du frais;
  :Valider les données;
  :Enregistrer le frais;
elseif (Modifier)
  :Sélectionner un frais;
  :Modifier les informations;
  :Valider et enregistrer;
else (Supprimer)
  :Sélectionner un frais;
  :Vérifier les dépendances;
  :Supprimer si autorisé;
endif

:Choisir un étudiant;
:Sélectionner les frais concernés;
:Définir les échéances et leurs montants;
:Vérifier la cohérence des montants;
if (Données valides ?) then (Oui)
  :Créer l'échéancier;
  :Enregistrer les échéances;
  :Afficher la confirmation;
else (Non)
  :Afficher les erreurs;
endif
stop
@enduml
```

## 4.3. Activité — Processus de paiement

```plantuml
@startuml
start
:Administrateur authentifié;
:Rechercher l'étudiant;
:Consulter ses échéances;
:Sélectionner une échéance;
:Afficher le montant restant dû;
:Saisir le montant à payer;

if (Montant supérieur à zéro ?) then (Oui)
  if (Montant inférieur ou égal au reste dû ?) then (Oui)
    :Enregistrer le paiement;
    :Calculer le nouveau montant payé;
    if (Échéance totalement réglée ?) then (Oui)
      :Marquer l'échéance comme payée;
    else (Non)
      :Marquer l'échéance comme partiellement payée;
    endif
    :Confirmer l'enregistrement;
  else (Non)
    :Afficher une erreur de montant;
  endif
else (Non)
  :Afficher une erreur de montant;
endif
stop
@enduml
```

## 4.4. Activité — Génération d'un reçu

```plantuml
@startuml
start
:Administrateur authentifié;
:Sélectionner un paiement;
:Vérifier l'existence du paiement;

if (Paiement trouvé ?) then (Oui)
  :Vérifier le statut du paiement;
  if (Paiement validé ?) then (Oui)
    :Récupérer les informations du paiement;
    :Construire le contenu du reçu;
    :Générer le document PDF;
    :Enregistrer le reçu;
    :Afficher le reçu;
    :Proposer le téléchargement;
  else (Non)
    :Signaler que le paiement n'est pas validé;
  endif
else (Non)
  :Signaler que le paiement est introuvable;
endif
stop
@enduml
```

## 4.5. Activité — Processus de relance

```plantuml
@startuml
start
:Administrateur authentifié;
:Accéder à la gestion des relances;
:Rechercher les échéances en retard;
:Afficher la liste des échéances concernées;
:Sélectionner une échéance;
:Vérifier le montant restant dû;

if (Reste dû supérieur à zéro ?) then (Oui)
  :Préparer le message de relance;
  :Choisir le canal de notification;
  :Envoyer la notification;
  if (Envoi réussi ?) then (Oui)
    :Enregistrer la relance;
    :Mettre le statut à "Envoyée";
    :Afficher la confirmation;
  else (Non)
    :Enregistrer l'échec de l'envoi;
    :Afficher un message d'erreur;
  endif
else (Non)
  :Aucune relance nécessaire;
endif
stop
@enduml
```

---

# 5. Ordre conseillé pour le rapport

1. Diagramme de cas d'utilisation
2. Diagramme de classes
3. Diagramme de séquence — Authentification
4. Diagramme de séquence — Gestion des frais et des échéanciers
5. Diagramme de séquence — Enregistrement d'un paiement
6. Diagramme de séquence — Génération d'un reçu
7. Diagramme de séquence — Gestion des relances
8. Diagramme d'activité — Authentification
9. Diagramme d'activité — Gestion des frais et des échéanciers
10. Diagramme d'activité — Processus de paiement
11. Diagramme d'activité — Génération d'un reçu
12. Diagramme d'activité — Processus de relance

---

# 6. Points à vérifier avant la remise

- Vérifier que les noms des attributs et des opérations correspondent à l'implémentation finale.
- Vérifier les règles exactes de paiement partiel et de validation d'un paiement.
- Vérifier si l'étudiant peut consulter ou télécharger lui-même ses reçus.
- Vérifier les canaux de relance réellement prévus dans le cahier des charges.
- Conserver la règle d'authentification obligatoire pour les deux acteurs.
- Ne pas réintroduire `typePaiement` dans la classe `Paiement`.

**Note :** les blocs ci-dessus constituent une version cohérente et organisée du code PlantUML à partir des éléments du projet disponibles. Les détails métier non explicitement confirmés doivent être comparés au cahier des charges et aux diagrammes validés par l'enseignant avant la remise finale.
