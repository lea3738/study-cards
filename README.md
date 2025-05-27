# Study Cards App

A full-stack flashcard application for developers to create, study, and manage code snippets they want to learn with AI-powered note generation and a Chrome extension for seamless code capture.

## Features

- **Card Deck UI** to flip through cards and study them
- **Create and manage study cards** with code snippets and explanatory notes
- **AI-powered note generation** using Claude API for automatic code explanations
- **Tag system** for organizing cards by topics or technologies
- **Card status tracking** (Ready, OK, Dismissed) for learning progress
- **Flip card UI** to toggle between code and notes
- **Chrome extension** to capture code from any webpage
- **Responsive design** (in progress) with Tailwind CSS
- **Reset functionality** to restart your study sessions

## Tech Stack

- **Backend**: NestJS + TypeScript
- **Frontend**: Next.js 13+ (App Router) + React + TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Anthropic Claude API
- **Browser Extension**: Chrome Extension with React
- **Shared Types**: TypeScript types shared between projects
- **Development**: Prettier + ESLint + Hot reload

## Project Structure

```
study-cards/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── cards/          # Cards module
│   │   ├── tags/           # Tags module
│   │   ├── ai/             # AI integration module
│   │   └── main.ts
│   ├── .env                # Backend environment variables
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   │   ├── cards/     # Cards listing and management
│   │   │   ├── cards/[id] # Individual card view
│   │   │   └── cards/new  # New card creation
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # API calls
│   │   └── types/         # TypeScript types
│   ├── .env.local         # Frontend environment variables
│   └── package.json
├── chrome-extension/       # Chrome extension
│   ├── src/
│   │   ├── popup/         # Extension popup interface
│   │   ├── content/       # Content scripts
│   │   └── config.js      # Extension configuration
│   ├── public/
│   │   ├── manifest.json  # Extension manifest
│   │   └── icons/         # Extension icons
│   ├── dist/              # Built extension files
│   └── package.json
├── shared-types/           # Shared TypeScript definitions
└── package.json           # Root package for running both servers
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Chrome browser (for extension testing)
- Anthropic API key (for AI features)

### 1. Clone the repository

```bash
git clone https://github.com/lea3738/study-cards.git
cd study-cards
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install chrome extension dependencies
cd ../chrome-extension
npm install
```

### 3. Environment Configuration

#### Backend Environment

Create `backend/.env`:

```env
PORT=3001
ANTHROPIC_API_KEY=your_claude_api_key_here
```

#### Frontend Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Chrome Extension Environment

Create `chrome-extension/.env`:

```env
REACT_APP_FRONTEND_URL=http://localhost:3000
```

### 4. Getting Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account and verify your email
3. Navigate to "API Keys" and create a new key
4. Add credits to your account (minimum $5-10)
5. Copy the key to your `backend/.env` file

## Running the Application

### Development Mode

From the root directory:

```bash
npm run start:dev
```

This will start:
- Backend API at http://localhost:3001
- Frontend at http://localhost:3000

### Individual Services

```bash
# Backend only
cd backend && npm run start:dev

# Frontend only  
cd frontend && npm run dev
```

## Chrome Extension Setup

### Building the Extension

```bash
cd chrome-extension
npm run build
```

### Loading in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked extension"
4. Select the `chrome-extension/dist` folder
5. The extension icon should appear in your toolbar

### Using the Extension

1. Navigate to any webpage with code
2. Select/highlight code you want to study
3. Click the Study Cards extension icon
4. Click "Select code" to capture the highlighted text
5. Click "Create card" to open your app with the code pre-filled
6. Add notes (or use AI generation) and save

## Usage Guide

### Creating Cards

- **Manual Creation**: Go to `/cards/new` and fill in code and notes
- **AI-Assisted**: Add code and click "Generate with AI" for automatic notes
- **Chrome Extension**: Capture code from any webpage directly

### Managing Cards

- **View All Cards**: Visit `/cards` or homepage to see your card collection
- **Study Mode**: Visit `/cards` and click on study button or go to `/card-deck` to flip through cards
- **Status Tracking**: Mark a card as "I know it" when you understand it (removes from deck) or click "Study Again" (places at end of deck)
- **View Notes**: Click "see note" to study the note associated to the card
- **Reset Progress**: Use "Reset All Cards Status" on `/cards` to restart studying
- **Edit/Delete**: Use the dropdown menu (⋯) on each card

### Organizing with Tags

- Add tags when creating or editing cards
- Create new tags on-the-fly during card creation

## API Endpoints

### Cards
- `GET /cards` - List all cards
- `GET /cards/:id` - Get specific card
- `POST /cards` - Create new card
- `PUT /cards/:id` - Update card
- `DELETE /cards/:id` - Delete card
- `POST /cards/reset-status` - Reset all card statuses

### Tags
- `GET /tags` - List all tags
- `POST /tags` - Create new tag

### AI
- `POST /ai/generate-note` - Generate note from code using AI

## Development Features

- **Hot Reload**: Changes reflect instantly during development
- **TypeScript**: Full type safety across the stack
- **Shared Types**: Consistent types between frontend and backend
- **ESLint + Prettier**: Code formatting and linting
- **Error Handling**: Comprehensive error handling in API calls

## Roadmap & Future Improvements

- [ ] **Tests**: Add unit testing
- [ ] **Responsive Design**: Make cards fully responsive across all devices, and the whole thing a bit prettier
- [ ] **Shared Types Migration**: Move entities to shared-types for consistent API typing
- [ ] **Tag Management**: Handle creation of a tag that already exists, update & delete tags, add color
- [ ] **Swipe Gestures**: Add swipe effect to dismiss/keep card in the card deck, instead of buttons
- [ ] **API Refactoring**: Refactor all API calls on the frontend side as hooks
- [ ] **Enhanced Filtering**: Filter cards by tag on cards pages, place dismissed cards in separate section
- [ ] **Card Deck Filtering**: Filter cards by tag in card deck view
- [ ] **AI Enhancements**: Add tags to AI prompt, add AI generation to update card functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

