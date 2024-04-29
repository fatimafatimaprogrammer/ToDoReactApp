import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');


const TodoListScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT);'
      );
    });
    fetchTodos();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTodos();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchTodos = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM todos;', [], (_, { rows }) => {
        setTodos(rows._array);
      });
    });
  };

  const handleEditTodo = (id) => {
    navigation.navigate('TodoDetails', { id });
  };

  const renderTodoItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => handleEditTodo(item.id)}
      >
        <Text style={styles.todoNumber}>{index + 1}.</Text>
        <Text style={styles.todoText}>{item.task}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        style={styles.button}
        title="Add New Task"
        onPress={() => navigation.navigate('TodoDetails')}
        color="#000000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  todoNumber: {
    marginRight: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    marginBottom: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default TodoListScreen;
