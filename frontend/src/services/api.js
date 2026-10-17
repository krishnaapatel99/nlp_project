import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_URL,
});

export const extractFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/extract/file", formData);
    return res.data;
};

export const analyzeText = async (text) => {
    const res = await api.post("/nlp/analyze", { text });
    return res.data;
};

export const summarizeTfidf = async (text, length) => {
    const res = await api.post("/summarize/tfidf", { text, length });
    return res.data;
};

export const summarizeTextRank = async (text, length) => {
    const res = await api.post("/summarize/textrank", { text, length });
    return res.data;
};



export const checkSimilarity = async (sentence1, sentence2) => {
    const res = await api.post("/nlp/similarity", { sentence1, sentence2 });
    return res.data;
};

export const evaluateRouge = async (reference, generated) => {
    const res = await api.post("/evaluate/rouge", { reference, generated });
    return res.data;
};
