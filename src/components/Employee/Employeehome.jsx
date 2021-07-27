import  React, { useState , useEffect } from 'react'
import './Employeehome.css'
export const Employeehome = (props) => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    console.log(date.getDate())

    return(
        <div className="home">
            <div className="home-card">
                <p className="date"> Date : {date.toLocaleDateString()}</p>
                <p className="time"> Time : {date.toLocaleTimeString()}</p>
            </div>
            <div className="leave-card">
                <p className="leave-balance">Leave Balance <span className="balance-count">{props.leaveBalance}</span></p>
            </div>
        </div>
    )
}

export default Employeehome