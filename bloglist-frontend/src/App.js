import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    try {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    } catch (exception) {
      console.log('exception ', exception)
    }
    
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('kirjautunut sisään')
      setType("success")
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
    } catch (exception) {
      setMessage('käyttäjätunnus tai salasana virheellinen')
      setType("error")
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
        </Togglable>
      </div>
    )
  }


  /*const loginForm = () => (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
        
      </form>  
    </div>   
  )*/

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('kirjautunut ulos')
      setType("success")
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
  }

  return (
    <div>
      <Notification message={message} type={type} />
      
      { user === null ?
      loginForm() :
      <div>       
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={logoutUser}>Log out</button>
        <Togglable buttonLabel="lisää uusi blogi" ref={blogFormRef}>
          <CreateForm blogs={blogs} setBlogs={setBlogs} blogFormRef={blogFormRef} user={user}/> 
        </Togglable>        
        <div>

</div>
        
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
      )}
      </div>
    }
    </div>
      
      
    
  )
}

export default App