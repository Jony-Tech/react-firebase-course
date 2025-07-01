
import { useEffect, useState } from 'react';
import './App.css'
import { Auth } from './components/auth';
import { db, auth} from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([]);

  //new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  //update title sate
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies")
  
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setMovieList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovieList();
  }, [])

  const onSumitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      } );
      getMovieList();
    } catch (err) {
      console.error(err)
    }
  }

  const deleteMovie = async id => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList()
  }

  const updateMovieTitle = async id =>{
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle})
  }
  
  return (
    <div className='App'>
        <Auth/>
        <div>
          <input type="text" placeholder='movie title...' onChange={e => setNewMovieTitle(e.target.value)}/>
          <input type="number" placeholder='release year...' onChange={e => setNewReleaseDate(Number(e.target.value))}/>
          <input type="checkbox" checked={isNewMovieOscar} onChange={e => setIsNewMovieOscar(e.target.checked)} />
          <label > Received and Oscar</label>
          <button onClick={onSumitMovie}>Submit movie</button>
        </div>
        <div>
          {movieList.map(movie => (
            <div key={movie.id}>
              <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
              <p>Date: {movie.releaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>

              <input onChange={e => { setUpdatedTitle(e.target.value)}} type="text" placeholder='new title...'/>
              <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
            </div>
          ))} 
        </div>
    </div>
    )
  
  
}

export default App
