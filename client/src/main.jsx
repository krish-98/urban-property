import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'

import { persistor, store } from './app/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import ErrorBoundary from './components/ErrorBoundary.jsx'
import ErrorBoundaryLoader from './components/fallback-ui/ErrorBoundaryLoader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <ErrorBoundary fallback={<ErrorBoundaryLoader />}>
          <App />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
