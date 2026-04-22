import React,{useState,useEffect}from'react';
import{useAuth}from'../../context/AuthContext';
import{HOUR_OPTS,PAY_METHODS,STATES}from'../../utils/data';
const SAVED=[{label:'🏠 Home',area:'Rajiv Nagar, Patna'},{label:'🏢 Office',area:'Fraser Road, Patna'}];
const COUPONS={'FIRST200':{disc:200,label:'₹200 off first booking'},'WEEKEND20':{pct:20,label:'20% weekend discount'}};
export default function BookingSheet({open,service,onClose,onBooked}){
  const{user,showToast}=useAuth();
  const[step,setStep]=useState(1);
  const[hours,setHours]=useState(1);
  const[sch,setSch]=useState('now');
  const[dt,setDt]=useState('');
  const[flat,setFlat]=useState('');
  const[area,setArea]=useState('');
  const[state,setState]=useState('');
  const[city,setCity]=useState('');
  const[pay,setPay]=useState('upi');
  const[coupon,setCoupon]=useState('');
  const[couponOk,setCouponOk]=useState(null);
  const[tip,setTip]=useState(0);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{if(!open){setStep(1);setHours(1);setSch('now');setCoupon('');setCouponOk(null);setTip(0);}else if(user){setState(user.state||'');setCity(user.dist||'');}},[open,user]);
  if(!open||!service)return null;
  const rate=service.rate||149;
  const hrs=Number(hours);
  const base=rate*hrs;
  const fee=Math.round(base*0.10);
  let disc=0;
  if(couponOk){const c=COUPONS[coupon.toUpperCase()];if(c){disc=c.disc||Math.round(base*(c.pct/100));}}
  const total=base+fee+tip-disc;
  const cities=STATES[state]||[];
  const applyCoupon=()=>{
    const c=COUPONS[coupon.toUpperCase()];
    if(c){setCouponOk(true);showToast('Coupon applied! '+c.label);}
    else{setCouponOk(false);showToast('Invalid coupon code','error');}
  };
  const confirm=()=>{
    if(!flat||!area){showToast('Enter full address','error');return;}
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      const bk={id:'WB'+Date.now().toString().slice(-6),service:service.name,icon:service.icon||service.ico||'⚡',hours:hrs,total,payMethod:pay,address:{flat,area,city,state},status:'in-progress',eta:30,worker:{name:'Ramesh Kumar',trade:service.name,rating:4.9,jobs:247,phone:'+91-9876543210'}};
      showToast('Booking confirmed! Worker on the way 🚀');
      onBooked?.(bk);
      onClose();
    },1500);
  };
  return(
    <>
      <div className={`sheet-overlay${open?' open':''}`} onClick={onClose}/>
      <div className={`sheet${open?' open':''}`}>
        <div className="sheet-handle"/>
        <div className="sheet-header">
          <span className="sheet-title">{['','Service','Schedule','Address','Payment'][step]}</span>
          <button className="sheet-close" onClick={onClose}>✕</button>
        </div>
        <div className="sheet-steps">
          {['Service','Schedule','Address','Pay'].map((s,i)=>(
            <React.Fragment key={s}>
              <div className={`step-num${step>i+1?' done':step===i+1?' active':' idle'}`}>{step>i+1?'✓':i+1}</div>
              <span className={`step-label${step===i+1?' active':''}`}>{s}</span>
              {i<3&&<div className={`step-line${step>i+1?' done':''}`}/>}
            </React.Fragment>
          ))}
        </div>
        <div className="sheet-body">
          {step===1&&<>
            <div className="service-info-box">
              <div className="service-info-icon">{service.icon||service.ico||'⚡'}</div>
              <div>
                <div className="service-info-name">{service.name}</div>
                <div className="service-info-eta">⚡ Arrives in ~30 minutes</div>
                <div className="service-info-rate">₹{rate}/hr · Minimum 1 hour</div>
              </div>
            </div>
            <span className="label">How many hours?</span>
            <div className="hours-grid">
              {HOUR_OPTS.map(o=>(
                <div key={o.h} className={`hour-opt${hours===o.h?' sel':''}`} onClick={()=>setHours(o.h)}>
                  <div className="hour-opt-h">{o.label}</div>
                  <div className="hour-opt-p">₹{rate*(o.h===8?8:o.h)}</div>
                </div>
              ))}
            </div>
            <span className="label">Coupon Code</span>
            <div className="coupon-row">
              <input className="coupon-inp" placeholder="e.g. FIRST200" value={coupon} onChange={e=>setCoupon(e.target.value)} disabled={couponOk===true}/>
              {couponOk===true?<span style={{color:'#16a34a',fontWeight:700,fontSize:13}}>✓ Applied</span>:<button className="coupon-btn" onClick={applyCoupon}>Apply</button>}
            </div>
            <div className="price-box">
              <div className="price-row"><span className="price-label">₹{rate} × {hrs} hr{hrs>1?'s':''}</span><span className="price-val">₹{base}</span></div>
              <div className="price-row"><span className="price-label">Platform fee (10%)</span><span className="price-val">₹{fee}</span></div>
              {disc>0&&<div className="price-row"><span className="price-label">Discount</span><span className="price-val green">−₹{disc}</span></div>}
              <div className="price-row"><span style={{fontWeight:700}}>Total</span><span className="price-val brand">₹{total}</span></div>
            </div>
            <button className="confirm-btn" onClick={()=>setStep(2)}>Continue →</button>
          </>}
          {step===2&&<>
            <span className="label">When do you need the worker?</span>
            <div className="schedule-opts">
              <div className={`sch-opt${sch==='now'?' sel':''}`} onClick={()=>setSch('now')}><div className="sch-opt-title">⚡ Now</div><div className="sch-opt-sub">~30 min arrival</div></div>
              <div className={`sch-opt${sch==='later'?' sel':''}`} onClick={()=>setSch('later')}><div className="sch-opt-title">📅 Schedule</div><div className="sch-opt-sub">Pick date & time</div></div>
            </div>
            {sch==='later'&&<><span className="label">Date & Time</span><input type="datetime-local" className="inp" value={dt} onChange={e=>setDt(e.target.value)} min={new Date().toISOString().slice(0,16)}/></>}
            <div className="btn-row"><button className="back-btn" onClick={()=>setStep(1)}>←</button><button className="confirm-btn" onClick={()=>setStep(3)}>Continue →</button></div>
          </>}
          {step===3&&<>
            <span className="label">Saved Addresses</span>
            <div className="saved-addr-row">
              {SAVED.map((s,i)=><button key={i} className="saved-addr-btn" onClick={()=>setArea(s.area)}>{s.label}</button>)}
            </div>
            <span className="label">Flat / House No. *</span>
            <input className="inp" placeholder="e.g. 12B, 2nd Floor" value={flat} onChange={e=>setFlat(e.target.value)}/>
            <span className="label">Area / Street *</span>
            <input className="inp" placeholder="e.g. Rajiv Nagar, Near SBI" value={area} onChange={e=>setArea(e.target.value)}/>
            <div className="inp-row" style={{marginTop:8}}>
              <select className="inp" value={state} onChange={e=>{setState(e.target.value);setCity('');}}>
                <option value="">State</option>
                {Object.keys(STATES).map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <select className="inp" value={city} onChange={e=>setCity(e.target.value)}>
                <option value="">City</option>
                {cities.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="btn-row"><button className="back-btn" onClick={()=>setStep(2)}>←</button><button className="confirm-btn" onClick={()=>setStep(4)}>Continue →</button></div>
          </>}
          {step===4&&<>
            <div className="price-box" style={{marginBottom:12}}>
              <div className="price-row"><span className="price-label">Service</span><span className="price-val">{service.name}</span></div>
              <div className="price-row"><span className="price-label">Duration</span><span className="price-val">{hrs} hr{hrs>1?'s':''} · {sch==='now'?'Now':'Scheduled'}</span></div>
              <div className="price-row"><span className="price-label">Address</span><span className="price-val">{area||'—'}</span></div>
              <div className="price-row"><span style={{fontWeight:700}}>Total</span><span className="price-val brand">₹{total}</span></div>
            </div>
            <span className="label">Tip for worker (optional)</span>
            <div style={{display:'flex',gap:6,marginBottom:12}}>
              {[{l:'No tip',v:0},{l:'₹10',v:10},{l:'₹20',v:20},{l:'₹50',v:50}].map(t=>(
                <div key={t.l} className={`hour-opt${tip===t.v?' sel':''}`} style={{flex:1,textAlign:'center'}} onClick={()=>setTip(t.v)}><div className="hour-opt-h" style={{fontSize:11}}>{t.l}</div></div>
              ))}
            </div>
            <span className="label">Payment Method</span>
            <div className="pay-list">
              {PAY_METHODS.map(m=>(
                <div key={m.id} className={`pay-opt${pay===m.id?' sel':''}`} onClick={()=>setPay(m.id)}>
                  <div className="pay-opt-icon">{m.icon}</div>
                  <div><div className="pay-opt-name">{m.name}</div><div className="pay-opt-sub">{m.sub}</div></div>
                  <div className={`pay-check${pay===m.id?' on':''}`}/>
                </div>
              ))}
            </div>
            <div className="safety-note">🛡️ All workers are OTP-verified and background-checked. Your safety is guaranteed.</div>
            <div className="btn-row">
              <button className="back-btn" onClick={()=>setStep(3)}>←</button>
              <button className={`confirm-btn green${loading?' ':''}`} onClick={confirm} disabled={loading} style={{flex:1}}>{loading?'Confirming…':`Confirm Booking — ₹${total}`}</button>
            </div>
          </>}
        </div>
      </div>
    </>
  );
}
