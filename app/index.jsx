import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function Index() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const router = useRouter();
  const style = createStyle(theme, colorScheme);

  // Add a new todo
  const AddTodo = () => {
    if (text.trim() === '') {
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      text: text.trim(),
      completed: false
    };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Enable editing for a specific todo
  const enableEditing = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editing: true, editText: todo.text } : todo
      )
    );
  };

  // Update a todo
  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: todo.editText.trim(), editing: false }
          : todo
      )
    );
  };

  // Update edit text for a specific todo
  const updateEditText = (id, text) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editText: text } : todo
      )
    );
  };

  const handleRoute = (id) => {
    router.push(`todos/${id}`);
  }


  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}
        pointerEvents='auto'
      >
        <Text style={style.headerText}>Todo App</Text>
        <Pressable onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}>
          {colorScheme === 'light'
            ? <MaterialCommunityIcons name="white-balance-sunny" size={36} color={theme.text} />
            : <MaterialCommunityIcons name="weather-sunny-off" size={36} color={theme.text} />
          }
        </Pressable>
      </View>
      <View style={style.inputContainer}>
        <TextInput
          placeholder='Add a new todo'
          placeholderTextColor={'gray'}
          style={style.input}
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={AddTodo} style={style.button}>
          <Text style={style.buttonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos.sort((a, b) => b.id - a.id)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.todoContainer}>
            {item.editing ? (
              <>
                <TextInput
                  style={style.editInput}
                  value={item.editText}
                  onChangeText={(text) => updateEditText(item.id, text)}
                />
                <Pressable onPress={() => updateTodo(item.id)}>
                  <Text style={style.updateText}>Update</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => toggleTodo(item.id)} style={style.todoText}>
                  <Text style={[ style.todoText, item.completed && style.completed ]}>{item.text}</Text>
                </Pressable>
                <Pressable onLongPress={()=> handleRoute(item.id)} onPress={() => enableEditing(item.id)}>
                  <FontAwesome5 name="edit" size={26} color="green" />
                </Pressable>
                <Pressable onPress={() => deleteTodo(item.id)}>
                  <MaterialCommunityIcons name="delete-circle-outline" size={36} color="red" />
                </Pressable>
              </>
            )}
          </View>

        )}
      />
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
    </SafeAreaView>
  );
}

const createStyle = (theme, colorScheme)=> {
  return StyleSheet.create({
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.acent,
      padding: 8,
      borderRadius: 5,
      marginRight: 10,
      color: theme.text,
    },
    container: {
      flex: 1,
      width: '100%',
      maxWidth: 1024,
      padding: 20,
      marginHorizontal: 'auto',
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      flex: 1,
      color: theme.text,
      textAlign: 'center',
      
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      maxWidth: 1024,
      marginTop: 20,
      marginBottom: 40,
      marginHorizontal: 'auto',
    },
    button: {
      backgroundColor: theme.buttonBackground,
      padding: 10,
      borderRadius: 5,
      width: 80,
      alignItems: 'center'
      
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    todoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      width: '100%',
      maxWidth: 1024,
      marginBottom: 10,
      marginHorizontal: 'auto',
      gap: 10,
      borderBottomColor: theme.acent,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderLeftColor: theme.acent,
    },
    completed: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
    todoText: {
      flex: 1,
      padding: 10,
      color: theme.text,
    },
    editInput: {
      flex: 1,
      padding: 10,
      borderWidth: 0,
      color: theme.text,
      borderBlockColor: theme.acent,
    },
    updateText: {
      backgroundColor: theme.buttonBackground,
      color: theme.buttonText,
      width: 80,
      padding: 10,
      borderRadius: 5,
      textAlign: 'center',
    },
  });  
};