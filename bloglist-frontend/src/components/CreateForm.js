
import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const CreateForm = ({ blogs, setBlogs, blogFormRef, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)


  const createNewBlog = async (event) => {
      event.preventDefault()
      blogFormRef.current.toggleVisibility()
      const createdBlog = {title, author, url, user}      
      try {
        const response = await blogService.create(createdBlog)  
        setBlogs(blogs.concat(response))
        setMessage(`a new blog ${title} by ${author}`)   
        setType("success")        
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 3000) 
      } catch (exception) {
        console.log('Exception ', exception)
      }
      setAuthor('')
      setTitle('')
      setUrl('')   
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
          <input type="submit" value="Lisää" />   
        </form>
      </div>
    )
}

export default CreateForm