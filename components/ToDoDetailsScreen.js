import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');

const TodoDetailsScreen = ({ navigation, route }) => {
  const [task, setTask] = useState('');
  const { id } = route.params || {};

  
  useEffect(() => {
    if (id) {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT task FROM todos WHERE id = ?;',
          [id],
          (_, { rows }) => {
            if (rows.length > 0) {
              setTask(rows.item(0).task);
            }
          }
        );
      });
    }
  }, [id]);

  const handleSave = () => {
    if (task.trim() === '') {
      return;
    }

    if (id) {
      db.transaction((tx) => {
        tx.executeSql('UPDATE todos SET task = ? WHERE id = ?;', [task, id]);
      });
    } else {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO todos (task) VALUES (?);', [task]);
      });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (id) {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM todos WHERE id = ?;', [id]);
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <View style={styles.buttonContainer}>
        {id && (
          <Button
            title="Delete"
            onPress={handleDelete}
            color="#FF0000"
          />
        )}
        <Button
          title={id ? 'Update' : 'Add'}
          onPress={handleSave}
          color="#000000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TodoDetailsScreen;
