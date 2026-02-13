import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; 
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import api from "../api";
/**
 * Componente principal de listado.
 * @component
 */
function EditarCurso() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [curso, setCurso] = useState({
    titulo: "",
    precio: "",
    horas: "",
    fecha_publicacion: "",
    imagen_url: "",
    id_plataforma: ""
  });

  const [listaPlataformas, setListaPlataformas] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const resPlataformas = await api.get("/plataformas");
        if(resPlataformas.datos) {
            setListaPlataformas(resPlataformas.datos);
        }

        const resCurso = await api.get(`/cursos/${id}`);
        const data = resCurso.datos;

        let fechaFormateada = "";
        if (data.fecha_publicacion) {
            fechaFormateada = new Date(data.fecha_publicacion).toISOString().split('T')[0];
        }

        setCurso({
            titulo: data.titulo,
            precio: data.precio,
            horas: data.horas,
            fecha_publicacion: fechaFormateada,
            imagen_url: data.imagen_url,
            id_plataforma: data.id_plataforma 
        });

      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al cargar el curso. Mira la consola.");
      }
    }

    fetchData();
  }, [id]);

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "precio" || name === "horas") {
      if (value < 0) value = 0;
    }
    setCurso({ ...curso, [name]: value });
  }

  async function handleSubmit() {
    try {
        await api.put(`/cursos/${id}`, curso); 
        alert("Curso actualizado correctamente");
        navigate("/cursos");
    } catch (error) {
        console.error("Error actualizando:", error);
        alert("Error al guardar los cambios");
    }
  }

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", mt: 3 }}>
        <Grid item size={{ xs: 12, sm: 9, md: 7 }}>
          <Paper elevation={6} sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Editar Curso #{id}
            </Typography>

            <Grid container spacing={2}>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  fullWidth label="Título" name="titulo"
                  value={curso.titulo} onChange={handleChange}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth label="Precio (€)" name="precio" type="number"
                  value={curso.precio} onChange={handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth label="Horas" name="horas" type="number"
                  value={curso.horas} onChange={handleChange}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth label="Fecha" name="fecha_publicacion" type="date"
                  value={curso.fecha_publicacion} onChange={handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth label="URL Imagen" name="imagen_url"
                  value={curso.imagen_url} onChange={handleChange}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel id="plat-label" shrink>Plataforma</InputLabel>
                  <Select
                    labelId="plat-label"
                    name="id_plataforma"
                    value={curso.id_plataforma}
                    label="Plataforma"
                    displayEmpty
                    onChange={handleChange}
                  >
                    {listaPlataformas.map((p) => (
                        <MenuItem key={p.id_plataforma} value={p.id_plataforma}>
                            {p.nombre}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/cursos")}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
    </Grid>
  );
}

export default EditarCurso;