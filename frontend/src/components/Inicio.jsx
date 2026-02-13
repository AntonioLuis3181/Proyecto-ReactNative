import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router';
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; 
import SchoolIcon from '@mui/icons-material/School';           
import TerminalIcon from '@mui/icons-material/Terminal';       
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; 
/**
 * Componente principal de listado.
 * @component
 */
function Inicio() {
  return (
    <Box>
      <Box sx={{ 
        backgroundColor: '#f8fafc', 
        py: { xs: 6, md: 10 }, 
        borderBottom: '1px solid #e5e7eb',
        textAlign: 'center' 
      }}>
        <Container maxWidth="md" sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <RocketLaunchIcon sx={{ fontSize: 50, color: '#2563eb', mb: 2 }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: '#1f2937', mb: 2, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            Impulsa tu carrera con <Box component="span" sx={{ color: '#2563eb' }}>EduDAM</Box>
          </Typography>
          <Typography variant="h5" sx={{ color: '#4b5563', mb: 4, px: 2 }}>
            Aprende programación, bases de datos y desarrollo móvil con los mejores expertos.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/cursos"
            sx={{ backgroundColor: '#2563eb', px: 4, py: 1.5, textTransform: 'none', fontSize: '1.1rem', borderRadius: '8px' }}
          >
            Ver catálogo de cursos
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8}}>
        <Grid container spacing={4}>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <AutoStoriesIcon sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1f2937' }}>
                Contenido Actualizado
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Cursos revisados cada semana para estar al día con las últimas tecnologías y frameworks.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <SchoolIcon sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1f2937' }}>
                Certificados Oficiales
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Al terminar cada módulo, obtendrás un certificado digital para potenciar tu perfil profesional.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <TerminalIcon sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1f2937' }}>
                Prácticas Reales
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Proyectos prácticos basados en desafíos reales del mundo laboral y la industria tech.
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default Inicio;