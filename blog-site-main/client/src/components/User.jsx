import React from 'react'

function User({user ,logoutHandler,showlogout}) {
    return (
        <>
            <div className=" blog__author">
                <img className='user__photoURL' src={user.photoURL} alt="user photo" />
                <div className="user__details">
                    <h4>{user.displayName}</h4>
                    <p>{user.email}</p>
                </div>
              {  showlogout ?   <i onClick={() => logoutHandler()} class='bx bx-log-out logout__icon'></i> :<i></i>}
            </div>
          
        </>
    )
}

export default User