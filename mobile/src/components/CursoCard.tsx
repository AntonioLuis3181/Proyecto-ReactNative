import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Avatar, IconButton, Button, Chip } from 'react-native-paper';

export interface Curso {
  id_curso: number;
  titulo: string;
  precio: number;
  horas: number;
  imagen_url: string; 
  descripcion: string;

}

interface CursoCardProps {
  item: Curso;
  onDelete: (id: number) => void;
  onVerDetalle: (curso: Curso) => void;
}

const colors = {
  primary: '#2563eb',
  delete: '#B00020',
};

export function CursoCard({ item, onDelete, onVerDetalle }: CursoCardProps) {
  return (
    <Card style={styles.card} mode="elevated">
      
      <Card.Title
        title={item.titulo}
        titleVariant="titleMedium"
        titleStyle={{ fontWeight: 'bold', color: '#1f2937' }}
        subtitle={`ID: ${item.id_curso}`}
        
        left={(props) => (
          <Avatar.Icon 
            {...props} 
            icon="school" 
            style={{ backgroundColor: colors.primary }} 
            color="#fff"
            size={40}
          />
        )}
        
        right={(props) => (
          <IconButton
            {...props}
            icon="delete-outline"
            iconColor={colors.delete}
            onPress={() => onDelete(item.id_curso)}
          />
        )}
      />

      <Card.Content style={styles.content}>
        <View style={styles.infoRow}>
            <Chip icon="cash" style={styles.chip} textStyle={{ color: '#333'}}>
                {item.precio} €
            </Chip>
            <Chip icon="clock-time-four-outline" style={styles.chip} textStyle={{ color: '#333'}}>
                {item.horas} horas
            </Chip>
        </View>
        
        <Text variant="bodyMedium" style={styles.description}>
           Curso de especialización técnica.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3, 
  },
  content: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#f1f5f9'
  },
  description: {
    color: '#666',
    marginTop: 5,
    fontSize: 14
  }
});