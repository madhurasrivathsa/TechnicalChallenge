
import  { createContext,useState } from 'react'
export let  CartContext=createContext()

const MainContext = ({children}) => {
  let  [cart,setCart]=useState([])
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
    {children}
    </CartContext.Provider> 
  )
}

export default MainContext