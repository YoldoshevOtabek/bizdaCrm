import { Bell, Moon, Search, Sun } from "lucide-react";

import { useLocation } from "react-router-dom";
import userPhoto from "../../assets/img/photo_2026-08-13_12-27-13.png";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../features/auth/context/UserContext";

export const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const {user} = useUser()
  const getPageTitle = (pathname: string) => {
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/orders")) return "Order Management";
    if (pathname.startsWith("/customers")) return "Customers";
    if (pathname.startsWith("/categories")) return "Categories";
    if (pathname.startsWith("/products")) return "Products";

    return "Dashboard";
  };
  const title = getPageTitle(location.pathname);

  return (
    <div className="layout-header w-full h-24 flex items-center justify-between px-6">
      <div>
        <span
          className={` ${
            !theme ? "text-[#bcd1d3] " : "text-[#023337]"
          } text-2xl `}
        >
          {title}
        </span>
      </div>
      <div className="flex gap-8">
        <div className="search flex items-center w-101.75 h-12  bg-[#F9FAFB] rounded-[30px]  px-4 gap-3">
          <input
            type="text"
            className="flex-1 outline-none border-none bg-transparent text-black placeholder:text-[#00000099]"
            placeholder="Search data, users, or reports"
          />
          <Search className="text-[#00000099] w-5 h-5" />
        </div>
        <div className="flex gap-5">
          {/* // Qo'ng'iroq */}
          <div className="flex items-center">
            <Bell />
          </div>
          {/* Mood */}
          <div className="flex items-center">
            <button
              className={`mood w-10 h-7 rounded-full p-1 flex items-center transition-all duration-300
               ${theme ? "bg-[#69898b] justify-end" : "bg-[#b3eea4] justify-start"}
                `}
              onClick={() => setTheme(!theme)}
            >
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                {!theme ? (
                  <Sun size={13} className="text-yellow-500" />
                ) : (
                  <Moon size={13} className="text-[#023337]" />
                )}
              </div>
            </button>
          </div>
          {/* User */}
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user?.avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
