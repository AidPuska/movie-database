import React, { useRef, useState } from 'react'
import Featured from '../components/Featured'
import Navbar from '../components/Navbar'
import Random from '../components/Random'

const Home = () => {

    const menuRef = useRef(null)
    const [openLiked, setOpenLiked] = useState(false)

    return (
        <div className='bg-gray-100 w-full h-screen'>
            <Navbar forwardedRef={menuRef} setOpenLiked={setOpenLiked} openLiked={openLiked} />
            <Random />
            <Featured openLiked={openLiked} />
        </div>
    )
}

export default Home