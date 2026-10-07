import { useState } from "react";
import { summarizeTfidf, summarizeTextRank } from "../services/api";

export default function Summarization({ text }) {
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ tfidf: null, textrank: null });

  const originalWordCount = text ? text.split(/\s+/).filter(w => w).length : 0;

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const [tfidf, textrank] = await Promise.all([
        summarizeTfidf(text, length),
        summarizeTextRank(text, length)
      ]);
      setResults({ tfidf, textrank });
    } catch (error) {
      alert("Error generating summaries");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 max-w-[1000px] mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
        <div className="max-w-[600px]">
          <div className="text-[12px] font-bold uppercase tracking-widest text-[#FF6B4A] mb-3">NLP / Summarization</div>
          <h1 className="text-[36px] font-bold text-[#F5F5F5] mb-4 leading-[1.2]">Summarization</h1>
          <p className="text-[#A1A1A1] text-[18px] leading-[1.6] font-light">
            Compare how different classical algorithms identify the most important ideas in a document.
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="relative">
            <select 
              value={length} 
              onChange={e => setLength(e.target.value)} 
              className="appearance-none bg-transparent border-b border-[#3A3A3A] hover:border-[#6B6B6B] text-[#F5F5F5] py-2 pl-2 pr-8 focus:outline-none transition-colors text-[15px] cursor-pointer"
            >
              <option value="short" className="bg-[#141414]">Short length</option>
              <option value="medium" className="bg-[#141414]">Medium length</option>
              <option value="long" className="bg-[#141414]">Long length</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#A1A1A1]">
              ▾
            </div>
          </div>
          
          <button 
            onClick={handleGenerate} 
            disabled={loading || !text} 
            className="group px-6 py-2.5 bg-[#FF6B4A] hover:brightness-110 disabled:opacity-50 text-[#0F0F0F] font-semibold rounded-[4px] text-[15px] transition-all flex items-center gap-2"
          >
            {loading ? "Generating..." : "Generate summaries"} <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {!text && (
        <div className="text-center p-12 text-[#6B6B6B] font-light text-[16px]">
          Please enter text on the Home page first.
        </div>
      )}

      {results.tfidf && (
        <div className="flex flex-col gap-16 mt-8">
          <SummarySection 
            title="TF-IDF" 
            type="Extractive"
            accentColor="#FF6B4A"
            result={results.tfidf} 
            description="Selects important sentences by measuring the importance of words across the document."
            originalWordCount={originalWordCount}
          />
          <div className="w-full h-px bg-[#1A1A1A]" />
          <SummarySection 
            title="TextRank" 
            type="Extractive"
            accentColor="#6EE7B7"
            result={results.textrank} 
            description="Ranks sentences using a graph-based similarity approach inspired by PageRank."
            originalWordCount={originalWordCount}
          />
        </div>
      )}
    </div>
  );
}

function SummarySection({ title, type, accentColor, result, description, originalWordCount }) {
  const reductionPercent = originalWordCount > 0 
    ? Math.max(0, Math.round((1 - (result.word_count / originalWordCount)) * 100))
    : 0;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Editorial Header */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-[26px] font-bold text-[#F5F5F5]">{title}</h2>
          <span className="text-[15px] text-[#A1A1A1] font-light mt-1">{type}</span>
        </div>
        <div className="w-12 h-[2px]" style={{ backgroundColor: accentColor }} />
        <p className="text-[16px] text-[#A1A1A1] font-light mt-4 max-w-[600px] leading-[1.6]">
          {description}
        </p>
      </div>
      
      {/* Article-like Summary Content */}
      <div className="py-6 max-w-[700px]">
        <p className="text-[#E8E8E8] leading-[1.8] text-[17px] font-light whitespace-pre-wrap">
          {result.summary}
        </p>
      </div>
      
      {/* Elegant Metadata Row */}
      <div className="flex items-center gap-4 text-[14px] font-medium text-[#6B6B6B] pt-2">
        <span>{result.word_count} words</span>
        <span className="opacity-30">·</span>
        <span>{result.sentence_count} sentences</span>
        <span className="opacity-30">·</span>
        <span style={{ color: accentColor }}>{reductionPercent}% shorter</span>
      </div>
      
    </div>
  );
}
