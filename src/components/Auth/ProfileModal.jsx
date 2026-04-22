import React,{useState}from'react';
import{useAuth}from'../../context/AuthContext';
import{STATES}from'../../utils/data';
import{CATEGORIES}from'../../utils/data';
const PLANS=[{id:'m1',name:'1 Month',price:'₹99',per:'/mo',pop:false},{id:'m3',name:'3 Months',price:'₹249',per:'/3mo',pop:true},{id:'m6',name:'6 Months',price:'₹449',per:'/6mo',pop:false},{id:'m12',name:'1 Year',price:'₹799',per:'/yr',pop:false}];
export default function ProfileModal({open,onClose,initRole}){
  const{user,updateUser,showToast}=useAuth();
  const[tab,setTab]=useState(initRole||'worker');
  const[trade,setTrade]=useState(user?.trade||'');
  const[rate,setRate]=useState(user?.rate||'149');
  const[state,setState]=useState(user?.state||'');
  const[city,setCity]=useState(user?.dist||'');
  const[exp,setExp]=useState(user?.exp||'');
  const[bio,setBio]=useState(user?.bio||'');
  const[plan,setPlan]=useState('m3');
  if(!open||!user?.v)return null;
  const cities=STATES[state]||[];
  const save=()=>{
    if(tab==='worker'){
      if(!trade||!city){showToast('Fill trade and city','error');return;}
      updateUser({trade,rate,state,dist:city,exp,bio,role:'worker',profileComplete:true});
    }else{
      updateUser({role:'recruiter',state,dist:city,profileComplete:true});
    }
    showToast('Profile saved! ✅');
    onClose();
  };
  return(
    <div className="modal-overlay">
      <div className="prof-box">
        <div className="prof-head">
          <span className="prof-title">My Profile</span>
          <button className="prof-close" onClick={onClose}>✕</button>
        </div>
        <div className="prof-body">
          <div className="role-tabs">
            <button className={`role-tab${tab==='worker'?' active':''}`} onClick={()=>setTab('worker')}>👷 Worker</button>
            <button className={`role-tab${tab==='recruiter'?' active':''}`} onClick={()=>setTab('recruiter')}>🏢 Recruiter</button>
          </div>
          {tab==='worker'&&<>
            <label className="ob-label">Your Trade / Skill *</label>
            <select className="ob-select" value={trade} onChange={e=>setTrade(e.target.value)}>
              <option value="">Select your skill</option>
              {CATEGORIES.map(c=><option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
            </select>
            <label className="ob-label">Hourly Rate (₹) *</label>
            <input className="ob-input" type="number" placeholder="e.g. 149" value={rate} onChange={e=>setRate(e.target.value)}/>
            <label className="ob-label">State *</label>
            <select className="ob-select" value={state} onChange={e=>{setState(e.target.value);setCity('');}}>
              <option value="">Select state</option>
              {Object.keys(STATES).map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <label className="ob-label">City *</label>
            <select className="ob-select" value={city} onChange={e=>setCity(e.target.value)}>
              <option value="">Select city</option>
              {cities.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <label className="ob-label">Experience (years)</label>
            <input className="ob-input" placeholder="e.g. 3 years" value={exp} onChange={e=>setExp(e.target.value)}/>
            <label className="ob-label">About You (short bio)</label>
            <textarea className="ob-input" rows={2} style={{resize:'none'}} placeholder="Tell clients about your skills..." value={bio} onChange={e=>setBio(e.target.value)}/>
            <div style={{marginTop:16,padding:12,background:'#fffbeb',border:'1px solid #fde68a',borderRadius:8}}>
              <div style={{fontSize:12,fontWeight:700,color:'#92400e',marginBottom:8}}>⭐ Go PRO — Get 10x More Bookings</div>
              <div className="plan-grid">
                {PLANS.map(p=>(
                  <div key={p.id} className={`plan-card${plan===p.id?' sel':''}`} onClick={()=>setPlan(p.id)}>
                    {p.pop&&<div className="plan-pop-badge">Best Value</div>}
                    <div className="plan-name">{p.name}</div>
                    <div className="plan-price">{p.price}</div>
                    <div className="plan-period">{p.per}</div>
                  </div>
                ))}
              </div>
            </div>
          </>}
          {tab==='recruiter'&&<>
            <label className="ob-label">State</label>
            <select className="ob-select" value={state} onChange={e=>{setState(e.target.value);setCity('');}}>
              <option value="">Select state</option>
              {Object.keys(STATES).map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <label className="ob-label">City</label>
            <select className="ob-select" value={city} onChange={e=>setCity(e.target.value)}>
              <option value="">Select city</option>
              {cities.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{marginTop:12,padding:12,background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8}}>
              <div style={{fontSize:12,fontWeight:600,color:'#15803d'}}>✅ As a recruiter you can hire verified workers instantly. Pay per hour only.</div>
            </div>
          </>}
          <button className="prof-save" onClick={save}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}
