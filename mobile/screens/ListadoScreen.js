import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import api from '../src/api';
// Importamos hook useIsFocused para recargar la lista al volver de "Alta"
import { useIsFocused } from '@react-navigation/native';

export default function ListadoScreen() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Detecta si estamos mirando la pantalla

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/cursos');
      // Aseguramos que sea un array (depende de cómo responda tu backend: res.data o res.data.datos)
      const data = res.data.datos || res.data; 
      setCursos(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) cargarCursos();
  }, [isFocused]);

  const eliminarCurso = async (id) => {
    try {
      await api.delete(`/cursos/${id}`);
      cargarCursos(); // Recargamos la lista
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  return (
    <ScrollView style={{ padding: 10, backgroundColor: '#f5f5f5' }}>
      {cursos.map((curso) => (
        <Card key={curso.id_curso} style={{ marginBottom: 15 }}>
          <Card.Content>
            <Title>{curso.titulo}</Title>
            <Paragraph>Horas: {curso.horas}h | Precio: {curso.precio}€</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              icon="delete" 
              color="red" 
              onPress={() => eliminarCurso(curso.id_curso)}
            >
              Eliminar
            </Button>
          </Card.Actions>
        </Card>
      ))}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}