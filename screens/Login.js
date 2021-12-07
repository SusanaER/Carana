import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import Colors from "../constants/Colors";
import validator from "validator";
import { auth } from "../firebase";
import styled from 'styled-components/native';

const StyledView = styled.View`
    flex: 1px;
    background-Color: #fff;
    justify-Content: space-between;
    align-Items: stretch;
`;
const validateFields = (email, password) => {
    const isValid = {
        email: validator.isEmail(email),
        password: validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    };

    return isValid;
};

const login = (email, password) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Logged in!");
        });
};

const createAccount = (email, password) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            console.log("Creating user...");
            //firestore().collection("users").doc(user.uid).set({});
        });
};

export default () => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [emailField, setEmailField] = useState({
        text: "",
        errorMessage: "",
    });
    const [passwordField, setPasswordField] = useState({
        text: "",
        errorMessage: "",
    });
    const [passwordReentryField, setPasswordReentryField] = useState({
        text: "",
        errorMessage: "",
    });

    return (
        <StyledView>
            <Text style={styles.header}>Carana</Text>
            <View style={{ flex: 1 }}>
                <LabeledInput
                    label="Email"
                    text={emailField.text}
                    onChangeText={(text) => {
                        setEmailField({ text });
                    }}
                    errorMessage={emailField.errorMessage}
                    labelStyle={styles.label}
                    autoCompleteType="email"
                />
                <LabeledInput
                    label="Password"
                    text={passwordField.text}
                    onChangeText={(text) => {
                        setPasswordField({ text });
                    }}
                    secureTextEntry={true}
                    errorMessage={passwordField.errorMessage}
                    labelStyle={styles.label}
                    autoCompleteType="password"
                />
                {isCreateMode && (
                    <LabeledInput
                        label="Re-enter Password"
                        text={passwordReentryField.text}
                        onChangeText={(text) => {
                            setPasswordReentryField({ text });
                        }}
                        secureTextEntry={true}
                        errorMessage={passwordReentryField.errorMessage}
                        labelStyle={styles.label}
                    />
                )}
                <TouchableOpacity
                    onPress={() => {
                        setCreateMode(!isCreateMode);
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            color: '#dead17',
                            fontSize: 16,
                            margin: 4,
                        }}
                    >
                        {isCreateMode
                            ? "Already have an account?"
                            : "Create new account"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Button
                onPress={() => {
                    const isValid = validateFields(
                        emailField.text,
                        passwordField.text
                    );
                    let isAllValid = true;
                    if (!isValid.email) {
                        emailField.errorMessage = "Please enter a valid email";
                        setEmailField({ ...emailField });
                        isAllValid = false;
                    }

                    if (!isValid.password) {
                        passwordField.errorMessage =
                            "Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters";
                        setPasswordField({ ...passwordField });
                        isAllValid = false;
                    }

                    if (
                        isCreateMode &&
                        passwordReentryField.text != passwordField.text
                    ) {
                        passwordReentryField.errorMessage =
                            "Passwords do not match";
                        setPasswordReentryField({ ...passwordReentryField });
                        isAllValid = false;
                    }

                    if (isAllValid) {
                        isCreateMode
                            ? createAccount(emailField.text, passwordField.text)
                            : login(emailField.text, passwordField.text);
                    }
                }}
                buttonStyle={{ backgroundColor: Colors.pink }}
                text={isCreateMode ? "Create Account" : "Login"}
            />
        </StyledView>
    );
};

const styles = StyleSheet.create({
    label: { fontSize: 16, fontWeight: "bold", color: Colors.black },
    header: { fontSize: 60, color: Colors.pink, alignSelf: "center" },
});
