import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Toaster } from 'sonner'
import { AnimatePresence } from 'framer-motion'

import { persistor, store } from './app/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import ErrorBoundary from './components/ErrorBoundary.jsx'
import ErrorBoundaryLoader from './components/fallback-ui/ErrorBoundaryLoader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
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
)
