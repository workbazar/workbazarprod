import React,{useState}from'react';
import{useAuth}from'./context/AuthContext';
import Header from'./components/Layout/Header';
import Sidebar from'./components/Layout/Sidebar';
import MobileNav from'./components/Layout/MobileNav';
import Toast from'./components/Layout/Toast';
import OnboardingModal from'./components/Auth/OnboardingModal';
import ProfileModal from'./components/Auth/ProfileModal';
import BookingSheet from'./components/Booking/BookingSheet';
import LiveTracking from'./components/Booking/LiveTracking';
import RatingModal from'./components/Booking/RatingModal';
import HomePage from'./pages/HomePage';
import ServicesPage from'./pages/ServicesPage';
import BookingsPage from'./pages/BookingsPage';
import AboutPage from'./pages/AboutPage';
import'./styles/global.css';

export default function App(){
  const{user,updateUser,showToast}=useAuth();
  const[page,setPage]=useState('home');
  const[drawer,setDrawer]=useState(false);
  const[onboard,setOnboard]=useState(false);
  const[profOpen,setProfOpen]=useState(false);
  const[profRole,setProfRole]=useState('worker');
  const[searchQ,setSearchQ]=useState('');
  const[booking,setBooking]=useState(null);
  const[tracking,setTracking]=useState(null);
  const[rating,setRating]=useState(null);

  const nav=p=>{setPage(p);setSearchQ('');};
  const openLogin=()=>setOnboard(true);
  const openProfile=role=>{
    if(!user?.v){setOnboard(true);return;}
    setProfRole(role||user?.role||'worker');
    setProfOpen(true);
  };
  const handleSearch=q=>{setSearchQ(q);setPage('services');};
  const handleHire=svc=>{
    if(!user?.v){setOnboard(true);return;}
    setBooking(svc);
  };
  const handleBooked=b=>{
    setBooking(null);
    setTimeout(()=>setTracking(b),400);
  };
  const switchRole=()=>{
    const nr=user?.role==='worker'?'recruiter':'worker';
    updateUser({role:nr});
    showToast('Switched to '+nr);
  };

  return(
    <div style={{height:'100dvh',display:'flex',flexDirection:'column',overflow:'hidden'}}>

      <Header page={page} onNav={nav} onMenu={()=>setDrawer(true)} onLogin={openLogin} onSearch={handleSearch}/>

      {/* Dashboard bar when logged in */}
      {user?.v&&(
        <div style={{background:'#fff',borderBottom:'1px solid #e2e8f0',flexShrink:0}}>
          <div style={{maxWidth:960,margin:'0 auto',padding:'6px 16px',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:32,height:32,borderRadius:'50%',background:'#1d4ed8',color:'#fff',fontSize:13,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {user.name?user.name[0].toUpperCase():'U'}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#0f172a'}}>Hi, {user.name||'User'} 👋 {user.isPro&&<span style={{background:'linear-gradient(135deg,#f59e0b,#f97316)',color:'#fff',fontSize:8,fontWeight:800,padding:'2px 6px',borderRadius:8,marginLeft:4}}>PRO</span>}</div>
              <div style={{fontSize:10,color:'#6b7280'}}>{user.role==='worker'?'👷 Worker':'🏢 Recruiter'}{user.trade?` — ${user.trade}`:''}{user.dist?` · ${user.dist}`:''}</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',gap:6}}>
              <button style={{background:'#eff6ff',border:'1px solid #bfdbfe',color:'#1d4ed8',borderRadius:8,padding:'5px 10px',fontSize:11,fontWeight:700,cursor:'pointer'}} onClick={()=>openProfile()}>✏️ Profile</button>
              <button style={{background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#16a34a',borderRadius:8,padding:'5px 10px',fontSize:11,fontWeight:700,cursor:'pointer'}} onClick={switchRole}>🔄 Switch</button>
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <div style={{flex:1,minHeight:0,overflow:'hidden',display:'flex',flexDirection:'column'}}>
        {page==='home'    &&<HomePage onNav={nav} onLogin={openLogin} onProfile={openProfile} onHire={handleHire} onSearch={handleSearch}/>}
        {page==='services'&&<ServicesPage onLogin={openLogin} onHire={handleHire} searchQ={searchQ}/>}
        {page==='bookings'&&<BookingsPage onLogin={openLogin} onTrack={b=>setTracking(b)} onRate={b=>setRating(b)}/>}
        {page==='about'   &&<AboutPage onLogin={openLogin} onProfile={openProfile}/>}
      </div>

      {/* Footer */}
      <div className="footer" style={{display:'none'}}>WorkBazar © 2025 · Patna, Bihar</div>

      {/* Mobile nav */}
      <MobileNav page={page} onNav={nav} onHire={()=>handleHire({name:'Electrician',icon:'⚡',ico:'⚡',rate:149})}/>

      {/* Sidebar drawer */}
      <Sidebar open={drawer} onClose={()=>setDrawer(false)} onNav={nav} onProfile={()=>openProfile()} onLogin={openLogin}/>

      {/* Modals */}
      <OnboardingModal open={onboard} onClose={()=>setOnboard(false)} onDoneWorker={()=>openProfile('worker')} onDoneRecruiter={()=>openProfile('recruiter')}/>
      <ProfileModal open={profOpen} onClose={()=>setProfOpen(false)} initRole={profRole}/>

      {/* Booking sheet */}
      <BookingSheet open={!!booking} service={booking} onClose={()=>setBooking(null)} onBooked={handleBooked}/>

      {/* Live tracking */}
      {tracking&&<LiveTracking booking={tracking} onClose={()=>setTracking(null)} onRate={b=>{setTracking(null);setRating(b);}}/>}

      {/* Rating */}
      <RatingModal open={!!rating} booking={rating} onClose={()=>setRating(null)}/>

      <Toast/>
    </div>
  );
}
