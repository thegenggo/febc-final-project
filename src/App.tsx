import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import createTheme from '@mui/material/styles/createTheme';
import { colors, ThemeProvider } from '@mui/material';
import Layout from './layouts/Layout';
import LecturePage from './pages/LecturePage';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.amber[500]
    },
    background: {
      default: '#212b36',
      paper: '#212b36',
    }
  },
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

theme.typography.h3 = {
  fontSize: '1.5rem',
  fontWeight: 600,
  lineHeight: 1.5,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.625rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.875rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem',
  },
}

theme.typography.h4 = {
  fontWeight: 600,
  lineHeight: 1.5,
  fontSize: '1.25rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
  },
}

theme.typography.body1 = {
  fontWeight: 300,
}

theme.typography.body2 = {
  lineHeight: 1.57143,
  fontSize: '0.875rem',
  fontWeight: 300,
  color: 'rgb(145, 158, 171)',
}

theme.typography.subtitle2 = {
  lineHeight: 1.57143,
  fontSize: '0.875rem',
  fontFamily: 'prompt',
  fontWeight: 600
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage />}></Route>
            <Route path="courses/:courseId" element={<CoursePage />}></Route>
            <Route path="courses/:courseId/:lectureName" element={<LecturePage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
