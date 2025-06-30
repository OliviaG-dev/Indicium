# Système de Design Indicium

## Vue d'ensemble

Ce document décrit le système de design harmonisé d'Indicium, un tableau de bord politique interactif. Le design utilise une palette de couleurs cohérente basée sur les tons indigo/purple/pink, une typographie moderne et des composants réutilisables.

## Palette de Couleurs

### Mode Clair

- **Primary**: `oklch(0.208 0.042 265.755)` - Bleu-violet principal
- **Secondary**: `oklch(0.968 0.007 247.896)` - Gris clair secondaire
- **Background**: `oklch(1 0 0)` - Blanc pur
- **Foreground**: `oklch(0.129 0.042 264.695)` - Noir doux
- **Muted**: `oklch(0.968 0.007 247.896)` - Gris très clair
- **Border**: `oklch(0.929 0.013 255.508)` - Gris de bordure
- **Gradient Principal**: `from-indigo-600 via-purple-600 to-pink-600`

### Mode Sombre

- **Primary**: `oklch(0.929 0.013 255.508)` - Bleu-violet plus clair
- **Secondary**: `oklch(0.279 0.041 260.031)` - Gris sombre
- **Background**: `oklch(0.129 0.042 264.695)` - Noir profond
- **Foreground**: `oklch(0.984 0.003 247.858)` - Blanc cassé
- **Muted**: `oklch(0.279 0.041 260.031)` - Gris sombre
- **Border**: `oklch(1 0 0 / 10%)` - Gris de bordure sombre

## Typographie

- **Police principale**: Inter (Google Fonts)
- **Poids disponibles**: 300, 400, 500, 600, 700
- **Hiérarchie**:
  - Titres: `text-6xl` à `text-3xl` avec `font-bold`
  - Sous-titres: `text-lg` avec `font-semibold`
  - Corps de texte: `text-base` avec `font-normal`
  - Texte secondaire: `text-sm` avec `text-muted-foreground`

## Composants

### Card

Composant de carte réutilisable avec support pour titre et description.

```tsx
<Card title="Titre" description="Description optionnelle">
  Contenu de la carte
</Card>
```

### Button

Bouton avec plusieurs variantes et tailles.

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Texte du bouton
</Button>
```

**Variantes disponibles**:

- `primary`: Bouton principal avec gradient indigo-purple
- `secondary`: Bouton secondaire (gris)
- `outline`: Bouton avec bordure
- `ghost`: Bouton transparent

**Tailles disponibles**:

- `sm`: Petite taille
- `md`: Taille moyenne (par défaut)
- `lg`: Grande taille

### ThemeToggle

Bouton de basculement entre les modes clair et sombre.

## Animations

- **fade-in**: Apparition en fondu (0.5s)
- **slide-up**: Glissement vers le haut (0.3s)
- **scale-in**: Agrandissement (0.2s)

## Utilisation

### Classes Tailwind personnalisées

Le projet utilise des variables CSS personnalisées mappées vers Tailwind :

```css
/* Exemple d'utilisation */
.bg-primary {
  background-color: var(--color-primary);
}
.text-foreground {
  color: var(--color-foreground);
}
.border-border {
  border-color: var(--color-border);
}
```

### Gradients

Le design utilise des gradients cohérents :

- **Principal**: `bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600`
- **Arrière-plan**: `bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50`

### Responsive Design

Le design est entièrement responsive avec des breakpoints Tailwind :

- `sm`: 640px et plus
- `md`: 768px et plus
- `lg`: 1024px et plus
- `xl`: 1280px et plus

## Accessibilité

- Contraste suffisant entre le texte et l'arrière-plan
- Focus visible sur tous les éléments interactifs
- Support des lecteurs d'écran avec `aria-label`
- Navigation au clavier

## Thème Sombre

Le thème sombre est automatiquement détecté selon :

1. La préférence utilisateur stockée dans localStorage
2. La préférence système du navigateur
3. Le mode clair par défaut

Le basculement se fait via le composant `ThemeToggle` dans le header.
