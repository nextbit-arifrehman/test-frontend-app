import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({userPromise}) => {

const loadedUser = use(userPromise);
const [users,setUsers] =useState(loadedUser);

const handleAddUser = e =>{
    e.preventDefault();
   const name = e.target.name.value;
   const email = e.target.email.value;
   const newUser ={name,email}
   console.log(newUser);

//    create user in the db
 
fetch('https://test-backend-app-fjlv.onrender.com/users' , {
    method: 'POST',
    headers: {
        'content-type':'application/json'
    },
    body: JSON.stringify(newUser)
})
.then(res => res.json())
.then(data => {
    console.log('Data show after creating user in db',data)
    if(data.insertedId){

    newUser._id = data.insertedId;
    const newUsers = [...users,newUser];

    setUsers(newUsers);

    alert('User added Succesfully ')
    e.target.reset();
    }
})
}

const handleDelete = (_id) => {
console.log('Delete this user', _id)

fetch(`https://test-backend-app-fjlv.onrender.com/${_id}`,
{method: "DELETE"}
)
.then(res => res.json())
.then(data => {

    if(data.deletedCount){
    const remainingUsers =users.filter(user =>user._id !== _id);
    
    setUsers(remainingUsers);
       console.log(data)
}
})
}

    return (
        <div>
            {/* add user */}
            <h3>Users: {users.length}</h3>

            <form onSubmit={handleAddUser}>
             <input type="text" name='name' className='bg-amber-100 text-black '/>
              <br />
             <input type="email" name='email' className='bg-amber-100 text-black m-4 ' />
              <br />
             <input type="submit" value='Add User' className='bg-green-500 mt-4' />
            </form>

            <div >
                {
                    users.map(user => <p 
                        key={user._id}>
                        {user.name}: {user.email}
                        <br />
                        <Link  to={`/users/${user._id}`}>Details</Link>
                         <Link className='m-4'  to={`/update/${user._id}`}>Edit</Link>
                        <button  onClick={() => handleDelete(user._id)}>X</button>
                        </p>)
                }
            </div>
        </div>

    );
};

export default Users;