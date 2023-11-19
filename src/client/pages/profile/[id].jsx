// import React from 'react'
// import ProfileComponent from '../../components/profile'
// const index = () => {
//   return (
//       <ProfileComponent />
//   )
// }

// export default index

import React from 'react'
import ProfileComponent from '../../components/profile'
import Protected from '../../components/auth/Protected';

const Index = () => {
  // Mock data for demonstration purposes
  const mockUser = {
    imageUrl: 'path/to/image.jpg',
    firstname: 'John',
    lastname: 'Doe',
    role: 'student',
    bio: 'A short bio about John Doe.',
    workplace: 'Company ABC',
    institute: 'University XYZ',
    joinYear: 2018,
    passYear: 2022,
  };

  const mockContact = {
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  const mockAddress = {
    address: '123 Main St',
    city: 'Cityville',
    pincode: '12345',
    state: 'Stateville',
    country: 'Countryland',
  };

  const mockSkills = [{ skill: 'JavaScript' }, { skill: 'React' }, { skill: 'Node.js' }];
  const mockInterests = [{ interest: 'Reading' }, { interest: 'Traveling' }, { interest: 'Coding' }];

  const mockProps = {
    user: mockUser,
    usermain: { role: 'student' },
    contact: mockContact,
    address: mockAddress,
    connection: 100, // Replace with the actual connection count
    job: 5, // Replace with the actual job count
    others: false,
    post: [], // Replace with the actual post data
    postImpression: 200, // Replace with the actual post impression count
    aboutData: 'A short description about John Doe.', // Replace with the actual about data
    skills: mockSkills,
    interests: mockInterests,
    users: [], // Replace with the actual user dat
  };

  return (
    <>
      <Protected>
        <ProfileComponent {...mockProps} />
      </Protected>
    </>
  );
};

export default Index;
