import React,{useState,useEffect}from'react';
import{useAuth}from'../context/AuthContext';
import{CATEGORIES,WORKERS}from'../utils/data';

const QUOTES=[
  '"Every skill has a price. WorkBazar delivers that skill to your door in 30 minutes."',
  '"Every skill deserves dignity and fair pay. That is why we built WorkBazar."',
  '"WorkBazar is not just an app — it is a movement to empower India\'s 500M workforce."',
  '"Your skill is your identity. Build your identity on WorkBazar today."',
  '"From villages to cities, every worker deserves a chance. We bridge that gap."',
];
const PHOTOS=['/asad_new.jpeg','/asad_pic.jpg'];
const STATS=[{n:'10K+',l:'Workers'},{n:'30 Min',l:'Delivery'},{n:'500+',l:'Cities'},{n:'4.8★',l:'Rating'}];

export default function HomePage({onNav,onLogin,onProfile,onHire}){
  const{user}=useAuth();
  const[qi,setQi]=useState(0);
  const[photo,setPhoto]=useState(0);
  const[fade,setFade]=useState(false);

  useEffect(()=>{
    const v=setInterval(()=>{
      setFade(true);
      setTimeout(()=>{
        setQi(i=>(i+1)%QUOTES.length);
        setPhoto(p=>(p+1)%PHOTOS.length);
        setFade(false);
      },420);
    },5000);
    return()=>clearInterval(v);
  },[]); // FIXED: no dependency needed, PHOTOS and QUOTES are module-level constants

  const needAuth=role=>{if(!user?.v){onLogin();return;}onProfile(role);};

  return(
    <div className="page-wrap">
      <div className="scroll-area pb-mob">

        {/* CEO HERO CARD */}
        <div className="hero-ceo">
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring"/>
            <img
              src={PHOTOS[photo]}
              className={`hero-photo${fade?' fade':''}`}
              alt="Md Asad Siddiqui - Founder & CEO"
              onError={e=>{e.target.onerror=null;e.target.src='/asad_pic.jpg';}}
            />
            <div className="hero-badge">👑 CEO</div>
          </div>
          <div className="hero-info">
            <div className="hero-name">Md Asad Siddiqui</div>
            <div className="hero-role">Founder &amp; CEO, WorkBazar </div>
            <div className={`hero-quote${fade?' fade':''}`}>{QUOTES[qi]}</div>
            <div className="hero-dots">
              {QUOTES.map((_,i)=>(
                <div key={i} className={`hero-dot${i===qi?' on':''}`} onClick={()=>setQi(i)}/>
              ))}
            </div>
          </div>
          <div className="hero-stats">
            {STATS.map(({n,l})=>(
              <div key={l} className="hero-stat">
                <div className="hero-stat-n">{n}</div>
                <div className="hero-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="cta-banner">
          <div className="cta-card worker" onClick={()=>needAuth('worker')}>
            <div className="cta-card-icon">👷</div>
            <div className="cta-card-title">I'm a Worker</div>
            <div className="cta-card-sub">Register your skill &amp; earn ₹149+/hr</div>
            <div className="cta-card-btn">Register Free →</div>
          </div>
          <div className="cta-card recruiter" onClick={()=>needAuth('recruiter')}>
            <div className="cta-card-icon">🏢</div>
            <div className="cta-card-title">I Need Workers</div>
            <div className="cta-card-sub">Hire verified workers in 30 minutes</div>
            <div className="cta-card-btn">Hire Now →</div>
          </div>
        </div>

        {/* ALL SERVICES */}
        <div className="sec">
          <div className="sec-head">
            <span className="sec-title">All Services</span>
            <span className="sec-link" onClick={()=>onNav('services')}>See all →</span>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(c=>(
              <div key={c.id} className="cat-item"
                onClick={()=>onHire({name:c.name,icon:c.icon,ico:c.icon,rate:c.rate})}>
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-rate">₹{c.rate}/hr</div>
              </div>
            ))}
          </div>
        </div>

        {/* AVAILABLE WORKERS */}
        <div className="sec">
          <div className="sec-head">
            <span className="sec-title">👷 Available Near You</span>
            <span className="sec-link">View all →</span>
          </div>
          <div className="worker-scroll">
            {WORKERS.map(w=>(
              <div key={w.id} className="worker-card">
                <div className="worker-card-top">
                  <div className="worker-av">{w.icon}</div>
                  <div className="worker-badge">{w.badge}</div>
                </div>
                <div className="worker-name">{w.name}</div>
                <div className="worker-trade">{w.trade}</div>
                <div className="worker-meta">
                  <span className="worker-rat">★ {w.rating}</span>
                  <span className="worker-jobs">{w.jobs} jobs</span>
                </div>
                <div className="worker-dist">📍 {w.dist} · {w.eta} min away</div>
                <div className="worker-foot">
                  <span className="worker-price">₹{w.rate}/hr</span>
                  <button className="worker-hire"
                    onClick={()=>onHire({name:w.trade,icon:w.icon,ico:w.icon,rate:w.rate})}>
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="sec">
          <div className="sec-head"><span className="sec-title">How It Works</span></div>
          <div className="hiw-grid">
            {[
              {n:1,ico:'🔍',t:'Search',s:'Find any skill'},
              {n:2,ico:'📋',t:'Book',s:'Pick hours & address'},
              {n:3,ico:'✅',t:'Confirm',s:'OTP verified'},
              {n:4,ico:'🚶',t:'Arrives',s:'In 30 minutes'},
              {n:5,ico:'⭐',t:'Rate',s:'Pay & review'},
            ].map(s=>(
              <div key={s.n} className="hiw-item">
                <div className="hiw-num">{s.n}</div>
                <div className="hiw-icon">{s.ico}</div>
                <div className="hiw-title">{s.t}</div>
                <div className="hiw-sub">{s.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="sec" style={{paddingBottom:16}}>
          <div className="trust-strip">
            {[
              {ico:'🛡️',t:'OTP Verified'},
              {ico:'⭐',t:'4.8 Rating'},
              {ico:'💰',t:'Pay Per Hour'},
              {ico:'🔄',t:'Free Rebook'},
              {ico:'📞',t:'24/7 Support'},
              {ico:'🏆',t:'Best Price'},
            ].map((b,i)=>(
              <div key={i} className="trust-item">
                <span className="trust-icon">{b.ico}</span>
                <span className="trust-text">{b.t}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
