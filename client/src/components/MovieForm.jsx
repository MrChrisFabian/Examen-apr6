import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const MovieForm = ({ formType, id }) => {
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        review: Yup.string()
            .min(3, 'El título debe tener al menos 3 caracteres')
            .max(500, 'El título debe tener como máximo 500 caracteres')
            .required('Esto es requerido'),
        Rating: Yup.number()
            .min(1, 'El rating minimo es 1')
            .max(5, 'El rating maximo es 5')
            .required('Introduce tu valoración'),
        ...(formType === 'addmovie' && {
            titulo: Yup.string()
                .min(2, 'El título debe tener al menos 2 caracteres')
                .required('El título es requerido'),
        }),
    });
    // Create
    const addMovie = async (values, setErrors) => {
        try {
            await axios.post(
                'http://localhost:8000/api/movie/',
                values,
                { withCredentials: true }
            );
            navigate("/contenido/list");
        } catch (err) {

            console.log("Error: ", err);
            setErrors({ general: err });
        }
    }
    // add review
    const addReview = async (values, setErrors) => {
        try {
            await axios.put(
                `http://localhost:8000/api/movie/${id}`,
                values,
                { withCredentials: true }
            );
            navigate("/contenido/list");
        } catch (err) {

            console.log("Error: ", err);
            setErrors({ general: err });
        }
    }

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        if (formType === "addmovie") {
            addMovie(values, setErrors);
        } else {
            addReview(values, setErrors);
        }
        setSubmitting(false);
        resetForm();
    }
    return (
        <>
            <Formik initialValues={{
                titulo: '',
                Rating: 0,
                review: '',
                reviewer: `${JSON.parse(localStorage.getItem('user')).firstName}`
            }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ errors, isSubmitting }) => (
                    <Form className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 '>
                        <h2>{formType === 'addmovie' ? "Submit a Movie and a Review" : "Add a review"}</h2>
                        <hr className='mb-2' />
                        {
                            errors?.general && (
                                <div className="mt-2 text-sm text-red-600 dark:text-red-500" role="alert">
                                    {errors.general}
                                </div>
                            )
                        }
                        {
                            formType === 'addmovie' && (
                                <>
                                    <label htmlFor="title">Title</label>
                                    <Field type="text" name="titulo" id="title" className="block w-full mb-2 p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200" />
                                    <ErrorMessage name="title" component="div" className="text-sm text-red-600 dark:text-red-500" />
                                </>
                            )
                        }
                        <div className="mb-3">
                            <label htmlFor="Rating">Rating</label>
                            <Field type="number" name="Rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                            <ErrorMessage name="Rating" component="div" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="review">Review</label>
                            <Field type="text" name="review" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your review" />
                            <ErrorMessage name="review" component="div" className="mt-2 text-sm text-red-600 dark:text-red-500" />
                        </div>
                        <button disabled={isSubmitting} type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Enviar!
                            </span>
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default MovieForm