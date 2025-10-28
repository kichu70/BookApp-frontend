import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider =({children})=>{

  const safeParse =(key)=>{ //the name because if i give direct Parse then it will get error  
    try{
      const value =localStorage.getItem(key);
      if (!value || value === "undefined" || value === "null") return null;
      return JSON.parse(value);
    }
    catch(err){
      console.log(err,`Error parsing localStorage key "${key}"`)
      return null;
    }
  }
    const[token,setToken]=useState(null);
    const[user,setUser]=useState(null);
    const [cartItems, setCartItems] = useState(()=>safeParse("cartItems") || []);


    // ----------
    useEffect(()=>{
        const storedToken =localStorage.getItem("token")
        const storedUser =localStorage.getItem("user")
        const storedCart = localStorage.getItem("cartItems");


        if(storedToken){setToken(storedToken)}
        if(storedUser){setUser(storedUser)}
        if(storedCart){setCartItems(JSON.parse(storedCart))}
    },[])



    useEffect(()=>{
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    },[cartItems])
 


// ----------addcart-----
  const addToCart = (book) => {
    const exists = cartItems.find((item) => item.id === book.id);
    if (exists) {
      toast.info("Book already in cart");
      return;
    }
    setCartItems((prev) => [...prev, book]);
    toast.success("Book added to cart");
  };


//  ----------removecart-----
const removeFromCart = (bookId) => {
  setCartItems((prev) => {
    const updated = prev.filter((item) => item.id !== bookId);
    if (updated.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(updated));
    } else {
      localStorage.removeItem("cartItems");
    }
    toast.info("Book removed from cart");
    return updated;
  });
};


    // ----------
    const login=async(email,password)=>{
        try{
            const res= await axios.post("http://localhost:5000/user/login",{
                email,
                password
            })
            console.log("Full backend response:", res.data); 
            const token1 =res.data.AccesToken
            const userdata =res.data.userData

            setToken(token1)
            setUser(userdata)

            localStorage.setItem("token",token1)
            localStorage.setItem("user",JSON.stringify(userdata))
            console.log(token1)
            
            toast.success("Login Successfull!!")
        }catch(err){
            console.log(err,"error is in the login page",{email,password})
            toast.error("server bussy")
        }
    }

    // ---------
    const logout=()=>{
        setToken(null);
        setUser(null);
        setCartItems([]);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cartItems");
        
        toast.info("Logout successfully")
    }
    

      return(
        <>
    
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    <AuthContext.Provider value={{user,token,login,logout,cartItems,addToCart,removeFromCart}}>
        {children}
    </AuthContext.Provider>
        
        </>
    )
}
export const useAuth =()=>useContext(AuthContext)
