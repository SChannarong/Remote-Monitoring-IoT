# Component Showcase Dashboard

## Setup Instructions

Since the automatic setup was skipped, you need to install the dependencies manually.

1.  Open your terminal in this directory:
    ```bash
    cd component-showcase
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

-   `app/`: Next.js App Router files (`page.tsx`, `layout.tsx`, `globals.css`).
-   `components/`: UI Components (`Sidebar`, `MainDisplay`, `DetailPanel`).
-   `data.ts`: Component data mapped to `public/assets`.
-   `types.ts`: TypeScript interfaces.
-   `lib/utils.ts`: Utility functions (Tailwind class merger).

## Features

-   **Industrial Zen Animation**: Smooth spring animations with no sparks.
-   **Glassmorphism UI**: Detail panel and sidebar overlays.
-   **Mobile Reponsive**: Sidebar becomes a bottom sheet/overlay on mobile.
-   **Real Assets**: Uses the provided high-quality image sequences (frame 20).
