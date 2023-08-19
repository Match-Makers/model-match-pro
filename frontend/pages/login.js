import {useContext} from 'react'
import Header from '@/components/Header'
import SignUpform from '@/components/SignUpForm'
import SignIn from '@/components/SignIn'
import {AuthContext} from '@/contexts/auth'


export default function Login() {
  const {user} = useContext(AuthContext)
   
  return (
    <>
      <Header> <button>this is the button</button> </Header>
      {user ? <SignIn /> : <SignUpform /> } 
      
    </>
  )
}
