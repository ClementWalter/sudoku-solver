import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  camera: {
    width: "100%",
    height: "90%",
  },
  buttonFlip: {
    marginLeft: 10,
    marginTop: 10,
    width: 80,
    borderRadius: 6,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: 'white'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonPicture: {
    position: 'absolute',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
    height: 90,
    alignSelf: 'center',
    bottom: 0,
    marginBottom: 20,
    borderColor: 'white',
    borderWidth: 5,
  },
})

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ref={ref => { camera = ref; }} style={styles.camera} type={type}>
        <View style={styles.buttonFlip}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonPicture}
          onPress={async () => {
            if (camera) {
              let photo = await camera.takePictureAsync()
              console.log(photo)
              setPreviewVisible(true)
              setCapturedImage(photo)
            }
          }}>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}
