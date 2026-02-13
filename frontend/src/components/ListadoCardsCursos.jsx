import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api"; 

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia"; 
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
/**
 * Componente principal de listado.
 * @component
 */
function ListadoCardCursos() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const filasPorPagina = 4;

  useEffect(() => {
    async function fetchCursos() {
      try {
        const respuesta = await api.get(`/cursos?page=${pagina}&limit=${filasPorPagina}`);
        
        setDatos(respuesta.datos || []);
        setTotalPaginas(respuesta.totalPaginas || 1);
        setError(null);
      } catch (error) {
        setError(error.mensaje || "Error al cargar cursos");
        setDatos([]);
      }
    }

    fetchCursos();
  }, [pagina]); 

  async function handleDelete(id_curso) {
    if (window.confirm("¿Seguro que quieres borrar este curso?")) {
        try {
            await api.delete("/cursos/" + id_curso);
            const datos_nuevos = datos.filter((c) => c.id_curso !== id_curso);
            setDatos(datos_nuevos);
        } catch (error) {
            setError(error.mensaje || "Error al borrar");
        }
    }
  }

  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Catálogo de Cursos
      </Typography>
      
      <Grid container spacing={3} sx={{ px: 4 }}>
        {datos.map((row) => (
          <Grid item xs={12} sm={6} md={3} key={row.id_curso}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              
              <CardMedia
                component="img"
                height="140"
                image={row.imagen_url || "https://via.placeholder.com/300x140?text=Sin+Imagen"}
                alt={row.titulo}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {row.titulo}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon fontSize="small" sx={{ mr: 1 }}/>
                    {row.plataforma ? row.plataforma.nombre : "Sin plataforma"}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip 
                        icon={<EuroIcon />} 
                        label={`${row.precio} €`} 
                        color="primary" 
                        variant="outlined" 
                        size="small"
                    />
                    <Chip 
                        icon={<AccessTimeIcon />} 
                        label={`${row.horas} h`} 
                        size="small"
                    />
                </Stack>
              </CardContent>

              {/* BOTONES */}
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button 
                    size="small" 
                    component={Link} 
                    to={`/cursos/edit/${row.id_curso}`} 
                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>
                <Button 
                    size="small" 
                    color="error" 
                    onClick={() => handleDelete(row.id_curso)}
                    startIcon={<DeleteIcon />}
                >
                    Borrar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ mt: 4, mb: 4, alignItems: 'center' }}>
        <Pagination 
            count={totalPaginas} 
            page={pagina} 
            onChange={(e, value) => setPagina(value)} 
            color="primary" 
            size="large"
        />
      </Stack>
    </>
  );
}

export default ListadoCardCursos;