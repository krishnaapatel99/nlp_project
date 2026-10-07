import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Summarization from "./pages/Summarization";
import Evaluation from "./pages/Evaluation";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [nlpData, setNlpData] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] flex flex-col selection:bg-[#FF6B4A] selection:text-[#0F0F0F]">
        <Navbar />
        <main className="flex-1 p-8 md:p-16 container mx-auto max-w-[1200px] flex flex-col">
          <Routes>
            <Route path="/" element={<Home text={text} setText={setText} setNlpData={setNlpData} />} />
            <Route path="/analysis" element={<Analysis text={text} nlpData={nlpData} />} />
            <Route path="/summarization" element={<Summarization text={text} />} />
            <Route path="/evaluation" element={<Evaluation text={text} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
