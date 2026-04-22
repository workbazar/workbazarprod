import React,{useState,useEffect,useRef}from'react';
import{useAuth}from'../../context/AuthContext';

const CC=[
  {c:'+91',f:'🇮🇳',n:'India'},
  {c:'+1',f:'🇺🇸',n:'USA'},
  {c:'+44',f:'🇬🇧',n:'UK'},
  {c:'+971',f:'🇦🇪',n:'UAE'},
];
const LANGS=['English','Hindi','Bengali','Tamil','Marathi'];

export default function OnboardingModal({open,onClose,onDoneWorker,onDoneRecruiter}){
  const{showToast,login}=useAuth();
  const[step,setStep]=useState(1); // 1=landing, 2=name+lang, 3=phone, 4=otp, 5=role
  const[name,setName]=useState('');
  const[cc,setCc]=useState('+91');
  const[mob,setMob]=useState('');
  const[lang,setLang]=useState('English');
  const[otp,setOtp]=useState(['','','','','','']);
  const[timer,setTimer]=useState(30);
  const[canResend,setCanResend]=useState(false);
  const[loading,setLoading]=useState(false);
  const refs=useRef([]);

  useEffect(()=>{
    if(!open){setStep(1);setName('');setMob('');setOtp(['','','','','','']);}
  },[open]);

  useEffect(()=>{
    if(step!==4)return;
    setTimer(30);setCanResend(false);
    const iv=setInterval(()=>setTimer(p=>{
      if(p<=1){clearInterval(iv);setCanResend(true);return 0;}
      return p-1;
    }),1000);
    return()=>clearInterval(iv);
  },[step]);

  const otpChange=(i,v)=>{
    if(!/^\d?$/.test(v))return;
    const n=[...otp];n[i]=v;setOtp(n);
    if(v&&i<5)refs.current[i+1]?.focus();
  };
  const otpKey=(i,e)=>{
    if(e.key==='Backspace'&&!otp[i]&&i>0)refs.current[i-1]?.focus();
  };

  const sendOtp=()=>{
    if(!mob||mob.length<10){showToast('Enter valid 10-digit mobile number','error');return;}
    setLoading(true);
    // Demo mode — in production call your backend /api/auth/send-otp
    setTimeout(()=>{
      setLoading(false);
      setStep(4);
      showToast('📱 Demo OTP: 1 2 3 4 5 6');
    },800);
  };

  const verify=()=>{
    const code=otp.join('');
    if(code.length<6){showToast('Enter all 6 digits','error');return;}
    // Demo: any 6 digits work. In production verify with backend.
    setStep(5);
  };

  const handleGoogleSignIn=()=>{
    // Google Sign-In — reads from Google button click
    // In production: integrate Firebase Auth Google provider
    // For now: demo login with Google
    const demoName='Google User';
    login({name:demoName,mob:'google',lang:'English',role:'recruiter',loginMethod:'google'});
    showToast('✅ Signed in with Google!');
    onClose();
    onDoneRecruiter?.();
  };

  const finish=role=>{
    login({name,mob:cc+mob,lang,role,loginMethod:'otp'});
    showToast(`Welcome to WorkBazar, ${name}! 🎉`);
    onClose();
    if(role==='worker')onDoneWorker?.();
    else onDoneRecruiter?.();
  };

  if(!open)return null;

  return(
    <div className="ob-overlay">
      <div className="ob-box">

        {/* HEADER */}
        <div className="ob-head">
          <div className="ob-logo">Work<span className="ob-logo-accent">Bazar</span></div>
          <div className="ob-tagline">SERVICE IN 30 MINUTES</div>
        </div>

        {/* PROGRESS BAR */}
        <div className="ob-progress">
          {[1,2,3,4,5].map(s=>(
            <div key={s} className={`ob-prog-step${step>s?' done':step===s?' active':''}`}/>
          ))}
        </div>

        <div className="ob-body">

          {/* STEP 1 — LANDING: OTP or Google */}
          {step===1&&<>
            <div className="ob-title">Join WorkBazar</div>
            <div className="ob-sub">Create account in 60 seconds</div>

            {/* GOOGLE BUTTON */}
            <button
              onClick={handleGoogleSignIn}
              style={{
                width:'100%',display:'flex',alignItems:'center',justifyContent:'center',
                gap:10,padding:'12px',border:'1.5px solid #e2e8f0',borderRadius:8,
                background:'#fff',cursor:'pointer',fontSize:14,fontWeight:600,
                color:'#0f172a',marginBottom:12,transition:'box-shadow .2s',
              }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,.12)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.8 13.5-4.7l-6.2-5.2C29.4 35.6 26.8 36.5 24 36.5c-5.2 0-9.6-3.5-11.2-8.3l-6.5 5C9.7 39.5 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
              </svg>
              Continue with Google
            </button>

            {/* DIVIDER */}
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <div style={{flex:1,height:1,background:'#e2e8f0'}}/>
              <span style={{fontSize:12,color:'#6b7280',fontWeight:500}}>or use mobile OTP</span>
              <div style={{flex:1,height:1,background:'#e2e8f0'}}/>
            </div>

            <button className="ob-btn" onClick={()=>setStep(2)}>
              📱 Continue with Mobile OTP
            </button>

            <p style={{fontSize:10,color:'#9ca3af',textAlign:'center',marginTop:10,lineHeight:1.5}}>
              By continuing you agree to WorkBazar's Terms of Service and Privacy Policy
            </p>
          </>}

          {/* STEP 2 — NAME + LANGUAGE */}
          {step===2&&<>
            <div className="ob-title">Your Details</div>
            <div className="ob-sub">We need your name to set up your account</div>
            <label className="ob-label">Full Name *</label>
            <input
              className="ob-input"
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={e=>setName(e.target.value)}
              autoFocus
            />
            <label className="ob-label">Preferred Language</label>
            <div className="lang-opts">
              {LANGS.map(l=>(
                <div key={l} className={`lang-opt${lang===l?' sel':''}`} onClick={()=>setLang(l)}>{l}</div>
              ))}
            </div>
            <button className="ob-btn" onClick={()=>{
              if(!name.trim()){showToast('Enter your name','error');return;}
              setStep(3);
            }}>Continue →</button>
            <button className="ob-btn-ghost" onClick={()=>setStep(1)}>← Back</button>
          </>}

          {/* STEP 3 — PHONE NUMBER */}
          {step===3&&<>
            <div className="ob-title">Mobile Number</div>
            <div className="ob-sub">We'll send a 6-digit OTP to verify</div>
            <label className="ob-label">Mobile Number *</label>
            <div className="ob-phone-row">
              <select className="ob-cc" value={cc} onChange={e=>setCc(e.target.value)}>
                {CC.map(c=><option key={c.c} value={c.c}>{c.f} {c.c}</option>)}
              </select>
              <input
                className="ob-phone-inp"
                type="tel"
                maxLength={10}
                placeholder="10-digit number"
                value={mob}
                onChange={e=>setMob(e.target.value.replace(/\D/g,''))}
                onKeyDown={e=>e.key==='Enter'&&sendOtp()}
                autoFocus
              />
            </div>
            <p className="ob-note">🔒 Used only for account security. Never shared.</p>
            <button className="ob-btn" onClick={sendOtp} disabled={loading}>
              {loading?'Sending OTP…':'Send OTP →'}
            </button>
            <button className="ob-btn-ghost" onClick={()=>setStep(2)}>← Back</button>
          </>}

          {/* STEP 4 — OTP */}
          {step===4&&<>
            <div className="ob-title">Enter OTP</div>
            <div className="ob-sub">
              6-digit code sent to <strong>{cc} {mob}</strong>
              <br/><span style={{fontSize:11,color:'#16a34a',fontWeight:600}}>Demo mode: enter 123456</span>
            </div>
            <div className="otp-row">
              {otp.map((d,i)=>(
                <input
                  key={i}
                  ref={el=>refs.current[i]=el}
                  className="otp-box"
                  maxLength={1}
                  value={d}
                  onChange={e=>otpChange(i,e.target.value)}
                  onKeyDown={e=>otpKey(i,e)}
                  inputMode="numeric"
                  autoFocus={i===0}
                />
              ))}
            </div>
            <div className="resend-row">
              {canResend
                ?<button className="resend-btn" onClick={()=>{setCanResend(false);sendOtp();}}>Resend OTP</button>
                :<span className="resend-timer">Resend in {timer}s</span>
              }
            </div>
            <button className="ob-btn" onClick={verify}>Verify OTP →</button>
            <button className="ob-btn-ghost" onClick={()=>setStep(3)}>← Back</button>
          </>}

          {/* STEP 5 — CHOOSE ROLE */}
          {step===5&&<>
            <div className="ob-title">Welcome, {name}! 🎉</div>
            <div className="ob-sub">How will you use WorkBazar?</div>
            <div className="role-cards">
              <div className="role-card" onClick={()=>finish('worker')}>
                <div className="role-card-icon">👷</div>
                <div className="role-card-name">I'm a Worker</div>
                <div className="role-card-sub">Register my skills &amp; earn money</div>
              </div>
              <div className="role-card" onClick={()=>finish('recruiter')}>
                <div className="role-card-icon">🏢</div>
                <div className="role-card-name">I Need Workers</div>
                <div className="role-card-sub">Hire verified workers now</div>
              </div>
            </div>
          </>}

        </div>
      </div>
    </div>
  );
}
