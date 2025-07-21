import fitz  # PyMuPDF

def extract_headings(pdf_path):
    doc = fitz.open(pdf_path)
    headings = []

    font_size_thresholds = {
        "H1": 16,
        "H2": 13,
        "H3": 10
    }

    title = None
    seen_texts = set()

    for page_num, page in enumerate(doc, start=1):
        blocks = page.get_text("dict")["blocks"]
        for block in blocks:
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    text = span.get("text", "").strip()
                    size = span.get("size", 0)

                    if not text or text in seen_texts:
                        continue
                    seen_texts.add(text)

                    if not title or size > 20:
                        title = text

                    heading_level = None
                    if size >= font_size_thresholds["H1"]:
                        heading_level = "H1"
                    elif size >= font_size_thresholds["H2"]:
                        heading_level = "H2"
                    elif size >= font_size_thresholds["H3"]:
                        heading_level = "H3"

                    if heading_level:
                        headings.append({
                            "level": heading_level,
                            "text": text,
                            "page": page_num
                        })

    return title or "Untitled", headings
