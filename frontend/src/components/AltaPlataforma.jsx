import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; 
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../api"; 
/**
 * Componente principal de listado.
 * @component
 */
function AltaPlataforma() {
  const navigate = useNavigate();

  const [plataforma, setPlataforma] = useState({
    nombre: "",
    url_web: "",
    es_gratuita: false,
    fecha_alta: new Date().toISOString().split('T')[0] 
  });

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    setPlataforma({ ...plataforma, [name]: value });
  }

  async function handleSubmit() {
    try {
        if(!plataforma.nombre) {
            alert("El nombre es obligatorio");
            return;
        }

        await api.post("/plataformas", plataforma);
        alert("Plataforma creada correctamente");
        navigate("/plataformas"); 
    } catch (error) {
        console.error("Error al crear:", error);
        alert("Error al guardar la plataforma");
    }
  }

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", mt: 3 }}>
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <Paper elevation={6} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Nueva Plataforma
            </Typography>

            <Grid container spacing={2}>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Nombre de la Plataforma"
                  name="nombre"
                  value={plataforma.nombre}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Sitio Web (URL)"
                  name="url_web"
                  value={plataforma.url_web}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Alta"
                  name="fecha_alta"
                  InputLabelProps={{ shrink: true }}
                  value={plataforma.fecha_alta}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={plataforma.es_gratuita}
                      onChange={handleChange}
                      name="es_gratuita"
                      color="primary"
                    />
                  }
                  label="¿Es Gratuita?"
                />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate("/plataformas")} 
                    sx={{ mr: 2 }}
                >
                  Cancelar
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                >
                  Guardar
                </Button>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
    </Grid>
  );
}

export default AltaPlataforma;