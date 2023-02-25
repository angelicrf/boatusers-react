import React, { useState } from 'react'

const UploadUserFile = () => {
  const [userFile, setUserFile] = useState('')
  const [isUploaded, setIsUploaded] = useState(false)

  const submitFile = (e) => {
    e.preventDefault()
    console.log(userFile)
    setIsUploaded(true)
    //fetch post
    const formData = new FormData()

    formData.append('recfile', userFile)
    fetch('http://localhost:5000/api/uploadfile', {
      method: 'POST',
      /*       headers: {
        'Content-Type':
          'multipart/form-data; boundary=------WebKitFormBoundaryg7okV37G7Gfll2hf--',
      }, */
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        console.log(success)
        //setIsUploaded(false)
      })
      .catch((error) => console.log(error))
  }
  return (
    <div>
      <div className='container'>
        <form onSubmit={submitFile}>
          <input
            name='recfile'
            type='file'
            onChange={(e) => setUserFile(e.target.files[0])}
          />
          <button type='submit'>Upload</button>
        </form>
      </div>
      {isUploaded ? (
        <div>
          Selected File:
          <div>File Name: {userFile.name}</div>
          <div>File Size: {userFile.size}</div>
          <div>File Type: {userFile.type}</div>
        </div>
      ) : null}
    </div>
  )
}

export default UploadUserFile
