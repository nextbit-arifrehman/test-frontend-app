import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {

    const user = useLoaderData();
    

    const handleUpdate = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updateuser = {name,email};
        console.log(updateuser);
        // update user info in the db

    fetch(`http://localhost:3000/users/${user._id}`,{
        method: 'PUT',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(updateuser)
    })
    .then(res => res.json())
    .then(data =>{
        if(data.modifiedCount){
            console.log('updated', data)
        }else {
        console.log('No update made');
    }
    })

    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <input type="text" name='name' className='bg-amber-100 text-black '  defaultValue={user.name} /> <br />
                <input type="text" name='email'className='text-black bg-amber-100 m-4 ' defaultValue={user.email} /> <br />
                <input type="submit" value='UpdateUser' className='bg-white text-black'  />
            </form>
        </div>
    );
};

export default UpdateUser;