import { useState } from "react"
import logo from "../../assets/svg/logo.svg"
import { NavLink, useNavigate } from "react-router-dom"
import { sidebarMenu } from "../../routes/Route"
import { useTheme } from "../../context/ThemeContext"
import { useUser } from "../../features/auth/context/UserContext"

export const Sidebar = () => {
    const [openToggle, setOpenToggle] = useState(false)
    const { theme } = useTheme();
    const navigate = useNavigate()

    const {user} = useUser()
    const handleLogout = () => {
      
      navigate("/login", { replace: true });
    };

  return (
    <div className={`${openToggle? "w-20" : " w-65"} layout-sidebar transition-all duration-300 h-screen flex flex-col justify-between shrink-0` }>
        <div>
        <div className={`${openToggle ? "justify-center" : "justify-between"}  flex  p-5`}>
            { 
                !openToggle ?
               <img src={logo} alt="" /> : "" 
               }
             {
                !openToggle ?
                <i onClick={()=> setOpenToggle(!openToggle)} className="toggle bi bi-arrow-bar-left"></i> :
                <i onClick={()=> setOpenToggle(!openToggle)} className="toggle bi bi-arrow-bar-right"></i>
            }
        </div>

        <menu className="p-2.5">
            {
              ! openToggle? <span className="text-[15px] mt-1 p-3.5">Main menu</span> : ""}
            {sidebarMenu.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 mb-2 rounded-md p-3.5
              ${
                isActive
                  ? "bg-[#4EA674] text-white"
                  : `${!theme ? "hover:bg-[#333]" : "hover:bg-[#e4e2e2]" } text-gray-500 `
              }`
            }
          >
            <Icon size={20} />

            {
                !openToggle ?
                <span>{item.title}</span> : ""}
          </NavLink>
        );
      })}
        </menu>
        </div>
        <div className={`${openToggle ? "flex-col" : "flex"} justify-between items-center p-3.5`} >
            
              
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={user?.avatar} alt="" className="w-full h-full object-cover"/>
            </div> 
            { 
            !openToggle?
            <div className="">
                <p className="">{user?.firstName} {user?.lastName}</p>
                <span className="text-[10px]">{user?.email}</span>    
            </div> : "" }
            
          
            <div onClick={handleLogout} className={`${openToggle? "mt-3" : ""} flex justify-center items-center`}>
            <i className="bi bi-box-arrow-left text-red-600 cursor-pointer"></i>
            </div> 
            
        </div>

    </div>
  )
}
