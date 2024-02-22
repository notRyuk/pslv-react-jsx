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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider>
              <Router />
              {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
              /> */}
              <ToastContainer theme="dark"/>
            </SocketProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
)