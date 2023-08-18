import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import SignUpform from '@/components/SignUpForm'
import SignIn from '@/components/SignIn'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header> <button>this is the button</button> </Header>
      <SignUpform />
      <SignIn />
    </>
  )
}
