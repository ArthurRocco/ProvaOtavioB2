import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const tratarRegistro = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError('Erro ao tentar registrar. Verifique os dados informados.');
    } else {
      setError('');
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Crie sua conta</Text>
        <Text style={styles.subheader}>Insira seu e-mail e crie uma senha.</Text>

        <TextInput
          label="E-mail"
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
        <TextInput
          label="Confirmar Senha"
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Button to create account */}
        <Button
          mode="contained"
          onPress={tratarRegistro}
          style={styles.primaryButton}
          labelStyle={styles.primaryButtonLabel}
        >
          Criar Conta
        </Button>

        {/* Button to go back to login */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Já tem uma conta?</Text>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryButtonLabel}
          >
            Voltar para Login
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20, // Added margin to create space from the edges
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: width > 400 ? 28 : 24, // Larger font size for wider screens
    fontWeight: '700',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: width > 400 ? 30 : 20, // Adjust margin based on screen size
  },
  subheader: {
    fontSize: width > 400 ? 16 : 14, // Smaller font size on smaller screens
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: width > 400 ? 20 : 15, // Adjust margin for smaller screens
    paddingHorizontal: width > 400 ? 50 : 20, // Responsive padding
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: width > 400 ? 50 : 45, // Adjust height based on screen width
  },
  primaryButton: {
    width: '100%',
    paddingVertical: width > 400 ? 15 : 12, // Larger padding on bigger screens
    marginVertical: width > 400 ? 20 : 15, // Adjust margin for smaller screens
    backgroundColor: '#e74c3c', // Red button
    borderRadius: 8,
  },
  primaryButtonLabel: {
    fontSize: width > 400 ? 18 : 16, // Larger font for wider screens
    fontWeight: '500',
    color: '#fff',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: width > 400 ? 15 : 12,
    marginVertical: 10,
    borderColor: '#000', // Black border
    borderWidth: 1,
    borderRadius: 8,
  },
  secondaryButtonLabel: {
    fontSize: width > 400 ? 18 : 16, // Adjust font size
    fontWeight: '500',
    color: '#000', // Black text for the secondary button
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20, // Add some space at the bottom
  },
  linkText: {
    fontSize: width > 400 ? 14 : 12, // Adjust font size
    color: '#7f8c8d',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '500',
  },
});
