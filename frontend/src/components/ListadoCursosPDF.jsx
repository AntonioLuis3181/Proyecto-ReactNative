import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF (Parecido a CSS pero no igual)
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#1976d2' },
  tableContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  row: { flexDirection: 'row', borderBottomColor: '#bff0fd', borderBottomWidth: 1, alignItems: 'center', height: 24, fontWeight: 'bold' },
  header: { backgroundColor: '#f0f0f0' },
  cellId: { width: '10%' },
  cellTitulo: { width: '50%' },
  cellPrecio: { width: '20%' },
  cellHoras: { width: '20%' },
  text: { fontSize: 10 }
});

// Este componente recibe los datos (cursos) y pinta el PDF
const ListadoCursosPDF = ({ datos }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Informe de Cursos Disponibles</Text>
      
      {/* CABECERA DE LA TABLA */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cellId, styles.text]}>ID</Text>
        <Text style={[styles.cellTitulo, styles.text]}>Título</Text>
        <Text style={[styles.cellPrecio, styles.text]}>Precio</Text>
        <Text style={[styles.cellHoras, styles.text]}>Horas</Text>
      </View>

      {/* FILAS DE DATOS */}
      {datos.map((curso) => (
        <View style={styles.row} key={curso.id_curso}>
          <Text style={[styles.cellId, styles.text]}>{curso.id_curso}</Text>
          <Text style={[styles.cellTitulo, styles.text]}>{curso.titulo}</Text>
          <Text style={[styles.cellPrecio, styles.text]}>{curso.precio} €</Text>
          <Text style={[styles.cellHoras, styles.text]}>{curso.horas} h</Text>
        </View>
      ))}
      
      <Text style={{ marginTop: 20, fontSize: 10, color: 'grey' }}>
        Documento generado automáticamente por Web E-Learning
      </Text>
    </Page>
  </Document>
);

export default ListadoCursosPDF;