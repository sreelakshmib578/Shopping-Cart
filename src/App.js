
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  
  
  return (
    <div className="App">
      {/* <Login />
      <Registration/>
      <Home/>
      <Product/> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
