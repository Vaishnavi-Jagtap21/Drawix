import React , {Suspense , lazy} from 'react'
import "./App.css"
import {BrowserRouter , Routes , Route} from "react-router-dom"
import { StoreProvider } from './store/Store'

//import views here
import Home from './view/Home'

const App = () => {
  return (
    <StoreProvider>
       <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>}/>
         </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App