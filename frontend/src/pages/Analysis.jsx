export default function Analysis({ text, nlpData }) {
  if (!text || !nlpData) {
    return (
      <div className="text-center p-12 text-[#6B6B6B] font-light text-[16px] mt-10">
        No data available. Please enter text on the Home page and click Analyze.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-700 max-w-[1000px] mx-auto w-full pb-16">
      
      {/* Header */}
      <div className="flex flex-col mb-4">
        <div className="text-[12px] font-bold uppercase tracking-widest text-[#FF6B4A] mb-3">NLP / Analysis</div>
        <h1 className="text-[36px] font-bold text-[#F5F5F5] mb-4 leading-[1.2]">Analysis</h1>
        <p className="text-[#A1A1A1] text-[18px] leading-[1.6] font-light max-w-[700px]">
          Detailed breakdown of classical text processing steps, revealing the underlying structure and linguistic properties of the document.
        </p>
      </div>
      
      {/* 1. Text Preprocessing */}
      <section className="flex flex-col gap-8">
        <h2 className="text-[24px] font-semibold text-[#F5E6D3] border-b border-[#1A1A1A] pb-4">Text preprocessing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          
          <AnalysisSection title="Tokenization">
            <div className="flex items-center gap-6 text-[#F5F5F5] font-light text-[15px]">
              <div className="flex flex-col">
                <span className="text-[12px] text-[#6B6B6B] font-semibold tracking-wider uppercase mb-1">Sentences</span>
                <span className="text-[22px]">{nlpData.sentences?.count || 0}</span>
              </div>
              <div className="w-px h-8 bg-[#2A2A2A]" />
              <div className="flex flex-col">
                <span className="text-[12px] text-[#6B6B6B] font-semibold tracking-wider uppercase mb-1">Words</span>
                <span className="text-[22px]">{nlpData.words?.count || 0}</span>
              </div>
              <div className="w-px h-8 bg-[#2A2A2A]" />
              <div className="flex flex-col">
                <span className="text-[12px] text-[#6B6B6B] font-semibold tracking-wider uppercase mb-1">Unique</span>
                <span className="text-[22px]">{nlpData.words?.unique_count || 0}</span>
              </div>
            </div>
          </AnalysisSection>

          <AnalysisSection title="Stopword removal">
            <p className="text-[15px] text-[#A1A1A1] leading-[1.7] font-light line-clamp-3">
              {nlpData.stopwords?.filtered || "N/A"}
            </p>
          </AnalysisSection>

          <AnalysisSection title="Stemming (Porter)">
            <div className="flex flex-col gap-2">
              {nlpData.stemming?.slice(0,4).map((s,i) => (
                <div key={i} className="flex items-center gap-4 text-[15px]">
                  <span className="text-[#A1A1A1] w-24 truncate">{s.original}</span> 
                  <span className="text-[#3A3A3A] text-[12px]">→</span>
                  <span className="text-[#FF6B4A]">{s.stemmed}</span>
                </div>
              ))}
            </div>
          </AnalysisSection>

          <AnalysisSection title="Lemmatization (WordNet)">
            <div className="flex flex-col gap-2">
              {nlpData.lemmatization?.slice(0,4).map((l,i) => (
                <div key={i} className="flex items-center gap-4 text-[15px]">
                  <span className="text-[#A1A1A1] w-24 truncate">{l.original}</span> 
                  <span className="text-[#3A3A3A] text-[12px]">→</span>
                  <span className="text-[#6EE7B7]">{l.lemmatized}</span>
                </div>
              ))}
            </div>
          </AnalysisSection>
          
        </div>
      </section>

      {/* 2. Linguistic Analysis */}
      <section className="flex flex-col gap-8 pt-8 border-t border-[#141414]">
        <h2 className="text-[24px] font-semibold text-[#F5E6D3] border-b border-[#1A1A1A] pb-4">Linguistic analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <AnalysisSection title="POS Tagging">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              {nlpData.pos?.tags?.slice(0,8).map((t,i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-[#F5F5F5] font-light">{t.token}</span>
                  <span className="text-[#A1A1A1] text-[12px]">{t.pos}</span>
                </div>
              ))}
            </div>
          </AnalysisSection>

          <AnalysisSection title="Named Entities">
            {nlpData.ner?.length > 0 ? (
              <div className="flex flex-col gap-3">
                {nlpData.ner.slice(0,5).map((n,i) => (
                  <div key={i} className="flex items-baseline justify-between max-w-[250px] border-b border-[#1A1A1A] pb-1">
                    <span className="text-[#F5E6D3] font-light text-[15px]">{n.entity}</span>
                    <span className="text-[#FF6B4A] text-[11px] tracking-wider uppercase font-semibold">{n.type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[14px] text-[#6B6B6B] font-light">No named entities detected.</div>
            )}
          </AnalysisSection>
        </div>
      </section>

      {/* 3. Statistical Analysis */}
      <section className="flex flex-col gap-8 pt-8 border-t border-[#141414]">
        <h2 className="text-[24px] font-semibold text-[#F5E6D3] border-b border-[#1A1A1A] pb-4">Statistical analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          
          <AnalysisSection title="Bigrams">
            <div className="flex flex-col gap-2">
              {nlpData.ngrams?.bigrams?.length > 0 ? nlpData.ngrams.bigrams.slice(0,5).map((b,i) => (
                <div key={i} className="flex items-center justify-between text-[15px]">
                  <span className="text-[#F5F5F5] font-light">{b[0]}</span> 
                  <span className="text-[#6B6B6B]">{b[1]}</span>
                </div>
              )) : <div className="text-[14px] text-[#6B6B6B] font-light">None found</div>}
            </div>
          </AnalysisSection>

          <AnalysisSection title="Bag of Words">
            <div className="text-[13px] text-[#6B6B6B] mb-3">Vocab size: <span className="text-[#F5F5F5]">{nlpData.bow?.vocab_size || 0}</span></div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[15px]">
              {nlpData.bow?.top_terms?.slice(0,5).map((t,i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-[#F5E6D3] font-light">{t[0]}</span>
                  <span className="text-[#6B6B6B] text-[12px]">{t[1]}</span>
                </div>
              ))}
            </div>
          </AnalysisSection>

          <AnalysisSection title="TF-IDF">
            <div className="flex flex-col gap-2">
              {nlpData.tfidf?.slice(0,5).map((t,i) => (
                <div key={i} className="flex items-center justify-between text-[15px]">
                  <span className="text-[#F5F5F5] font-light">{t[0]}</span> 
                  <span className="text-[#FBBF24] text-[14px]">{t[1].toFixed(3)}</span>
                </div>
              ))}
            </div>
          </AnalysisSection>

        </div>
      </section>

    </div>
  );
}

function AnalysisSection({ title, children }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-[15px] font-semibold text-[#A1A1A1] mb-4">{title}</h3>
      <div>
        {children}
      </div>
    </div>
  );
}
