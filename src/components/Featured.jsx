import axios from 'axios'
import React, { useEffect, useState } from 'react'
import fav from '../assets/fav.png'
import trash from '../assets/trash.png'
import trashFull from '../assets/trashFull.png'
import Bar from './Bar'

const Featured = ({ openLiked }) => {

    const key = "4f80e483806e8be2daa79620bca00792"

    const rand = Math.floor(Math.random() * 15) + 1;
    const page = Math.floor(Math.random() * 20) + 1;

    const [movies, setMovies] = useState([])
    const [tv, setTv] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [liked, setLiked] = useState([])
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page}`)
            setMovies(res.data.results.slice(rand, rand + 5))
            const t = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&page=${page}`)
            setTv(t.data.results.slice(rand, rand + 5))
            const u = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&page=${page - 5}`)
            setUpcoming(u.data.results.slice(rand, rand + 5))
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
                    <Bar
                        movie={movie}
                        handleClick={handleClick}
                        liked={liked}
                        trashFull={trashFull}
                        fav={fav}
                    />
                ))
                }
            </div>

            <div className='relative border-4 mx-5 my-5 p-5 border-lime-800 flex justify-center flex-wrap lg:flex-nowrap gap-5 w-fit rounded'>
                <p className='absolute z-10 top-[-15px] bg-lime-800 text-white p-1 rounded'>Popular Tv Shows</p>
                {tv && tv.map(tv => (
                    <Bar
                        movie={tv}
                        handleClick={handleClick}
                        liked={liked}
                        trashFull={trashFull}
                        fav={fav}
                    />
                ))
                }
            </div>

            <div className='relative border-4 mx-5 my-5 p-5 border-lime-800 flex justify-center flex-wrap lg:flex-nowrap gap-5 w-fit rounded'>
                <p className='absolute z-10 top-[-15px] bg-lime-800 text-white p-1 rounded'>Upcoming movies</p>
                {upcoming && upcoming.map(tv => (
                    <Bar
                        movie={tv}
                        handleClick={handleClick}
                        liked={liked}
                        trashFull={trashFull}
                        fav={fav}
                    />
                ))
                }
            </div>

            {openLiked &&
                <div className='absolute left-0 top-[-560px] bg-black/95 h-fit p-5 w-60'>
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