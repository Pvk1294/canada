import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const PHONE_NUMBER = "tel:+17789177003";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "/contact" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openForm } = usePreApprovalForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePreApprove = () => {
    openForm();
    setMobileOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return; // let normal links work as-is

    e.preventDefault();
    const sectionId = href.slice(1);
    setMobileOpen(false);

    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      // Wait for home page to mount, then scroll
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logo} alt="ApprovalOnSpot" className="h-14 sm:h-20" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-white/60 hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={PHONE_NUMBER} className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors font-medium">
            <Phone className="h-4 w-4" />
            (778) 917-7003
          </a>
          <Button size="sm" onClick={handlePreApprove} className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full px-5 font-bold hover:scale-105 transition-transform" style={{ boxShadow: "var(--shadow-primary)" }}>
            Check My Approval →
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-foreground/98 backdrop-blur-xl border-t border-white/5 px-4 pb-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-3 text-sm text-white/70 hover:text-white font-medium border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <Button className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full font-bold h-12 min-h-[48px] text-sm hover:scale-105 transition-transform" onClick={handlePreApprove}>
              Check My Approval →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;