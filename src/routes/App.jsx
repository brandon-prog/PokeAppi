import { Route, Routes } from "react-router"
import Home from '../app/home/Home'
import Pokedex from "../app/pokedex/Pokedex"
import Protected from "./Protected"
import MainLayout from "../layout/MainLayout"
import Details from "../app/Details"

function App() {

  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Pokedex" element={<Protected><MainLayout /></Protected>} >
    <Route index element={<Pokedex />} />
    <Route path=":name" element={<Details /> } />
    </Route>
    <Route path="*" element={<img src='https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x1525-klhjkkii.png'/>} />
  </Routes>
  )
}

export default App
