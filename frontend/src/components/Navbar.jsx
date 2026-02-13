import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Divider, ListSubheader } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Luna
import Brightness7Icon from '@mui/icons-material/Brightness7';
/**
 * Componente principal de listado.
 * @component
 */

function Navbar({ toggleColorMode, mode }) {
  const [anclaMenuPlataformas, setAnclaMenuPlataformas] = React.useState(null);
  const [anclaMenuCursos, setAnclaMenuCursos] = React.useState(null);
  const [anclaMenuXS, setAnclaMenuXS] = React.useState(null);

  const handleClickMenuPlataformas = (event) => setAnclaMenuPlataformas(event.currentTarget);
  const handleClickMenuCursos = (event) => setAnclaMenuCursos(event.currentTarget);
  const handleClickMenuXS = (event) => setAnclaMenuXS(event.currentTarget);

  const handleCloseNavMenu = () => {
    setAnclaMenuPlataformas(null);
    setAnclaMenuCursos(null);
    setAnclaMenuXS(null);
  };

  const linkStyle = { color: "#1f2937", textDecoration: "none", width: '100%' };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "#1f2937", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          
          {/* 1. BOTÓN HAMBURGUESA */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton size="large" onClick={handleClickMenuXS} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anclaMenuXS}
              open={Boolean(anclaMenuXS)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Sección Plataformas en Móvil */}
              <ListSubheader sx={{ fontWeight: 'bold', color: '#2563eb' }}>PLATAFORMAS</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/plataformas/new" style={linkStyle}>Alta de plataformas</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/plataformas" style={linkStyle}>Listado de plataformas</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/plataformas/datagrid" style={linkStyle}>Listado de plataformas con DataGrid</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/plataformas/cards" style={linkStyle}>Listado de plataformas con Cards</Link>
              </MenuItem>
              
              <Divider sx={{ my: 1 }} />
              
              {/* Sección Cursos en Móvil */}
              <ListSubheader sx={{ fontWeight: 'bold', color: '#2563eb' }}>CURSOS</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/cursos/new" style={linkStyle}>Alta de cursos</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/cursos" style={linkStyle}>Listado de cursos</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/cursos/datagrid" style={linkStyle}>Listado de cursos con DataGrid</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/cursos/cards" style={linkStyle}>Listado de cursos con Cards</Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* 2. NOMBRE DE LA PÁGINA*/}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: "flex",           
              fontWeight: 800,
              color: "#2563eb",
              textDecoration: "none",
              mr: 4
            }}
          >
            WEB<Box component="span" sx={{ color: "#1f2937" }}>E-LEARNING</Box>
          </Typography>

          {/* 3. MENÚ ESCRITORIO */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button onClick={handleClickMenuPlataformas} sx={{ color: "#4b5563", textTransform: "none", fontWeight: 600 }}>
              Plataformas
            </Button>
            <Button onClick={handleClickMenuCursos} sx={{ color: "#4b5563", textTransform: "none", fontWeight: 600 }}>
              Cursos
            </Button>
            <Button color="inherit" component={Link} to="/informes">
            Informes
            </Button>
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Menu
            anchorEl={anclaMenuPlataformas}
            open={Boolean(anclaMenuPlataformas)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MenuItem onClick={handleCloseNavMenu}><Link to="/plataformas/new" style={linkStyle}>Alta de plataformas</Link></MenuItem>
            <MenuItem onClick={handleCloseNavMenu}><Link to="/plataformas" style={linkStyle}>Listado de plataformas</Link></MenuItem>
            <MenuItem onClick={handleCloseNavMenu}><Link to="/plataformas/datagrid" style={linkStyle}>Listado de plataformas con DataGrid</Link></MenuItem>
            <MenuItem onClick={handleCloseNavMenu}><Link to="/plataformas/cards" style={linkStyle}>Listado de plataformas con Cards</Link></MenuItem>
          </Menu>

          <Menu
            anchorEl={anclaMenuCursos}
            open={Boolean(anclaMenuCursos)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MenuItem onClick={handleCloseNavMenu}><Link to="/cursos/new" style={linkStyle}>Alta de cursos</Link></MenuItem>
            <MenuItem onClick={handleCloseNavMenu}><Link to="/cursos" style={linkStyle}>Listado de cursos</Link></MenuItem>
            <MenuItem onClick={handleCloseNavMenu}><Link to="/cursos/datagrid" style={linkStyle}>Listado de cursos con DataGrid</Link></MenuItem>
            <MenuItem onClick={handleCloseNavMenu}><Link to="/cursos/cards" style={linkStyle}>Listado de cursos con Cards</Link></MenuItem>         
          </Menu>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;