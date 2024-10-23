import Box from "@mui/material/Box"
import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from "@mui/material/CardContent";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import { Course } from "../models/course";

function CourseCard({ course }: {course : Course}) {
  return (
    <Box
      sx={{
        minWidth: '270px',
        maxWidth: '270px',
      }}>
      <Card
        elevation={1} 
        square={false}
        sx={{
          backgroundColor: 'rgb(33, 43, 54)',
          overflow: 'hidden',
          borderRadius: '15px',
          position: 'relative',
          marginTop: '15px',
          marginBottom: '15px',
        }}>
          <Box
            component={RouterLink}
            to={`courses/${course.id}`}
            sx={{
              textDecoration: 'none'
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box component='span'>
                
              </Box>
              <span>
                <Box component='img' alt='cover' src='https://storage.borntodev.com/academy/content/1920x1080-FuTgBCxZcM0OeRNUbvHmgdbvwk1Zhl-LDKR3A91eJOILsQwmgx37cYqNZDVqr.webp' 
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </span>
              
            </Box>
            <CardContent
              sx={{
                paddingTop: 2,
                paddingRight: 2,
                paddingLeft: 2,
                height: '100%',
                width: '100%',
                maxHeight: '270px',
                paddingBottom: '10px !important',
              }}
            >
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  WebkitBoxPack: 'justify',
                  justifyContent: 'space-between',
                  height: 'fit-content',
                  minHeight: '80px',
                }}
              >
                <Box>
                  <Typography variant="subtitle2"
                    sx={{
                      color: 'rgb(255, 255, 255)',
                      height: '44px',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {course.name}
                  </Typography>
                  <Typography variant="caption"
                    sx={{ 
                      color: 'rgb(145, 158, 171)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: '36px',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      display: '-webkit-box'
                    }}
                  >
                    {course.description}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Box>
        </Card>
    </Box>
  )
}

export default CourseCard