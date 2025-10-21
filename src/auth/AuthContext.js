import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const[token,setToken]=useState(null);
    const[user,setUser]=useState(null);
    useEffect(()=>{
        const storedToken =localStorage.getItem("token")
        const storedUser =localStorage.getItem("user")
        if(storedToken){setToken(storedToken)}
        if(storedUser){setUser(storedUser)}
    },[])
    const login=async(email,password)=>{
        try{
            const res= await axios.post("http://localhost:5000/user/login",{
                email,password
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
     const logout=()=>{
        setToken(null)
        setUser(null)
        localStorage.removeItem("token");
        toast.info("Logout successfully")
        localStorage.removeItem("user");
    }
      return(
        <>
    
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    <AuthContext.Provider value={{user,token,login,logout}}>
        {children}
    </AuthContext.Provider>
        
        </>
    )
}
export const useAuth =()=>useContext(AuthContext)
