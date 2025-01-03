import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../context/ThemeContext";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditScreen = () => {
    const { id } = useLocalSearchParams();
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const [todo, setTodo] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem('todos');
                const data = jsonValue != null ? JSON.parse(jsonValue) : null;
                if (data) {
                    const todo = data.find((todo) => todo.id.toString() === id);
                    setTodo(todo);
                }
            } catch (error) {
                console.error(error);
            }
            };
            fetchData(id);
        }, [id]);

        const handleSave = async () => {
            try {
                const saveTodo = { ...todo, title: todo.title };
                const jsonValue = await AsyncStorage.setItem
            } catch (error) {
                console.error(error);
                
            }
        }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Editing todo with id: {id}</Text>
            </View>
        </SafeAreaView>
    );
}

export default EditScreen;