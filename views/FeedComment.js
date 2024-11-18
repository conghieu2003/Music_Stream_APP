import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeedComment = ({ route, navigation }) => {
  const { postId, postComments, addComment } = route.params;
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      addComment(postId, commentText);
      setCommentText('');
      navigation.goBack(); // Quay lại màn hình FeedScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Comments</Text>
      <ScrollView style={styles.modalComments}>
        {postComments.map((comment, index) => (
          <Text key={index} style={styles.comment}>
            {comment.user}: {comment.text} ({comment.time})
          </Text>
        ))}
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <Ionicons name="send-outline" size={24} color="#1DB954" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalComments: {
    flex: 1,
  },
  comment: {
    fontSize: 16,
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1DB954',
    borderRadius: 20,
  },
});

export default FeedComment;
