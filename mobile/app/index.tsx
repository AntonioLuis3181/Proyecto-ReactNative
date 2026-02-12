import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const colors = {
    bgLight: '#f8fafc',    
    primary: '#2563eb',    
    textDark: '#1f2937',   
    textGray: '#4b5563',   
    textLight: '#64748b',  
    border: '#e5e7eb',     
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        
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
        </View>

        <View style={styles.featuresContainer}>
          
          <FeatureItem 
            icon="book-open-variant" 
            title="Contenido Actualizado" 
            desc="Cursos revisados cada semana para estar al día con las últimas tecnologías."
            colors={colors}
          />

          <FeatureItem 
            icon="school" 
            title="Certificados Oficiales" 
            desc="Al terminar cada módulo, obtendrás un certificado digital profesional."
            colors={colors}
          />

          <FeatureItem 
            icon="console" 
            title="Prácticas Reales" 
            desc="Proyectos prácticos basados en desafíos reales de la industria tech."
            colors={colors}
          />

        </View>
        
        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureProps {
    icon: string;
    title: string;
    desc: string;
    colors: any;
}

function FeatureItem({ icon, title, desc, colors }: FeatureProps) {
    return (
        <View style={styles.featureItem}>
            <IconButton icon={icon} iconColor={colors.primary} size={40} />
            <Text style={[styles.featureTitle, { color: colors.textDark }]}>{title}</Text>
            <Text style={[styles.featureText, { color: colors.textLight }]}>
              {desc}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  heroTitle: {
    fontSize: 32,
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
    marginBottom: 40,
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