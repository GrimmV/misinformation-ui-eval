# AI-Assisted Misinformation Assessment — User Study Frontend

Frontend application for a user study on AI-assisted misinformation assessment. Participants assess social media posts with the support of AI tools (AI Dashboard and AI Assistant) to evaluate trustworthiness and identify misinformation.

## Overview

This SvelteKit application provides the participant interface for both **quantitative** and **qualitative** study workflows. The workflow differs depending on which branch you run:

| Branch | Study Type | Description |
|--------|------------|-------------|
| `main` | Quantitative | Standard quantitative study workflow |
| `qualitative-study` | Qualitative | Qualitative study workflow |

To run a specific study type, check out the appropriate branch before starting the app:

```bash
git checkout main              # for quantitative study
# or
git checkout qualitative-study # for qualitative study
```

## Prerequisites

**⚠️ This frontend requires the corresponding backend to be deployed and accessible.** The application fetches posts, evaluation data, and AI chat responses from Flask endpoints. Without the backend running, most features will not work.

- **Backend repository**: [backend-repository-url-placeholder](backend-repository-url-placeholder)
- **Node.js** (v18 or later recommended)
- **npm**

## Installation

```bash
git clone <repository-url>
cd fake-news-ui
npm install
```

## Configuration

### Backend API

Create a `.env` file in the project root to point the frontend to your backend:

```env
PUBLIC_BASE_URL=http://localhost
PUBLIC_PORT=:5000
PUBLIC_API_ENDPOINT_POSTS=/api/v1/posts
PUBLIC_API_ENDPOINT_EVALS=/api/v1/evaluation_data
PUBLIC_API_ENDPOINT_CHAT=/api/v1/chat
```

Adjust `PUBLIC_BASE_URL` and `PUBLIC_PORT` to match your deployed backend (e.g. for production, use your backend URL and port).

### Participant Usernames

Participants log in using predefined usernames. The list of valid usernames is defined in:

```
src/lib/services/usernames.ts
```

Only usernames in this array can authenticate. Also, they need to be in sync with the usernames from the backend. Usernames are **case-sensitive**.

## Running the Application

```bash
npm run dev
```

The app will typically be available at `http://localhost:5173`.

## Study Flow

1. **Login** (`/login`) — Participants enter their username from the study coordinator.
2. **Preparation** (`/preparation`) — Instructions, quiz, and post selection.
3. **Main experiment** (`/main`) — Assessment of 6 posts:
   - First 3 posts: assessed with the **AI Dashboard** (data visualizations, explanations).
   - Last 3 posts: assessed with the **AI Assistant** (additional trust assessment and detailed information).
4. Survey questions and completion.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Run Svelte type checking |
| `npm run lint` | Run ESLint and Prettier |
| `npm run format` | Format code with Prettier |

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) — Web framework
- [Svelte 5](https://svelte.dev/) — UI framework
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Vite](https://vitejs.dev/) — Build tool
- [Lucide Svelte](https://lucide.dev/) — Icons

## Project Structure

```
src/
├── lib/                    # Shared components and logic
│   ├── Main/               # Main experiment (AI Dashboard, AI Assistant)
│   ├── Preparation/        # Preparation phase components
│   ├── Login/              # Login component
│   ├── assets/             # Static assets, quiz data, survey questions
│   └── services/           # API, Firebase, usernames
└── routes/
    ├── login/              # Login page
    ├── preparation/        # Preparation phase
    └── main/               # Main experiment
```

## License

Licensed under the [MIT License](LICENSE.txt).
