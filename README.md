# SWL Solutions Agency Portfolio

This is a modern and professional portfolio website for SWL Solutions, a software development agency, showcasing their services and talented team.

## Project Structure

This project follows a professional, feature-driven architecture to promote scalability, maintainability, and a clear separation of concerns.

-   **`public/`**: Contains static assets like favicons and images.
-   **`src/`**: The main application source code directory.
    -   **`components/`**: Shared, reusable UI components that are not tied to any specific feature (e.g., `Header`, `Footer`, `icons`).
    -   **`features/`**: Contains different business-logic features of the application. Each feature is a self-contained module. For this project, we have a `landing` feature which includes all the sections of the homepage.
    -   **`layouts/`**: Components responsible for the overall structure of a page (e.g., `RootLayout` which includes the header, main content, and footer).
    -   **`lib/`**: Contains helper functions, constants, and other utility code (`constants.ts`).
    -   **`types/`**: Shared TypeScript type definitions.
    -   **`App.tsx`**: The root component of the application, responsible for setting up providers and rendering the main layout.
    -   **`main.tsx`**: The main entry point of the application that renders the React app to the DOM.
-   **`index.html`**: The main HTML file for the application.
