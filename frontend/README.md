# SecureLedger - Frontend

A modern, responsive React-based frontend for the SecureLedger personal finance management application.

## Features

- **Authentication**: Secure login and signup
- **Dashboard**: Overview of income, expenses, and budget status
- **Transaction Management**: Track income and expenses with categories
- **Budget Tracking**: Set and monitor monthly budgets
- **Bill Reminders**: Manage upcoming bill payments
- **Settings**: User preferences and theme customization
- **Dark Mode**: Built-in dark theme support
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. **Install dependencies**

```bash
npm install
```

2. **Create environment file**

Copy `.env.example` to `.env` and update if needed:

```bash
cp .env.example .env
```

3. **Make sure the backend is running**

The backend should be running on `http://localhost:5000` (default).

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:3000` with hot module replacement.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── pages/            # Page components (Dashboard, Transactions, etc.)
│   ├── services/         # API service layer
│   ├── utils/            # Helper functions and constants
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles with Tailwind CSS
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Technology Stack

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **React Router v6**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Data visualization library
- **Lucide React**: Icon library
- **Vite**: Build tool and dev server

## API Integration

The frontend communicates with the SecureLedger backend API. Update the API base URL in your `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

## Authentication

- JWT tokens are stored in localStorage
- Protected routes redirect to login if not authenticated
- Auto-logout on token expiration (401 response)

## Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User login |
| Signup | `/signup` | User registration |
| Dashboard | `/dashboard` | Overview and financial summary |
| Transactions | `/transactions` | View and manage transactions |
| Budget | `/budget` | Set and track budgets |
| Reminders | `/reminders` | Manage bill reminders |
| Settings | `/settings` | User preferences |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React Router
- Image optimization
- CSS minification with Tailwind
- Production build optimization with Vite

## Git Workflow

1. Create a new branch for features
2. Make changes and test thoroughly
3. Commit with descriptive messages
4. Push to remote and create a pull request

## Contributing

1. Follow the project structure
2. Write clear, maintainable code
3. Test all features before committing
4. Update documentation as needed

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the dist folder
```

### Self-hosted

```bash
npm run build
# Copy dist folder to your server
# Configure server to SPA routing
```

## Troubleshooting

### API Connection Issues

- Ensure backend is running on `localhost:5000`
- Check CORS configuration in backend
- Verify `VITE_API_URL` in `.env`

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist`

### Port Already in Use

Change the port in `vite.config.ts`:

```typescript
server: {
  port: 3001
}
```

## Support

For issues and questions, please refer to the main project documentation or contact the development team.

## License

Same as the main SecureLedger project.
