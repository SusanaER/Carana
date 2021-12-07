import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    onSnapshot,
    addDoc,
    removeDoc,
    updateDoc,
} from "../services/collections";
import { firestore, auth } from "firebase/app";
import styled from 'styled-components/native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const renderAddListIcon = (navigation, addItemToLists) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
            style={{ justifyContent: "center", marginRight: 15}}
            onPress={() => navigation.navigate("Carrito")}
            >
                <Ionicons style={{color: "#dead17"}} name="cart" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
            style={{ justifyContent: "center", marginRight: 15 }}
            onPress={() => navigation.navigate("User")}
            >
                <Ionicons style={{color: "#dead17"}} name="person-circle-outline" size={25} />
            </TouchableOpacity>
        </View>
    );
};

export default ({ navigation }) => {
    const [lists, setLists] = useState([]);
    const listsRef = firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("lists");

    useEffect(() => {
        onSnapshot(
            listsRef,
            (newLists) => {
                setLists(newLists);
            },
            {
                sort: (a, b) => {
                    if (a.index < b.index) {
                        return -1;
                    }

                    if (a.index > b.index) {
                        return 1;
                    }

                    return 0;
                },
            }
        );
    }, []);

    const addItemToLists = ({ title, color }) => {
        const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
        addDoc(listsRef, { title, color, index });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(navigation, addItemToLists),
        });
    });

    return (
        <ScrollView>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Iniciales")} style={styles.top}>
                    <Card style={styles.backColor}>
                        <Card.Content>
                            <Title>Iniciales - Acero inoxidable</Title>
                            <Paragraph>Precio: $99 c/u</Paragraph>
                        </Card.Content>
                        <Card.Cover source={require('../assets/ImgCarana/Iniciales.jpg')} />
                        <Card.Actions>

                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Anillos")}>
                    <Card style={styles.backColor}>
                        <Card.Content>
                            <Title>Anillos ajustables - Oro laminado</Title>
                            <Paragraph>Precio: $90 c/u </Paragraph>
                        </Card.Content>
                        <Card.Cover source={require('../assets/ImgCarana/Anillos.jpg')} />
                        <Card.Actions>

                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Aretes")}>
                    <Card style={styles.backColor}>
                        <Card.Content>
                            <Title>Aretes - Acero inoxidable</Title>
                            <Paragraph>Precio: $120 </Paragraph>
                        </Card.Content>
                        <Card.Cover source={require('../assets/ImgCarana/Aretes.jpg')} />
                        <Card.Actions>
                            
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Arracadas")}>
                    <Card style={styles.backColor}>
                        <Card.Content>
                            <Title>Arracadas - Acero inoxidable</Title>
                            <Paragraph>Precio: $69</Paragraph>
                        </Card.Content>
                        <Card.Cover source={require('../assets/ImgCarana/Arracadas.jpg')} />
                        <Card.Actions>

                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Triples")}>
                    <Card style={styles.backColor}>
                        <Card.Content>
                            <Title>Arracada triple - Acero inoxidable</Title>
                            <Paragraph>Precio: $99 </Paragraph>
                        </Card.Content>
                        <Card.Cover source={require('../assets/ImgCarana/ArracadaTriple.jpg')} />
                        <Card.Actions>
                            
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Huggies")}>
                    <Card style={styles.backColor}>
                        <Card.Content>
                            <Title>Huggies - Acero inoxidable</Title>
                            <Paragraph>Precio: $89 </Paragraph>
                        </Card.Content>
                        <Card.Cover source={require('../assets/ImgCarana/Huggies.jpg')} />
                        <Card.Actions>

                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    backColor: {
        borderColor: "#dead17",
        borderBottomWidth: 3,
    },
    top: {
        borderColor: "#dead17",
        borderTopWidth: 3,
    }
});
