import React from 'react';
import GetUserDetails from '../../components/edit-details';

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
      <GetUserDetails role="student" user={mockUser} dob={mockDob} />
    </div>
  );
};

// export const layout = {
//   hasFooter: false,
//   hasHeader: false
// }

export default Index;
