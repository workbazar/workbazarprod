import React,{useState}from'react';
import{useAuth}from'../context/AuthContext';
const DUMMY=[
  {id:'WB001234',service:'Electrician',icon:'⚡',hours:2,total:326,status:'in-progress',address:{area:'Rajiv Nagar, Patna'},worker:{name:'Ramesh Kumar',rating:4.9,phone:'+91-9876543210',jobs:247},payMethod:'UPI',createdAt:new Date().toISOString(),eta:12},
  {id:'WB001199',service:'Plumber',icon:'🔧',hours:1,total:163,status:'completed',address:{area:'Gandhi Maidan, Patna'},worker:{name:'Suresh Prasad',rating:4.8,phone:'+91-9876000001',jobs:189},payMethod:'Cash',createdAt:new Date(Date.now()-86400000).toISOString()},
  {id:'WB001155',service:'Cook',icon:'👨‍🍳',hours:3,total:489,status:'completed',address:{area:'Boring Road, Patna'},worker:{name:'Priya Devi',rating:4.9,phone:'+91-9876000002',jobs:312},payMethod:'UPI',createdAt:new Date(Date.now()-172800000).toISOString()},
];
const SL={pending:'Pending',accepted:'Accepted','in-progress':'In Progress',completed:'Completed',cancelled:'Cancelled'};
function ago(d){const s=Math.floor((Date.now()-new Date(d))/1000);if(s<3600)return Math.floor(s/60)+'m ago';if(s<86400)return Math.floor(s/3600)+'h ago';return Math.floor(s/86400)+'d ago';}
export default function BookingsPage({onLogin,onTrack,onRate}){
  const{user}=useAuth();
  const[tab,setTab]=useState('active');
  if(!user?.v)return(
    <div className="page-wrap"><div className="empty">
      <div className="empty-icon">🔐</div>
      <div className="empty-title">Login to see bookings</div>
      <div className="empty-sub">Track workers, rate service, manage your bookings</div>
      <button className="empty-btn" onClick={onLogin}>Login / Register</button>
    </div></div>
  );
  const active=DUMMY.filter(b=>['pending','accepted','in-progress'].includes(b.status));
  const done=DUMMY.filter(b=>['completed','cancelled'].includes(b.status));
  const shown=tab==='active'?active:done;
  return(
    <div className="page-wrap">
      <div className="scroll-area pb-mob">
        <div className="bookings-wrap">
          {/* summary pills */}
          <div style={{display:'flex',gap:8}}>
            {[{l:'Active',n:active.length,c:'#dbeafe',tc:'#1d4ed8'},{l:'Completed',n:done.length,c:'#dcfce7',tc:'#15803d'},{l:'Total Spent',n:'₹'+DUMMY.reduce((a,b)=>a+b.total,0),c:'#f0fdf4',tc:'#15803d'}].map((p,i)=>(
              <div key={i} style={{flex:1,background:p.c,borderRadius:8,padding:'10px 8px',textAlign:'center'}}>
                <div style={{fontSize:16,fontWeight:800,color:p.tc}}>{p.n}</div>
                <div style={{fontSize:10,color:'var(--gray)',marginTop:1}}>{p.l}</div>
              </div>
            ))}
          </div>
          <div className="booking-tabs">
            <button className={`booking-tab${tab==='active'?' active':''}`} onClick={()=>setTab('active')}>⚡ Active ({active.length})</button>
            <button className={`booking-tab${tab==='done'?' active':''}`} onClick={()=>setTab('done')}>✅ Completed ({done.length})</button>
          </div>
          {shown.map(b=>(
            <div key={b.id} className="booking-card">
              <div className="booking-card-head">
                <div>
                  <div className="booking-service">{b.icon} {b.service}</div>
                  <div className="booking-id">#{b.id} · {ago(b.createdAt)}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <div className={`booking-status ${b.status.replace('-','')}`}>{SL[b.status]}</div>
                  {b.status==='in-progress'&&<div style={{background:'#fed7aa',color:'#9a3412',padding:'2px 7px',borderRadius:10,fontSize:10,fontWeight:700}}>⚡{b.eta}m</div>}
                </div>
              </div>
              <div className="booking-body">
                <div className="booking-row"><span className="booking-row-label">Worker</span><span className="booking-row-value">✅ {b.worker.name} · ★{b.worker.rating}</span></div>
                <div className="booking-row"><span className="booking-row-label">Duration</span><span className="booking-row-value">{b.hours} hr{b.hours>1?'s':''}</span></div>
                <div className="booking-row"><span className="booking-row-label">Address</span><span className="booking-row-value">{b.address.area}</span></div>
                <div className="booking-row"><span className="booking-row-label">Amount</span><span className="booking-row-value" style={{color:'var(--brand)',fontWeight:700}}>₹{b.total} · {b.payMethod}</span></div>
              </div>
              <div className="booking-actions">
                {b.status==='in-progress'&&<button className="bk-action-btn orange" onClick={()=>onTrack(b)}>🗺️ Live Track</button>}
                {b.status==='completed'&&<button className="bk-action-btn green" onClick={()=>onRate(b)}>⭐ Rate</button>}
                {['pending','accepted'].includes(b.status)&&<button className="bk-action-btn primary" onClick={()=>onTrack(b)}>Track</button>}
                <button className="bk-action-btn outline" onClick={()=>window.open('tel:'+b.worker.phone)}>📞 Call</button>
                {b.status==='completed'&&<button className="bk-action-btn primary">🔄 Book Again</button>}
              </div>
            </div>
          ))}
          {shown.length===0&&<div className="empty"><div className="empty-icon">📭</div><div className="empty-title">No bookings here</div></div>}
        </div>
      </div>
    </div>
  );
}
