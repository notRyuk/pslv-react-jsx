import React from 'react';
import NetworkComponent from '../../components/network';

const Index = () => {
  // Example data, replace with your actual data
  const connectedUsers = [
    { user: 'user1', imageUrl: '/images/user1.jpg', firstname: 'John', lastname: 'Doe', bio: 'Web Developer' },
  ];

  const requests = [
    {
      from: { _id: 'user2', data: { imageUrl: '/images/user2.jpg', firstname: 'Jane', lastname: 'Doe', bio: 'Designer' } },
      to: { _id: 'user1' },
    },
    // Add more request data as needed
  ];

  const suggestions = [
    { user: 'user3', imageUrl: '/images/user3.jpg', firstname: 'Alice', lastname: 'Smith', bio: 'Software Engineer', institute: 'Tech University' },
    // Add more suggestion data as needed
  ];

  const user = { user: 'user1' }; // Replace with the actual user data

  const csrfToken = 'your_csrf_token'; // Replace with the actual CSRF token

  return (
    <NetworkComponent
      connectedUsers={connectedUsers}
      requests={requests}
      suggestions={suggestions}
      user={user}
      csrfToken={csrfToken}
    />
  );
};

export default Index;
