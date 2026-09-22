---
description: "Use when changing TaskFlow UI components, layouts, forms, menus, dialogs, responsive styling, accessibility, or Base UI composition."
applyTo: "src/components/**/*.tsx,src/app/**/*.tsx,src/app/globals.css"
---
# TaskFlow UI Rules

- Follow the existing shadcn base-nova and Tailwind v4 conventions. Reuse `src/components/ui` primitives before creating new ones.
- This project uses `@base-ui/react`: compose custom elements with `render`, never `asChild`. A trigger rendered by Base UI must not wrap another native button.
- Never nest interactive elements. For a link styled as a button, use `Button render={<Link href="..." />}>...</Button>`.
- Every new interactive control needs an accessible name, keyboard/focus behavior, disabled/loading behavior, and an error or empty state where applicable.
- Prefer lucide-react icons already used by the project. Keep icon-only buttons at stable dimensions and include screen-reader text or an accessible label.
- Mobile-first is the default for every new or modified route and component: establish the narrow layout first, then enhance at `sm`, `md`, and `lg` breakpoints only when needed.
- Preserve responsive behavior across phone, tablet, and desktop widths. Check long labels, wrapped content, horizontal overflow, touch target sizing, and layout shifts when validation or loading states appear.
- Prefer fluid widths, `min-w-0`, wrapping, responsive padding, and stable grid/flex constraints over fixed desktop dimensions. Any intentional horizontal scroll must be explicit and accessible.
- Keep component ownership clear: shared primitives in `components/ui`, domain behavior in feature folders, route composition in `app`.
- Do not add decorative cards, broad gradients, or a new visual system for a functional task. Match the existing product language unless the request explicitly calls for redesign.
