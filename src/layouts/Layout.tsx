import { Icon } from "@iconify/react/dist/iconify.js";
import { AppBar, Box, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <AppBar position="static"
        sx={{
          height: '64px',
          width: '100%',
          backgroundColor: 'rgb(33, 43, 54)',
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg"
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Box
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
                  width: 120,
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
            <Box component={Icon} icon="dashicons:menu-alt3" sx={{ width: 24, height: 24, cursor: 'pointer'}} />
          </Box>
        </Container>
      </AppBar>
      <Box component='main'>
        <Outlet />
      </Box>
    </>
  )
}

export default Layout