import React from 'react'

const Bar = ({ movie, handleClick, liked, fav, trashFull }) => {

    const img = 'https://image.tmdb.org/t/p/w500';

    return (
        <div key={movie.id} className='relative shadow shadow-black h-fit w-60 font-light gap-5 hover:scale-110 transition ease-in-out duration-300'>
            <img className='h-60 w-60 shadow shadow-black' src={`${img}${movie.poster_path}`} alt="" />
            <img onClick={() => handleClick(movie.id, movie.title, movie.poster_path)} src={liked.findIndex(item => item.id === movie.id) === -1 ? fav : trashFull} alt="" />
            <p className='text-medium font-semibold ml-1'>{movie.title || movie.name}</p>
            <p className='ml-1'>{movie.release_date || movie.first_air_date}</p>
            <div className='flex gap-2'>
                <p className='ml-1'>Vote average: {movie.vote_average}</p>
                <p className='ml-1'>Number of votes: {movie.vote_count}</p>
            </div>
        </div>
    )
}

export default Bar