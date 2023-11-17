import { StyledEngineProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from '@client/components/router'
import './Global.scss'
import ThemeProvider from '@client/theme'
import { Provider } from 'react-redux'
import {store} from "@client/redux/store"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
)