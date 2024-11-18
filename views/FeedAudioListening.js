import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const FeedScreen = () => {
  const initialPosts = [
    {
      id: 1,
      user: 'Jessica Gonzalez',
      avatar: require('../images/Feed/Avatar4.png'),
      track: 'FLOWER',
      time: '3d',
      plays: 125,
      likes: 20,
      comments: 3,
      shares: 1,
      duration: '05:15',
      image: require('../images/Feed/Image93.png'),
      liked: false,
      shared: false,
      postComments: [],
    },
    // Thêm các bài viết khác nếu cần...
  ];

  const [posts, setPosts] = useState(initialPosts);
  const navigation = useNavigation();

  // Xử lý thích bài viết
  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Xử lý chia sẻ bài viết
  const handleShare = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          shared: !post.shared,
          shares: post.shared ? post.shares - 1 : post.shares + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Xử lý chuyển sang màn hình FeedComment
  const handleComment = (postId) => {
    const post = posts.find((post) => post.id === postId);
    navigation.navigate('FeedComment', {
      postId: postId,
      postComments: post.postComments,
      addComment: (postId, commentText) => {
        const newComment = {
          user: 'Your Name', // Thay bằng tên người dùng thực tế
          text: commentText,
          time: 'Just now',
        };
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              postComments: [...post.postComments, newComment],
              comments: post.comments + 1,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <View key={post.id} style={styles.post}>
          <View style={styles.header}>
            <Image source={post.avatar} style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.user}>{post.user}</Text>
              <Text style={styles.time}>Posted a track • {post.time}</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image source={post.image} style={styles.image} />
            <View style={styles.imageOverlay}>
              <Text style={styles.track}>{post.track}</Text>
              <View style={styles.footer}>
                <Text style={styles.userOverlay}>{post.user}</Text>
                <View style={styles.playsContainer}>
                  <Text style={styles.plays}>{post.plays}</Text>
                  <Ionicons name="play-outline" size={16} color="#fff" />
                  <Text style={styles.duration}>• {post.duration}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
              <Ionicons
                name={post.liked ? 'heart' : 'heart-outline'}
                size={20}
                color={post.liked ? 'red' : '#000'}
              />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
              <Ionicons name="chatbubble-outline" size={20} color="#000" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(post.id)}>
              <Ionicons
                name={post.shared ? 'share' : 'share-outline'}
                size={20}
                color={post.shared ? 'green' : '#000'}
              />
              <Text style={styles.actionText}>{post.shares}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  post: {
    margin: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  track: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  userOverlay: {
    fontSize: 14,
    color: '#fff',
    marginRight: 10,
  },
  playsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plays: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  duration: {
    fontSize: 14,
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    marginLeft: 5,
  },
  moreButton: {
    marginLeft: 'auto',
  },
});

export default FeedScreen;
