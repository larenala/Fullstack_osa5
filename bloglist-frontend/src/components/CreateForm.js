
import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const CreateForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)


  const createNewBlog = async () => {

    try {
      const createdBlog = {title, author, url}
      setAuthor('')
      setTitle('')
      setUrl('')
      await blogService.create(createdBlog)
    } catch (exception) {
      setMessage('could not create blog')
      setType("error")
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
    }
  }

    return (
        <div>        
        <Notification message={message} type={type} />
        <h2>Lisää uusi blogi</h2>
        <form onSubmit={createNewBlog}>
          <label>nimi</label>
            <input 
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)} />  <br/>
          <label>tekijä</label>
            <input 
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)} />  <br/>
          <label>url</label>
            <input 
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)} />   <br/>    
          <button type="submit">Lisää</button>   
        </form>
      </div>
    )
}

export default CreateForm