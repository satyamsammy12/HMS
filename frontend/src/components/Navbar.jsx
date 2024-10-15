import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    const response = await axios
      .get("https://hms-backend-rk9d.onrender.com/api/v1/user/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error("Patient not Authenticated");
      });
  };

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="containers">
        <div className="logo">
          <Link to={"/"}>
            <img
              style={{
                cursor: "pointer",
                height: "70px",
                width: "230px",
              }}
              src="https://vihaanhospitalrewa.com/wp-content/uploads/2024/03/Vihan-svg-3-1.svg"
              alt="logo"
              className="logo-img"
            />
          </Link>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links ">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button
              className="logoutBtn btn"
              onClick={() => {
                handleLogout();
                setShow(!show);
              }}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="loginBtn btn"
              onClick={() => {
                goToLogin();
                setShow(!show);
              }}
            >
              LOGIN
            </button>
          )}
        </div>
        <div
          className="hamburger cursor-pointer "
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
