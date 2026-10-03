import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import DarkModeProvider from './context/DarkMode.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UserProvider from './features/auth/context/UserContext.tsx'
const client = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <DarkModeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  </BrowserRouter>,
)
