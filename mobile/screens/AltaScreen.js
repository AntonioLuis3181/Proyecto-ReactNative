import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Title } from 'react-native-paper';
import api from '../src/api';

export default function AltaScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  const [precio, setPrecio] = useState('');
  
  // Para validación simple
  const [error, setError] = useState(false);

  const guardarCurso = async () => {
    // 1. Validación
    if (!titulo || !horas || !precio) {
      setError(true);
      return;
    }

    // 2. Enviar datos
    try {
      await api.post('/cursos', {
        titulo,
        descripcion,
        horas: Number(horas),
        precio: Number(precio),
        // ID de plataforma hardcodeado para que funcione (ya que no tenemos login ni select)
        id_plataforma: 1 
      });
      alert("¡Curso creado!");
      navigation.goBack(); // Volver al listado
    } catch (err) {
      alert("Error al guardar. Revisa que la plataforma ID 1 exista.");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={{ marginBottom: 20 }}>Nuevo Curso</Title>
      
      <TextInput
        label="Título del curso"
        value={titulo}
        onChangeText={setTitulo}
        mode="outlined"
        style={styles.input}
        error={error && !titulo}
      />
      
      <TextInput
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Horas"
        value={horas}
        onChangeText={setHoras}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        error={error && !horas}
      />

      <TextInput
        label="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        error={error && !precio}
      />

      {error && <HelperText type="error">Rellena los campos obligatorios</HelperText>}

      <Button mode="contained" onPress={guardarCurso} style={styles.btn}>
        Guardar Curso
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 12 },
  btn: { marginTop: 20 }
});