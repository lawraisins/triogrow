const fetchPosts = async () => {
    try {
      const token = await _getToken();
      // console.log(userId)
      id = userId.userId
      const response = await fetch(`${backendURL}/posts/getOtherPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({userId}), // Pass userId as an object with a single property
      });
      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        // Update the state with the retrieved posts
        // console.log(data.content)
        setPosts(data.content)
        
      } else {
        console.error('Failed to retrieve posts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };