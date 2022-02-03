import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  // 2. Create our *list* variable as well as the *setList* function via useState
  // We're setting the default value of list to null, so that while we wait for the
  // fetch to complete, we dont attempt to render the list
  const [list, setList] = useState(null)
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("http://localhost:5000/image/")
    .then(response => response.json())
    // 4. Setting *list* to the list url that we received from the response above
    .then(data => setList(data))
    .catch((error) => console.log(error));
  },[])

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

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className="App">
      <h1>Simple Image Upload with React</h1>
      {image.preview && <img src={image.preview} width={'200px'} />}
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    {/* 5. Returning an img element for each url, again with the value of our src set to the list url */}
    {list &&
      list.map((img, i) => <img key={img.name} width={"200px"} src={img.url} />)
    }
    </div>
  );
}

export default App;