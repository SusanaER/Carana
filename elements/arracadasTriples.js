
import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { firestore, auth } from "firebase/app";
import { onSnapshot, addDoc, } from "../services/collections";

const renderAddListIcon = (navigation, addItemToLists) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
            style={{ justifyContent: "center", marginRight: 15 }}
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

function addCarrito(){
    
}

export default ({ navigation, route }) => {
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
    <View style={{ flex: 1 }}>
        <Card style={styles.backColor}>
            <Card.Cover style={styles.backColorTop} source={require('../assets/ImgCarana/ArracadaTriple.jpg')} />
            <Card.Actions style={styles.backColorTop}></Card.Actions>
            <Card.Content>
            <Title>Arracada triple - Acero inoxidable</Title>
            <Paragraph>Precio: $99 </Paragraph>
            </Card.Content>
        </Card>
        <View style={styles.ViewDescription}>
            <Text style={styles.txtDescriptionTitle}>Descripción:</Text>
            <Text style={styles.txtDescription}>
            Arracadas Statement doradas de aleación son diseñadas con un material resistente y de larga duración que permite utilizarlas por mucho tiempo. Lo que las hace perfectas para regalo o alguna ocasión especial.
            </Text>
        </View>
        <TouchableOpacity style={styles.cartTouch} onPress={() => alert('Se guardó Arracadas Triples en el carrito')}>
            <Ionicons  style={styles.cart} name="cart" size={40} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backColor: {
        borderColor: "#dead17",
        borderBottomWidth: 3,
    },
    backColorTop: {
        borderColor: "#dead17",
        borderTopWidth: 3,
    },
    cart: {
        color: "#dead17",
        alignSelf: 'center',
    },
    cartTouch: {
        backgroundColor: "white",
        borderRadius: 15,
        borderColor: '#dead17',
        height: 45,
        width: '100%',
        alignContent: 'center',
        borderWidth: 2,
    },
    ViewDescription: {
        flex: 1,
        margin: 15,
    },
    txtDescriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    txtDescription: {
        fontSize: 20,
    },
    comprarTouch:{
        backgroundColor: "white",
        borderRadius: 15,
        borderColor: '#dead17',
        height: 45,
        width: '100%',
        alignContent: 'center',
        borderWidth: 2,
        marginBottom: 5,
    },
    txtCompar: {
        textAlign: 'center',
        fontSize: 25,
        color: '#dead17',
    }
});
