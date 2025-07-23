import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";
import { logout } from "../../services/operations/auth";

export default function Navbar() {
    const { token, accountType } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout(navigate));
    };

    const getNavLinkClass = ({ isActive }) => {
        const activeClasses = 'text-blue-600 font-semibold border-b-2 border-blue-600';
        const inactiveClasses = 'text-gray-600 font-medium hover:text-blue-600';
        return `pb-1 transition-all duration-300 ease-in-out ${isActive ? activeClasses : inactiveClasses}`;
    };

    const navItems = [
        { to: "/", text: "Home" },
        { to: "/clinics", text: "Find a Clinic" },
        ...(accountType === "Doctor" ? [{ to: "/addClinic", text: "For Doctors" }] : []),
        { to: "/about", text: "About Us" },
    ];

    return (
        <div>
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-extrabold text-blue-600 hover:text-blue-700 transition duration-300">
                        Clinically <span role="img" aria-label="hospital">🏥</span>
                    </Link>

                    <ul className="hidden md:flex items-center space-x-10">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink to={item.to} className={getNavLinkClass}>
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center space-x-4">
                        {!token ? (
                            <>
                                <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300">
                                    Log In
                                </Link>
                                <Link to="/signup" className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300">
                                    Dashboard
                                </Link>
                                <button onClick={logoutHandler} className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
}
