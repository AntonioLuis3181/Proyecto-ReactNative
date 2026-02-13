import { useState, useEffect, useRef } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, Container, TextField, Button, Box, Stack 
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDownloadLink } from "@react-pdf/renderer";
import ListadoCursosPDF from "./ListadoCursosPDF"; // Importamos el diseño que acabamos de crear

const API_URL = "http://localhost:3000/api/cursos"; // Ajusta tu puerto si es necesario

/**
 * Componente principal de listado.
 * @component
 */

function ListadoCursos() {
  const [cursos, setCursos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const tableRef = useRef(null); // Referencia para la foto (html2canvas)


useEffect(() => {
        const cargarCursos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos`);
        const data = await response.json();
        
        setCursos(data.datos || data); 
      } catch (error) {
        console.error("Error cargando cursos:", error);
      }
    };

    cargarCursos();

  }, []);

  // --- TÉCNICA 1: WINDOW.PRINT (Navegador) ---
  const handleImprimirNavegador = () => {
    window.print();
  };

  // --- TÉCNICA 2: JSPDF + HTML2CANVAS (Foto a PDF) ---
  const handleImprimirImagenPDF = async () => {
    const input = tableRef.current; // Capturamos la tabla
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("listado_cursos_imagen.pdf");
  };

  // Filtrado simple en cliente (para que la tabla funcione al buscar)
  const cursosFiltrados = cursos.filter(c => 
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
        Listado de Cursos
      </Typography>

      {/* BARRA DE ACCIONES */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3, justifyContent: 'space-between' }}>
        <TextField
          label="Buscar curso..."
          variant="outlined"
          size="small"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ width: { xs: '100%', sm: '300px' } }}
        />

        {/* --- LOS 3 BOTONES DE IMPRESIÓN --- */}
        {/* Usamos una clase 'no-print' para ocultarlos al imprimir por navegador */}
        <Stack direction="row" spacing={1} className="no-print">
          
          {/* A. NAVEGADOR */}
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={handleImprimirNavegador}>
            Imprimir
          </Button>

          {/* B. IMAGEN A PDF */}
          <Button variant="outlined" color="secondary" startIcon={<PictureAsPdfIcon />} onClick={handleImprimirImagenPDF}>
            PDF (Img)
          </Button>

          {/* C. REACT-PDF (Nativo) */}
          <PDFDownloadLink
            document={<ListadoCursosPDF datos={cursosFiltrados} />}
            fileName="informe_cursos.pdf"
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Button variant="contained" color="primary" startIcon={<DescriptionIcon />}>
                {loading ? 'Generando...' : 'Informe PDF'}
              </Button>
            )}
          </PDFDownloadLink>

        </Stack>
      </Stack>

      {/* TABLA DE DATOS (Con ref para capturarla) */}
      <TableContainer component={Paper} ref={tableRef} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#eeeeee' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Horas</TableCell>
              {/* Ocultamos acciones al imprimir */}
              <TableCell className="no-print">Acciones</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {cursosFiltrados.map((curso) => (
              <TableRow key={curso.id_curso}>
                <TableCell>{curso.id_curso}</TableCell>
                <TableCell>{curso.titulo}</TableCell>
                <TableCell>{curso.precio} €</TableCell>
                <TableCell>{curso.horas} h</TableCell>
                <TableCell className="no-print">
                  <Button size="small" variant="contained" color="info">Ver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ListadoCursos;