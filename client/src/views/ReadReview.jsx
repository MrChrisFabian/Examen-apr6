import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'; // Add import statement
import axios from 'axios'; // Add import statement
import { Link } from 'react-router-dom'; // Add import statement
import { map } from '@amcharts/amcharts5/.internal/core/util/Array';
import { useParams } from 'react-router-dom';


const ReadReview = () => {
    const { id } = useParams();


    const [movie, setmovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/movie/${id}`, { withCredentials: true })
            .then((response) => {
                setmovie(response.data.movie);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);
    if (isLoading) {
        return <>
            <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Info alert!</span> Is Loading...
                </div>
            </div></>
    }
    const mostrarReviews = (reviews, reviewers, ratings) => {
        let auxiliar = []
        const elementos = [];
        const cant = reviews.length;
        for (let i = 0; i < cant; i++) {
            auxiliar.push(reviewers[i])
            auxiliar.push(ratings[i])
            auxiliar.push(reviews[i])
            elementos.push(auxiliar)
            auxiliar = []
        }
        return elementos;
    }
    const arrayDeReviews = mostrarReviews(movie.review, movie.reviewer, movie.Rating)
    return (
        <div className='border-4 p-4 '>
            <div className='flex items-center content-center justify-between'>
                <h1 className='mb-2'>Review List</h1>
                <NavLink className="my-2 w-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={'/contenido/new'}>Add a movie</NavLink>
            </div>
            <div className="  mt-4 w-3/4 overflow-x-visible shadow-md sm:rounded-lg">
                <table className=" mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Reviewer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Review
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayDeReviews.map((e) => (
                            <tr key={e._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" >
                                <th key={e[0]} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {e[0]}
                                </th>
                                <th key={e[1]} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {e[1]}
                                </th>
                                <th key={e[2]} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {e[2]}
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReadReview