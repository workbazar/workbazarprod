export const CATEGORIES=[
  {id:'electric',name:'Electrician',icon:'⚡',rate:149,color:'#f59e0b',desc:'Wiring, repair, fitting',eta:25},
  {id:'plumber',name:'Plumber',icon:'🔧',rate:149,color:'#3b82f6',desc:'Leak fix, pipe, tap',eta:28},
  {id:'carpenter',name:'Carpenter',icon:'🪚',rate:149,color:'#8b5cf6',desc:'Furniture, door, window',eta:35},
  {id:'cleaner',name:'House Cleaner',icon:'🧹',rate:99,color:'#10b981',desc:'Deep clean, sweep, mop',eta:20},
  {id:'cook',name:'Cook',icon:'👨‍🍳',rate:149,color:'#ef4444',desc:'Daily meals, events',eta:30},
  {id:'driver',name:'Driver',icon:'🚗',rate:149,color:'#06b6d4',desc:'Car, cab, outstation',eta:15},
  {id:'painter',name:'Painter',icon:'🎨',rate:129,color:'#f97316',desc:'Wall, home, office',eta:40},
  {id:'mason',name:'Mason',icon:'🧱',rate:179,color:'#84cc16',desc:'Construction, repair',eta:45},
  {id:'ac',name:'AC Technician',icon:'❄️',rate:199,color:'#0ea5e9',desc:'Service, repair, gas',eta:35},
  {id:'tutor',name:'Home Tutor',icon:'📚',rate:149,color:'#a855f7',desc:'All subjects, all ages',eta:45},
  {id:'babysitter',name:'Baby Sitter',icon:'👶',rate:129,color:'#ec4899',desc:'Child care, verified',eta:30},
  {id:'security',name:'Security Guard',icon:'💂',rate:159,color:'#64748b',desc:'Home, office, event',eta:50},
];

export const WORKERS=[
  {id:'w1',name:'Ramesh Kumar',trade:'Electrician',icon:'⚡',rating:4.9,jobs:247,rate:149,dist:'0.8 km',eta:12,badge:'Top Rated'},
  {id:'w2',name:'Suresh Prasad',trade:'Plumber',icon:'🔧',rating:4.8,jobs:189,rate:149,dist:'1.2 km',eta:18,badge:'Fast'},
  {id:'w3',name:'Priya Devi',trade:'Cook',icon:'👨‍🍳',rating:4.9,jobs:312,rate:149,dist:'0.5 km',eta:15,badge:'Popular'},
  {id:'w4',name:'Deepak Sharma',trade:'Driver',icon:'🚗',rating:4.9,jobs:428,rate:149,dist:'0.6 km',eta:8,badge:'Pro'},
  {id:'w5',name:'Meena Kumari',trade:'House Cleaner',icon:'🧹',rating:4.8,jobs:203,rate:99,dist:'0.3 km',eta:10,badge:'Top Rated'},
  {id:'w6',name:'Ajay Singh',trade:'Carpenter',icon:'🪚',rating:4.7,jobs:156,rate:149,dist:'2.1 km',eta:25,badge:'Expert'},
];

export const HOUR_OPTS=[{h:1,label:'1 hr'},{h:2,label:'2 hrs'},{h:3,label:'3 hrs'},{h:4,label:'4 hrs'},{h:8,label:'Full day'}];
export const PAY_METHODS=[
  {id:'upi',icon:'📱',name:'UPI / GPay / PhonePe',sub:'Instant payment'},
  {id:'cash',icon:'💵',name:'Cash on Service',sub:'Pay the worker directly'},
  {id:'card',icon:'💳',name:'Card Payment',sub:'Visa / Mastercard / RuPay'},
];
export const STATES={Bihar:['Patna','Gaya','Muzaffarpur','Bhagalpur'],Delhi:['New Delhi','South Delhi','North Delhi','East Delhi'],Maharashtra:['Mumbai','Pune','Nagpur'],'Uttar Pradesh':['Lucknow','Kanpur','Varanasi','Noida']};
