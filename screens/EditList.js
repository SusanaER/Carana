import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import ColorSelector from "../components/ColorSelector";
import Button from "../components/Button";
import styled from 'styled-components/native';

const StyledView = styled.View`
    flex: 1px;
    backgroundColor: #fff;
    padding: 5px;
    justifyContent: space-between;
`;

const colorList = [
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray",
];

export default ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params.title || "");
    const [color, setColor] = useState(route.params.color || Colors.blue);
    const [isValid, setValidity] = useState(true);

    return (
        <StyledView>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>List Name</Text>
                    {!isValid && (
                        <Text
                            style={{
                                marginLeft: 4,
                                color: Colors.red,
                                fontSize: 12,
                            }}
                        >
                            * List Name cannot be empty
                        </Text>
                    )}
                </View>
                <TextInput
                    underlineColorAndroid={"transparent"}
                    selectionColor={"transparent"}
                    autoFocus={true}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setValidity(true);
                    }}
                    placeholder={"New List Name"}
                    maxLength={30}
                    style={[styles.input, { outline: "none" }]}
                />
                <Text style={styles.label}>Choose Color</Text>
                <ColorSelector
                    onSelect={(color) => {
                        setColor(color);
                        navigation.dispatch(CommonActions.setParams({ color }));
                    }}
                    selectedColor={color}
                    colorOptions={colorList}
                />
            </View>
            <Button
                text="Save"
                onPress={() => {
                    if (title.length > 1) {
                        route.params.saveChanges({ title, color });
                        navigation.dispatch(CommonActions.goBack());
                    } else {
                        setValidity(false);
                    }
                }}
            />
        </StyledView>
    );
};

const styles = StyleSheet.create({
    container: {
        
    },
    input: {
        color: Colors.darkGray,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 30,
        fontSize: 24,
    },
    saveButton: {
        borderRadius: 25,
        backgroundColor: Colors.darkGray,
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: Colors.black,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
});
