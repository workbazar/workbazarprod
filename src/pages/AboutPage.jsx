import React from 'react';

export default function AboutPage({onLogin,onProfile}){
  
  return(
    <div className="page-wrap">
      <div className="scroll-area pb-mob">
        <div className="about-scroll">

          <div className="about-card">
            <div className="about-card-title">About WorkBazar</div>
            <p className="about-text">WorkBazar is India's first 30-minute skilled worker delivery platform. We connect verified electricians, plumbers, cooks, drivers and 100+ other skilled workers with people who need them — instantly, affordably, and safely.</p>
            <p className="about-text" style={{marginTop:8}}>Founded by Md Asad Siddiqui, WorkBazar is built to empower India's 500 million skilled workforce and give every family access to reliable help at fair prices.</p>
          </div>

          <div className="about-card">
            <div className="about-card-title">💰 How WorkBazar Earns Money</div>
            <div className="earn-row">
              <div className="earn-icon">📊</div>
              <div style={{flex:1}}>
                <div className="earn-title">10% Platform Fee on Every Booking</div>
                <div className="earn-desc">Every time a recruiter books a worker for ₹500, WorkBazar earns ₹50 automatically. 100 bookings/day = ₹1,50,000/month</div>
              </div>
              <div className="earn-amount">10%</div>
            </div>
            <div className="earn-row">
              <div className="earn-icon">⭐</div>
              <div style={{flex:1}}>
                <div className="earn-title">PRO Worker Subscriptions</div>
                <div className="earn-desc">Workers pay ₹99–₹799/month to boost their profile and get 10x more bookings. 1000 PRO workers = ₹99,000/month</div>
              </div>
              <div className="earn-amount">₹99/mo</div>
            </div>
            <div className="earn-row">
              <div className="earn-icon">🤝</div>
              <div style={{flex:1}}>
                <div className="earn-title">Refer & Earn</div>
                <div className="earn-desc">Users refer friends and earn ₹100 per successful referral. Drives organic growth at zero cost.</div>
              </div>
              <div className="earn-amount">₹100</div>
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-title">👷 How Workers Earn Money</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {n:1,t:'Register Free',d:'Enter name, mobile, verify OTP — done in 2 minutes'},
                {n:2,t:'Fill Your Profile',d:'Add trade, hourly rate, city and experience'},
                {n:3,t:'Get Booking Alerts',d:'Recruiters find you and book your service'},
                {n:4,t:'Complete the Job',d:'Go to address, start job with OTP, finish work'},
                {n:5,t:'Get Paid',d:'Money credited to WorkBazar wallet instantly'},
                {n:6,t:'Withdraw Anytime',d:'Transfer to UPI or bank — minimum ₹100'},
              ].map(s=>(
                <div key={s.n} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <div style={{width:24,height:24,borderRadius:'50%',background:'#dbeafe',color:'#1d4ed8',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>{s.n}</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--dark)'}}>{s.t}</div>
                    <div style={{fontSize:11,color:'var(--gray)',marginTop:1}}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-title">🏢 How Recruiters Hire</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {n:1,t:'Register & Verify',d:'Mobile OTP verification — takes 60 seconds'},
                {n:2,t:'Search Any Service',d:'Choose from 100+ skilled categories'},
                {n:3,t:'Book in 2 Minutes',d:'Select hours, enter address, apply coupon'},
                {n:4,t:'Worker Arrives in 30 Min',d:'Verified, background-checked professional'},
                {n:5,t:'Pay Per Hour Only',d:'UPI, Cash or Card — pay only what you use'},
                {n:6,t:'Rate & Review',d:'Build trust, get better workers next time'},
              ].map(s=>(
                <div key={s.n} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <div style={{width:24,height:24,borderRadius:'50%',background:'#dcfce7',color:'#15803d',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>{s.n}</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--dark)'}}>{s.t}</div>
                    <div style={{fontSize:11,color:'var(--gray)',marginTop:1}}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-title">📞 Contact & Support</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {ico:'✉️',l:'Email',v:'asad@workbazar.in'},
                {ico:'📞',l:'Phone',v:'+91-8521099655'},
                {ico:'📍',l:'Address',v:'Patna, Bihar, India — 800001'},
                {ico:'🕐',l:'Support Hours',v:'24/7 — We are always here'},
              ].map((c,i)=>(
                <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:16}}>{c.ico}</span>
                  <span style={{fontSize:11,color:'var(--gray)',width:80}}>{c.l}</span>
                  <span style={{fontSize:12,fontWeight:600,color:'var(--dark)'}}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:'linear-gradient(135deg,#0f172a,#1d4ed8)',borderRadius:12,padding:16,textAlign:'center',color:'#fff'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>WorkBazar © 2026</div>
            <div style={{fontSize:11,opacity:.7}}>Made in India</div>
            <div style={{fontSize:10,opacity:.5,marginTop:4}}>Empowering India's 500M skilled workforce</div>
          </div>

        </div>
      </div>
    </div>
  );
}
