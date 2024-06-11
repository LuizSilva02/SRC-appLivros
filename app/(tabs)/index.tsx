// app/(tabs)/index.tsx
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/auth/login" style={styles.button}>
        Ir para Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fundo branco
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
});
