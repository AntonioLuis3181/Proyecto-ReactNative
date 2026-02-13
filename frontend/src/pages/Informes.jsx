import { useState, useEffect, useRef } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Button, Container, Typography, Paper, Box } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// Importamos la instancia de API (que apunta a AWS)
import api from '../api';
// Librerías para PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Informes() {
  const [datosGrafica, setDatosGrafica] = useState([]);
  
  // Referencia para capturar la gráfica
  const chartRef = useRef(null);

  useEffect(() => {
    // 1. Cargar datos del backend USANDO AXIOS (api.js)
    api.get('/cursos')
      .then(response => {
        // CORRECCIÓN IMPORTANTE: En Axios, los datos están en response.data
        const data = response.data; 
        
        // Comprobamos si el backend devuelve un array directo o un objeto { datos: [...] }
        const cursos = Array.isArray(data) ? data : (data.datos || []);
        
        // Formateamos los datos para Recharts
        const dataParaGrafica = cursos.map(curso => ({
          nombre: curso.titulo ? (curso.titulo.substring(0, 15) + "...") : "Sin título",
          horas: Number(curso.horas), // Aseguramos que sea número para que la gráfica pinte
          precio: curso.precio
        }));
        
        setDatosGrafica(dataParaGrafica);
      })
      .catch(err => console.error("Error cargando gráficas desde AWS:", err));
  }, []);

  // --- FUNCIÓN: EXPORTAR GRÁFICA A PDF (Imagen) ---
  const handleExportChartPdf = async () => {
    const element = chartRef.current;
    if (!element) return;

    // 1. Convertir el DIV de la gráfica a Imagen (Canvas)
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // 2. Crear PDF
    const pdf = new jsPDF('landscape');
    pdf.text("Reporte de Duración de Cursos", 20, 20);
    
    // 3. Añadir imagen al PDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 20, 30, pdfWidth, pdfHeight);
    pdf.save("grafica_cursos.pdf");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
      <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
        Panel de Informes y Gráficas
      </Typography>

      {/* --- SECCIÓN 1: GRÁFICA DE BARRAS --- */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Duración de Cursos (Horas)</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<PictureAsPdfIcon />}
            onClick={handleExportChartPdf}
          >
            Descargar Gráfica PDF
          </Button>
        </Box>

        {/* Contenedor con REF para html2canvas */}
        <div ref={chartRef} style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosGrafica}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas" fill="#8884d8" name="Duración (Horas)" />
              </BarChart>
            </ResponsiveContainer>
            
            <Typography variant="caption" display="block" align="center" mt={2}>
              Gráfica generada con Recharts a partir de datos en tiempo real.
            </Typography>
        </div>
      </Paper>
    </Container>
  );
}
export default Informes;