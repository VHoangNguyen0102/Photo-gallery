## 📸 Picsum Photo Gallery

React + TypeScript + Vite + Tailwind CSS app that lists photos from the public Lorem Picsum API with responsive grid, infinite scroll, and a dedicated detail page per photo.

### Features

- Responsive grid (4/3/2/1 columns)
- Infinite scroll using IntersectionObserver
- Photo detail page with placeholders and navigation
- Clean UI with Tailwind CSS

### Tech

- React 19, React Router v6+, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Axios for API calls

### Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

### Project structure

```
src/
  components/
    LoadingSpinner.tsx
    PhotoCard.tsx
    PhotoGrid.tsx
  pages/
    PhotoDetailPage.tsx
    PhotoListPage.tsx
  services/
    photoApi.ts
  types/
    photo.ts
  App.tsx
  main.tsx
  index.css
```

### Notes

- API: https://picsum.photos/v2/list?page=<page>&limit=<limit>
- Thumbnails/full images are constructed with `https://picsum.photos/id/{id}/w/h`.
