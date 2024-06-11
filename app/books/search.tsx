import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Definindo tipos para os dados de livros
type Book = {
  key: string;
  title: string;
  author_name?: string[];
  subject?: string[];
};

type Work = {
  key: string;
  title: string;
  authors?: { name: string }[];
  subject?: string[];
};

const BookSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('');
  const [books, setBooks] = useState<Book[] | Work[]>([]);
  const router = useRouter();

  const searchBooks = async () => {
    let url = '';
    if (searchType === 'author') {
      url = `https://openlibrary.org/search.json?author=${query}`;
    } else if (searchType === 'genre') {
      url = `https://openlibrary.org/subjects/${query}.json`;
    } else if (searchType === 'title') {
      url = `https://openlibrary.org/search.json?title=${query}`;
    }
    try {
      const response = await axios.get(url);
      if (searchType === 'genre') {
        setBooks(response.data.works || []);
      } else {
        setBooks(response.data.docs || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Book | Work }) => {
    const bookItem = item as Book;
    const workItem = item as Work;

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{bookItem.title || workItem.title}</Text>
        {bookItem.author_name ? (
          <Text style={styles.itemSubtitle}>{bookItem.author_name.join(', ')}</Text>
        ) : (
          workItem.authors && (
            <Text style={styles.itemSubtitle}>{workItem.authors.map(author => author.name).join(', ')}</Text>
          )
        )}
        {(bookItem.subject || workItem.subject) && (
          <Text style={styles.itemSubtitle}>{(bookItem.subject || workItem.subject)?.join(', ')}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Digite sua busca"
      />
      <View style={styles.buttonContainer}>
        <Button title="Pesquisar por Autor" onPress={() => { setSearchType('author'); searchBooks(); }} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Pesquisar por Gênero" onPress={() => { setSearchType('genre'); searchBooks(); }} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Pesquisar por Nome do Livro" onPress={() => { setSearchType('title'); searchBooks(); }} />
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        style={styles.flatList}
      />
      <Button title="Voltar para Home" onPress={() => router.push('/')} />
    </View>
  );
};


// Estilos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // Fundo branco
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  flatList: {
    backgroundColor: '#ffffff', // Fundo branco
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookSearchScreen;
