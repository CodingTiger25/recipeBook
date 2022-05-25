import {Route, HashRouter as Router, Routes} from 'react-router-dom';
import HomePage from "./component/pages/HomePage";
import Main from './component/pages/Main';
import CreateRecipe from './component/Inputs/CreateRecipe';

function App() {
  return (
    <div>
      <Router>
         <Routes>
            <Route exact path='/' element={<HomePage/>}/>

            <Route path='/main' element={<Main/>}/> 

            <Route path='/create' element={<CreateRecipe/>}/>        
         </Routes>  
      </Router>
    </div>
  );
}

export default App;
