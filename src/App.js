import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage'

function App() {

  const [movieList, setMovieList] = useState([])

  // New movie state
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newMovieOscar, setNewMovieOscar] = useState(false)

  // Update title state
  const [updatedTtitle, setUpdatedTitle] = useState("")

  // File upload state
  const [fileUpload, setFileUpload] = useState(null)
  
  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map(doc => {
        return {...doc.data() ,id: doc.id}
      })
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const onSubmitMovie = async () => {
    try {
          await addDoc(moviesCollectionRef, {
            title: newMovieTitle,
            releaseDate: newReleaseDate,
            receivedAnOscar: newMovieOscar,
            userId: auth?.currentUser?.uid
          })
          getMovieList()
    } catch (error) {
      console.error(error);
    }
  }

  const updateMovie = async (id) => {
    try {
          const movieDoc = doc(db, "movies", id)
          await updateDoc(movieDoc, { title: updatedTtitle })
          getMovieList()
    } catch (error) {
      console.error(error);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovieList() 
    } catch (error) {
      console.error(error);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return
    const  filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      Firebase Course
      <Auth />

      <div>
        <input 
          type='text' 
          placeholder='Movie title...' 
          onChange={e => setNewMovieTitle(e.target.value)} 
        />
        <input 
          type='number' 
          placeholder='Release date...' 
          onChange={e => setNewReleaseDate(e.target.value)} 
        />
        <input 
          type='checkbox' 
          checked={newMovieOscar} 
          onChange={e => setNewMovieOscar(e.target.checked)} 
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map(movie => {
          return (
            <div>
            <h1 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)} >Del</button>

            <input type='text' placeholder='New title...' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
          )
        })}
      </div>

      <div>
        <input type='file' onChange={e => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
