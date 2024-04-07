import { Routes, Route } from 'react-router-dom'
import Contenido from './views/Contenido'
import Login from './views/Login'
import { useState, Context } from 'react'
import UserContext from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import MovieList from './views/MovieList'
import ReadReview from './views/ReadReview'
import AddReview from './views/AddReview'
import AddMovie from './views/AddMovie'
function App() {

  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userInfo = userDetails ? userDetails : null;
  const [user, setUser] = useState(userInfo)
  const setUserKeyValue = (clave, valor) => {
    setUser({ ...user, [clave]: valor })
  }
  const objetoContexto = {
    user,
    setUser,
    setUserKeyValue
  }

  return (
    <UserContext.Provider value={objetoContexto}>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/contenido/" element={
          <PrivateRoute>
            <Contenido />
          </PrivateRoute>
        }>
          <Route path="list" element={<MovieList />} />
          <Route path="new" element={<AddMovie />} />
          <Route path=":id/readReview" element={<ReadReview />} />
          <Route path=":id/addReview" element={<AddReview />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
