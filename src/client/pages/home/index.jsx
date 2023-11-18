import React from 'react';
import HomeComponent from '../../components/home';
import Protected from '../../components/auth/Protected'

const IndexPage = () => {
  // Demo data (replace this with your actual data)
  const demoData = {
    role: 'user', // or 'admin'
    user: {
      imageUrl: 'path/to/user/image.jpg',
      firstname: 'John',
      lastname: 'Doe',
      bio: 'Lorem ipsum',
      institute: 'Lorem Institute',
      // Add other user data as needed
    },
    connection: 10, // Replace with actual connection count
    users: [
      // Array of user objects for suggestions
      {
        user: 'user1',
        imageUrl: 'path/to/user1/image.jpg',
        firstname: 'User',
        lastname: 'One',
        bio: 'Bio for User One',
      },
      // Add more user objects as needed
    ],
    posts: [
      // Array of post objects
      {
        postDetails: {
          _id: 'post1',
          user: {
            imageUrl: 'path/to/post/user/image.jpg',
            firstname: 'Post',
            lastname: 'User',
            bio: 'Bio for Post User',
          },
          caption: 'Post caption',
          imageUrl: 'path/to/post/image.jpg',
          postedby: 'user1',
          postResponse: {
            likes: {
              numLikes: 5, // Replace with actual like count
            },
          },
        },
        userDetails: [
          // Array of user objects who liked the post
          {
            imageUrl: 'path/to/liker/image.jpg',
            firstname: 'Liker',
            lastname: 'One',
            bio: 'Bio for Liker One',
          },
          // Add more liker objects as needed
        ],
        commentDetails: [
          // Array of comment objects
          {
            _id: 'comment1',
            commentUser: {
              imageUrl: 'path/to/commenter/image.jpg',
              firstname: 'Commenter',
              lastname: 'One',
              bio: 'Bio for Commenter One',
            },
            comment: 'Comment text',
          },
          // Add more comment objects as needed
        ],
      },
      // Add more post objects as needed
    ],
  };

  return (
    <Protected>
      <HomeComponent
      role={demoData.role}
      user={demoData.user}
      connection={demoData.connection}
      csrfToken={demoData.csrfToken}
      users={demoData.users}
      posts={demoData.posts}
    />
    </Protected>
  );
};

export default IndexPage;
