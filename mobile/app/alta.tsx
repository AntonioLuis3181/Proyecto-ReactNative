import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert as NativeAlert } from 'react-native';
import { TextInput, Button, Text, Menu, TouchableRipple, Portal, Dialog, Paragraph, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../src/service/api';

// 1. DEFINICIÓN DE TIPOS (INTERFACES)

// Tipo para una Plataforma (lo que viene de la BD)
interface Plataforma {
  id_plataforma: number;
  nombre: string;
}

// Tipo para el estado del formulario (Inputs)
// Nota: Precio y horas los manejamos como string mientras el usuario escribe
interface CursoFormState {
  titulo: string;
  precio: string;
  horas: string;
  fecha_publicacion: string;
  imagen_url: string;
  id_plataforma: number | ""; // Puede ser un número o cadena vacía si no se ha elegido
}

// Tipo para los datos del diálogo
interface DialogData {
  title: string;
  msg: string;
  isError: boolean;
}


export default function AltaScreen() {

  const router = useRouter();
  
  // --- ESTADOS CON TIPADO ---
  
  const [curso, setCurso] = useState<CursoFormState>({
    titulo: "",
    precio: "",
    horas: "",
    fecha_publicacion: new Date().toISOString().split('T')[0],
    imagen_url: "",
    id_plataforma: ""
  });

  const [listaPlataformas, setListaPlataformas] = useState<Plataforma[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<DialogData>({ title: '', msg: '', isError: false });

  const cerrarDialogo = () => {
    setDialogVisible(false);
    if(!dialogData.isError) {
      router.push('/listado');
    }
  }

  // Colores
  const colors = {
    primary: '#2563eb',
    bg: '#f8fafc',
  };

  // 1. Cargar Plataformas al iniciar
  useEffect(() => {
  async function fetchPlataformas() {
    try {
      const respuesta = await api.get("/plataformas");
      
      // ✅ CORRECCIÓN: respuesta ya es { ok: true, datos: [...] }
      // No necesitas .data porque el interceptor ya lo extrajo
      if (respuesta && respuesta.datos) {
        setListaPlataformas(respuesta.datos);
      } else {
        console.error("Respuesta inesperada:", respuesta);
        setListaPlataformas([]);
      }
    } catch (error) {
      console.error("Error cargando plataformas", error);
      NativeAlert.alert("Error", "No se pudieron cargar las plataformas");
      setListaPlataformas([]);
    }
  }
  fetchPlataformas();
}, []);

  // --- MANEJADORES ---

  // 'keyof CursoFormState' asegura que solo pasemos nombres de campos válidos
  const handleChange = (name: keyof CursoFormState, value: string | number) => {
    
    // Validación de números negativos
    if ((name === "precio" || name === "horas")) {
        // Como value puede ser string o number, forzamos la comparación
        if(Number(value) < 0) return;
    }
    
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
      // Aquí construimos el objeto final con los tipos correctos para la BD
      const payload = {
        ...curso,
        precio: Number(curso.precio),
        horas: Number(curso.horas),
        id_plataforma: Number(curso.id_plataforma)
      };

      await api.post("/cursos", payload);

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


  // Helper para mostrar el nombre de la plataforma
  // El ?. evita que explote si find devuelve undefined
  const nombrePlataformaSeleccionada = listaPlataformas.find(p => p.id_plataforma === curso.id_plataforma)?.nombre || "";

  return (
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

          {/* FECHA */}
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

          {/* SELECTOR DE PLATAFORMA */}
          <View style={styles.input}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableRipple onPress={() => setMenuVisible(true)}>
                    {/* View necesaria porque TextInput no acepta ref directamente del Menu a veces */}
                    <View pointerEvents="none">
                        <TextInput
                            label="Selecciona Plataforma"
                            value={nombrePlataformaSeleccionada}
                            mode="outlined"
                            editable={false}
                            right={<TextInput.Icon icon="chevron-down" />}
                            style={{ backgroundColor: '#fff' }}
                        />
                    </View>
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

      {/* DIÁLOGO */}
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
    elevation: 4, 
    shadowColor: '#000', 
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