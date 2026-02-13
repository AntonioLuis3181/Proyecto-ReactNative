import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";


import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid"; 
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip'; 
import PublicIcon from '@mui/icons-material/Public'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
/**
 * Componente principal de listado.
 * @component
 */
function ListadoCardPlataformas() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const filasPorPagina = 4; 

  useEffect(() => {
    async function fetchPlataformas() {
      try {
        const respuesta = await api.get(`/plataformas?page=${pagina}&limit=${filasPorPagina}`);
        
        setDatos(respuesta.datos || []);
        setTotalPaginas(respuesta.totalPaginas || 1); 
        setError(null);
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchPlataformas();
  }, [pagina]); 

  async function handleDelete(id_plataforma) {
    if (window.confirm("¿Seguro que quieres borrar esta plataforma?")) {
        try {
            await api.delete("/plataformas/" + id_plataforma);
            const datos_nuevos = datos.filter(
                (plataforma) => plataforma.id_plataforma !== id_plataforma
            );
            setDatos(datos_nuevos);
        } catch (error) {
            setError(error.mensaje || "Error al borrar");
        }
    }
  }

  if (error) {
    return <Typography variant="h5" align="center" sx={{ mt: 3, color: 'red' }}>{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Listado de Plataformas
      </Typography>
      
      <Grid container spacing={3} sx={{ px: 4 }}> 
        {datos.map((row) => (
          <Grid item xs={12} sm={6} md={3} key={row.id_plataforma}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {row.nombre}
                </Typography>

                <Chip 
                    label={row.es_gratuita ? "Gratis" : "De pago"} 
                    color={row.es_gratuita ? "success" : "warning"}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                />

                {row.url_web && (
                    <Typography variant="body2" sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PublicIcon fontSize="small" color="action"/>
                        <a href={row.url_web} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Visitar sitio web
                        </a>
                    </Typography>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                
                <Button 
                    size="small" 
                    component={Link} 
                    to={`/plataformas/edit/${row.id_plataforma}`} 
                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>

                <Button 
                  size="small" 
                  color="error"
                  onClick={() => handleDelete(row.id_plataforma)}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
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

export default ListadoCardPlataformas;