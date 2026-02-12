import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert as NativeAlert } from 'react-native';
import { TextInput, Button, Text, Menu, TouchableRipple, Portal, Dialog, Paragraph, HelperText } from 'react-native-paper';
import api from '../src/api';

export default function AltaScreen({ navigation }) {
  // --- ESTADOS ---
  const [curso, setCurso] = useState({
    titulo: "",
    precio: "",
    horas: "",
    fecha_publicacion: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    imagen_url: "",
    id_plataforma: ""
  });

  const [listaPlataformas, setListaPlataformas] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Estado para el Menú desplegable (Select)
  const [menuVisible, setMenuVisible] = useState(false);

  // Estado para el Diálogo de éxito/error
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', msg: '', isError: false });

  // Colores (Mismo estilo que el resto de la app)
  const colors = {
    primary: '#2563eb',
    bg: '#f8fafc',
  };

  // 1. Cargar Plataformas al iniciar
  useEffect(() => {
    async function fetchPlataformas() {
      try {
        const respuesta = await api.get("/plataformas");
        // Ajuste por si tu API devuelve { datos: [...] } o el array directo
        const datos = respuesta.data.datos || respuesta.data;
        setListaPlataformas(datos);
      } catch (error) {
        console.error("Error cargando plataformas", error);
        NativeAlert.alert("Error", "No se pudieron cargar las plataformas");
      }
    }
    fetchPlataformas();
  }, []);

  // --- MANEJADORES ---

  const handleChange = (name, value) => {
    // Validación de números negativos (igual que en tu web)
    if ((name === "precio" || name === "horas") && value < 0) return;
    setCurso({ ...curso, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Enviando:", curso);

    // Validaciones
    if (!curso.titulo || curso.titulo.length < 3) {
      setDialogData({ title: "Atención", msg: "El título es muy corto", isError: true });
      setDialogVisible(true);
      return;
    }
    if (!curso.id_plataforma) {
      setDialogData({ title: "Atención", msg: "Debes seleccionar una plataforma", isError: true });
      setDialogVisible(true);
      return;
    }

    // Enviar a API
    setLoading(true);
    try {
      await api.post("/cursos", {
        ...curso,
        // Aseguramos que se envíen como números
        precio: Number(curso.precio),
        horas: Number(curso.horas),
        id_plataforma: Number(curso.id_plataforma)
      });

      setDialogData({ title: "¡Éxito!", msg: "Curso creado correctamente", isError: false });
      setDialogVisible(true);
    } catch (error) {
      console.error(error);
      setDialogData({ title: "Error", msg: "No se pudo crear el curso. Revisa la consola.", isError: true });
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const cerrarDialogo = () => {
    setDialogVisible(false);
    // Si fue éxito, volvemos al listado
    if (!dialogData.isError) {
      navigation.navigate('Listado'); 
    }
  };

  // Helper para mostrar el nombre de la plataforma seleccionada en el input
  const nombrePlataformaSeleccionada = listaPlataformas.find(p => p.id_plataforma === curso.id_plataforma)?.nombre || "";

  return (
    // KeyboardAvoidingView hace que el teclado no tape los inputs
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1, backgroundColor: colors.bg }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text variant="headlineMedium" style={styles.title}>Alta de Curso</Text>

        <View style={styles.card}>
          
          {/* TÍTULO */}
          <TextInput
            label="Título del curso"
            value={curso.titulo}
            onChangeText={(text) => handleChange('titulo', text)}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={colors.primary}
          />

          {/* FILA: PRECIO Y HORAS */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                label="Precio (€)"
                value={String(curso.precio)}
                onChangeText={(text) => handleChange('precio', text)}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                activeOutlineColor={colors.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                label="Horas"
                value={String(curso.horas)}
                onChangeText={(text) => handleChange('horas', text)}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                activeOutlineColor={colors.primary}
              />
            </View>
          </View>

          {/* FECHA (Simplificado como texto para evitar librerías externas complejas) */}
          <TextInput
            label="Fecha (YYYY-MM-DD)"
            value={curso.fecha_publicacion}
            onChangeText={(text) => handleChange('fecha_publicacion', text)}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={colors.primary}
          />

          {/* URL IMAGEN */}
          <TextInput
            label="URL Imagen (Opcional)"
            value={curso.imagen_url}
            onChangeText={(text) => handleChange('imagen_url', text)}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={colors.primary}
          />

          {/* SELECTOR DE PLATAFORMA (Simulado con Menú) */}
          <View style={styles.input}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableRipple onPress={() => setMenuVisible(true)}>
                  <TextInput
                    label="Selecciona Plataforma"
                    value={nombrePlataformaSeleccionada}
                    mode="outlined"
                    editable={false} // Para que no escriban, solo toquen
                    right={<TextInput.Icon icon="chevron-down" />}
                    style={{ backgroundColor: '#fff' }}
                  />
                </TouchableRipple>
              }
            >
              {listaPlataformas.length === 0 ? (
                <Menu.Item title="Cargando plataformas..." disabled />
              ) : (
                listaPlataformas.map((p) => (
                  <Menu.Item 
                    key={p.id_plataforma} 
                    onPress={() => {
                      handleChange('id_plataforma', p.id_plataforma);
                      setMenuVisible(false);
                    }} 
                    title={p.nombre} 
                  />
                ))
              )}
            </Menu>
            {/* Mensaje de ayuda si está vacío */}
            {!curso.id_plataforma && <HelperText type="info">Debes elegir una plataforma de la lista</HelperText>}
          </View>

          {/* BOTÓN GUARDAR */}
          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            loading={loading}
            style={styles.button}
            buttonColor={colors.primary}
            contentStyle={{ paddingVertical: 5 }}
          >
            {loading ? "Guardando..." : "Crear Curso"}
          </Button>

        </View>
      </ScrollView>

      {/* DIÁLOGO DE CONFIRMACIÓN (Como el de tu Web) */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={cerrarDialogo}>
          <Dialog.Title>{dialogData.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogData.msg}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cerrarDialogo}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
  }
});