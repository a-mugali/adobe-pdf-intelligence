import os
import json
import datetime
from document_loader import extract_text_by_page
from relevance_ranker import rank_relevant_sections

INPUT_DIR = "/app/input"
OUTPUT_DIR = "/app/output"


# Example persona prompt
PERSONA = "PhD researcher in AI"
JOB = "Summarize datasets and benchmarks for literature review"

def analyze_documents():
    metadata = {
        "documents": [],
        "persona": PERSONA,
        "job": JOB,
        "timestamp": datetime.datetime.now().isoformat()
    }

    sections = []
    subsections = []

    persona_prompt = f"{PERSONA}. Task: {JOB}."

    for filename in os.listdir(INPUT_DIR):
        if filename.endswith(".pdf"):
            metadata["documents"].append(filename)
            pdf_path = os.path.join(INPUT_DIR, filename)

            pages = extract_text_by_page(pdf_path)
            top_pages = rank_relevant_sections(persona_prompt, pages, top_k=3)

            for i, (score, page) in enumerate(top_pages):
                sections.append({
                    "document": filename,
                    "page": page["page"],
                    "section_title": page["text"].split("\n")[0][:60],  # First line as title
                    "importance_rank": i + 1
                })
                subsections.append({
                    "document": filename,
                    "page": page["page"],
                    "refined_text": page["text"][:500]  # Preview only
                })

    output = {
        "metadata": metadata,
        "sections": sections,
        "subsections": subsections
    }

    with open(os.path.join(OUTPUT_DIR, "persona_output.json"), "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

if __name__ == "__main__":
    analyze_documents()
