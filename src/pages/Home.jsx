import React, { useRef, useState } from 'react'
import Featured from '../components/Featured'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Random from '../components/Random'

const Home = () => {

    const menuRef = useRef(null)
    const [openLiked, setOpenLiked] = useState(false)

    return (
        <div className='bg-gray-100 w-full h-screen flex flex-col items-center'>
            <Navbar forwardedRef={menuRef} setOpenLiked={setOpenLiked} openLiked={openLiked} />
            <Random />
            <Featured openLiked={openLiked} />
            <Footer />
        </div>
    )
}

export default Home