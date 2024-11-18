import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const tratarLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email ou senha incorretos. Por favor, tente novamente.');
    } else {
      setError('');
      navigation.navigate('Grupos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Olá novamente!</Text>
        <Text style={styles.subheader}>Que bom que você retornou. Faça seu login para prosseguirmos:</Text>

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Botões reorganizados */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={tratarLogin}
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonLabel}
          >
            Entrar
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Cadastro')}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryButtonLabel}
          >
            Cadastro
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window'); // Pega as dimensões da tela

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20, // Margem responsiva dos cantos
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: width > 400 ? 28 : 24, // Tamanho da fonte maior em telas maiores
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  subheader: {
    fontSize: width > 400 ? 18 : 16, // Tamanho da fonte menor em telas pequenas
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 15,
    backgroundColor: '#e74c3c', // Vermelho
    borderRadius: 8,
  },
  primaryButtonLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderColor: '#000', // Preto
    borderWidth: 1,
    borderRadius: 8,
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000', // Preto
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20, // Espaço para os botões
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
});
