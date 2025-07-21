import fitz  # PyMuPDF

def extract_text_by_page(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []

    for page_num, page in enumerate(doc, start=1):
        text = page.get_text()
        if text.strip():  # skip empty pages
            pages.append({
                "page": page_num,
                "text": text
            })

    return pages
