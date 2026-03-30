# NCSE Landing Page

## Overview
A landing page for NCSE (National College of Science and Engineering) built with React + Vite. Features a multi-page layout with Home, Events, About, and Contact pages.

## Tech Stack
- **Framework:** React 19 with React Router DOM
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 with PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Package Manager:** npm

## Project Structure
```
src/
  components/
    layout/     # Navbar, Footer
    sections/   # Hero, CarouselSection
    ui/         # Button, Container, GradientText
  pages/        # Home, About, Events, Contact
  App.jsx       # Main app with routing
  main.jsx      # Entry point
  index.css     # Global styles + Tailwind
public/
  images/       # Static images
```

## Development
- Run: `npm run dev` (served on port 5000)
- Build: `npm run build`
- Lint: `npm run lint`

## Deployment
- Type: Static site
- Build command: `npm run build`
- Public directory: `dist`
