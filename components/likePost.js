import { useEffect } from 'react';

export const updateLikedPostsStorage = (likedPostsStorage, setLikedPostsStorage) => {
  useEffect(() => {
    AsyncStorage.setItem('likedPosts', JSON.stringify(likedPostsStorage));
  }, [likedPostsStorage]);
};