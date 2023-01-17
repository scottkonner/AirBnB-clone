import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import Navigation from "../Navigation";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [errors, setErrors] = useState([]);
  const [isDemo, setIsDemo] =useState(false)
  useEffect(() => {if ((isDemo) && (credential === 'Demo-lition') && (password === 'password')) {makeLoginRequest()}}, [isDemo, credential, password] )

  if (sessionUser) return (
    <Redirect to="/" />
  );



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const makeLoginRequest = () => {return dispatch(sessionActions.login({ credential, password }))
  .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
  })
}
  // const demoLogin = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
  //   .catch(async (res) => {
  //     const data = await res.json();
  //     if (data && data.errors) setErrors(data.errors);
  //   });
  // }
const demoLogin = (e) => {
  e.preventDefault();
  setErrors([]);
  setIsDemo(true)

setCredential('Demo-lition')
setPassword('password')

}

  return (
    <div>
    <button onClick={ demoLogin } className='button-Demo '>Demo-User Login</button>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className='label'>
        Username or Email
        <input className='form-items'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='label'>
        Password
        <input className='form-items'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='button' type="submit">Log In</button>

    </form>
    </div>
  );
}

export default LoginFormPage;
