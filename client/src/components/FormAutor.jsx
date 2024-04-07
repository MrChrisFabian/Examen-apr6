import { Link } from 'react-router-dom'

const FormAutor = ({ handleSubmit, handleChange, autor, error }) => {
    return (
        <form onSubmit={handleSubmit} className='border-4 p-7 w-1/2 mt-2 flex flex-col justify-between'>
            <div className='mt-2'>
                <label className='block'>Name:</label>
                <input value={autor.nombre} onChange={handleChange} type='text' name='nombre' className='border border-gray-300 rounded-md w-1/2' />
                {error && <p className='text-red-500'>{error}</p>}
            </div>
            <div className='mt-2 flex items-center content-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
                <Link to={"/"} className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' type='submit'>Cancel</Link >
            </div>
        </form>
    )
}

export default FormAutor