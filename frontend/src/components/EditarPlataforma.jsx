import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; 
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
function EditarPlataforma() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [plataforma, setPlataforma] = useState({
    nombre: "",
    url_web: "",
    es_gratuita: false, 
    fecha_alta: ""
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  useEffect(() => {
    async function fetchPlataforma() {
      try {
        const respuesta = await api.get(`/plataformas/${id}`);
        const data = respuesta.datos;

        let fechaFormateada = "";
        if (data.fecha_alta) {
          fechaFormateada = new Date(data.fecha_alta).toISOString().split('T')[0];
        }

        setPlataforma({
            nombre: data.nombre,
            url_web: data.url_web,
            es_gratuita: Boolean(data.es_gratuita), 
            fecha_alta: fechaFormateada
        });
      } catch (error) {
        console.error("Detalles del error:", error); 
        setDialogMessage("Error al cargar los datos");
        setDialogSeverity("error");
        setOpenDialog(true);
      }
    }

    if (id) fetchPlataforma();
  }, [id]);


  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    setPlataforma({ ...plataforma, [name]: value });
  }

  async function handleClick() {
    if (isUpdating) return;

    if (!plataforma.nombre) {
        setDialogMessage("El nombre es obligatorio");
        setDialogSeverity("warning");
        setOpenDialog(true);
        return;
    }

    setIsUpdating(true);
    
    try {
        const datosAEnviar = { ...plataforma, id_plataforma: id };
        
        await api.put(`/plataformas/${id}`, datosAEnviar);
        
        setDialogMessage("Plataforma actualizada correctamente");
        setDialogSeverity("success");
        setOpenDialog(true);
        
    } catch (error) {
        setDialogMessage(error.mensaje || "Error al actualizar");
        setDialogSeverity("error");
        setOpenDialog(true);
    } finally {
        setIsUpdating(false);
    }
  }

  function handleDialogClose() {
    setOpenDialog(false);
    if (dialogSeverity === "success") navigate("/plataformas");
  }

  return (
    <>
      <Grid container spacing={2} sx={{ justifyContent: "center", mt: 3 }}>
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <Paper elevation={6} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Editar Plataforma #{id}
            </Typography>

            <Grid container spacing={2}>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Nombre"
                  name="nombre" 
                  value={plataforma.nombre}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="URL Sitio Web"
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
                    sx={{ mr: 2 }}
                    onClick={() => navigate("/plataformas")}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogSeverity === "success" ? "¡Éxito!" : "Atención"}</DialogTitle>
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

export default EditarPlataforma;