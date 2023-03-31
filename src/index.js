import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'
import BlogPost from './components/BlogPost'
import BlogpostsMenu from './components/BlogpostsMenu'
import Read from './components/Read'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import blogposts from './components/blogposts-data'
import 'semantic-ui-css/semantic.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
      <Route
        index
        element={
          <BlogpostsMenu blogposts={ blogposts } />
        }
      />
      <Route path=":id" element={<BlogPost blogposts={ blogposts } />} />
    </Route>
    <Route path="/read" element={<Read />} />
    </Routes>
  </BrowserRouter> 
)
