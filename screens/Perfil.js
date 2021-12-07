import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableHighlight, ToastAndroid, Alert} from 'react-native'
import { firestore, auth } from "firebase/app"
import firebase from "firebase/app"
import { Avatar, Button } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import Colors from "../constants/Colors"

const Perfil = () => {
  const navigation = useNavigation()

  const [Pic, setPic] = React.useState('')

  const setToastMessage = msg => {ToastAndroid.showWithGravity(
    msg, 
    ToastAndroid.SHORT, 
    ToastAndroid.CENTER,
  )}

  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    }
    launchImageLibrary(options, response => {
      if(response.didCancel){
        setToastMessage('Cancelled Imaged Selection')
      }else if(response.errorCode == 'permission'){
        setToastMessage('permission not satisfied')
      }else if(response.errorCode == 'other'){
        setToastMessage(response.errorMessage)
      }else if(response.assets[0].fileSize > 2097152){
        Alert.alert('Maximum image size exceded', 'Please choose image under 2 MB', [{text:'OK'}])
      }else {
        setPic(response.assets[0].base64)
      }
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.centerContet}>
        <TouchableHighlight 
          onPress={()=>uploadImage()}
          underlayColor='rgba(0,0,0,0)'
        >
          <Avatar.Image 
            size={100}
            source={require('../assets/user.png')}
          />
        </TouchableHighlight>
      </View>

      <View style={[styles.centerContet,{marginTop: 25, flexDirection: 'row'}]}>
        <Button mode='contained' onPress={()=>uploadImage()} style={{backgroundColor: Colors.pink}}>
          Upload Image
        </Button>
        <Button mode='contained' onPress={()=>uploadImage()} style={{marginLeft: 20, backgroundColor: Colors.pink}}>
          Remove Image
        </Button>
      </View>
      <View style={[styles.centerContet]}> 
      <Text style={[styles.colorText]}>Email: {firebase.auth().currentUser.email}</Text>
      </View>

      <View style={{ flex: 1, backgroundColor: "white" }}>
             <Button mode='contained' onPress={() => {auth().signOut();}} style={{marginTop: 10, backgroundColor: Colors.pink}}>
                 Log out
             </Button>
        </View>
    </View>
  )
}

export default Perfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  centerContet: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  colorText: {
    fontSize: 20,
    color: '#AE4444',
  },
})
