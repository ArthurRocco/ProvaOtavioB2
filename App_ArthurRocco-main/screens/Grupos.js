import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from './supabase';


export default function Grupos({ navigation }) {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os grupos do Supabase
  useEffect(() => {
    const fetchGrupos = async () => {
      const { data, error } = await supabase.from('Grupos').select('id, nome, imagem_url, descricao');

      if (error) {
        console.error('Erro ao buscar grupos:', error.message);
      } else {
        setGrupos(data || []);
      }
      setLoading(false);
    };

    fetchGrupos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Noticias em Destaque</Text>
      <Text style={styles.subHeader}>Últimas Notícias sobre o Flamengo </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#ff4500" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Renderizando o Card para cada grupo */}
          {grupos.length > 0 ? (
            grupos.map((grupo) => (
              <Card 
                key={grupo.id}
                title={grupo.nome} // Título do grupo
                imageUri={grupo.imagem_url || 'https://via.placeholder.com/150'} // URL da imagem
                subtitle={grupo.descricao || 'Sem descrição disponível'} // Descrição do grupo
              />
            ))
          ) : (
            <Text style={styles.noData}>Nenhuma noticia disponível no momento.</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'White', // Cor de fundo
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Cor do título
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});
