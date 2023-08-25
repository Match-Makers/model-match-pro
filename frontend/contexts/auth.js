import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenUrl = `${baseUrl}/api/token/`;

export const AuthContext = createContext({
  loading: true,
});

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
    loading: true,
  });

  useEffect(() => {
    try {
      const storedTokens = Cookies.get('authTokens');
      if (storedTokens) {
        const user = getUserFromToken(JSON.parse(storedTokens));
        if (!user.id) {
          throw new Error('No authenticated user found');
        }
        setState((prevState) => ({
          ...prevState,
          tokens: JSON.parse(storedTokens),
          user,
          loading: false,
        }));
      } else {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    } catch (err) {
      console.error(err);
      setState((prevState) => ({
        ...prevState,
        tokens: null,
        user: null,
        loading: false,
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

      const newState = {
        tokens: data,
        user: getUserFromToken(data),
        error: undefined,
      };
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
      Cookies.set('authTokens', JSON.stringify(data));
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
    Cookies.remove('authTokens');
    window.location.reload();
  }

  async function register(username, password) {
    const registerUrl = `${baseUrl}/api/register`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(registerUrl, options);
    if (response.ok) {
      const data = await response.json();
      console.log('Registration Successful', data);
      // Automatically log in the user after successful registration
      login(username, password);
    } else {
      console.error('Registration Failed');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
      }}
    >
      {!state.loading && props.children}
    </AuthContext.Provider>
  );
}
