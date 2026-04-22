import React,{useState}from'react';
import{useAuth}from'../../context/AuthContext';
const TAGS=['Punctual','Skilled','Professional','Clean work','Friendly','Would hire again'];
export default function RatingModal({open,booking,onClose}){
  const{showToast}=useAuth();
  const[stars,setStars]=useState(0);
  const[hover,setHover]=useState(0);
  const[tags,setTags]=useState([]);
  const[review,setReview]=useState('');
  const[done,setDone]=useState(false);
  const toggleTag=t=>setTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const submit=()=>{
    if(!stars){showToast('Please select a rating','error');return;}
    setDone(true);
    setTimeout(()=>{showToast('Review submitted! +10 points 🎉');onClose();setDone(false);setStars(0);setTags([]);setReview('');},1600);
  };
  if(!open||!booking)return null;
  return(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <span className="modal-title">Rate Your Experience</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {!done?<div className="modal-body">
          <div className="rating-worker-info">
            <div className="rating-worker-av">{booking.icon||'👷'}</div>
            <div>
              <div className="rating-worker-name">{booking.worker?.name||'Worker'}</div>
              <div className="rating-worker-trade">{booking.service}</div>
            </div>
          </div>
          <div style={{fontSize:12,fontWeight:600,color:'var(--dark)',marginBottom:4}}>How was the service?</div>
          <div style={{display:'flex',alignItems:'center'}}>
            <div className="stars">
              {[1,2,3,4,5].map(s=>(
                <span key={s} className={`star${s<=(hover||stars)?' on':''}`}
                  onClick={()=>setStars(s)} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)}>★</span>
              ))}
            </div>
            {(hover||stars)>0&&<span className="star-label">{['','Poor','Fair','Good','Great','Excellent!'][hover||stars]}</span>}
          </div>
          <div style={{fontSize:12,fontWeight:600,color:'var(--dark)',marginTop:10,marginBottom:4}}>What went well?</div>
          <div className="tag-chips">
            {TAGS.map(t=><div key={t} className={`tag-chip${tags.includes(t)?' on':''}`} onClick={()=>toggleTag(t)}>{t}</div>)}
          </div>
          <textarea className="review-textarea" rows={3} placeholder="Share your experience (optional)…" value={review} onChange={e=>setReview(e.target.value)}/>
          <button className="submit-btn" onClick={submit}>Submit Review</button>
        </div>:<div className="rating-thanks">
          <div className="thanks-icon">🎉</div>
          <div className="thanks-title">Thank You!</div>
          <div className="thanks-sub">Your review helps build trust in WorkBazar</div>
          <div className="thanks-points">+10 Points Earned!</div>
        </div>}
      </div>
    </div>
  );
}
