import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState([{ preview: '', data: ''}])
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
  }

  // useEffect(() => {
  //   fetch("http://localhost:5000/image")
  //   .then(response => response.json())
  //       // 4. Setting *dogImage* to the image url that we received from the response above
  //   .then(data => setImage(data))
  // },[])

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
    // console.log(img)
  }
  console.log(image)

  return (
    <div className='App'>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
      {/* {image && image.map((img) => <img width={"200px"} height={"200px"} src={img.url}></img>)} */}
    </div>
  )
}

export default App;