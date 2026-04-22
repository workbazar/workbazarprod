import React from 'react';
import { useAuth } from '../../context/AuthContext';
export default function Toast(){
  const{toast}=useAuth();
  return(
    <div className="toast-wrap">
      <div className={`toast ${toast.type||'success'}${toast.show?' show':''}`}>{toast.msg}</div>
    </div>
  );
}
