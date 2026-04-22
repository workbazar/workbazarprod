import React from 'react';
import{useAuth}from'../../context/AuthContext';
const MENU=[{ico:'🏠',l:'Home',k:'home'},{ico:'🔧',l:'All Services',k:'services'},{ico:'📋',l:'My Bookings',k:'bookings'},{ico:'⭐',l:'Go PRO',k:'pro',badge:'HOT'},{ico:'🎁',l:'Offers & Coupons',k:'offers'},{ico:'👛',l:'My Wallet',k:'wallet'},{ico:'📍',l:'Saved Addresses',k:'addresses'},{ico:'🤝',l:'Refer & Earn ₹100',k:'refer',badge:'₹100'},{ico:'📞',l:'24/7 Support',k:'support'},{ico:'ℹ️',l:'About WorkBazar',k:'about'}];
export default function Sidebar({open,onClose,onNav,onProfile,onLogin}){
  const{user,logout,showToast}=useAuth();
  const handle=k=>{
    if(k==='profile'){onProfile();onClose();return;}
    if(['pro','offers','wallet','addresses','refer','support'].includes(k)){showToast('Coming soon!');onClose();return;}
    onNav(k);onClose();
  };
  return(
    <>
      <div className={`sidebar-overlay${open?' open':''}`} onClick={onClose}/>
      <div className={`sidebar${open?' open':''}`}>
        <div className="sidebar-head">
          <button className="sidebar-close" onClick={onClose}>✕</button>
          <div className="sidebar-logo">Work<span className="sidebar-logo-accent">Bazar</span></div>
          {user?.v?<div className="sidebar-user">
            <div className="sidebar-av">{user.name?user.name[0].toUpperCase():'U'}</div>
            <div><div className="sidebar-uname">{user.name||'User'}</div><div className="sidebar-urole">{user.role==='worker'?'👷 Worker':'🏢 Recruiter'}</div></div>
          </div>:<button onClick={()=>{onLogin();onClose();}} style={{marginTop:10,width:'100%',padding:'9px',background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.35)',color:'#fff',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>Sign In / Register</button>}
        </div>
        {MENU.map(({ico,l,k,badge})=>(
          <div key={k} className="sidebar-item" onClick={()=>handle(k)}>
            <span className="sidebar-item-icon">{ico}</span>
            <span className="sidebar-item-label">{l}</span>
            {badge&&<span className="sidebar-item-badge">{badge}</span>}
          </div>
        ))}
        {user?.v&&<div className="sidebar-item" onClick={()=>{logout();onClose();showToast('Logged out');}} style={{marginTop:'auto'}}>
          <span className="sidebar-item-icon">🚪</span>
          <span className="sidebar-item-label" style={{color:'var(--red)'}}>Logout</span>
        </div>}
        <div style={{padding:'12px 16px',fontSize:10,color:'var(--gray)',borderTop:'1px solid var(--border)',marginTop:'auto'}}>WorkBazar © 2025 · Patna, Bihar</div>
      </div>
    </>
  );
}
