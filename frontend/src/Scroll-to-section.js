import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section2 from "./Section2";
import UploadSection from "./Section3";
import ReviewSection from "./Section5";
import ReviewCarousel from "./Section4";
import Footer1 from "./Footer1";
import logo from "../src/Images/logo.png"
const SApp = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  
    checkLoginStatus();
  
    // Optional: re-check if localStorage changes from another tab
    window.addEventListener("storage", checkLoginStatus);
  
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    
    
  };

  return (
    <div>
      <div className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <img src={logo} className="logo-image"/>
        </div>
        <div className="list">
          <ul className="header-ul">
            <li
              className="header-ul-li"
              onClick={() => scrollToSection("home")}
              style={{ cursor: "pointer" }}
            >
              Home
            </li>
            <li
              className="header-ul-li"
              onClick={() => scrollToSection("about")}
              style={{ cursor: "pointer" }}
            >
              About
            </li>
            <li
              className="header-ul-li"
              onClick={() => scrollToSection("upload")}
              style={{ cursor: "pointer" }}
            >
              Upload
            </li>
            <li
              className="header-ul-li"
              onClick={() => scrollToSection("review")}
              style={{ cursor: "pointer" }}
            >
              Review
            </li>
          </ul>
        </div>

        <div className="login-button">
          {!isLoggedIn ? (
            <button onClick={() => navigate("/register")}>Register</button>
          ) : (
            <div className="profile-dropdown">
              <button onClick={() => setShowMenu(!showMenu)}>Profile</button>
              {showMenu && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/profile")}>Profile</li>
                  <li onClick={() => alert("History Page Coming Soon!")}>
                    History
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <section id="home">
          <div className="section-1">
            <button
              className="s1-button"
              onClick={() => scrollToSection("upload")}
            >
              Get Started
            </button>
          </div>
        </section>
        <section id="about">
          <Section2 />
        </section>
        <section id="upload">
          <UploadSection />
        </section>
        <section id="review">
          <ReviewCarousel />
        </section>
        <ReviewSection />
        <Footer1 />
      </div>
    </div>
  );
};

export default SApp;
