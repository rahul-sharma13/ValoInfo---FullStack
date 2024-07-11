import React from 'react';
import { useSelector } from 'react-redux';
import SignOut from '../components/SignOut';

const Account = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <section>
      <div className='flex justify-center items-center mx-auto'>
        <div>
          {currentUser.email}
        </div>
        <div>
          <SignOut />
        </div>
      </div>
    </section>
  )
}

export default Account