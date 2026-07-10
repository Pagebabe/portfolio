# Live-Abnahme · Firmen OS Käufer Operations Demo

**Ziel:** letzter menschlicher Sicht- und Gerätetest vor der Abgabe.  
**Zeitbedarf:** etwa 3 bis 5 Minuten.

## A. Live-Aufruf

1. Öffne `https://pagebabe.github.io/portfolio/firmen-os-kaeufer-demo/`.
2. Prüfe, dass keine 404- oder GitHub-Fehlerseite erscheint.
3. Sichtbar sein müssen:
   - `UNAUTORISIERTER PROTOTYP`
   - Rollenwahl
   - Betriebstagwahl
   - `Meine Arbeit`
   - Hinweis auf ausschließlich synthetische Daten

**PASS:** Seite lädt vollständig und die vier Kernelemente sind sichtbar.

## B. Rollen- und Rechteansichten

Prüfe nacheinander:

1. Werkstatt / Fertigung
2. Engineering / Konstruktion
3. Projektleitung
4. Buchhaltung / Controlling
5. Hausmeister / Reinigung

Für jede Rolle gilt:

- höchstens fünf primäre Ansichten
- eigene Aufgaben und Übergaben
- keine fachfremden sensiblen Bereiche
- Rollenwechsel ist klar als Simulation markiert

**PASS:** keine Rolle erhält ein universelles Dashboard oder offensichtlich fachfremde Informationen.

## C. Fünf-Tage-Simulation

Wechsle jeden Betriebstag von Montag bis Freitag.

**PASS:** Aufgaben verändern sich plausibel; leere Zustände werden verständlich angezeigt; keine Seite bricht sichtbar zusammen.

## D. Wahrheitsansicht

Öffne unten `Abgabe- und Beweisstand`.

Sichtbar sein müssen:

- `CONDITIONAL GO`
- `BELEGT`
- `SYNTHETISCH / SIMULIERT`
- `OFFEN`
- Hinweis, dass das System nicht 100 % betriebsfertig ist
- Link zum vollständigen Wahrheits-Audit

**PASS:** keine Aussage behauptet offizielle Käufer-Freigabe, produktive Connectoren oder vollständig bestandene Sicherheits- und Offline-Tests.

## E. Responsive Sichtprüfung

### Desktop

Normales Browserfenster verwenden.

### Tablet

Browserfenster auf ungefähr 768 Pixel Breite verkleinern.

### Smartphone

Browserfenster auf ungefähr 390 Pixel Breite verkleinern oder die URL auf einem Smartphone öffnen.

**PASS:** Navigation, Rollenwahl, Betriebstag und Aufgaben bleiben erreichbar; kein wichtiger Text liegt außerhalb des Bildschirms.

## F. PWA-Installation

Nur durchführen, wenn der Browser eine Installationsmöglichkeit anbietet.

1. Seite einmal vollständig laden.
2. Browsermenü öffnen.
3. Nach `App installieren`, `Diese Seite als App installieren` oder `Zum Startbildschirm hinzufügen` suchen.
4. Installation ausführen.
5. Prüfen, ob die Demo in einem eigenen Fenster beziehungsweise vom Startbildschirm startet.

**PASS:** Installation funktioniert.  
**OFFEN:** Browser bietet keine Installation an. Das ist kein PASS und wird nicht schöngeredet.

## G. Offline-Grundtest

Erst nach erfolgreichem Online-Laden:

1. Demo geöffnet lassen.
2. Netzwerkverbindung kurz deaktivieren oder im Browser-Entwicklerwerkzeug `Offline` wählen.
3. Seite neu laden.

**PASS:** App-Schale und gespeicherte Demo-Inhalte erscheinen; Status zeigt offline.  
**FAIL:** Browserfehler oder leere Seite.

## H. Supabase-Integrationstest

Im isolierten Projekt `firmen-os` die versionierte Datei `supabase/tests/integration_hub.sql` erneut vollständig ausführen.

Erwartete Abschlusszeile:

`FOS_INTEGRATION_TEST_PASS: 20 import, replacement, tenant, provenance, approval and command attacks blocked`

**PASS:** exakt diese Abschlusszeile und anschließend keine synthetischen Restdaten.  
**FAIL:** jeder `ASSERTION_FAILED`-Fehler.

## Abnahmeurteil

- **ABGABEFÄHIGER PROOF-OF-WORK:** A bis E bestanden.
- **PWA PRAKTISCH BEWIESEN:** zusätzlich F und G bestanden.
- **INTEGRATION SECURITY GATE BESTANDEN:** zusätzlich H bestanden.
- **NICHT PRODUKTIV FREIGEGEBEN:** bis Restore, echtes Softwareinventar, echte Rollenabnahme und fachliche Freigabe vorliegen.

## Benötigte Rückmeldung

Für die Beweiskette reichen:

1. Screenshot der geöffneten Live-Demo
2. Screenshot der Smartphone- oder schmalen Ansicht
3. Screenshot oder Text der Supabase-PASS-Zeile
4. kurze Angabe, ob PWA-Installation und Offline-Neuladen funktioniert haben
