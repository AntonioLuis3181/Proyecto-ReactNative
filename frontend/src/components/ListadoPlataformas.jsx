import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import api from "../api";
/**
 * Componente principal de listado.
 * @component
 */
function ListadoPlataformas() {
  const [datos, setDatos] = useState([]);
  
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const getPlataformasFromApi = async () => {
    try {
      let queryParams = new URLSearchParams();
      if (busqueda) queryParams.append("busqueda", busqueda);
      if (fechaInicio) queryParams.append("fechaInicio", fechaInicio);
      if (fechaFin) queryParams.append("fechaFin", fechaFin);

      const url = `/plataformas?${queryParams.toString()}`;
      
      const respuesta = await api.get(url);
      return respuesta.datos || [];
    } catch (error) {
      console.error("Error cargando plataformas:", error);
      return [];
    }
  };

  useEffect(() => {
    const cargaInicial = async () => {
        const resultados = await getPlataformasFromApi();
        setDatos(resultados);
    };
    cargaInicial();
  }, []);

  const handleSearch = async () => {
    const resultados = await getPlataformasFromApi();
    setDatos(resultados);
  };

  async function handleDelete(id) {
    if (window.confirm("¿Seguro que quieres borrar esta plataforma?")) {
      try {
        await api.delete("/plataformas/" + id);
        setDatos((prev) => prev.filter((p) => p.id_plataforma !== id));
      } catch (error) {
        console.error("Error al borrar", error);
        alert("No se puede borrar: Probablemente tenga cursos asociados.");
      }
    }
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 3, mb: 3 }}>
        Listado de Plataformas
      </Typography>

      <Grid container spacing={2} sx={{ justifyContent: "center", mb: 3, alignItems: "center" }}>
        
        <Grid item>
            <TextField 
                label="Nombre..." 
                variant="outlined" 
                size="small"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </Grid>

        <Grid item>
             <TextField
                label="Desde"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
            />
        </Grid>

        <Grid item>
             <TextField
                label="Hasta"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
            />
        </Grid>

        <Grid item>
            <Button 
                variant="contained" 
                startIcon={<SearchIcon />} 
                onClick={handleSearch}
            >
                Buscar
            </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mx: 2, width: 'auto', mb: 5 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Nombre</TableCell>
              <TableCell>Web</TableCell>
              <TableCell>¿Gratis?</TableCell>
              <TableCell>Fecha Alta</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.length === 0 ? (
                <TableRow><TableCell colSpan={5} align="center">No hay datos</TableCell></TableRow>
            ) : (
                datos.map((row) => (
                <TableRow key={row.id_plataforma}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{row.nombre}</TableCell>
                    
                    <TableCell>
                        {row.url_web && <a href={row.url_web} target="_blank" rel="noopener noreferrer">Visitar</a>}
                    </TableCell>

                    <TableCell>{row.es_gratuita ? "Sí" : "No"}</TableCell>
                    
                    <TableCell>
                        {row.fecha_alta ? new Date(row.fecha_alta).toLocaleDateString() : '-'}
                    </TableCell>

                    <TableCell align="center">
                    <IconButton component={Link} to={`/plataformas/edit/${row.id_plataforma}`} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id_plataforma)} color="error">
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListadoPlataformas;