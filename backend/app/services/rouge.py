from rouge_score import rouge_scorer

def evaluate_rouge(reference: str, generated: str):
    scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)
    scores = scorer.score(reference, generated)
    
    return {
        "rouge1": {
            "precision": round(scores['rouge1'].precision, 4),
            "recall": round(scores['rouge1'].recall, 4),
            "f1": round(scores['rouge1'].fmeasure, 4)
        },
        "rouge2": {
            "precision": round(scores['rouge2'].precision, 4),
            "recall": round(scores['rouge2'].recall, 4),
            "f1": round(scores['rouge2'].fmeasure, 4)
        },
        "rougeL": {
            "precision": round(scores['rougeL'].precision, 4),
            "recall": round(scores['rougeL'].recall, 4),
            "f1": round(scores['rougeL'].fmeasure, 4)
        }
    }
