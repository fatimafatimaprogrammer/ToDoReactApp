import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from './components/ToDoListScreen';
import TodoDetailsScreen from './components/ToDoDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{ title: 'Todo List' }}
        />
        <Stack.Screen
          name="TodoDetails"
          component={TodoDetailsScreen}
          options={{ title: 'Todo Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
};

export default App;
