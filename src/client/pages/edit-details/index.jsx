import React from 'react';
import GetUserDetails from '../../components/edit-details';
import Protected from '../../components/auth/Protected'

const Index = () => {
  // Mock data for demonstration
  const mockUser = {
    firstname: 'John',
    lastname: 'Doe',
    age: 25,
    workplace: 'ABC Company',
    imageUrl: 'https://example.com/profile-image.jpg',
  };

  const mockDob = '1998-05-15'; // Example date of birth

  return (
    <div>
      <Protected>
      <GetUserDetails role="student" user={mockUser} dob={mockDob}/>
      </Protected>
    </div>
  );
};

export default Index;
