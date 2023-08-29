import React, { useState, useEffect, useRef, FC } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';

import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';

export const PlayerCamera: FC<{
  onBack: () => void;
  setPhoto: (photo: CameraCapturedPicture) => void;
}> = ({ onBack, setPhoto }) => {
  const cameraRef = useRef<Camera>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission?.granted) {
    return null;
  }

  const takePicture = async (): Promise<void> => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  return previewVisible && capturedImage ? (
    <ImageBackground source={{ uri: capturedImage.uri }} style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column', padding: 15, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => setPreviewVisible(false)}
            style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Re-take</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPhoto(capturedImage);
              onBack();
            }}
            style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>save photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  ) : (
    <Camera
      style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1000 }}
      type={type}
      ref={cameraRef}
    >
      <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
        <View style={{ position: 'absolute', top: '5%', right: '5%' }}>
          <TouchableOpacity onPress={onBack}>
            <Text style={{ color: '#fff', fontSize: 20 }}>X</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: 'absolute', top: '5%', left: '5%' }}
          onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff',
              }}
            />
          </View>
        </View>
      </View>
    </Camera>
  );
};
