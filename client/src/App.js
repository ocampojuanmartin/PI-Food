import './App.css';
import {Route} from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Details from './components/Details';
import RecipeCreated from './components/Create';

function App() {
  return (
    
    <div className="App">
      
        <Route exact path='/' component={NavBar}/>
        <Route exact path='/home' component={NavBar}/>
        <Route exact path= '/' component= {Landing}/>
        <Route exact path= '/home' component= {Home}/>
        <Route exact path= '/recipes/:id' component= {NavBar}/>
        <Route exact path= '/recipes/:id' component= {Details}/>
        <Route exact path= '/recipe' component= {RecipeCreated}/>
      
    </div>
  );
}

export default App;
