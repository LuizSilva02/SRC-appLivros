import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      router.push('/books/search');
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#666" // Cor do texto do placeholder em cinza
        placeholder="Digite seu nome de usuário" // Alteração no placeholder para tornar mais informativo
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#666" // Cor do texto do placeholder em cinza
        placeholder="Digite sua senha" // Alteração no placeholder para tornar mais informativo
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fundo branco
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000', // Cor preta para os labels
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
    width: '100%', // Garante que o input ocupe toda a largura
  },
});

export default LoginScreen;
