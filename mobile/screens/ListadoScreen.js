import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Searchbar, ActivityIndicator, IconButton, Divider, Chip } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import api from '../src/api';

export default function ListadoScreen() {
  const [cursos, setCursos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Hook para recargar la lista cuando volvemos de otra pantalla
  const isFocused = useIsFocused();

  // Colores de tu marca (los mismos del Home)
  const colors = {
    primary: '#2563eb',
    bg: '#f8fafc',
    textDark: '#1f2937',
    danger: '#dc2626'
  };

  // 1. CARGAR DATOS
  const cargarCursos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/cursos');
      // Adaptamos según si tu backend devuelve un array directo o { datos: [...] }
      const data = res.data.datos || res.data;
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

  // 2. BORRAR DATOS (Sustituye a imprimir)
  const confirmarEliminar = (id) => {
    Alert.alert(
      "Eliminar Curso",
      "¿Estás seguro? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => eliminarCurso(id), style: "destructive" }
      ]
    );
  };

  const eliminarCurso = async (id) => {
    try {
      await api.delete(`/cursos/${id}`);
      // Actualizamos la lista localmente para que sea rápido
      setCursos(cursos.filter(c => c.id_curso !== id));
      Alert.alert("Éxito", "Curso eliminado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el curso");
    }
  };

  // 3. FILTRADO (Igual que en tu web)
  const cursosFiltrados = cursos.filter(c => 
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Renderizado de cada Tarjeta (En vez de TableRow)
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium" style={{ color: colors.primary, fontWeight: 'bold', flex: 1 }}>
            {item.titulo}
          </Text>
          <Chip icon="clock-outline">{item.horas}h</Chip>
        </View>
        
        <Divider style={{ marginVertical: 10 }} />
        
        <View style={styles.row}>
          <Text variant="bodyMedium" style={{ color: '#666' }}>ID: {item.id_curso}</Text>
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{item.precio} €</Text>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        <Button mode="text" textColor={colors.primary} onPress={() => Alert.alert("Info", `Detalles de: ${item.titulo}`)}>
          Ver Detalles
        </Button>
        <Button 
          mode="contained" 
          buttonColor={colors.danger} 
          icon="delete"
          onPress={() => confirmarEliminar(item.id_curso)}
        >
          Borrar
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      
      {/* Cabecera y Buscador */}
      <View style={styles.headerContainer}>
        <Text variant="headlineSmall" style={styles.title}>Catálogo de Cursos</Text>
        <Searchbar
          placeholder="Buscar curso..."
          onChangeText={setBusqueda}
          value={busqueda}
          style={styles.searchbar}
          inputStyle={{ minHeight: 0 }} // Arreglo visual para Android
        />
      </View>

      {/* Lista o Loading */}
      {loading ? (
        <ActivityIndicator animating={true} color={colors.primary} size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={cursosFiltrados}
          keyExtractor={(item) => item.id_curso.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
              No se encontraron cursos.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  searchbar: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    elevation: 0, // Quita sombra en Android
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  listContent: {
    padding: 15,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2, // Sombra suave
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardActions: {
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 5,
  }
});