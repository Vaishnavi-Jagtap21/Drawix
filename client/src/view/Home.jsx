import React from 'react'
import { useStore } from '../store/Store'

const Home = () => {

    const {welcome} = useStore()

  return (
    <div className='new h-screen w-screen flex items-center justify-center text-5xl'>{welcome}</div>
  )
}

export default Home