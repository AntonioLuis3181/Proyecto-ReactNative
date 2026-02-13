import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
/**
 * Componente principal de listado.
 * @component
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main", // Usa el azul de tu tema
        color: "white",
        py: 6,
        mt: 'auto', // Esto hace que se quede siempre abajo
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* COLUMNA 1: LOGO */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              WEB E-LEARNING
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Gestiona tu aprendizaje y descubre los mejores cursos del mercado en un solo lugar.
            </Typography>
          </Grid>

          {/* COLUMNA 2: ENLACES */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Navegación
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/" color="inherit" underline="hover">Inicio</Link>
              <Link href="/cursos" color="inherit" underline="hover">Cursos</Link>
              <Link href="/plataformas" color="inherit" underline="hover">Plataformas</Link>
            </Box>
          </Grid>

          {/* COLUMNA 3: REDES */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contacto
            </Typography>
            <Box>
              <FacebookIcon sx={{ mr: 2 }} />
              <TwitterIcon sx={{ mr: 2 }} />
              <InstagramIcon />
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="center" pt={4} mt={4} borderTop="1px solid rgba(255,255,255,0.2)">
          <Typography variant="body2">
            © {new Date().getFullYear()} Web E-Learning. Proyecto Final.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;