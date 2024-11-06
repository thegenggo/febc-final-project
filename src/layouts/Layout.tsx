import { AppBar, Box, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box id='rootBox'>
      <AppBar position="fixed"
        elevation={0}
        sx={{
          height: '88px',
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="lg"
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            id='header-menu'
            sx={{
              height: '100%',
              display: 'flex',
              WebkitBoxAlign: 'center',
              alignItems: 'center',
              WebkitBoxPack: 'justify',
              justifyContent: 'space-between',
            }}
          >
            <Box component={Link}
              to='/'
            >
              <Box component='span'
                sx={{
                  lineHeight: 0,
                  display: 'block',
                  overflow: 'hidden',
                  width: '175px',
                }}
              >
                <Box component='img'
                  alt="logo"
                  src="https://school.borntodev.com/logos/school-full-225x72.png"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Box component='main'
        sx={{
          flexGrow: 1,
          paddingTop: '88px',
          paddingBottom: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout