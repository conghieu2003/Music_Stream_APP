import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateFeedback = ({ route, navigation }) => {
  const { addFeedback, user } = route.params; // Nhận hàm addFeedback và thông tin user
  const [track, setTrack] = useState('');
  const [image, setImage] = useState(null);

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Xử lý gửi feedback
  const handleSubmit = () => {
    if (!track || !image) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin và chọn ảnh!');
      return;
    }

    const newPost = {
      user: user.name,
      avatar: user.avatar,
      track,
      time: 'Just now',
      plays: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      duration: '00:00',
      image,
      liked: false,
      shared: false,
      postComments: [],
    };

    addFeedback(newPost);
    navigation.goBack(); // Quay lại màn hình Feed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter track name"
        value={track}
        onChangeText={setTrack}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Pick Image'}
        </Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateFeedback;
