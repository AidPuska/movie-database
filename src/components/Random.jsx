import axios from 'axios'
import React, { useEffect, useState } from 'react'
import right from '../assets/right.svg'
import avg from '../assets/avg.svg'
import grade from '../assets/grade.svg'
import clock from '../assets/clock.svg'

const Random = () => {

    const [tvShow, setTvShow] = useState(null)
    const [loading, setLoading] = useState(false)

    const key = "4f80e483806e8be2daa79620bca00792"
    let id = Math.floor(Math.random() * 1000) + 1;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
            setTvShow(res.data)
            setLoading(false);
            console.log('res: ', res.data)
        }

        fetch();
    }, [])

    const handleClick = async () => {
        id = Math.floor(Math.random() * 1000) + 1;
        setLoading(true)
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
        setTvShow(res.data)
        setLoading(false)
        console.log('res: ', res)
    }

    return (
        <div className='h-fit w-full mt-5 bg-gradient-to-t from-sky-900'>
            {tvShow && !loading ?
                <div className='pl-10 mb-10 flex items-center gap-5'>
                    <img className='h-[500px] w-[700px] rounded shadow shadow-black hover:translate-x-6 transition ease-in-out duration-150' src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt="" />
                    <div className='mx-auto self-center space-y-5'>
                        <h3 className='text-center text-xl font-semibold'>{tvShow.title}</h3>
                        <p className='text-center font-light'>{tvShow.release_date}</p>
                        <p className={tvShow.overview.split(" ").length > 60 ? 'w-80 text-justify font-light text-lg shadow-md shadow-black p-4 rounded text-black bg-sky-100' : 'w-60 text-justify shadow-md shadow-black font-light text-lg p-5 rounded text-black bg-sky-100'}>{tvShow.overview}</p>
                        <div className='flex gap-2'>
                            <img className='h-4 w-4' src={avg} alt="average" />
                            <p>vote avg: {tvShow.vote_average}</p>
                            <img className='h-4 w-4' src={grade} alt="grade" />
                            <p>vote count: {tvShow.vote_count}</p>
                        </div>
                        <div className='flex'>
                            <img className='w-4 h-4' src={clock} alt="" />
                            <p>{tvShow.runtime} minutes</p>
                        </div>
                    </div>
                    <img onClick={handleClick} className='w-7 h-7 self-center mx-auto cursor-pointer hover:scale-125' src={right} alt="" />
                </div>
                :
                <div className='pl-10 mb-10 flex items-center gap-5'>
                    <p className='h-[500px] w-[700px] rounded shadow shadow-black animate-pulse bg-gradient-to-t from-sky-900 flex items-center justify-center'>
                        <p className='h-[450px] w-[650px] rounded shadow shadow-black animate-pulse bg-rose-100'></p>
                    </p>
                    <div className='mx-auto self-center space-y-5 animate-pulse'>
                        <p className='w-80 h-80 shadow-black rounded bg-gradient-to-t from-sky-900 flex flex-col gap-5 items-center justify-center'>
                            <div className='w-72 h-7 mb-5 rounded-md bg-rose-100 animate-pulse'></div>
                            <div className='w-72 h-5 rounded-md bg-rose-100 animate-pulse'></div>
                            <div className='w-72 h-5 rounded-md bg-rose-100 animate-pulse'></div>
                            <div className='w-72 h-5 rounded-md bg-rose-100 animate-pulse'></div>
                            <div className='w-72 h-5 rounded-md bg-rose-100 animate-pulse'></div>
                            <div className='w-72 h-5 rounded-md bg-rose-100 animate-pulse'></div>
                        </p>
                    </div>
                    <img onClick={handleClick} className='w-7 h-7 self-center mx-auto cursor-pointer hover:scale-125' src={right} alt="" />
                </div>
            }
        </div>
    )
}

export default Random