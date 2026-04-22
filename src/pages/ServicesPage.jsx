import React,{useState,useEffect}from'react';
import{useAuth}from'../context/AuthContext';
import{CATEGORIES}from'../utils/data';

export default function ServicesPage({onLogin,onHire,searchQ}){
  const{user}=useAuth();
  const[selCat,setSelCat]=useState(0);
  const[q,setQ]=useState('');

  useEffect(()=>{
    if(searchQ)setQ(searchQ);
    else setQ('');
  },[searchQ]);

  const cat=CATEGORIES[selCat];

  // When searching, show matching categories; else show selected category only
  const displayList=q
    ? CATEGORIES.filter(c=>c.name.toLowerCase().includes(q.toLowerCase()))
    : [cat];

  const hire=svc=>{
    if(!user?.v){onLogin();return;}
    onHire({name:svc.name,icon:svc.icon,ico:svc.icon,rate:svc.rate});
  };

  return(
    <div className="page-wrap">
      <div style={{height:'100%',display:'grid',gridTemplateColumns:'180px 1fr',overflow:'hidden'}}>

        {/* LEFT SIDEBAR */}
        <div className="cat-sidebar">
          {CATEGORIES.map((c,i)=>(
            <div
              key={c.id}
              className={`cat-sidebar-item${selCat===i&&!q?' active':''}`}
              onClick={()=>{setSelCat(i);setQ('');}}
            >
              <span className="cat-sidebar-icon">{c.icon}</span>
              <div>
                <div className="cat-sidebar-name">{c.name}</div>
                <div className="cat-sidebar-count">₹{c.rate}/hr · {c.eta}min</div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="services-right">
          <div className="services-header">
            <div className="services-title">{q?`Results for "${q}"`:cat.name}</div>
            <div className="services-sub">
              {q
                ? `${displayList.length} services found`
                : `Workers arrive in ~${cat.eta} min · ₹${cat.rate}/hr · Pay per hour only`}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="services-search">
            <span style={{fontSize:14}}>🔍</span>
            <input
              placeholder="Search any service…"
              value={q}
              onChange={e=>setQ(e.target.value)}
            />
            {q&&(
              <button
                onClick={()=>setQ('')}
                style={{background:'none',border:'none',cursor:'pointer',fontSize:14,color:'var(--gray)'}}
              >✕</button>
            )}
          </div>

          {/* SERVICE ROWS */}
          {displayList.length===0?(
            <div className="empty">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No results for "{q}"</div>
              <div className="empty-sub">Try: Electrician, Plumber, Cook, Driver</div>
            </div>
          ):displayList.map((svc,i)=>(
            <div key={i} className="service-row">
              <div className="service-row-icon" style={{background:svc.color+'22'}}>
                <span style={{fontSize:22}}>{svc.icon}</span>
              </div>
              <div style={{flex:1}}>
                <div className="service-row-name">{svc.name}</div>
                <div className="service-row-meta">
                  <span className="service-tag green">⚡ ~{svc.eta} min</span>
                  <span className="service-tag blue">✅ OTP Verified</span>
                  <span className="service-tag gray">★ 4.8+</span>
                </div>
                <div style={{fontSize:11,color:'var(--gray)',marginTop:3}}>{svc.desc}</div>
              </div>
              <div className="service-row-price">
                <div className="service-price">₹{svc.rate}/hr</div>
                <div className="service-price-sub">Pay per hour</div>
              </div>
              <button className="service-hire-btn" onClick={()=>hire(svc)}>Hire Now</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
