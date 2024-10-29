import { Box, Button, Checkbox, Container, Drawer, IconButton, ListItemButton, ListItemIcon, Modal, Paper, Toolbar, Typography } from "@mui/material";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import { useEffect, useRef, useState } from "react";
import VideoJS from "../components/VideoJS";
import { VideoJsOptions } from "../types/video-js";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../models/course";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLectureById, saveLectures, setIsViwed } from "../mock-data";
import { Helmet } from "react-helmet-async";

const drawerWidth = 380;

function LecturePage() {
  const playerRef = useRef<Player | null>(null);
  const { courseId, lectureName } = useParams();
  const [course, setCourse] = useState<Course>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [openCongrat, setOpenCongrat] = useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/courses/${courseId}`)
      .then(response => {
        const data: Course = response.data;
        data.lectures = getLectureById(data.id);
        setCourse(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }, [courseId])

  const videoJsOptions: VideoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: '//vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const handleEndLesson = () => {
    if(!course || !course.lectures) return;
    setIsViwed(+courseId!, lectureName!);
    saveLectures();
    const index = course.lectures.findIndex(i => i.name === lectureName);
    const lecture = course.lectures[index+1]
    if(!lecture) setOpenCongrat(true);
    navigate(`../${lecture.name}`, { replace: true, relative: 'path' });
  }

  const handleCongratClose = () => {
    navigate('..', { relative: 'path' });
  }

  const drawer = (
    <>
      <Toolbar sx={{ height: '88px' }} />
      <Box
        marginTop='30px'
      >
        <Box>
          {course?.lectures?.map((lecture, index) => (
            <Box
              key={index}
              marginBottom='2px'
              marginTop='2px'
            >
              <ListItemButton
                component={RouterLink}
                sx={{ 
                  color: 'rgb(145, 158, 171)', 
                  backgroundColor: 'rgb(33, 43, 54)'
                }}
                to={`../${lecture.name}`}
                relative='path'
                replace
              >
                <ListItemIcon
                  sx={{
                    minWidth: '56px',
                    color: 'rgb(145, 158, 171)',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component='span'
                    width='100%'
                    height='100%'
                    display='inline-block'
                    sx={{ 
                      backgroundColor: 'currentcolor',
                      mask: 'url("/icons/ic_library.svg") center center / contain no-repeat'
                    }}
                  />
                </ListItemIcon>
                <Box
                  width='100%'
                >
                  <Typography
                    variant='subtitle2'
                  >{lecture.name}</Typography>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    backgroundColor: 'rgba(255, 192, 0, 0.75)',
                    paddingRight: '8px',
                    paddingLeft: '8px',
                    width: 'fit-content',
                    borderRadius: '6px'
                  }}>
                    <Box component={Icon} icon="fa6-solid:clock" 
                      width={14}
                      height={14}
                      marginRight='2.5px'
                    />
                    {lecture.time} นาที
                  </div>
                </Box>
                <Box>
                  <Checkbox checked={lecture.isViewed} color="success" readOnly={true}/>
                </Box>
              </ListItemButton>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )

  const menuButton = (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { lg: 'none' } }}
    >
      <Box component={Icon} icon="dashicons:menu-alt3" sx={{ width: 24, height: 24, cursor: 'pointer'}} />
    </IconButton>
  )

  const congratulations = (
    <Modal
        open={openCongrat}
        aria-labelledby="congratulations-modal-title"
        aria-describedby="congratulations-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography id="congratulations-modal-title" variant="h5" component="h2" gutterBottom>
            🎉 Congratulations! 🎉
          </Typography>
          <Typography id="congratulations-modal-description" sx={{ mb: 2 }}>
            You have successfully completed this task!
          </Typography>
          <Button variant="contained" color="success" onClick={handleCongratClose}>
            Close
          </Button>
        </Box>
      </Modal>
  )

  return (
  <>
    <Helmet>
        <title>{course?.name} | borntoDev School</title>
    </Helmet>
    {document.getElementById("header-menu") ? createPortal(
      menuButton
    , document.getElementById("header-menu")!) : null}
    {document.getElementById("rootBox") ? createPortal(
      <>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              maxWidth: drawerWidth,
              width: '100%', 
              boxSizing: 'border-box', 
              backgroundColor: 'rgb(22, 28, 36)', 
              backgroundImage: 'none',
              padding: '0rem 0.5rem 0rem 1rem',
              borderLeft: '0px',
              marginRight: '5px', 
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            maxWidth: drawerWidth,
            width: '100%', 
            boxSizing: 'border-box', 
            backgroundColor: 'rgb(22, 28, 36)', 
            backgroundImage: 'none',
            padding: '0rem 0.5rem 0rem 1rem',
            borderLeft: '0px',
            marginRight: '5px', 
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
    , document.getElementById("rootBox")!) : null}
    {congratulations}
    <Box
      sx={{
        paddingRight: { xs: '0px', lg: '380px' }
      }}
    >
      <Container
        sx={{
          marginTop: '30px',
        }}
      >
        <Paper elevation={1}
          sx={{
            overflow: 'hidden'
          }}
        >
          <Box>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </Box>
          <Box
            sx={{
              padding: '38px',
              backgroundColor: 'rgb(33, 43, 54)',
            }}
          >
            <Box
              display='flex'
              justifyContent='space-between'
            >
              <Typography variant='h4'>
                {lectureName}
              </Typography>
              <Button
                variant='contained'
                onClick={handleEndLesson}
              >
                จบบทเรียน
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  </>
  )
}

export default LecturePage