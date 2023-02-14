import axios from 'axios'
import React, { useEffect, useState } from 'react'
import right from '../assets/right.svg'
import avg from '../assets/avg.svg'
import grade from '../assets/grade.svg'
import clock from '../assets/clock.svg'

const Random = () => {

    const [tvShow, setTvShow] = useState(null)

    const key = "4f80e483806e8be2daa79620bca00792"
    let id = Math.floor(Math.random() * 250) + 1;

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
            setTvShow(res.data)
            //console.log(res.data)
        }

        fetch();
    }, [])


    const handleClick = async () => {
        id = Math.floor(Math.random() * 250) + 1;
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
        setTvShow(res.data)
    }

    return (
        <div className='h-fit bg-gradient-to-t from-sky-900'>
            <p className='p-10'>Random Tv Show</p>
            {tvShow &&
                <div className='pl-10 mb-10 flex gap-5'>
                    <img className='h-[500px] w-[700px]' src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt="" />
                    <div className='mx-auto self-center space-y-5'>
                        <h3 className='text-center text-xl font-semibold'>{tvShow.title}</h3>
                        <p className='text-center font-light'>{tvShow.release_date}</p>
                        <p className={tvShow.overview.split(" ").length > 60 ? 'w-80 text-justify font-light text-lg bg-sky-900 p-1 rounded text-white/90' : 'w-60 text-justify font-light text-lg bg-sky-900 p-1 rounded text-white/90'}>{tvShow.overview}</p>
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
                    <img onClick={handleClick} className='w-7 h-7 self-center mx-auto cursor-pointer' src={right} alt="" />
                </div>}
        </div>
    )
}

export default Random