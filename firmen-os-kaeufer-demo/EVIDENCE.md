# Firmen OS · Käufer Operations Demo

## Einordnung

Öffentliche, unautorisierte Branchenstudie mit ausschließlich synthetischen Daten. Die Demo behauptet weder Zusammenarbeit noch Beauftragung oder Freigabe durch Gebr. Käufer.

## Live-Pfad nach Merge

`https://pagebabe.github.io/portfolio/firmen-os-kaeufer-demo/`

## Umfang

- 5 synthetische Betriebstage
- 15 Rollen und Abteilungen
- 30 rollenbezogene Arbeitsvorgänge
- 12 kontrollierte Abteilungsübergaben
- objektgebundene Nachrichten
- Referenzprozess von Anfrage bis Service
- simulierte Quellen: Firmen OS, Inventor/Vault, ERP, Microsoft 365, Mobile und Integration Hub
- installierbare, auf den Unterordner begrenzte PWA-Schale

## Schutzgrenzen

- keine echten Käufer-, Kunden-, Mitarbeiter-, CAD-, ERP-, Anlagen-, Vertrags- oder Finanzdaten
- keine echten Käufer-E-Mail-Adressen
- kein universelles Dashboard
- maximal fünf primäre Ansichten je Rolle
- keine produktiven Fachsystemzugänge
- keine produktive Authentifizierung oder Rechtefreigabe in der öffentlichen Demo
- keine Datenübertragung an Supabase
- kein Eingriff in Chris Fact Radar

## Automatischer Nachweis

`.github/workflows/firmen-os-submission.yml` prüft:

- JavaScript-Syntax
- sechs erforderliche PWA-Dateien
- Manifest und Ordner-Scope
- Service-Worker-Datenschutzmarker
- 15 Rollen
- maximal fünf primäre Ansichten je Rolle
- fünf Betriebstage
- mindestens 30 Vorgänge
- mindestens 12 Übergaben
- simulierte Fachsystemmarker
- keine `@kaeufer.de`-Adresse
- lokale HTTP-Auslieferung der Abgabedateien

## Offene Grenzen

Die öffentliche Demo ersetzt nicht:

- fachliche Abnahme durch Gebr. Käufer
- reales Mitarbeiter- und Rechtemapping
- echte Inventor-/Vault-, ERP- oder Microsoft-365-Connectoren
- produktive Offline-Synchronisation
- produktiven Backup-/Restore- und Go-Live-Nachweis
