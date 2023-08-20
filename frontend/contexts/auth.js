import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenUrl = `${baseUrl}/api/token/`;

export const AuthContext = createContext({});

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('You forgot AuthProvider!');
  }
  return auth;
}

export function AuthProvider(props) {
  const [state, setState] = useState({
    tokens: null,
    user: null,
    error: undefined,
    register,
    login,
    logout,
  });

  useEffect(() => {
    const storedTokens = Cookies.get('authToken');
    if (storedTokens) {
      setState((prevState) => ({
        ...prevState,
        tokens: JSON.parse(storedTokens),
        user: getUserFromToken(JSON.parse(storedTokens)),
      }));
    }
  }, []);

  function getUserFromToken(tokens) {
    const decodedAccess = jwt.decode(tokens.access);
    return {
      username: decodedAccess.username,
      email: decodedAccess.email,
      id: decodedAccess.user_id,
    };
  }

  async function login(username, password) {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(tokenUrl, options);
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      console.warn('login:60', { data });
      const newState = {
        tokens: data,
        user: getUserFromToken(data),
        error: undefined,
      };
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
      Cookies.set('authToken', JSON.stringify(data));
    } catch (err) {
      const error = err.toString();
      console.error(err);
      setState((prevState) => ({ ...prevState, error }));
    }
  }

  function logout() {
    setState({
      tokens: null,
      user: null,
    });
    Cookies.remove('authToken');
  }

  async function register(username, password, email) {
    const registerUrl = `${baseUrl}/api/register`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(registerUrl, options);
    if (response.ok) {
      const data = await response.json();
      console.log('Registration Successful', data);
      // Automatically log in the user after successful registration
      await login(username, password);
    } else {
      console.error('Registration Failed');
    }
  }

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
