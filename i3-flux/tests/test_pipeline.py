import json
import tempfile
import unittest
from pathlib import Path

from pipeline import executer, traiter

VALIDE = {"id": "x1", "date": "2026-10-19", "period": "am", "group": "A", "mode": "DG",
          "title": "Test", "domain": "web", "teacherId": "t1", "status": "confirmed"}


def ligne(**changements):
    return json.dumps({**VALIDE, **changements})


class TestPipeline(unittest.TestCase):
    def test_ligne_valide(self):
        resultat = list(traiter([ligne(date="19/10/2026", period="matin", status="confirme")]))
        genre, seance = resultat[0]
        self.assertEqual(genre, "accepte")
        self.assertEqual(seance["date"], "2026-10-19")
        self.assertEqual(seance["period"], "am")
        self.assertEqual(seance["status"], "confirmed")

    def test_lignes_invalides(self):
        cas = [ligne(date="2026-02-30"), ligne(period="soir"), ligne(title=""),
               ligne(teacherId="t9"), ligne(teacherId=None),
               ligne(mode="AUTO", teacherId=None, status="confirmed")]
        for brute in cas:
            genre, _ = list(traiter([brute]))[0]
            self.assertEqual(genre, "rejet", brute)

    def test_doublon_garde_la_premiere_valide(self):
        resultat = list(traiter([ligne(date="2026-02-30"), ligne(title="Premier"), ligne(title="Second")]))
        self.assertEqual([g for g, _ in resultat], ["rejet", "accepte", "doublon"])
        self.assertEqual(resultat[1][1]["title"], "Premier")

    def test_json_malforme_ne_bloque_pas_la_suite(self):
        resultat = list(traiter(['{"id":"bad4"', ligne()]))
        self.assertEqual(resultat[0][1]["motif"], "JSON malformé")
        self.assertEqual(resultat[1][0], "accepte")

    def test_fichier_vide(self):
        with tempfile.TemporaryDirectory() as dossier:
            entree = Path(dossier) / "vide.ndjson"
            entree.write_text("", encoding="utf-8")
            stats = executer(entree, Path(dossier) / "sortie")
            self.assertEqual(stats, {"lus": 0, "acceptes": 0, "rejets": 0, "doublons": 0})

    def test_jeu_fourni_et_invariant(self):
        with tempfile.TemporaryDirectory() as dossier:
            stats = executer("seances.ndjson", dossier)
            self.assertEqual(stats, {"lus": 12, "acceptes": 6, "rejets": 4, "doublons": 2})
            self.assertEqual(stats["lus"], stats["acceptes"] + stats["rejets"] + stats["doublons"])

    def test_meme_fichier_meme_resultat(self):
        with tempfile.TemporaryDirectory() as a, tempfile.TemporaryDirectory() as b:
            executer("seances.ndjson", a)
            executer("seances.ndjson", b)
            for nom in ["acceptes.ndjson", "rejets.ndjson", "stats.json"]:
                self.assertEqual((Path(a) / nom).read_bytes(), (Path(b) / nom).read_bytes())


if __name__ == "__main__":
    unittest.main()