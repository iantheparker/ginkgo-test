from Bio import Entrez, SeqIO, Align
import random

Entrez.email = ""
proteins = [
    "NC_000852",
    "NC_007346",
    "NC_008724",
    "NC_009899",
    "NC_014637",
    "NC_020104",
    "NC_023423",
    "NC_023640",
    "NC_023719",
    "NC_027867",
]


async def search_protein_list(term="GATTACA"):
    # loop through a shuffle and break loop when one is found. Only return the alignment location
    random.shuffle(proteins)
    for protein in proteins:
        request = Entrez.efetch(db="nuccore", id=protein, rettype="fasta")
        seq_record = SeqIO.read(request, "fasta")
        aligner = Align.PairwiseAligner()
        alignments = aligner.align(seq_record.seq, term)
        if alignments is not None and alignments[0].score > 0:
            print(
                f"search term : {term}, protein: {protein}, score: {alignments[0].score}, aligned: {alignments[0].aligned}"
            )
            return {
                "term": term,
                "protein": protein,
                "score": alignments[0].score,
                "aligned": alignments[0].aligned,
            }
    return "not found"
