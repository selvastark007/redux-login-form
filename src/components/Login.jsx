import React, { useState } from 'react';

// css
import './login.css';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};

    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    } else {
      // Regular expression to validate name input
      const nameRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{2,}$/;
      if (!name.match(nameRegex)) {
        validationErrors.name =
          'Name must have at least 2 characters, one number, and one symbol !';
      }
    }

    if (email.trim() === '') {
      validationErrors.email = 'Email is required';
    }

    if (password.trim() === '') {
      validationErrors.password = 'Password is required';
    }

    // Check if any validation errors occurred
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        login({
          name: name,
          email: email,
          password: password,
          loggedIn: true,
        })
      );
      setErrors({}); // Reset errors
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='login'>
      <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Here</h1>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className='error'>{errors.name}</p>} 
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className='error'>{errors.email}</p>} 
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        <button type='submit' className='submit__btn'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
