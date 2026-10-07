import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Analysis", path: "/analysis" },
    { name: "Summarization", path: "/summarization" },
    { name: "Evaluation", path: "/evaluation" },
  ];

  return (
    <nav className="h-[80px] border-b border-[#2A2A2A] bg-[#0F0F0F] flex items-center">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-[1200px]">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg leading-tight transition-opacity hover:opacity-80">
          <span className="text-[#FF6B4A]">NLP</span>
          <span className="text-[#F5E6D3] font-normal">Text Summarizer</span>
        </Link>
        
        {/* Navigation */}
        <div className="flex gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 text-[15px] transition-colors duration-200 ${
                  isActive ? "text-[#F5F5F5] font-medium" : "text-[#A1A1A1] hover:text-[#F5F5F5] font-normal"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-[-18px] left-0 w-full h-[1px] bg-[#FF6B4A]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
