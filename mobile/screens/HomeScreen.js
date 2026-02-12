import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  
  // Colores extraídos de tu código original
  const colors = {
    bgLight: '#f8fafc',    // Fondo del hero
    primary: '#2563eb',    // Azul eléctrico
    textDark: '#1f2937',   // Gris muy oscuro (Títulos)
    textGray: '#4b5563',   // Gris medio (Subtítulos)
    textLight: '#64748b',  // Gris claro (Descripciones)
    border: '#e5e7eb',     // Borde sutil
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        
        {/* --- HERO SECTION (La parte azul/gris de arriba) --- */}
        <View style={[styles.heroSection, { backgroundColor: colors.bgLight, borderBottomColor: colors.border }]}>
          
          <IconButton 
            icon="rocket-launch" 
            iconColor={colors.primary} 
            size={50} 
            style={{ margin: 0 }}
          />

          <Text style={[styles.heroTitle, { color: colors.textDark }]}>
            Impulsa tu carrera con{"\n"}
            <Text style={{ color: colors.primary }}>EduDAM</Text>
          </Text>

          <Text style={[styles.heroSubtitle, { color: colors.textGray }]}>
            Aprende programación, bases de datos y desarrollo móvil con los mejores expertos.
          </Text>

          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Listado')}
            buttonColor={colors.primary}
            contentStyle={{ paddingVertical: 8, paddingHorizontal: 16 }}
            style={{ borderRadius: 8, marginTop: 20 }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Ver catálogo de cursos
          </Button>
          
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Alta')}
            buttonColor={colors.primary}
            contentStyle={{ paddingVertical: 8, paddingHorizontal: 16 }}
            style={{ borderRadius: 8, marginTop: 20 }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Alta de Cursos
          </Button>
        </View>

        {/* --- FEATURES SECTION (Los 3 iconos de abajo) --- */}
        <View style={styles.featuresContainer}>
          
          {/* Item 1: Contenido Actualizado */}
          <View style={styles.featureItem}>
            <IconButton icon="book-open-variant" iconColor={colors.primary} size={40} />
            <Text style={[styles.featureTitle, { color: colors.textDark }]}>Contenido Actualizado</Text>
            <Text style={[styles.featureText, { color: colors.textLight }]}>
              Cursos revisados cada semana para estar al día con las últimas tecnologías y frameworks.
            </Text>
          </View>

          {/* Item 2: Certificados Oficiales */}
          <View style={styles.featureItem}>
            <IconButton icon="school" iconColor={colors.primary} size={40} />
            <Text style={[styles.featureTitle, { color: colors.textDark }]}>Certificados Oficiales</Text>
            <Text style={[styles.featureText, { color: colors.textLight }]}>
              Al terminar cada módulo, obtendrás un certificado digital para potenciar tu perfil profesional.
            </Text>
          </View>

          {/* Item 3: Prácticas Reales */}
          <View style={styles.featureItem}>
            <IconButton icon="console" iconColor={colors.primary} size={40} />
            <Text style={[styles.featureTitle, { color: colors.textDark }]}>Prácticas Reales</Text>
            <Text style={[styles.featureText, { color: colors.textLight }]}>
              Proyectos prácticos basados en desafíos reales del mundo laboral y la industria tech.
            </Text>
          </View>

        </View>
        
        {/* Espacio extra abajo para que no se corte */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingVertical: 60, // py: 10 aprox
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  heroTitle: {
    fontSize: 32, // Equivalente a 2.5rem aprox en móvil
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    lineHeight: 26,
  },
  featuresContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: 40, // Espacio entre items (simulando el Grid spacing)
    paddingHorizontal: 10,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  featureText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});