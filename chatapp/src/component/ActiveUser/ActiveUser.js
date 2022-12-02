import React from 'react';
import './ActiveUser.css';

const ActiveUser = ({user}) => {
  return (
      <div className='activeUserBox'>{ user }</div>
  )
}

export default ActiveUser
