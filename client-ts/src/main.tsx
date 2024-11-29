import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/store.ts'

import { Toaster } from 'sonner'
import { AnimatePresence } from 'framer-motion'

import ErrorBoundary from './components/ErrorBoundary.tsx'
import ErrorBoundaryLoader from './components/fallback-ui/ErrorBoundaryLoader.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" richColors />
        <ErrorBoundary fallback={<ErrorBoundaryLoader />}>
          <AnimatePresence>
            <App />
          </AnimatePresence>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </StrictMode>
)
