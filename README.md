# 📸 PhotoRetouch Pro

Plateforme e-commerce statique, moderne et responsive, dédiée à la vente de services de retouche photo professionnelle en ligne. Design "Luxury Studio" (noir / or / blanc), pensée mobile-first.

## 🎯 Objectif du projet

Permettre aux clients de :
- Découvrir les services de retouche photo proposés
- Uploader leur photo directement depuis le navigateur
- Choisir un type de retouche et un délai de livraison
- Voir le prix se recalculer automatiquement selon le délai choisi
- Valider leur commande et recevoir les instructions de paiement (Orange Money / MTN Mobile Money)

Et à l'administrateur (**nkamambararayan@gmail.com**) de :
- Consulter toutes les commandes reçues dans un tableau de bord
- Changer le statut de chaque commande (En attente / En cours / Terminée)
- Télécharger la photo envoyée par le client
- Uploader et télécharger la photo retouchée
- Modifier dynamiquement la grille tarifaire par délai

---

## ✅ Fonctionnalités actuellement implémentées

### Site public
- **Page d'accueil (`index.html`)** : hero premium avec image de studio, services populaires mis en avant, **nouvelle section "Effets tendance & réseaux sociaux"** (LEGO, statue dorée, avatar 3D, néon...), section "Avant / Après" avec slider interactif (glisser pour comparer), section "Pourquoi nous choisir", étapes du processus, témoignages, CTA.
- **Catalogue de services (`services.html`)** : les 8 services classiques demandés + **10 nouveaux effets tendance** inspirés des réalisations fournies (LEGO, statue dorée, avatar 3D cartoon, néon, fisheye 360°, photobooth, poster éditorial mode, maillot sportif, mini-planète 360°, poster reveal dramatique). Chaque service affiche nom, description, image, sélecteur de délai en temps réel et lien direct vers la commande pré-remplie. Filtres par catégorie (Tous / Populaires / Classiques / Tendance) + tableau de la grille tarifaire complète.
- **Page de commande (`order.html`)** :
  - Formulaire client (nom, téléphone, email)
  - Sélection du service
  - Sélection du délai via **boutons radio** avec **mise à jour du prix en temps réel**
  - Zone d'upload de photo (drag & drop + sélection fichier), avec aperçu
  - Récapitulatif dynamique (service, délai, prix total)
  - Validation de commande → enregistrement dans la base de données (table `orders`)
  - Modal de confirmation avec référence de commande et redirection vers le paiement
- **Page paiement (`payment.html`)** : instructions détaillées Orange Money et MTN Mobile Money, rappel du montant à régler, consignes de confirmation.
- **Panneau Administration (`admin-login.html` + `admin.html`)** :
  - Connexion protégée (email admin + mot de passe local)
  - Tableau de bord avec statistiques (total, en attente, en cours, terminées, revenu estimé)
  - Table complète des commandes avec recherche et filtre par statut
  - Vue détaillée d'une commande (infos client, photo originale, upload de la photo retouchée, changement de statut)
  - Téléchargement des photos clients et des photos retouchées
  - Gestion des tarifs par délai (grille modifiable, appliquée instantanément sur tout le site)
  - Suppression de commandes

### 🔥 Nouveaux effets tendance (basés sur vos réalisations)
Une catégorie dédiée a été ajoutée avec 10 services inspirés des exemples fournis par la designer :
| Service | Description |
|---|---|
| Effet figurine LEGO | Transformation en minifigure LEGO personnalisée |
| Effet statue dorée | Portrait sculpté façon statue dorée/bronze |
| Effet fisheye 360° | Rendu grand-angle immersif pour selfies/groupes |
| Avatar 3D cartoon | Style Pixar / dessin animé 3D |
| Effet néon Light Control | Ambiance néon colorée et maîtrise de la lumière |
| Bande photobooth | Bande photo façon photomaton vintage |
| Poster mode éditorial | Mise en page façon magazine street style |
| Poster maillot sportif | Maillot personnalisé avec nom/numéro |
| Effet mini-planète 360° | Rendu panoramique "little planet" |
| Poster reveal dramatique | Affiche façon "character reveal" de film, fond rouge |

Ces services sont accessibles depuis `services.html` (filtre "Effets tendance 🔥"), la page d'accueil (section dédiée), et le menu déroulant de commande (`order.html`, groupe "🔥 Effets tendance").

### Système de tarification dynamique (implémenté comme demandé)
| Délai | Prix par défaut |
|---|---|
| 7 jours | 1 500 FCFA |
| 5 jours | 2 000 FCFA |
| 3 jours | 2 500 FCFA |
| 48 heures | 3 000 FCFA |
| 24 heures | 3 500 FCFA |
| 12 heures | 4 000 FCFA |

Ces tarifs sont stockés dans la table `settings` et modifiables depuis l'admin (section "Délais & Tarifs"). Ils sont chargés dynamiquement sur `services.html` et `order.html`.

---

## 🗺️ Entrées / pages du site

| Page | Chemin | Paramètres |
|---|---|---|
| Accueil | `index.html` | — |
| Catalogue de services | `services.html` | `#service_id` (ancre optionnelle) |
| Commande | `order.html` | `?service=<id>&delay=<id>` (pré-remplissage optionnel) |
| Paiement | `payment.html` | `?order=<id>&amount=<prix>` (affiché après une commande) |
| Connexion admin | `admin-login.html` | — |
| Panneau admin | `admin.html` | — (protégé par session) |

**Identifiants admin** :
- Email : `nkamambararayan@gmail.com`
- Mot de passe : `PhotoRetouchPro2026` *(à changer directement dans `js/data.js`, variable `ADMIN_PASSWORD`, avant mise en production)*

⚠️ Cette protection est côté client uniquement (site 100% statique, sans backend). Elle empêche un accès occasionnel mais ne constitue pas une sécurité de niveau serveur.

---

## 🗄️ Données & stockage

Le site utilise la **RESTful Table API** fournie par la plateforme (pas de backend custom).

### Table `orders`
| Champ | Type | Description |
|---|---|---|
| client_name | text | Nom du client |
| phone | text | Téléphone |
| email | text | Email |
| service_id / service_name | text | Service commandé |
| delay_label / delay_hours | text / number | Délai choisi |
| price / currency | number / text | Prix calculé automatiquement |
| photo_data | rich_text | Photo client encodée en base64 (data URL) |
| photo_name | text | Nom original du fichier |
| retouched_photo_data | rich_text | Photo retouchée ajoutée par l'admin |
| status | text | En attente / En cours / Terminée |
| payment_method | text | Orange Money / MTN Mobile Money / Non renseigné |
| notes | rich_text | Instructions particulières du client |

### Table `settings`
| Champ | Type | Description |
|---|---|---|
| key | text | Ex : `delay_pricing` |
| value | rich_text | Valeur JSON (grille tarifaire) |

---

## 🎨 Design

- Palette **noir / or / blanc** (feel "studio photo de luxe")
- Typographies : **Playfair Display** (titres) + **Inter** (corps de texte)
- Composants : cartes services, sliders avant/après, animations au scroll (reveal), boutons dorés avec effets hover, panneau admin type dashboard SaaS
- 100% responsive : mobile-first, testé sur mobile / tablette / desktop
- Icônes : Font Awesome 6

---

## 🚧 Fonctionnalités non implémentées (limites du site statique)

Ce site étant **100% statique** (HTML/CSS/JS + Table API), les éléments suivants nécessiteraient un backend et ne sont donc **pas inclus** :
- Envoi automatique d'emails/SMS de notification à l'administrateur ou au client (aucune API d'envoi d'email autorisée sans clé/backend)
- Vérification automatique des paiements Orange Money / MTN Mobile Money (nécessite une intégration API bancaire tierce)
- Authentification admin sécurisée côté serveur (hashing, sessions serveur, etc.)
- Compression/optimisation serveur des images uploadées (le traitement reste basé sur le navigateur, taille max recommandée : 10 Mo)
- Retouche photo automatisée par IA (le service reste un travail manuel effectué par l'équipe, la commande sert à collecter la demande)

## 🔭 Recommandations pour la suite

1. **Notifications** : brancher un service tiers no-code (ex. Zapier, Make, EmailJS avec clé publique autorisée) pour notifier automatiquement `nkamambararayan@gmail.com` à chaque nouvelle commande.
2. **Sécurité admin** : si un jour un backend devient disponible, migrer vers une authentification serveur robuste (JWT, hashing bcrypt).
3. **Historique client** : ajouter une page "Suivi de commande" où le client peut entrer son email/téléphone pour voir le statut de sa commande.
4. **Multi-langue** : ajouter une bascule FR/EN si la clientèle s'internationalise.
5. **Galerie avant/après enrichie** : permettre à l'admin d'ajouter de nouveaux exemples avant/après depuis le panneau admin.

---

## 📁 Structure du projet

```
index.html              → Page d'accueil
services.html           → Catalogue des services
order.html              → Formulaire de commande
payment.html            → Instructions de paiement
admin-login.html        → Connexion admin
admin.html              → Panneau d'administration
css/
  └── style.css         → Feuille de style principale (thème luxury)
js/
  ├── data.js            → Données partagées (services, tarifs, config admin)
  ├── main.js            → Comportements communs (nav, sliders, animations)
  └── admin.js           → Logique complète du panneau admin
images/                 → Visuels (hero, services, avant/après, textures)
```

## 📩 Contact

Toutes les commandes et l'accès administrateur sont liés à :
**nkamambararayan@gmail.com**

---

## 🚀 Déploiement

Pour publier ce site en ligne, rendez-vous dans l'onglet **Publish** de la plateforme. Il gérera automatiquement le déploiement et vous fournira l'URL publique de votre site.
