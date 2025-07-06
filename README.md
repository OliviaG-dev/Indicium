# 📊 Indicium - Tableau de Bord Électoral

Application React moderne pour l'analyse et la visualisation des données électorales françaises.

## 🚀 Fonctionnalités

- **Dashboard Interactif** : Visualisation des données électorales en temps réel
- **KPIs Clés** : Taux de participation, abstention, blancs/nuls
- **Graphiques** : Cartes, graphiques en barres, graphiques linéaires
- **Filtres** : Par année et tour d'élection
- **Export PDF** : Génération de rapports automatiques
- **Design Responsive** : Interface adaptée mobile/desktop
- **Mode Sombre/Clair** : Thème personnalisable

## 🛠 Technologies

- **React 19** + **TypeScript**
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styling moderne
- **Zustand** - Gestion d'état
- **Recharts** - Graphiques interactifs
- **React Simple Maps** - Cartographie
- **jsPDF** - Génération de PDF

## 📁 Structure

```
src/
├── components/
│   ├── UI/           # Composants d'interface
│   └── Graphs/       # Graphiques et visualisations
├── pages/            # Pages de l'application
├── services/         # Services (données, export PDF)
├── store/           # Gestion d'état Zustand
└── assets/          # Ressources statiques
```

## 🚀 Installation

```bash
# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev

# Build de production
pnpm build
```

## 📊 Utilisation

1. **Accéder au Dashboard** : `/dashboard`
2. **Filtrer les données** : Sélectionner année et tour
3. **Exporter un rapport** : Cliquer sur "Exporter PDF"
4. **Changer de thème** : Bouton dans le header

## 🎨 Design System

- **Couleurs** : Palette cohérente avec support mode sombre
- **Typographie** : Hiérarchie claire et lisible
- **Animations** : Transitions fluides et micro-interactions
- **Responsive** : Adaptation mobile-first

## 📄 Export PDF

Le système d'export génère des rapports automatiques incluant :

- En-tête avec logo et date
- KPIs formatés et colorés
- Filtres appliqués
- Pied de page professionnel

---

**Développé avec ❤️ pour l'analyse électorale française**
