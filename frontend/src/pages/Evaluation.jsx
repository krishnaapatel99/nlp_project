import { useState } from "react";
import { evaluateRouge } from "../services/api";

export default function Evaluation({ text }) {
  const [reference, setReference] = useState("");
  const [generated, setGenerated] = useState("");
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    if (!reference.trim() || !generated.trim()) return;
    setLoading(true);
    try {
      const result = await evaluateRouge(reference, generated);
      setScores(result);
    } catch (error) {
      alert("Error calculating ROUGE");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 max-w-[1000px] mx-auto w-full pb-16">
      
      {/* Header */}
      <div className="flex flex-col mb-4">
        <div className="text-[12px] font-bold uppercase tracking-widest text-[#FF6B4A] mb-3">NLP / Evaluation</div>
        <h1 className="text-[36px] font-bold text-[#F5F5F5] mb-4 leading-[1.2]">Evaluation</h1>
        <p className="text-[#A1A1A1] text-[18px] leading-[1.6] font-light max-w-[700px]">
          How closely does the generated summary match the reference summary? Analyze precision and recall through ROUGE metrics.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        
        {/* Results - Displayed prominently at the top if available */}
        {scores && (
          <div className="flex flex-col gap-6 pt-6 border-t border-[#1A1A1A]">
            <h2 className="text-[15px] font-semibold text-[#A1A1A1]">Metric outcomes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <EditorialMetric title="ROUGE-1" data={scores.rouge1} color="#FF6B4A" desc="Unigram overlap" />
              <EditorialMetric title="ROUGE-2" data={scores.rouge2} color="#6EE7B7" desc="Bigram overlap" />
              <EditorialMetric title="ROUGE-L" data={scores.rougeL} color="#FBBF24" desc="Longest common sequence" />
            </div>
            
            <div className="w-full h-px bg-[#1A1A1A] mt-6" />
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-[18px] font-semibold text-[#F5E6D3]">Reference summary</h3>
            <textarea
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full h-48 bg-transparent border-l border-[#2A2A2A] focus:border-[#FF6B4A] pl-6 py-2 text-[#E8E8E8] placeholder-[#3A3A3A] focus:outline-none resize-none leading-[1.8] text-[16px] font-light transition-colors"
              placeholder="Paste human/reference summary here..."
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-[18px] font-semibold text-[#F5E6D3]">Generated summary</h3>
            <textarea
              value={generated}
              onChange={(e) => setGenerated(e.target.value)}
              className="w-full h-48 bg-transparent border-l border-[#2A2A2A] focus:border-[#FF6B4A] pl-6 py-2 text-[#E8E8E8] placeholder-[#3A3A3A] focus:outline-none resize-none leading-[1.8] text-[16px] font-light transition-colors"
              placeholder="Paste generated summary here..."
            />
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleEvaluate}
            disabled={loading || !reference || !generated}
            className="group px-8 py-3 bg-[#FF6B4A] hover:brightness-110 disabled:opacity-50 text-[#0F0F0F] font-semibold rounded-[4px] text-[15px] transition-all flex items-center gap-2"
          >
            {loading ? "Calculating..." : "Calculate ROUGE scores"} <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>
    </div>
  );
}

function EditorialMetric({ title, data, color, desc }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 h-[2px]" style={{ backgroundColor: color }} />
        <h3 className="text-[20px] font-bold text-[#F5F5F5]">{title}</h3>
      </div>
      <p className="text-[13px] text-[#6B6B6B] mb-6">{desc}</p>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
          <span className="text-[14px] text-[#A1A1A1] font-light">F1-Score</span>
          <span className="text-[28px] font-semibold" style={{ color }}>{(data.f1 * 100).toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#6B6B6B] font-medium uppercase tracking-wider mb-1">Precision</span>
            <span className="text-[18px] text-[#F5F5F5]">{(data.precision * 100).toFixed(1)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-[#6B6B6B] font-medium uppercase tracking-wider mb-1">Recall</span>
            <span className="text-[18px] text-[#F5F5F5]">{(data.recall * 100).toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
