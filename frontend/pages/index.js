import {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import SignUpform from '@/components/SignUpForm'
import SignIn from '@/components/SignIn'
import {AuthContext} from '@/contexts/auth'


export default function Home() {
  const {user} = useContext(AuthContext)
  const {push} = useRouter()
  useEffect(() => {
    if (!user || ! user.id) {
      push('/login')
    }
  }, []) 
  return (
    <>
      <Header> <button>this is the button</button> </Header>      
    </>
  )
}
