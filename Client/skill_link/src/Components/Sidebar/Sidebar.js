import { MdDashboard } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

import './Sidebar.css'
import { useContext } from "react";
import userContext from "../Login/UserContext";
import { Link } from "react-router-dom";

const sidebarItems=[
    {
        id:"DASHBOARD",
        displayText:"Dashboard",
        icon:<MdDashboard />,
        path:'/dashboard'
    },
    {
        id:'SERVICES',
        displayText:'Services',
        icon:<BsTools className="mb-2"/>,
        path:'/myservices'
    },
    
    {
        id:"TRANSACTIONS",
        displayText:'Transactions',
        icon:<GrTransaction className="mb-2"/>,
        path:'/transactions'
    },
    {
        id:"PROFILE",
        displayText:'Profile',
        icon:<CgProfile className="mb-2"/>,
        path:'/profile'
    },
   
]


const Sidebar=()=>{


const {activeTab,changeActiveTab,user}=useContext(userContext);    



            return( 
                <> 
                <div className={!user.verified?'sidebar-container-md disable-component':'sidebar-container-md '}  >
                   <div style={{borderBottom:'1px solid black'}}>
                        <h1 className="main-heading">Skill Link</h1>
                        <img src={user.img?user.img:'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729296000&semt=ais_hybrid'} alt="User" className="pharmacy-image img-fluid"/>
                    </div>
                <ul className="unordered-list">
                    {sidebarItems.map((eachItem)=>(
                        <li key={eachItem.id}>
                         <Link to={'/serviceproviders/'+user._id+eachItem.path} className="Link" >  <div className={`sidebar-icon-container ${eachItem.id===activeTab?'active-tab-color':''}`} onClick={()=>{changeActiveTab(eachItem.id)}} >
                                {eachItem.icon}
                                <p className="mt-3">{eachItem.displayText}</p>   
                            </div></Link>
                        </li>
                    ))}
                </ul>
                </div>
                <ul className={user.verified?'sidebar-container-mobile':'sidebar-container-mobile disable-component'} style={{zIndex:100}}>
                {sidebarItems.map((eachItem)=>(
                        <li key={eachItem.id}>
                         <Link to={'/serviceproviders/'+user._id+eachItem.path} className="Link" >   <div  className={`icon-container-mobile ${eachItem.id===activeTab?'active-tab-color':''}`} onClick={()=>{changeActiveTab(eachItem.id)}}>
                                 {eachItem.icon}
                                 </div></Link>
                        </li>
                ))}
               
                </ul>
                </>
                
            )
    
   
}
export default Sidebar