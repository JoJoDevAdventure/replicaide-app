import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCoffee, FiDollarSign, FiHelpCircle, FiHome, FiLogOut, FiPhoneCall, FiShoppingCart, FiTool, FiTruck, FiUser } from "react-icons/fi";
import { useTheme } from "../../app/context/themeContext";

const SideBar = () => {
  const { isDarkMode } = useTheme(); // Get the current theme (dark or light mode)
  const currentPath = usePathname(); // Get the current route

  // Define menu items for the main navigation
  const menuItems = [
    { name: "Call Center", path: "/call-center", icon: <FiPhoneCall className="w-5 h-5" /> },
    { name: "Real Estate", path: "/real-estate", icon: <FiHome className="w-5 h-5" /> },
    { name: "Home Services", path: "/home-services", icon: <FiTool className="w-5 h-5" /> },
    { name: "Auto", path: "https://auto.replicaide.com/app", icon: <FiTruck className="w-5 h-5" /> },
    { name: "EComm", path: "/ecomm", icon: <FiShoppingCart className="w-5 h-5" /> },
    { name: "Food Services 🇪🇸/🇺🇸", path: "/restaurants", icon: <FiCoffee className="w-5 h-5" /> },
    { name: "Finance 🇸🇦/🇺🇸", path: "/financial", icon: <FiDollarSign className="w-5 h-5" /> },
  ];

  // Define menu items for the account section
  const accountItems = [
    {
      name: "My account",
      path: "/account",
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      name: "Help and support",
      path: "/support",
      icon: <FiHelpCircle className="w-5 h-5" />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <FiLogOut className="w-5 h-5" />,
    },
  ];

  const mobileMenuItems = [...menuItems]; // Reuse main menu items for mobile

  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className={`hidden lg:flex h-screen w-64 flex-col justify-between p-6 overflow-hidden z-10 ${
          isDarkMode
            ? "bg-s1 text-white" // Dark mode styles
            : "bg-gray-50 text-black shadow-light" // Light mode styles
        }`}
      >
        {/* Logo Section */}
        <div>
          <img
            className="w-48 mx-0 mb-10"
            src={`/logo-${isDarkMode ? "white" : "black"}.png`} // Adjust logo based on theme
            alt="Logo"
          />

          {/* Main Menu Section */}
          <div>
            <p className="uppercase text-sm font-semibold text-gray-500 mb-4">
              Menu
            </p>
            <ul className="space-y-0 w-full">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block"
                >
                  <li
                    className={`relative -mx-6 flex items-center gap-4 py-4 px-6 cursor-pointer ${
                      currentPath === item.path
                        ? "bg-s3/10 text-s3"
                        : isDarkMode
                        ? "hover:bg-s3/5"
                        : "hover:bg-s3/5"
                    }`}
                  >
                    {currentPath === item.path && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-s3" />
                    )}
                    <span className={`${currentPath === item.path ? "text-s3" : ""}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <p className="uppercase text-sm font-semibold text-gray-500 mb-4">
            Your account
          </p>
          <ul className="space-y-4">
            {accountItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block"
              >
                <li
                  className={`relative flex items-center gap-4 p-3 rounded-lg cursor-pointer ${
                    currentPath === item.path
                      ? "text-s3"
                      : isDarkMode
                      ? "hover:bg-s3/5"
                      : "hover:bg-s3/5"
                  }`}
                >
                  <span className={`${currentPath === item.path ? "text-s3" : ""}`}>
                 {item.icon}
                  </span>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Scrollable Bottom Navigation for smaller screens */}
      <div
        className={`fixed bottom-0 left-0 w-full flex lg:hidden items-center py-3 overflow-x-auto px-4 gap-6 z-10 ${
          isDarkMode ? "bg-s1 text-white" : "bg-gray-50 text-black"
        }`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {mobileMenuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center justify-center gap-1 flex-shrink-0 ${
              currentPath === item.path ? "text-s3" : "hover:text-s3"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-xs whitespace-nowrap">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SideBar;
