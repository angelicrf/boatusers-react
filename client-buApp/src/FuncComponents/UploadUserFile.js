import React, { useState, useCallback, useEffect, useMemo } from 'react'

const UploadUserFile = () => {
  const [userFile, setUserFile] = useState('')
  const [isUploaded, setIsUploaded] = useState(false)
  const [isReceivedPath, setIsreceivedPath] = useState('')
  const [fileInfo, setFileInfo] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isEmptyFile, setIsEmptyFile] = useState(false)

  const onLoad = useCallback(() => {
    console.log('loaded')
    setLoaded(true)
  }, [])

  useEffect(() => {
    console.log('fileInfo', fileInfo)
    console.log(isEmptyFile)
    if (fileInfo.length > 0) getUploadFile()
  }, [[fileInfo]])

  const submitFile = async (e) => {
    setIsEmptyFile(false)
    setIsUploaded(false)
    if (userFile) {
      e.preventDefault()
      console.log(userFile)
      await postFile()
      setIsEmptyFile(false)
      setIsUploaded(true)
    } else {
      setIsEmptyFile(true)
      setIsreceivedPath('')
    }
    //setIsreceivedPath(success)
  }
  const postFile = () => {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('recfile', userFile)
      try {
        fetch('http://localhost:5000/api/uploadfile', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(
              setFileInfo([
                Object.assign({
                  fileName: data.success.originalname,
                  fileType: data.success.mimetype,
                }),
              ]),
            )
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } catch (error) {
        console.log(error)
      }
    })
  }
  const getUploadFile = async () => {
    if (fileInfo[0].fileName !== undefined) {
      console.log('insidefileInfo')
      if (fileInfo[0].fileName !== undefined) {
        try {
          let response = await fetch('http://localhost:5000/api/displayUpload')
          let data = await response.blob()
          if (data !== undefined) {
            let metadata = {
              type: `${fileInfo[0].fileType}`,
            }
            let mfile = new File([data], `${fileInfo[0].fileName}`, metadata)
            setIsreceivedPath(URL.createObjectURL(mfile))
            setFileInfo([])
            setUserFile('')
          }
        } catch (error) {
          console.log('error upload from server', error)
        }
      }
    }
  }
  return (
    <div>
      <div className='container'>
        <input
          name='recfile'
          type='file'
          onChange={(e) => setUserFile(e.target.files[0])}
        />
        <button type='button' onClick={submitFile}>
          Upload
        </button>

        {isUploaded && !isEmptyFile ? (
          <div>
            Selected File:
            <div>File Name: {userFile.name}</div>
            <div>File Size: {userFile.size}</div>
            <div>File Type: {userFile.type}</div>
          </div>
        ) : null}
        {isReceivedPath !== '' ? (
          <div>
            <div style={{ width: '200px', height: '200px' }}>
              <img src={`${isReceivedPath}`} alt={`myName`} onLoad={onLoad} />
            </div>
          </div>
        ) : null}
        {isEmptyFile ? (
          <div>
            <div className='alert alert-primary' role='alert'>
              No File Selected!
            </div>
          </div>
        ) : (
          <div>NotData</div>
        )}
      </div>
    </div>
  )
}

export default UploadUserFile
