import React, { useState, useEffect } from "react"; // Import useEffect
import { HiMenuAlt3 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  const menus = [
    { name: "Dashboard", link: "/Home", icon: MdOutlineDashboard },
    { name: "Depense Personnelle", link: "/PersonelSpent", icon: FaWallet },
    { name: "Setting", link: "/Profile", icon: RiSettings4Line },
    { name: "Logout", icon: MdLogout }, // Removed the link for Logout
  ];

  // Initialize open from local storage or default to true
  const [open, setOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true; // Parse and set the initial state
  });

  // Update local storage whenever open changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open)); // Store the state in local storage
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("tokenUser"); // Remove token from local storage
    navigate("/"); // Redirect to the Logout page
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#535353] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i} className="flex items-center">
              {menu.name === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className={`group flex items-center text-sm gap-3.5 font-medium p-2`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                  >
                    {menu.name}
                  </h2>
                </button>
              ) : (
                <Link
                  to={menu.link}
                  className={`${
                    menu.margin && "mt-5"
                  } group flex items-center text-sm gap-3.5 font-medium p-2 `}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
