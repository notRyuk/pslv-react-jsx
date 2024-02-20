import Router from '@client/components/router'
import { persistor, store } from "@client/redux/store"
import ThemeProvider from '@client/theme'
import { StyledEngineProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import './Global.scss'
import SocketProvider from '@client/context/socket'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider>
              <Router />
            </SocketProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
)