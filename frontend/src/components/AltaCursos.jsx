import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; // <--- OJO: Importamos Grid2 para la versión nueva
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

import api from "../api";
/**
 * Componente principal de listado.
 * @component
 */

function AltaCurso() {
  const navigate = useNavigate();

  const [curso, setCurso] = useState({
    titulo: "",
    precio: "",
    horas: "",
    fecha_publicacion: new Date().toISOString().split('T')[0],
    imagen_url: "",
    id_plataforma: ""
  });

  const [listaPlataformas, setListaPlataformas] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  // 1. Cargar Plataformas
  useEffect(() => {
    async function fetchPlataformas() {
      try {
        const respuesta = await api.get("/plataformas");
        if(respuesta.datos) {
            setListaPlataformas(respuesta.datos);
        }
      } catch (error) {
        console.error("Error cargando plataformas", error);
      }
    }
    fetchPlataformas();
  }, []);

  // 2. Guardar Curso
  useEffect(() => {
    async function fetchCreateCurso() {
      try {
        const respuesta = await api.post("/cursos/", curso);
        setDialogMessage(respuesta.mensaje || "Curso creado correctamente");
        setDialogSeverity("success");
        setOpenDialog(true);
      } catch (error) {
        console.error("Error en servidor:", error);
        setDialogMessage(error.mensaje || "Error al crear el curso");
        setDialogSeverity("error");
        setOpenDialog(true);
      }
      setIsUpdating(false);
    }

    if (isUpdating) fetchCreateCurso();
  }, [isUpdating, curso]);

  function handleChange(e) {
    let { name, value } = e.target;

    // Validación para que no bajen de 0
    if (name === "precio" || name === "horas") {
      if (value < 0) value = 0;
    }

    setCurso({ ...curso, [name]: value });
  }

  function handleClick() {
    // --- EL CHIVATO: MIRA LA CONSOLA AL PULSAR ---
    console.log("BOTÓN PULSADO. Datos a enviar:", curso);
    
    if (isUpdating) return;
    
    // Validaciones básicas
    if (!curso.titulo || curso.titulo.length < 3) {
       alert("El título es muy corto");
       return;
    }
    if (!curso.id_plataforma) {
        alert("Debes seleccionar una plataforma");
        return;
    }

    // Si todo ok, activamos el flag para que el useEffect envíe
    setIsUpdating(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
    if (dialogSeverity === "success") navigate("/cursos");
  }

  return (
    <>
      {/* Usamos Grid container con espaciado */}
      <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}>
        <Grid size={{ xs: 12, sm: 9, md: 7 }}> {/* CAMBIO V6: size={{...}} en vez de xs={} */}
          <Paper elevation={6} sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Alta de Curso
            </Typography>

            <Grid container spacing={2}>
              
              {/* TÍTULO */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Título del curso"
                  name="titulo"
                  value={curso.titulo}
                  onChange={handleChange}
                />
              </Grid>

              {/* PRECIO */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Precio (€)"
                  name="precio"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={curso.precio}
                  onChange={handleChange}
                />
              </Grid>

              {/* HORAS */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Horas"
                  name="horas"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={curso.horas}
                  onChange={handleChange}
                />
              </Grid>

              {/* FECHA */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Fecha Publicación"
                  name="fecha_publicacion"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={curso.fecha_publicacion}
                  onChange={handleChange}
                />
              </Grid>

              {/* URL IMAGEN */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="URL Imagen (Logo)"
                  name="imagen_url"
                  value={curso.imagen_url}
                  onChange={handleChange}
                />
              </Grid>

              {/* SELECT PLATAFORMA */}
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth required>
                  <InputLabel id="plataforma-label">Plataforma</InputLabel>
                  <Select
                    labelId="plataforma-label"
                    name="id_plataforma"
                    value={curso.id_plataforma}
                    label="Plataforma"
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

              {/* BOTÓN */}
              <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  disabled={isUpdating}
                  onClick={handleClick}
                >
                  {isUpdating ? "Guardando..." : "Crear Curso"}
                </Button>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogSeverity === "success" ? "¡Éxito!" : "Error"}</DialogTitle>
        <DialogContent dividers>
          <Alert severity={dialogSeverity}>{dialogMessage}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AltaCurso;