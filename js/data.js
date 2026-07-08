/* ============================================================
   PhotoRetouch Pro — Données partagées (services, tarifs, config)
   ============================================================ */

// Email administrateur (accès panneau admin + notifications)
const ADMIN_EMAIL = "nkamambararayan@gmail.com";

// Mot de passe local du panneau admin (protection basique côté client)
// ⚠️ Ceci n'est PAS une authentification serveur sécurisée (site 100% statique).
const ADMIN_PASSWORD = "PhotoRetouchPro2026";

// Devise utilisée
const CURRENCY = "FCFA";

// Grille tarifaire par défaut basée sur le délai de livraison
const DEFAULT_DELAYS = [
  { id: "7j",  label: "7 jours",   hours: 168, price: 1500 },
  { id: "5j",  label: "5 jours",   hours: 120, price: 2000 },
  { id: "3j",  label: "3 jours",   hours: 72,  price: 2500 },
  { id: "48h", label: "48 heures", hours: 48,  price: 3000 },
  { id: "24h", label: "24 heures", hours: 24,  price: 3500 },
  { id: "12h", label: "12 heures", hours: 12,  price: 4000 }
];

// Catalogue des services de retouche
const SERVICES = [
  {
    id: "hd",
    name: "Amélioration HD / Ultra HD",
    tagline: "Netteté et définition maximales",
    description: "Boostez la résolution et la netteté de vos photos pour un rendu HD / Ultra HD impeccable, idéal pour l'impression grand format.",
    image: "images/service-hd.jpg",
    icon: "fa-solid fa-wand-magic-sparkles",
    popular: true,
    category: "classique"
  },
  {
    id: "beauty",
    name: "Retouche beauté visage",
    tagline: "Peau parfaite, regard sublimé",
    description: "Lissage de peau naturel, correction des imperfections, éclat du regard : une retouche beauté digne des magazines.",
    image: "images/service-beauty.jpg",
    icon: "fa-solid fa-face-smile",
    popular: true,
    category: "classique"
  },
  {
    id: "studio",
    name: "Effet studio professionnel",
    tagline: "Lumière et fond dignes d'un studio",
    description: "Transformez n'importe quelle photo en portrait façon studio professionnel avec éclairage et arrière-plan travaillés.",
    image: "images/service-studio.jpg",
    icon: "fa-solid fa-camera-retro",
    popular: true,
    category: "classique"
  },
  {
    id: "cinematic",
    name: "Effet cinématique",
    tagline: "Ambiance et colorimétrie de film",
    description: "Étalonnage colorimétrique cinématographique pour donner à vos photos une atmosphère unique, digne du grand écran.",
    image: "images/service-cinematic.jpg",
    icon: "fa-solid fa-film",
    popular: false,
    category: "classique"
  },
  {
    id: "bgremove",
    name: "Suppression d'arrière-plan",
    tagline: "Détourage précis et propre",
    description: "Suppression ou remplacement d'arrière-plan avec un détourage précis, parfait pour vos produits ou portraits professionnels.",
    image: "images/service-bgremove.jpg",
    icon: "fa-solid fa-layer-group",
    popular: false,
    category: "classique"
  },
  {
    id: "poster",
    name: "Création d'affiches publicitaires",
    tagline: "Visuels percutants pour votre marque",
    description: "Conception d'affiches publicitaires modernes et impactantes à partir de vos visuels, prêtes pour l'impression ou le digital.",
    image: "images/service-poster.jpg",
    icon: "fa-solid fa-rectangle-ad",
    popular: false,
    category: "classique"
  },
  {
    id: "youtube",
    name: "Miniatures YouTube",
    tagline: "Boostez votre taux de clic",
    description: "Miniatures YouTube colorées, lisibles et accrocheuses, pensées pour maximiser vos clics et vues.",
    image: "images/service-youtube.jpg",
    icon: "fa-brands fa-youtube",
    popular: false,
    category: "classique"
  },
  {
    id: "restoration",
    name: "Retouche photo ancienne",
    tagline: "Redonnez vie à vos souvenirs",
    description: "Restauration de photos anciennes, abîmées ou décolorées : réparation des rayures, colorisation et redonner de la netteté.",
    image: "images/service-restoration.jpg",
    icon: "fa-solid fa-clock-rotate-left",
    popular: false,
    category: "classique"
  },

  /* ---------- Effets tendance & réseaux sociaux (nouveaux services) ---------- */
  {
    id: "lego",
    name: "Effet figurine LEGO",
    tagline: "Devenez votre propre minifigure",
    description: "Transformez votre photo en figurine LEGO personnalisée, dans un décor miniature amusant et hyper tendance sur les réseaux sociaux.",
    image: "images/trend-lego.jpg",
    icon: "fa-solid fa-cubes",
    popular: true,
    category: "tendance"
  },
  {
    id: "statue",
    name: "Effet statue dorée",
    tagline: "Sculptez votre image en icône",
    description: "Transformez votre portrait en majestueuse statue dorée ou bronze façon œuvre d'art classique, pour un rendu prestigieux et unique.",
    image: "images/trend-statue.jpg",
    icon: "fa-solid fa-award",
    popular: true,
    category: "tendance"
  },
  {
    id: "fisheye",
    name: "Effet fisheye 360°",
    tagline: "Perspective immersive et fun",
    description: "Donnez à vos photos de groupe ou selfies un rendu fisheye grand-angle immersif, très prisé pour les soirées et moments entre amis.",
    image: "images/trend-fisheye.jpg",
    icon: "fa-solid fa-circle-dot",
    popular: false,
    category: "tendance"
  },
  {
    id: "cartoon3d",
    name: "Avatar 3D cartoon",
    tagline: "Devenez un personnage animé",
    description: "Transformez votre photo en avatar 3D façon dessin animé/Pixar, idéal pour vos réseaux sociaux, logos ou cadeaux personnalisés.",
    image: "images/trend-3dcartoon.jpg",
    icon: "fa-solid fa-icons",
    popular: true,
    category: "tendance"
  },
  {
    id: "neon",
    name: "Effet néon Light Control",
    tagline: "Ambiance lumineuse spectaculaire",
    description: "Ajoutez un rendu néon coloré et une maîtrise avancée de la lumière pour un effet visuel saisissant, parfait pour vos portraits de nuit.",
    image: "images/trend-neon.jpg",
    icon: "fa-solid fa-bolt-lightning",
    popular: false,
    category: "tendance"
  },
  {
    id: "photobooth",
    name: "Bande photobooth",
    tagline: "Souvenirs façon photomaton",
    description: "Créez une bande photo façon photobooth vintage à partir de plusieurs de vos clichés, parfaite pour les événements et souvenirs.",
    image: "images/trend-photobooth.jpg",
    icon: "fa-solid fa-images",
    popular: false,
    category: "tendance"
  },
  {
    id: "editorial",
    name: "Poster mode éditorial",
    tagline: "Style magazine street fashion",
    description: "Un poster inspiré des magazines de mode avec mise en page éditoriale, texte stylisé et rendu street style haut de gamme.",
    image: "images/trend-editorial.jpg",
    icon: "fa-solid fa-newspaper",
    popular: false,
    category: "tendance"
  },
  {
    id: "jersey",
    name: "Poster maillot sportif",
    tagline: "Personnalisez votre maillot",
    description: "Création d'un poster façon maillot de sport personnalisé avec votre nom, numéro et style d'équipe, pour les passionnés de sport.",
    image: "images/trend-jersey.jpg",
    icon: "fa-solid fa-shirt",
    popular: false,
    category: "tendance"
  },
  {
    id: "planet",
    name: "Effet mini-planète 360°",
    tagline: "Un monde miniature à 360°",
    description: "Transformez votre photo panoramique en effet mini-planète spectaculaire, un rendu artistique très populaire sur Instagram.",
    image: "images/trend-planet.jpg",
    icon: "fa-solid fa-earth-africa",
    popular: false,
    category: "tendance"
  },
  {
    id: "redposter",
    name: "Poster reveal dramatique",
    tagline: "Effet cinéma façon affiche de film",
    description: "Un poster percutant façon 'character reveal' de film, fond rouge dramatique et mise en scène spectaculaire de votre portrait.",
    image: "images/trend-redposter.jpg",
    icon: "fa-solid fa-masks-theater",
    popular: true,
    category: "tendance"
  }
];

function getServiceById(id) {
  return SERVICES.find(s => s.id === id);
}

function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR").format(price) + " " + CURRENCY;
}

/* ---------- Gestion de la tarification dynamique via Table API ---------- */

async function fetchDelayPricing() {
  try {
    const res = await fetch("tables/settings?limit=100");
    const json = await res.json();
    const row = (json.data || []).find(r => r.key === "delay_pricing");
    if (row && row.value) {
      const parsed = JSON.parse(row.value);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {
    console.warn("Impossible de charger la tarification personnalisée, utilisation des valeurs par défaut.", e);
  }
  return DEFAULT_DELAYS;
}

async function saveDelayPricing(delays) {
  try {
    const res = await fetch("tables/settings?limit=100");
    const json = await res.json();
    const row = (json.data || []).find(r => r.key === "delay_pricing");
    const payload = { key: "delay_pricing", value: JSON.stringify(delays) };
    if (row) {
      await fetch(`tables/settings/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("tables/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    return true;
  } catch (e) {
    console.error("Erreur lors de la sauvegarde de la tarification", e);
    return false;
  }
}
