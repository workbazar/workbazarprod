import React,{useState}from'react';
import{useAuth}from'../../context/AuthContext';

export default function Header({page,onNav,onMenu,onLogin,onSearch}){
  const{user}=useAuth();
  const[q,setQ]=useState('');
  const loc=user?.dist&&user?.state?`${user.dist}, ${user.state}`:'Patna, Bihar';
  const doSearch=()=>{if(q.trim()){onSearch(q.trim());setQ('');}};
  return(
    <div className="navbar">
      <div className="nav-logo" onClick={()=>onNav('home')}>Work<span>Bazar</span></div>
      <div className="nav-search">
        <span className="nav-search-ico">🔍</span>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doSearch()} placeholder="Search electrician, plumber, cook…"/>
      </div>
      <div className="nav-loc" onClick={()=>{}}>
        <span style={{fontSize:12}}>📍</span>
        <span className="nav-loc-text">{loc}</span>
        <span style={{fontSize:10,color:'var(--gray)'}}>▾</span>
      </div>
      <div className="nav-right">
        {user?.v?
          <div className="nav-avatar" title={user.name} onClick={()=>onNav('bookings')}>{user.name?user.name[0].toUpperCase():'U'}</div>:
          <><button className="nav-btn nav-btn-outline" onClick={onLogin}>Login</button>
          <button className="nav-btn nav-btn-primary" onClick={onLogin}>Register</button></>
        }
      </div>
    </div>
  );
}
