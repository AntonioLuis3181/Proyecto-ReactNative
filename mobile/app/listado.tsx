import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Text, Searchbar, ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import api from '../src/service/api';

import { CursoCard, Curso } from '../src/components/CursoCard'; 

export default function ListadoScreen() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  const isFocused = useIsFocused();

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/cursos');
      const data: Curso[] = res.data.datos || res.data;
      setCursos(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudieron cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) cargarCursos();
  }, [isFocused]);

  const confirmarEliminar = (id: number) => {
    Alert.alert(
      "Eliminar Curso",
      "¿Estás seguro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => eliminarCurso(id), style: "destructive" }
      ]
    );
  };

  const eliminarCurso = async (id: number) => {
    try {
      await api.delete(`/cursos/${id}`);
      setCursos(prevCursos => prevCursos.filter(c => c.id_curso !== id));
      Alert.alert("Borrado", "Curso eliminado");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar");
    }
  };

  const verDetalle = (item: Curso) => {
      Alert.alert("Detalles", `Estás viendo el curso: ${item.titulo}`);
  };

  const cursosFiltrados = cursos.filter(c => 
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <Text variant="headlineSmall" style={styles.title}>Catálogo EduDAM</Text>
        <Searchbar
          placeholder="Buscar curso..."
          onChangeText={setBusqueda}
          value={busqueda}
          style={styles.searchbar}
          inputStyle={{ minHeight: 0 }}
        />
      </View>

      {loading ? (
        <ActivityIndicator animating={true} color="#2563eb" size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={cursosFiltrados}
          keyExtractor={(item) => item.id_curso.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CursoCard 
                item={item} 
                onDelete={confirmarEliminar}
                onVerDetalle={verDetalle}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerContainer: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  title: { fontWeight: 'bold', color: '#1f2937', marginBottom: 15 },
  searchbar: { backgroundColor: '#f1f5f9', borderRadius: 8, elevation: 0, borderWidth: 1, borderColor: '#e2e8f0' },
  listContent: { padding: 15 },
});