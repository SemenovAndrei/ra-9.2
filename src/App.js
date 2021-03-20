import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import NewPost from './components/NewPost/NewPost'
import SelectedPost from './components/SelectedPost/SelectedPost'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Main} />
        <Route path="/new" component={NewPost} />
        <Route path="/posts/:id" component={SelectedPost} />
      </div>
    </Router>
  )
}

export default App
