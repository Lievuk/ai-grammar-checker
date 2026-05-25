"use client"
import { useState } from "react"

function analyzeText(text) {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chars = text.length;
  const avgWordLen = words.length > 0 ? (chars / words.length).toFixed(1) : 0;
  const avgSentLen = sentences.length > 0 ? (words.length / sentences.length).toFixed(1) : 0;
  
  const issues = [];
  const passiveVoice = (text.match(/\b(am|is|are|was|were|been|being)\s+\w+ed\b/gi) || []).length;
  if (passiveVoice > 2) issues.push(passiveVoice + ' instances of passive voice detected');
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 25).length;
  if (longSentences > 0) issues.push(longSentences + ' sentences exceed 25 words &mdash; consider splitting');
  
  const readabilityWords = words.filter(w => { let s=0; const v='aeiouy'; const l=w.toLowerCase(); for(let i=0;i<l.length;i++){if(v.includes(l[i])&&(i===0||!v.includes(l[i-1])))s++} return Math.max(s,1)>=3; }).length;
  if (readabilityWords / words.length > 0.3) issues.push('High number of complex words &mdash; consider simpler alternatives');
  
  return {
    original: text,
    summary: '<strong>Grammar Analysis Report</strong><br/>' + (issues.length > 0 ? issues.map((x, i) => (i+1) + '. ' + x).join('<br/>') : '&check; Your text looks good! No major issues detected.'),
    originalLen: words.length,
    summaryLen: issues.length,
    compression: 90
  };
}

export default function Home() {
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      try {
        const res = analyzeText(text)
        setResult(res)
      } catch(e) {
        setResult({ summary: "Error: " + e.message })
      }
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <div className="card">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to check grammar..."
        />
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <button className="btn" onClick={handleAnalyze} disabled={loading || !text.trim()}>
            {loading ? "Analyzing..." : "Check Grammar"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>Grammar Check</h2>
          <div className="result" dangerouslySetInnerHTML={{ __html: result.summary }} />
          <p style={{ color: "#888", marginTop: "1rem", fontSize: "0.85rem" }}>
            {result.originalLen} words analyzed
          </p>
        </div>
      )}
    </>
  )
}