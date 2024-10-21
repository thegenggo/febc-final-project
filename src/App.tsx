import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material';
import Layout from './layouts/Layout';

const theme = createTheme({
  typography: {
    fontFamily: 'prompt',
    subtitle2: {
      fontWeight: 600,
    },
    caption: {
      lineHeight: 1.5,
      fontWeight: 300,
    }
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          fontSize: '0.875rem',
          fontFamily: 'prompt',
          fontWeight: '600'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage />}></Route>
            <Route path="/:id" element={<CoursePage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
