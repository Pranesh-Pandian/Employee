import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Emp from './pages/Emp';
import Update from './pages/Update';
import './index.css'
import Addemp from './pages/Addemp';
 
function App() {
  return (
    <div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Emp/>}></Route>
                <Route path="/add" element={<Addemp/>}></Route>
                <Route path="/upd/:id" element={<Update/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
