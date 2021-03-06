import React, {useState, useEffect} from 'react';
import './App.css';
import Fuse from 'fuse.js'

function App() {
  // Declare states
  const [list, setList] = useState(null)
  const [image, setImage] = useState({ data: '' })
  const [query, setQuery] = useState('')
  const [imageResults, setImageResults] = useState([])
  const [fuse, setFuse] = useState(null)

  useEffect(() => {
    init()
  },[])
  
  useEffect(() => {
    search()
  },[query, fuse])

  // Set collection with Fuse
  function setCollection(listData) {
    fuse.setCollection(listData)
  }

  // Search logic with Fuse
  function search() {
    if (!fuse) return false
    const results = fuse.search(query)
    setImageResults(query ? results.map(result => result.item) : list)
  }

  // Get API
  function init() {
    fetch("http://localhost:5000/image/")
    .then(res => res.json())
    .then(data => {
      setList(data)
      createFuse(data)
    })
    .catch((error) => console.log(error));
  }
  
  // Instantiate Fuse
  function createFuse(data) {
    const fuse = new Fuse(data, {
      keys: [
          'name',
          'url',
      ]
    })
    setFuse(fuse)
  }

  // Handle submit and post to API
  async function handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const res = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    const resData = await res.json()
    if (res.status === 200) {
      const listData = [...list, {name: resData.path, url: resData.path}]
      setCollection(listData)
      setList(listData)
    }
  }

  // Handle uploaded files
  function handleFileChange(e) {
    const img = {
      data: e.target.files[0],
    }
    setImage(img)
  }

  // Watch search query and call search()
  // ** This may be running search() before setQuery() because state is async
  function handleSearch (e) {
    setQuery(e.target.value);
  }

  return (
    <div className='App'>
      <h1 className='App--heading'>Simple Image Upload with React</h1>
      <form className='App--form' onSubmit={handleSubmit}>
        <label>
          <input className='form--search' placeholder='Search...' type='text' value={query} onChange={handleSearch} />
        </label>
        <label>
          <input className='form--file' type='file' name='file' onChange={handleFileChange} />
          <button className='form--submit' type='submit'>Submit</button>
        </label>
      </form>
      <div className='App--grid'>
        {imageResults.map(img => <img key={img.name} style={{width: '100%'}} src={img.url} />)}
      </div>
    </div>
  );
}

export default App;