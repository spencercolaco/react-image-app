import React, {useState, useEffect} from 'react';
import './App.css';
import Fuse from 'fuse.js'

function App() {
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
  },[list, fuse])

  function setCollection(listData) {
    fuse.setCollection(listData)
  }

  function search() {
    if (!fuse) return false
    const results = fuse.search(query)
    setImageResults(query ? results.map(result => result.item) : list)
  }

  function init() {
    fetch("http://localhost:5000/image/")
    .then(response => response.json())
    .then(data => {
      setList(data)
      createFuse(data)
    })
    .catch((error) => console.log(error));
  }
  
  function createFuse(data) {
    const fuse = new Fuse(data, {
      keys: [
          'name',
          'url',
      ]
    })
    setFuse(fuse)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    const resData = await response.json()
    if (response.status === 200) {
      console.log(resData.path)
      const listData = [...list, {name: resData.path, url: resData.path}]
      setCollection(listData)
      setList(listData)
    }
  }

  function handleFileChange(e) {
    const img = {
      data: e.target.files[0],
    }
    setImage(img)
  }

  function handleOnSearch ({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    <div className='App'>
      <h1 className='App--heading'>Simple Image Upload with React</h1>
      <form className='App--form' onSubmit={handleSubmit}>
        <label>
          <input className='form--search' placeholder='Search...' type='text' value={query} onChange={handleOnSearch} />
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