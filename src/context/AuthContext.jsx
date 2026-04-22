import React,{createContext,useContext,useState,useCallback,useEffect}from'react';
const Ctx=createContext(null);
export function AuthProvider({children}){
  const[user,setUser]=useState(null);
  const[toast,setToast]=useState({msg:'',show:false,type:'success'});
  useEffect(()=>{try{const u=localStorage.getItem('wb_u');if(u)setUser(JSON.parse(u));}catch{}},[]);
  const showToast=useCallback((msg,type='success')=>{setToast({msg,show:true,type});setTimeout(()=>setToast(t=>({...t,show:false})),3000);},[]);
  const login=useCallback(u=>{const nu={...u,v:true};setUser(nu);try{localStorage.setItem('wb_u',JSON.stringify(nu));}catch{}},[]);
  const logout=useCallback(()=>{setUser(null);try{localStorage.removeItem('wb_u');}catch{}},[]);
  const updateUser=useCallback(d=>setUser(p=>{if(!p)return p;const nu={...p,...d};try{localStorage.setItem('wb_u',JSON.stringify(nu));}catch{}return nu;}),[]);
  return<Ctx.Provider value={{user,toast,showToast,login,logout,updateUser}}>{children}</Ctx.Provider>;
}
export function useAuth(){const c=useContext(Ctx);if(!c)throw new Error('no auth');return c;}
