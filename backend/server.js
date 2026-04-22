const express=require('express');
const cors=require('cors');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
const SECRET=process.env.JWT_SECRET||'workbazar2025';
const PORT=process.env.PORT||5000;

// In-memory DB (use MongoDB in production)
const DB={users:[],workers:[],bookings:[],otps:{},wallets:{}};

const genId=(p='WB')=>p+Date.now().toString().slice(-7)+Math.floor(Math.random()*100);
const genOTP=()=>Math.floor(100000+Math.random()*900000).toString();
const auth=(req,res,next)=>{
  const t=req.headers.authorization?.split(' ')[1];
  if(!t)return res.status(401).json({error:'No token'});
  try{const d=jwt.verify(t,SECRET);req.userId=d.userId;req.user=DB.users.find(u=>u.id===d.userId);if(!req.user)return res.status(401).json({error:'User not found'});next();}
  catch{res.status(401).json({error:'Invalid token'});}
};

// SEND OTP
app.post('/api/auth/send-otp',(req,res)=>{
  const{phone}=req.body;
  if(!phone||phone.length<10)return res.status(400).json({error:'Valid phone required'});
  const otp=genOTP();
  DB.otps[phone]={otp,expires:Date.now()+10*60*1000};
  console.log(`OTP for ${phone}: ${otp}`);
  // Production: use Fast2SMS API (₹0.15/SMS)
  res.json({success:true,demo_otp:otp}); // Remove demo_otp in production
});

// VERIFY OTP
app.post('/api/auth/verify-otp',(req,res)=>{
  const{phone,otp,name,role,lang}=req.body;
  const rec=DB.otps[phone];
  if(!rec)return res.status(400).json({error:'OTP not sent'});
  if(Date.now()>rec.expires)return res.status(400).json({error:'OTP expired'});
  if(rec.otp!==otp)return res.status(400).json({error:'Wrong OTP'});
  delete DB.otps[phone];
  let user=DB.users.find(u=>u.phone===phone);
  if(!user){
    user={id:genId('USR'),phone,name:name||'User',role:role||'worker',lang:lang||'English',createdAt:new Date().toISOString(),isPro:false,points:50};
    DB.users.push(user);
    DB.wallets[user.id]=0;
  }
  res.json({success:true,token:jwt.sign({userId:user.id},SECRET,{expiresIn:'30d'}),user});
});

// WORKER PROFILE
app.post('/api/worker/profile',auth,(req,res)=>{
  const{trade,rate,city,state,experience,bio}=req.body;
  let w=DB.workers.find(w=>w.userId===req.userId);
  if(!w){w={id:genId('WRK'),userId:req.userId,name:req.user.name,phone:req.user.phone,trade,rate:+rate,city,state,experience,bio,verified:false,available:true,rating:0,jobs:0,earned:0,createdAt:new Date().toISOString()};DB.workers.push(w);}
  else Object.assign(w,{trade,rate:+rate,city,state,experience,bio});
  res.json({success:true,worker:w});
});

// SEARCH WORKERS
app.get('/api/workers',(req,res)=>{
  const{trade,city}=req.query;
  let r=DB.workers.filter(w=>w.available);
  if(trade)r=r.filter(w=>w.trade.toLowerCase().includes(trade.toLowerCase()));
  if(city)r=r.filter(w=>w.city.toLowerCase().includes(city.toLowerCase()));
  res.json({workers:r});
});

// CREATE BOOKING — THIS IS WHERE WORKBAZAR EARNS
app.post('/api/bookings',auth,(req,res)=>{
  const{service,hours,address,payMethod,coupon}=req.body;
  const rate=149; // get from worker in production
  const base=rate*+hours;
  const platformFee=Math.round(base*0.10); // WorkBazar earns 10%
  let discount=0;
  if(coupon==='FIRST200')discount=200;
  else if(coupon==='WEEKEND20')discount=Math.round(base*0.20);
  const total=base+platformFee-discount;
  const bk={id:genId(),recruiterId:req.userId,service,hours:+hours,address,payMethod,base,platformFee,discount,total,status:'pending',otp:genOTP(),createdAt:new Date().toISOString()};
  DB.bookings.push(bk);
  res.json({success:true,booking:bk});
});

// MY BOOKINGS
app.get('/api/bookings/mine',auth,(req,res)=>{
  const bks=DB.bookings.filter(b=>b.recruiterId===req.userId||b.workerId===req.userId);
  res.json({bookings:bks.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))});
});

// COMPLETE BOOKING — PAY WORKER
app.post('/api/bookings/:id/complete',auth,(req,res)=>{
  const bk=DB.bookings.find(b=>b.id===req.params.id);
  if(!bk)return res.status(404).json({error:'Not found'});
  bk.status='completed';bk.completedAt=new Date().toISOString();
  if(bk.workerId){
    DB.wallets[bk.workerId]=(DB.wallets[bk.workerId]||0)+(bk.base); // Worker gets base amount
    const w=DB.workers.find(w=>w.userId===bk.workerId);
    if(w){w.jobs+=1;w.earned+=bk.base;}
  }
  res.json({success:true,workerEarning:bk.base,platformRevenue:bk.platformFee});
});

// WALLET
app.get('/api/wallet',auth,(req,res)=>{
  res.json({balance:DB.wallets[req.userId]||0});
});

// ADMIN REVENUE (password protected)
app.get('/api/admin/stats',(req,res)=>{
  if(req.headers['x-admin']!=='workbazar2025admin')return res.status(403).json({error:'Unauthorized'});
  const done=DB.bookings.filter(b=>b.status==='completed');
  res.json({users:DB.users.length,workers:DB.workers.length,bookings:DB.bookings.length,completed:done.length,platformRevenue:done.reduce((s,b)=>s+b.platformFee,0),totalGMV:done.reduce((s,b)=>s+b.total,0)});
});

app.get('/health',(req,res)=>res.json({status:'WorkBazar API OK'}));
app.listen(PORT,()=>console.log(`\n🚀 WorkBazar API on port ${PORT}\n💰 10% fee on every booking\n`));
