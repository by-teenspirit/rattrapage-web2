import argparse
import json
import re
from datetime import date
from pathlib import Path

PERIODES = {"matin": "am", "am": "am", "après-midi": "pm", "apres-midi": "pm", "pm": "pm"}
STATUTS = {"proposed": "proposed", "propose": "proposed", "confirmed": "confirmed", "confirme": "confirmed"}
GROUPES = {"A": "A", "B": "B", "Promotion": "Promotion"}
MODES = {"DG": "DG", "CE": "CE", "AUTO": "AUTO"}
FORMATEURS = {"t1", "t2", "t3"}
ISO = re.compile(r"^(\d{4})-(\d{2})-(\d{2})$")
FR = re.compile(r"^(\d{2})/(\d{2})/(\d{4})$")


class Rejet(Exception):
    pass


def choisir(obj, cle, table):
    valeur = obj.get(cle)
    if not isinstance(valeur, str) or valeur not in table:
        raise Rejet(f"{cle} invalide : {valeur}")
    return table[valeur]


def texte(obj, cle):
    valeur = obj.get(cle)
    if not isinstance(valeur, str) or not valeur.strip():
        raise Rejet(f"{cle} manquant ou vide")
    return valeur.strip()


def normaliser_date(valeur):
    if not isinstance(valeur, str):
        raise Rejet(f"date invalide : {valeur}")
    trouve = ISO.match(valeur)
    if trouve:
        annee, mois, jour = trouve.groups()
    else:
        trouve = FR.match(valeur)
        if not trouve:
            raise Rejet(f"date invalide : {valeur}")
        jour, mois, annee = trouve.groups()
    try:
        return date(int(annee), int(mois), int(jour)).isoformat()
    except ValueError:
        raise Rejet(f"date impossible : {valeur}")


def normaliser(obj):
    if not isinstance(obj, dict):
        raise Rejet("la ligne n'est pas un objet")
    formateur = obj.get("teacherId")
    if formateur is not None and (not isinstance(formateur, str) or formateur not in FORMATEURS):
        raise Rejet(f"teacherId invalide : {formateur}")
    seance = {
        "id": texte(obj, "id"),
        "date": normaliser_date(obj.get("date")),
        "period": choisir(obj, "period", PERIODES),
        "group": choisir(obj, "group", GROUPES),
        "mode": choisir(obj, "mode", MODES),
        "title": texte(obj, "title"),
        "domain": texte(obj, "domain"),
        "teacherId": formateur,
        "status": choisir(obj, "status", STATUTS),
    }
    if seance["mode"] == "AUTO" and (formateur is not None or seance["status"] != "proposed"):
        raise Rejet("AUTO exige teacherId null et status proposed")
    if seance["status"] == "confirmed" and formateur is None:
        raise Rejet("confirmed exige un formateur")
    return seance


def traiter(lignes):
    vus = set()
    for numero, brute in enumerate(lignes, start=1):
        if not brute.strip():
            continue
        try:
            seance = normaliser(json.loads(brute))
        except json.JSONDecodeError:
            yield "rejet", {"source_line": numero, "motif": "JSON malformé"}
            continue
        except Rejet as erreur:
            yield "rejet", {"source_line": numero, "motif": str(erreur)}
            continue
        if seance["id"] in vus:
            yield "doublon", {"source_line": numero, "id": seance["id"]}
            continue
        vus.add(seance["id"])
        yield "accepte", {"source_line": numero, **seance}


def executer(entree, sortie):
    sortie = Path(sortie)
    sortie.mkdir(parents=True, exist_ok=True)
    stats = {"lus": 0, "acceptes": 0, "rejets": 0, "doublons": 0}
    compteurs = {"accepte": "acceptes", "rejet": "rejets", "doublon": "doublons"}
    with open(entree, encoding="utf-8") as source, \
         open(sortie / "acceptes.ndjson", "w", encoding="utf-8", newline="\n") as acceptes, \
         open(sortie / "rejets.ndjson", "w", encoding="utf-8", newline="\n") as rejets:
        for genre, donnee in traiter(source):
            stats["lus"] += 1
            stats[compteurs[genre]] += 1
            ligne = json.dumps(donnee, ensure_ascii=False) + "\n"
            if genre == "accepte":
                acceptes.write(ligne)
            elif genre == "rejet":
                rejets.write(ligne)
    (sortie / "stats.json").write_text(json.dumps(stats, indent=2) + "\n", encoding="utf-8")
    return stats


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("entree")
    parser.add_argument("sortie")
    args = parser.parse_args()
    print(json.dumps(executer(args.entree, args.sortie)))