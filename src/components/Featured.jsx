import axios from 'axios'
import React, { useEffect, useState } from 'react'
import fav from '../assets/fav.png'
import trash from '../assets/trash.png'
import trashFull from '../assets/trashFull.png'

const Featured = ({ openLiked }) => {

    const key = "4f80e483806e8be2daa79620bca00792"

    const rand = Math.floor(Math.random() * 15)

    const [movies, setMovies] = useState([])
    const [tv, setTv] = useState([])
    const [liked, setLiked] = useState([])
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`)
            setMovies(res.data.results.slice(rand, rand + 5))
            const t = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}`)
            setTv(t.data.results.slice(rand, rand + 5))
            console.log(t.data.results)
        }

        fetch()
    }, [])

    const handleClick = (id, name, pic) => {
        const obj = { id, name, pic }
        setLiked(prev => [...prev, obj])
    }

    const removeItem = (id) => {

    }

    return (
        <div className='flex items-center relative flex-col gap-3'>
            <div className='relative border-4 mx-5 my-5 p-5 border-lime-800 flex justify-center flex-wrap lg:flex-nowrap gap-5 w-fit rounded'>
                <p className='absolute z-10 top-[-15px] bg-lime-800 text-white p-1 rounded'>Popular Movies</p>
                {movies && movies.map(movie => (
                    <div key={movie.id} className='relative shadow shadow-black h-fit w-60 font-light gap-5'>
                        <img className='h-60  w-60' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                        <img onClick={() => handleClick(movie.id, movie.title, movie.poster_path)} src={liked.findIndex(item => item.id === movie.id) === -1 ? fav : trashFull} alt="" />
                        <p className='text-medium font-semibold ml-1'>{movie.title}</p>
                        <p className='ml-1'>{movie.release_date}</p>
                        <div className='flex gap-2'>
                            <p className='ml-1'>Vote average: {movie.vote_average}</p>
                            <p className='ml-1'>Number of votes: {movie.vote_count}</p>
                        </div>
                    </div>
                ))
                }
            </div>

            <div className='relative border-4 mx-5 my-5 p-5 border-lime-800 flex justify-center flex-wrap lg:flex-nowrap gap-5 w-fit rounded'>
                <p className='absolute z-10 top-[-15px] bg-lime-800 text-white p-1 rounded'>Popular Tv Shows</p>
                {tv && tv.map(tv => (
                    <div key={tv.id} className='relative shadow shadow-black h-fit w-60 font-light gap-5'>
                        <img className='h-60  w-60' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" />
                        <img onClick={() => handleClick(tv.id, tv.original_name, tv.poster_path)} src={liked.findIndex(item => item.id === tv.id) === -1 ? fav : trashFull} alt="" />
                        <p className='text-medium font-semibold ml-1'>{tv.original_name}</p>
                        <p className='ml-1'>{tv.first_air_date}</p>
                        <div className='flex gap-2'>
                            <p className='ml-1'>Vote average: {tv.vote_average}</p>
                            <p className='ml-1'>Number of votes: {tv.vote_count}</p>
                        </div>
                    </div>
                ))
                }
            </div>

            {openLiked &&
                <div className='absolute left-0 top-[-620px] bg-black/95 h-fit p-5 w-60'>
                    <h3 className='text-white mb-10 text-lg'>Liked Shows/Movies: </h3>
                    {liked.length > 0
                        ?
                        liked.map(like => (
                            <div className='flex justify-between items-center gap-5 mt-5' key={like.id}>
                                <img className='w-10 h-10 object-cover' src={`https://image.tmdb.org/t/p/w500${like.pic}`} alt="" />
                                <p className='text-white'>{like.name}</p>
                                <img onClick={() => removeItem(like.id)} className='w-5 h-5' src={trash} alt="" />
                            </div>
                        ))
                        :
                        <p className='text-white'>No added movies, add some!</p>
                    }
                </div>
            }

        </div>
    )
}

export default Featured