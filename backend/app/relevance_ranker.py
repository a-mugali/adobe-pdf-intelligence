from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('paraphrase-MiniLM-L3-v2')  # smaller & lighter


def rank_relevant_sections(persona_prompt, page_texts, top_k=3):
    """
    Returns top_k relevant pages sorted by semantic similarity to the persona_prompt.
    """
    texts = [page["text"] for page in page_texts]
    embeddings = model.encode(texts + [persona_prompt], convert_to_tensor=True)

    page_embeddings = embeddings[:-1]
    query_embedding = embeddings[-1]

    similarities = cosine_similarity(query_embedding.reshape(1, -1), page_embeddings)[0]
    ranked = sorted(
        zip(similarities, page_texts),
        key=lambda x: x[0],
        reverse=True
    )

    return ranked[:top_k]
