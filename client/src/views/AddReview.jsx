import React from 'react'
import MovieForm from '../components/MovieForm'
import { useParams } from 'react-router-dom'
const AddReview = () => {
    const { id } = useParams();
    return (
        <div>
            <div>aca vamos a agregar reviews</div>
            <MovieForm formType={"addreview"} id={id}></MovieForm>
        </div>
    )
}

export default AddReview