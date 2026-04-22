import React from 'react';
export default function MobileNav({page,onNav,onHire}){
  const items=[{k:'home',l:'Home',ico:'🏠'},{k:'services',l:'Services',ico:'🔧'},null,{k:'bookings',l:'Bookings',ico:'📋'},{k:'about',l:'More',ico:'☰'}];
  return(
    <nav className="mobile-nav">
      {items.map((item,i)=>item===null?(
        <button key="hire" className="mob-nav-btn mob-nav-hire" onClick={onHire}><div className="mob-nav-icon">⚡</div></button>
      ):(
        <button key={item.k} className={`mob-nav-btn${page===item.k?' active':''}`} onClick={()=>onNav(item.k)}>
          <div className="mob-nav-icon">{item.ico}</div>
          <div className="mob-nav-label">{item.l}</div>
        </button>
      ))}
    </nav>
  );
}
