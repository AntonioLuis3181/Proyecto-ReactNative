import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar"; 
import Chip from "@mui/material/Chip"; 
import api from "../api";
/**
 * Componente principal de listado.
 * @component
 */
function ListadoCursosDataGrid() {
  const [rows, setRows] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {

        const respuesta = await api.get("/cursos?limit=100"); 
        setRows(respuesta.datos || []);
      } catch (error) {
        console.error("Error cargando cursos:", error);
      }
    }
    fetchData();
  }, []);

  // 2. DEFINIMOS LAS COLUMNAS
  const columns = [
    { field: "id_curso", headerName: "ID", width: 70 },
    
    { 
      field: "imagen", 
      headerName: "Logo", 
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.row.imagen_url} variant="rounded" />
      )
    },
    
    { field: "titulo", headerName: "Título del Curso", flex: 1, minWidth: 200 },
    
    { 
      field: "plataforma", 
      headerName: "Plataforma", 
      width: 150,
      valueGetter: (value, row) => {
        return row?.plataforma?.nombre || "Sin plataforma";
      }
    },

    { 
      field: "precio", 
      headerName: "Precio", 
      width: 100,
      renderCell: (params) => (
         <Chip label={`${params.value} €`} color="primary" variant="outlined" size="small" />
      )
    },

    { field: "horas", headerName: "Horas", width: 100, type: "number" },
    
    { 
      field: "fecha_publicacion", 
      headerName: "Fecha Pub.", 
      width: 120,
      valueFormatter: (params) => {
         if(!params.value) return "-";
         return new Date(params.value).toLocaleDateString();
      }
    },
  ];

  return (
    <Paper sx={{ height: 600, width: "100%", p: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Listado Avanzado (DataGrid)
      </Typography>
      
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id_curso} 
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }, 
          },
        }}
        pageSizeOptions={[5, 10, 25]} 
        disableRowSelectionOnClick
      />
    </Paper>
  );
}

export default ListadoCursosDataGrid;