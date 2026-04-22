import React,{useState,useEffect}from'react';
import{useAuth}from'../../context/AuthContext';
const STEPS=[{icon:'✅',t:'Booking Confirmed',s:'Your booking is confirmed'},
  {icon:'🔍',t:'Finding Worker',s:'Searching nearby verified worker'},
  {icon:'👷',t:'Worker Assigned',s:'Ramesh Kumar accepted your job'},
  {icon:'🚶',t:'On the Way',s:'Worker is heading to your location'},
  {icon:'🏠',t:'Worker Arrived',s:'Service starting now!'}];
export default function LiveTracking({booking,onClose,onRate}){
  const{showToast}=useAuth();
  const[cur,setCur]=useState(0);
  const[eta,setEta]=useState(30);
  const[done,setDone]=useState(false);
  const[pos,setPos]=useState({x:15,y:65});
  useEffect(()=>{
    if(!booking)return;
    const si=setInterval(()=>setCur(s=>{if(s>=STEPS.length-1){clearInterval(si);setDone(true);return s;}return s+1;}),5000);
    const ei=setInterval(()=>setEta(e=>e<=1?0:e-1),60000);
    const mi=setInterval(()=>setPos(p=>({x:Math.min(p.x+2.5,72),y:Math.max(p.y-1.5,22)})),700);
    return()=>{clearInterval(si);clearInterval(ei);clearInterval(mi);};
  },[booking]);
  if(!booking)return null;
  const w=booking.worker||{};
  return(
    <div className="track-screen">
      <div className="track-nav">
        <button className="track-back" onClick={onClose}>←</button>
        <span className="track-nav-title">Live Tracking · #{booking.id}</span>
        <div className="track-live-pill">{done?'✅ Done':'● Live'}</div>
      </div>
      <div className="map-area">
        <div className="map-grid-h"/><div className="map-grid-v"/>
        {!done&&<div className="map-worker" style={{left:`${pos.x}%`,top:`${pos.y}%`}}>👷</div>}
        <div className="map-home"/>
        <div className="map-route"/>
        <div className="map-loc-label">📍 {booking.address?.area||'Your Location'}</div>
      </div>
      <div className="eta-bar">
        <div><div className="eta-num">{done?'0':eta} min</div><div className="eta-label">{done?'Worker arrived!':'Estimated arrival'}</div></div>
        <div className="eta-actions">
          <button className="eta-action-btn" style={{background:'rgba(255,255,255,.2)',border:'none',color:'#fff',padding:'6px 14px',borderRadius:16,fontSize:13,cursor:'pointer'}} onClick={()=>showToast('Calling worker…')}>📞 Call</button>
        </div>
      </div>
      <div className="track-body">
        <div className="track-worker-card">
          <div className="track-worker-av">👷</div>
          <div>
            <div className="track-worker-name">{w.name||'Ramesh Kumar'}</div>
            <div className="track-worker-meta">{booking.service} · {booking.hours} hr{booking.hours>1?'s':''}</div>
            <div className="track-worker-rat">★ {w.rating||4.9} · {w.jobs||247} jobs · ✅ Verified</div>
          </div>
          <div className="track-worker-btns">
            <button className="tw-btn call" onClick={()=>showToast('Calling…')}>📞</button>
            <button className="tw-btn chat" onClick={()=>showToast('Chat coming soon!')}>💬</button>
          </div>
        </div>
        <div style={{fontSize:13,fontWeight:700,color:'var(--dark)',marginBottom:10}}>Progress</div>
        <div className="progress-steps">
          {STEPS.map((s,i)=>(
            <React.Fragment key={i}>
              <div className="prog-step">
                <div className={`prog-dot${i<cur?' done':i===cur?' active':' idle'}`}>{i<cur?'✓':s.icon}</div>
                <div style={{paddingTop:2}}>
                  <div className="prog-info-title" style={{color:i===cur?'var(--brand)':i<cur?'var(--green)':'var(--gray)'}}>{s.t}</div>
                  <div className="prog-info-sub">{s.s}</div>
                </div>
              </div>
              {i<STEPS.length-1&&<div className={`prog-line${i<cur?' done':''}`}/>}
            </React.Fragment>
          ))}
        </div>
        <div className="booking-summary" style={{marginTop:14}}>
          {[['Service',booking.service],['Duration',booking.hours+' hr'+(booking.hours>1?'s':'')],['Amount','₹'+booking.total],['Payment',(booking.payMethod||'UPI').toUpperCase()]].map(([l,v])=>(
            <div key={l} className="booking-sum-row"><span className="booking-sum-label">{l}</span><span className="booking-sum-val">{v}</span></div>
          ))}
        </div>
        {done&&<>
          <button className="rate-btn" onClick={()=>{onRate?.(booking);onClose();}}>⭐ Rate & Review Worker</button>
          <button className="rebook-btn" onClick={()=>{showToast('Rebooking…');onClose();}}>🔄 Book Again</button>
        </>}
      </div>
    </div>
  );
}
