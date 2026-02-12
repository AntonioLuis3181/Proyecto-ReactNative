import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Title style={styles.title}>¡Bienvenido a Cursos App!</Title>
          <Paragraph>Gestiona tus cursos de forma rápida y sencilla.</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={() => navigation.navigate('Listado')}>
            Ver Listado
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('Alta')}>
            Nuevo Curso
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  card: { marginBottom: 20 },
  title: { marginTop: 10, fontWeight: 'bold' },
  actions: { justifyContent: 'space-around', marginTop: 10 }
});