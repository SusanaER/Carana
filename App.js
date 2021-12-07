import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import Colors from "./constants/Colors";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import User from "./screens/Perfil";
import Products from "./screens/Products";
import Iniciales from './elements/Iniciales'
import Carrito from './screens/Cart';
import anillos from './elements/anillos';
import aretes from './elements/aretes';
import arracadas from './elements/arracadas';
import arracadasTriples from './elements/arracadasTriples';
import huggiess from './elements/Huggiess';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    );
};
const Screens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Productos" component={Products}/>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="User" component={User}/>
            <Stack.Screen name="Iniciales" component={Iniciales}/>
            <Stack.Screen name="Carrito" component={Carrito}/>
            <Stack.Screen name="Anillos" component={anillos}/>
            <Stack.Screen name="Aretes" component={aretes}/>
            <Stack.Screen name="Arracadas" component={arracadas}/>
            <Stack.Screen name="Triples" component={arracadasTriples}/>
            <Stack.Screen name="Huggies" component={huggiess}/>
            <Stack.Screen
                name="ToDoList"
                component={ToDoList}
                options={({ route }) => {
                    return {
                        title: route.params.title,
                        headerStyle: {
                            backgroundColor: route.params.color,
                        },
                        headerTintColor: "white",
                    };
                }}
            />
            <Stack.Screen
                name="Edit"
                component={EditList}
                options={({ route }) => {
                    return {
                        title: route.params.title
                            ? `Edit ${route.params.title} list`
                            : "Create new list",
                        headerStyle: {
                            backgroundColor: route.params.color || Colors.blue,
                        },
                        headerTintColor: "white",
                    };
                }}
            />
        </Stack.Navigator>
        
    );
};
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (firebase.auth().currentUser) {
            setIsAuthenticated(true);
        }
        firebase.auth().onAuthStateChanged((user) => {
            console.log("Checking auth state...");
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <Screens /> : <AuthScreens />}
        </NavigationContainer>
    );
}
