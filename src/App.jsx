
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductsDetails from './pages/ProductsDetails'
import { Route, Routes } from 'react-router-dom'


function App() {



  return (
    <>
      <div className="App">
        
      </div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductsDetails />} />
        <Route path='/checkout' element={ <Checkout />} />
      
      </Routes>
    
    </>
  )
}

export default App
