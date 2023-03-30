import React, { useState, useEffect } from "react";
import main from '../asserts/ellipse_105.png';
import '../styles/App.css';

function Profile({ userId }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window
      .fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: "갔냐"
        }),
      })
      .then((res) => res.json())
      .then((user) => {
        user = {
          "id": "daechul",
          "email": "eocjf4701@gmail.com",
          "name": "박대철",
          "phone": "010-8525-0152",
          "website": "eocjf4701@github.com",
        };
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <header>Edit Profile
        <img src={main} className='profile' />
      </header>
      <ul>
        <li>id: {user.id}</li>
        <li>email: {user.email}</li>
        <li>name: {user.name}</li>
        <li>phone: {user.phone}</li>
        <li>website: {user.website}</li>
      </ul>
    </>
  );
}

export default Profile;