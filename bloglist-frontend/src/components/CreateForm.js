
import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const CreateForm = ({ blogs, setBlogs, blogFormRef, user }) => {
  const addedTitle = useField('text')
  const addedAuthor = useField('text')
  const addedUrl = useField('text')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)


  const createNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    let title = addedTitle.fields.value
    let author = addedAuthor.fields.value
    let url = addedUrl.fields.value
    const createdBlog = { title, author, url, user }
    try {
      const response = await blogService.create(createdBlog)
      setBlogs(blogs.concat(response))
      setMessage(`a new blog ${addedTitle} by ${addedAuthor}`)
      setType('success')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
    } catch (exception) {
      console.log('Exception ', exception)
    }
    addedAuthor.resetfield.reset()
    addedTitle.resetfield.reset()
    addedUrl.resetfield.reset()
  }

  return (
    <div>
      <Notification message={message} type={type} />
      <h2>Lisää uusi blogi</h2>
      <form onSubmit={createNewBlog}>
        <label>nimi</label>
        <input { ...addedTitle.fields } />  <br/>
        <label>tekijä</label>
        <input { ...addedAuthor.fields } />  <br/>
        <label>url</label>
        <input { ...addedUrl.fields } />   <br/>
        <input type='submit' value='Lisää' />
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default CreateForm