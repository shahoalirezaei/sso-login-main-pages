import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import LogoutModal from "../modals/LogoutModal";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    localStorage.removeItem("auth");
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header dir="rtl" className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
        

        {/* دکمه حساب کاربری */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" rounded-full btn-blue cursor-pointer text-white font-medium text-sm flex items-center justify-center hover:opacity-90 transition py-2  px-3"
          >
            <MdAccountCircle className="text-2xl" />
            حساب کاربری
          </button>

          {/* منوی کشویی */}
          {isMenuOpen && (
            <div className="absolute right-1 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className="w-full text-right  px-5 py-2 flex items-center gap-2 text-sm sm:text-base text-red-600 hover:text-red-700 transition cursor-pointer"
              >
                <RiLogoutCircleRLine />
                خروج
              </button>
            </div>
          )}
        </div>
        {/* لوگو */}
        <div className="flex flex-grow justify-center text-xl font-semibold text-blue-600">
          <span>sso sannadaj</span>
        </div>
      </header>

      {/* مودال خروج */}
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
