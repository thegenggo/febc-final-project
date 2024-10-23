import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Course } from "../models/course";
import axios from "axios";
import { Box, Checkbox, Chip, colors, Divider, ListItemButton, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2'
import { Icon } from "@iconify/react/dist/iconify.js";
import { lectures } from "../mock-data";

function CoursePage() {
  const { id } = useParams<string>();
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/courses/${id}`)
      .then(response => {
        setCourse(response.data)
        console.log(course);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }, [])

  return (
    <Box maxWidth={1270} margin='auto'>
      <Box display='flex'
        padding='85px 40px 135px'
        sx={{
          backgroundImage: 'linear-gradient(rgba(22, 28, 36, 0.97), rgba(22, 28, 36, 0.95)), url("https://storage.borntodev.com/academy/content/1600x900-ROG-McHeXOiInFYOBOKQf3Y_a6uk_3-P7i71cfoy0Z2MVNFWTLa-EtcQuLXvA.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}>
          <Box width='100%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            sx={{
              WebkitBoxPack: 'center'
            }}
          >
            <Typography variant='h3'>{course?.name}</Typography>
            <Typography variant='subtitle1'>{course?.description}</Typography>
            <Typography variant='body2'>อัพเดทเมื่อ 15 Oct 2024</Typography>
            <Box marginTop='10px'
              textAlign='left'
              color={colors.common.white}
            >
              <Stack display='flex'
                flexDirection='row'
              >
                <Box position='relative'
                  height={15}
                >
                  <Icon icon="ant-design:star-filled" />
                </Box>
                <Box position='relative'
                  height={15}
                >
                  <Icon icon="ant-design:star-filled" />
                </Box>
                <Box position='relative'
                  height={15}
                >
                  <Icon icon="ant-design:star-filled" />
                </Box>
                <Box position='relative'
                  height={15}
                >
                  <Icon icon="ant-design:star-filled" />
                </Box>
                <Box position='relative'
                  height={15}
                >
                  <Icon icon="ant-design:star-filled" />
                </Box>
              </Stack>
              5 (1 รีวิว) จากผู้เรียน 120 ท่าน
            </Box>
          </Box>
          <Box width='100%'>
            <div style={{ width: '100%', height: '360px'}}>
              <div style={{ width: '100%', height: '100%'}}>
                <iframe frameBorder={0} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" title="ROAD TO FRONT-END DEVELOPER Bootcamp" width="100%" height="100%" src="https://www.youtube.com/embed/py_ijNl_ilw?autoplay=1&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Fschool.borntodev.com&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2" data-gtm-yt-inspected-6="true"></iframe>
              </div>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgb(33, 43, 54)',
            borderRadius: '16px',
          }}
        >
          <Box padding='60px'>
            <Grid container>
              <Grid size={{ xs: 12, md: 6.78 }}>
                <Box>
                  <Typography variant='h4' margin='0px 0px 20px'>เกี่ยวกับ</Typography>
                  <Box fontSize={20}>
                    <p style={{ margin: 0 }}>
                      หลักสูตรฉบับรวบรัด เปลี่ยนคุณให้กลายเป็นนักพัฒนาเว็บไซต์ฝั่งหน้าบ้าน (Front-End Developer) ได้ภายใน 3 เดือนครึ่งจากทีมผู้สอนที่ถ่ายทอดความรู้เรื่องการพัฒนาเว็บ และ คนในวงการตัวจริง
                    </p>
                    <br/>
                    <p style={{ margin: 0 }}>
                      “ทำให้คุณสามารถเข้าสมัคร และ ทำงานในตำแหน่ง Junior Front-End Developer ได้เลยทันทีหลังเรียนทำแบบทดสอบ และ โปรเจกต์สุดท้าทายในหลักสูตรอย่างครบถ้วน”
                    </p>
                  </Box>
                </Box>
                <Box margin='30px 0px 20px'>
                  <Typography variant='h4'>เนื้อหาในคอร์ส</Typography>
                </Box>
                {course ? lectures[course?.id].map((lecture, index) => (
                  <>
                    <ListItemButton>
                      <Grid container marginTop='20px' width='100%'>
                        <Grid size={{ xs: 2, sm: 1.15, }}>
                          <Typography variant='body1' color='rgb(145, 158, 171)' fontSize='36px'>{(index+1).toString().padStart(2, '0')}</Typography>
                        </Grid>
                        <Grid size={{ xs: 8.5, sm: 9.35 }}>
                          <Box>
                            <Typography variant='h5'>{lecture.name}</Typography>
                            <Chip icon={<Icon icon="fa6-solid:clock" />}
                              sx={{
                                backgroundColor: 'rgba(255, 192, 0, 0.75)',
                                paddingX: '8px',
                                borderRadius: '6px',
                                width: 'fit-content'
                              }}
                              label={`${lecture.time} นาที`}
                            />
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 1.5 }}>
                          <Box>
                            <Checkbox checked={lecture.isViewed} color="success" readOnly={true}/>
                          </Box>
                        </Grid>
                      </Grid>
                    </ListItemButton>
                    <Divider/>
                  </>
                )) : null}
              </Grid>
              <Grid size={{ xs: 12, md: 4.57 }}></Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
  )
}

export default CoursePage