import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate
  } from 'react-router-dom'

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
          <div className='menu'>
              <Link style={padding} to="/">Blogs</Link>
              <Link style={padding} to="/users">Users</Link>
              
          </div>
    )
  }

export default Menu;