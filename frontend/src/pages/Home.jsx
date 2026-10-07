import { useState } from "react";
import { extractFile, analyzeText } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home({ text, setText, setNlpData }) {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await extractFile(file);
      setText(data.text);
    } catch (error) {
      alert("Error extracting file");
    }
    setLoading(false);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeText(text);
      setNlpData(data);
      navigate("/analysis");
    } catch (error) {
      alert("Error analyzing text");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-24 pb-16 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto pt-12">
        <h1 className="text-[48px] md:text-[56px] font-bold leading-[1.1] mb-6 text-[#F5F5F5] tracking-tight">
          <span className="text-[#FF6B4A]">NLP</span> Text Summarizer
        </h1>
        <p className="text-[#A1A1A1] text-[18px] leading-[1.6] mb-10 font-light">
          Turn long documents into concise, meaningful summaries using classical natural language processing.
        </p>
      </section>

      {/* Input Section */}
      <section className="max-w-[800px] mx-auto w-full">
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-[13px] uppercase tracking-wider text-[#6B6B6B] font-semibold">Document Input</span>
          <div className="flex gap-4">
            <input type="file" id="file" className="hidden" accept=".txt,.pdf,.docx" onChange={(e) => handleFileUpload(e.target.files[0])} />
            <label htmlFor="file" className="cursor-pointer text-[14px] text-[#A1A1A1] hover:text-[#F5E6D3] transition-colors">
              Upload file (TXT, PDF, DOCX)
            </label>
          </div>
        </div>

        <div 
          className={`relative bg-[#141414] transition-colors duration-300 rounded-[4px] ${
            dragActive ? "border border-[#FF6B4A]" : "border border-transparent"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileUpload(e.dataTransfer.files[0]);
            }
          }}
        >
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-80 bg-transparent p-8 text-[#F5F5F5] placeholder-[#3A3A3A] focus:outline-none resize-none leading-[1.8] text-[16px] font-light"
            placeholder="Paste your text here or drop a document..."
          />
        </div>
        
        <div className="mt-6 flex justify-between items-center px-2">
          <div className="text-[13px] text-[#6B6B6B] font-medium tracking-wide">
            {text.length} characters <span className="mx-2 opacity-30">|</span> {text.split(/\s+/).filter(w => w).length} words
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="px-6 py-2.5 bg-transparent border border-[#2A2A2A] hover:bg-[#1D1D1D] disabled:opacity-50 text-[#F5F5F5] font-medium rounded-[4px] text-[15px] transition-all"
            >
              {loading ? "Processing..." : "Analyze text"}
            </button>
            <button
              onClick={() => navigate("/summarization")}
              disabled={!text.trim()}
              className="group px-6 py-2.5 bg-[#FF6B4A] hover:brightness-110 disabled:opacity-50 text-[#0F0F0F] font-semibold rounded-[4px] text-[15px] transition-all flex items-center gap-2"
            >
              Start summarizing <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Workflow Section */}
      <section className="max-w-[1000px] mx-auto w-full pt-12 border-t border-[#1A1A1A]">
        <h2 className="text-center text-[22px] font-medium mb-12 text-[#F5E6D3]">Explore the workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col">
            <span className="text-[#3A3A3A] text-[40px] font-bold leading-none mb-4">01</span>
            <h3 className="text-[18px] font-semibold text-[#F5F5F5] mb-3">Analyze</h3>
            <p className="text-[#A1A1A1] text-[15px] leading-[1.7] font-light">
              Tokenization, stemming, lemmatization, POS tagging, and Named Entity Recognition using classical algorithms.
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-[#3A3A3A] text-[40px] font-bold leading-none mb-4">02</span>
            <h3 className="text-[18px] font-semibold text-[#F5F5F5] mb-3">Summarize</h3>
            <p className="text-[#A1A1A1] text-[15px] leading-[1.7] font-light">
              Extractive summarization using word importance (TF-IDF) and graph-based sentence similarity (TextRank).
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-[#3A3A3A] text-[40px] font-bold leading-none mb-4">03</span>
            <h3 className="text-[18px] font-semibold text-[#F5F5F5] mb-3">Evaluate</h3>
            <p className="text-[#A1A1A1] text-[15px] leading-[1.7] font-light">
              Compare your generated summaries against human reference texts using ROUGE n-gram overlap metrics.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
