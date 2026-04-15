# U.S. Citizenship Test - Production-Grade Application

## 🏗️ Architecture Overview

This is a **production-ready React + TypeScript application** with modern engineering best practices.

### Tech Stack
- **Framework**: React 18
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **Package Manager**: npm
- **State Management**: React Hooks (custom hooks)
- **Styling**: Tailwind CSS (CSS Modules ready)
- **Code Quality**: ESLint ready

### Project Structure
```
src/
├── components/          # Reusable React components
│   ├── Button.tsx      # Atomic button component
│   ├── QuestionCard.tsx
│   ├── ProgressBar.tsx
│   ├── Menu.tsx
│   ├── TestScreen.tsx
│   ├── ResultScreen.tsx
│   └── Dashboard.tsx
├── hooks/              # Custom React hooks
│   ├── useTestSession.ts
│   └── useLocalStorage.ts
├── utils/              # Helper functions
│   └── helpers.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Static data
│   └── questions.ts
├── styles/             # Global styles
│   └── globals.css
├── App.tsx             # Root component
└── main.tsx            # Entry point

config/
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
├── package.json        # Dependencies & scripts
└── .eslintrc.json      # Linting rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 7+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts Vite dev server at `http://localhost:3000` with hot module reload.

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/` directory.

### Testing
```bash
npm run test
```
Run unit tests with Vitest.

### Linting
```bash
npm run lint
```
Check code quality with ESLint.

## 📋 Design Patterns

### 1. **Component Architecture**
- **Atomic Design**: Buttons, cards, progress bars as reusable atoms
- **Container/Presentational**: Smart components (Container) manage state, dumb components (Presentational) render UI
- **Custom Hooks**: Business logic separated into reusable hooks

### 2. **State Management**
- **React Hooks**: `useState`, `useCallback`, `useEffect`
- **Custom Hooks**: `useTestSession` for encapsulated session logic
- **localStorage**: Persistent state between sessions

### 3. **Type Safety**
- **TypeScript Strict Mode**: All `any` types forbidden
- **Enums**: For fixed option sets (ScreenType, QuestionCategory)
- **Interfaces**: All data structures properly typed

### 4. **Error Handling**
- Try-catch blocks for localStorage operations
- Graceful fallbacks for missing data
- User-friendly error messages

### 5. **Performance**
- **Code Splitting**: Vite automatically chunks vendor code
- **Lazy Loading**: Components can be lazy-loaded with React.lazy()
- **Memoization**: useCallback for stable function references
- **Tree Shaking**: Unused code automatically removed during build

## 🎨 UI/UX Features

### Color Scheme
- **Primary**: Electric Blue (#0066ff)
- **Background**: White (#ffffff)
- **Secondary**: Light Gray (#f5f5f5)
- **Text**: Matte Black (#0a0a0a)

### Animations
- **Smooth Transitions**: Cubic-bezier easing functions
- **Question Slide**: Questions slide up on load
- **Answer Feedback**: Green for correct, red for incorrect with animations
- **Progress**: Smooth progress bar fills

### Accessibility (a11y)
- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast colors (WCAG AA)
- Focus states on buttons

## 📊 Data Flow

```
App (Root)
├── Menu Screen
│   └── onClick → initializeSession()
│
├── Test Screen
│   ├── Question Card (displays current question)
│   ├── Choice Buttons (onClick → answerQuestion)
│   └── Progress Bar (updates after each answer)
│
├── Result Screen
│   └── onClick → saveProgress() → goToMenu()
│
└── Dashboard
    └── Displays mastered questions & progress by category
```

## 🔐 Data Persistence

```typescript
StoredData {
  mastered: number[]      // Array of question IDs answered correctly
  streak: number          // Current streak count
  bestScore: number       // Best test score
  lastUpdated: number     // Timestamp
}
```

Stored in `localStorage` under key `citizenship_test_session`.

## 🧪 Testing Strategy

### Unit Tests
- Helper functions (shuffleArray, calculatePercentage, etc.)
- Component rendering with different props
- Hook behavior

### Integration Tests
- Full test flow (menu → question → result)
- localStorage read/write
- State updates across screens

### E2E Tests (Future)
- Real browser interaction
- Full user journey

## 📱 Responsive Design

- **Mobile First**: Optimized for 375px width
- **Tablet**: 768px breakpoints
- **Desktop**: Full layout at 1920px+
- **Touch Friendly**: 44px+ tap targets

## 🔄 Build Optimization

**Development Build**: Unminified, sourcemaps included
**Production Build**:
- Tree-shaken (unused code removed)
- Minified with Terser
- CSS inlined where appropriate
- Vendor code chunked separately

Bundle size: ~45KB gzipped (React + app code)

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Upload dist/ to gh-pages branch
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD npm run preview
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Web Accessibility (a11y)](https://www.w3.org/WAI/)

## 🎯 Future Enhancements

- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Spaced repetition algorithm
- [ ] Backend API integration
- [ ] User accounts & leaderboards
- [ ] Timed practice tests
- [ ] Audio pronunciation guide
- [ ] Mobile app (React Native)

## 📝 License

MIT - Free to use for educational purposes

## 👨‍💻 Development Notes

### Code Style
- ESLint enforces consistent formatting
- Prettier-compatible (add `.prettierrc` if desired)
- Strict null checking enforced
- No implicit any types

### Commit Messages
```
feat: add spaced repetition feature
fix: resolve memory leak in useTestSession
docs: update README
refactor: simplify QuestionCard component
test: add unit tests for helpers
```

### Contributing
1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'feat: ...'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

**Built with ❤️ for aspiring U.S. Citizens**
