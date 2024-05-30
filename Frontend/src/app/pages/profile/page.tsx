import React from 'react';
import { getSession } from '@/action';
import { redirect } from 'next/navigation';
import LogoutForm from '@/app/(components)/LogoutForm';

const ProfilePage = async () => {
  const session = await getSession();

  if(!session.isLoggedIn) {
   
    redirect('/pages/login');
  }

  return (
    <div>
      <h2 className='text-white'>Profile Page</h2>
      <h1 className='text-white'>{session.email}</h1>
      <h1 className='text-white'>{session.userId}</h1>
      <h1 className='text-white'>{session.password}</h1>
      {session.isLoggedIn && <LogoutForm></LogoutForm>}
    </div>
  );
};

export default ProfilePage;
