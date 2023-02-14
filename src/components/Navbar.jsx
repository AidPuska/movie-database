import axios from 'axios'
import React, { useEffect, useState } from 'react'
import menu from '../assets/menu.png'

const Navbar = ({ forwardedRef, setOpenLiked, openLiked }) => {

    const key = "4f80e483806e8be2daa79620bca00792"

    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (search === " " || search === "") {
            console.log("Empty search")
        } else {
            const fetch = async () => {
                const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${search}`)
                setOpen(true);
                setMovies(res.data.results)
            }

            fetch()
        }
    }, [search])

    return (
        <div className='flex relative w-full justify-between py-5 px-7 bg-gradient-to-b from-sky-900/25 text-lg'>
            <div className='flex gap-5'>
                <img onClick={() => setOpenLiked(!openLiked)} ref={forwardedRef} src={menu} alt="" className='cursor-pointer' />
                <h1 className='text-lime-800'>Movie-<span className='font-light text-lime-900'>Database</span></h1>
            </div>
            <div className='flex'>
                <input onChange={(e => setSearch(e.target.value))} className='rounded-t bg-white text-lime-800' type="text" placeholder=' tv/movie name' />
                <p className='font-light text-white bg-lime-800 px-5'>Search</p>
            </div>

            {open && movies && <div className='bg-white h-screen overflow-scroll absolute right-4 z-20 top-[50px] p-5'>
                <button className='absolute text-white bg-lime-800 p-1 rounded-full top-[-4px] left-[-2px]' onClick={() => setOpen(false)}>X</button>
                {movies && movies.map(movie => (
                    <div key={movie.id} className='shadow shadow-black h-fit w-60 font-light gap-5 mb-5'>
                        <img className='h-60  w-60' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                        <p className='text-medium font-semibold ml-1'>{movie.title}</p>
                        <p className='ml-1'>{movie.release_date}</p>
                        <div className='flex gap-2'>
                            <p className='ml-1'>Vote average: {movie.vote_average}</p>
                            <p className='ml-1'>Number of votes: {movie.vote_count}</p>
                        </div>
                    </div>
                ))}
            </div>}

            {/* {setOpenLiked && } */}
        </div>
    )
}

export default Navbar