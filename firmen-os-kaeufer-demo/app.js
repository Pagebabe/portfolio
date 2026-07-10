const days = [
  { id: '2026-07-13', label: 'Mo · 13.07.' },
  { id: '2026-07-14', label: 'Di · 14.07.' },
  { id: '2026-07-15', label: 'Mi · 15.07.' },
  { id: '2026-07-16', label: 'Do · 16.07.' },
  { id: '2026-07-17', label: 'Fr · 17.07.' }
];

const viewCatalog = {
  work: { label: 'Meine Arbeit', icon: '✓' },
  messages: { label: 'Nachrichten', icon: '✉' },
  handoffs: { label: 'Übergaben', icon: '↔' },
  project: { label: 'Projektakte', icon: '▦' },
  sources: { label: 'Systemquellen', icon: '◇' },
  submission: { label: 'Abgabe', icon: '●' }
};

const roles = [
  { id: 'management', label: 'Geschäftsführung', device: 'Desktop / Tablet', allowed: ['work','messages','project','handoffs','submission'], rights: 'Entscheidungen, Risiken, Freigaben und bereichsübergreifende Wirkung.', hidden: 'Keine ungefilterten Werkstattdetails und keine technische Selbstfreigabe.' },
  { id: 'sales', label: 'Technischer Vertrieb', device: 'Desktop / Smartphone', allowed: ['work','messages','project','handoffs'], rights: 'Anfragen, technische Vollständigkeit, Kundenaktionen und freigegebene Angebotsdaten.', hidden: 'Keine Fertigungsfreigabe, Messwerte oder internen Personaldaten.' },
  { id: 'project', label: 'Projektleitung', device: 'Desktop / Tablet', allowed: ['work','messages','project','handoffs','sources'], rights: 'Projektgates, Termine, Risiken, Übergaben und Montagereife.', hidden: 'Keine eigenständige technische Revision oder Qualitäts-Sonderfreigabe.' },
  { id: 'engineering', label: 'Engineering / Konstruktion', device: 'CAD-Arbeitsplatz', allowed: ['work','messages','project','handoffs','sources'], rights: 'Anforderungen, Zeichnungen, Revisionen, ECOs und technische Nachweise.', hidden: 'Keine eigene kritische Endfreigabe und keine unnötigen Finanzdaten.' },
  { id: 'planning', label: 'Arbeitsvorbereitung', device: 'Desktop / Werkstatt-Tablet', allowed: ['work','messages','project','handoffs','sources'], rights: 'Arbeitsfolgen, Fertigungsreife, Material- und Prüfplanbezug.', hidden: 'Keine Angebotskalkulation und keine nicht freigegebenen Revisionen.' },
  { id: 'purchasing', label: 'Einkauf', device: 'Desktop', allowed: ['work','messages','handoffs','sources'], rights: 'Lieferantenanfragen, Bestellungen, Termine und freigegebene technische Bedarfe.', hidden: 'Keine CAD-Bearbeitung und keine Personal- oder Lohndaten.' },
  { id: 'logistics', label: 'Lager / Logistik', device: 'Scanner / Tablet', allowed: ['work','messages','handoffs','sources'], rights: 'Wareneingang, Charge, Lagerort, Packliste und Versandbereitschaft.', hidden: 'Keine Projektkalkulation und keine vollständigen Kundenverträge.' },
  { id: 'workshop', label: 'Werkstatt / Fertigung', device: 'Touch-Terminal / Tablet', allowed: ['work','messages','handoffs','sources'], rights: 'Arbeitsauftrag, freigegebene Revision, Material, Messwert und Abweichungsmeldung.', hidden: 'Keine Kalkulation, Verträge, Lohn- oder fremden Projektdaten.' },
  { id: 'quality', label: 'Qualität / Schweißaufsicht', device: 'Desktop / Tablet', allowed: ['work','messages','project','handoffs','sources'], rights: 'Prüfungen, Sperren, Abweichungen, Evidence und CAPA.', hidden: 'Keine Angebotsänderung und keine alleinige Designfreigabe.' },
  { id: 'hse', label: 'Arbeitssicherheit', device: 'Tablet / Smartphone', allowed: ['work','messages','handoffs','sources'], rights: 'Gefährdungsbeurteilung, Qualifikationsnachweise, Einsatz- und Standortfreigabe.', hidden: 'Keine Preis-, Bank- oder unnötigen Kundendaten.' },
  { id: 'field', label: 'Montage / Service', device: 'Smartphone / Tablet · offline', allowed: ['work','messages','project','handoffs','sources'], rights: 'Zugewiesene Einsätze, freigegebene Dokumente, Asset-Historie und mobile Nachweise.', hidden: 'Keine interne Kalkulation, fremden Projekte oder Entwurfsrevisionen.' },
  { id: 'finance', label: 'Buchhaltung / Controlling', device: 'Desktop', allowed: ['work','messages','project','handoffs','sources'], rights: 'Meilensteine, Belege, Rechnungsfreigabe, Kostenabweichung und Zahlungsstatus.', hidden: 'Keine CAD-Bearbeitung, Fertigungsfreigabe oder Sicherheitsdetails ohne Bedarf.' },
  { id: 'hr', label: 'Personal / Administration', device: 'Desktop', allowed: ['work','messages','handoffs','sources'], rights: 'Qualifikationen, Einsatzfähigkeit, Reiseunterlagen und administrative Aufgaben.', hidden: 'Keine Projektkalkulation und keine technischen Konstruktionsdetails.' },
  { id: 'it', label: 'IT / Datenschutz', device: 'Desktop / Admin-Konsole', allowed: ['work','messages','handoffs','sources','submission'], rights: 'Geräte, Konten, Integrationen, Datenschutz und technische Betriebsnachweise.', hidden: 'Keine fachlichen Freigaben nur aufgrund technischer Administratorrechte.' },
  { id: 'facility', label: 'Hausmeister / Reinigung', device: 'Smartphone', allowed: ['work','messages','handoffs'], rights: 'Eigene Gebäudeaufgaben, Orte, Sicherheitsinformationen und Störmeldungen.', hidden: 'Keine Kunden-, Projekt-, Finanz-, Personal- oder Zeichnungsdaten.' }
];

const workItems = [
  { id:'DW-001',day:'2026-07-13',time:'08:00',role:'sales',title:'Anfrage ANF-1042 technisch qualifizieren',object:'Anfrage · ANF-1042',project:'KD-2607-014',priority:'high',status:'running',source:'Microsoft 365 (simuliert)',next:'Betreiber-Schnittstellen und Einsatzort bestätigen',evidence:'Vollständigkeitscheck 12/14',handoff:'Engineering',capability:'sales.inquiry.qualify' },
  { id:'DW-002',day:'2026-07-15',time:'11:00',role:'sales',title:'Leistungsgrenze für Angebot abstimmen',object:'Angebot · ANG-2607-014',project:'KD-2607-014',priority:'medium',status:'waiting',source:'ERP (simuliert)',next:'Freigegebene technische Leistungsgrenze übernehmen',evidence:'Review-Protokoll Vertrieb/Engineering',handoff:'Projektleitung',capability:'sales.offer.prepare' },
  { id:'DW-003',day:'2026-07-13',time:'08:30',role:'engineering',title:'Lastannahme des Betreibers prüfen',object:'Zeichnung · KD-014-GA-001 Rev. C',project:'KD-2607-014',priority:'high',status:'blocked',source:'Autodesk Inventor/Vault (simuliert)',next:'Fehlende Lastannahme als technische Rückfrage eskalieren',evidence:'Vault-Review und markierte Schnittstelle',handoff:'Projektleitung',capability:'engineering.revision.review' },
  { id:'DW-004',day:'2026-07-14',time:'09:15',role:'engineering',title:'ECO-014 für geänderten Anschlagpunkt bewerten',object:'Engineering Change · ECO-014',project:'KD-2607-014',priority:'high',status:'running',source:'Autodesk Inventor/Vault (simuliert)',next:'Auswirkung auf Stückliste, Statik und Montage dokumentieren',evidence:'ECO-Auswirkungsmatrix',handoff:'Qualität',capability:'engineering.change.prepare' },
  { id:'DW-005',day:'2026-07-13',time:'09:00',role:'project',title:'Engineering-Gate moderieren',object:'Gate · G2 Design Freeze',project:'KD-2607-014',priority:'high',status:'blocked',source:'Firmen OS',next:'Blocker, Eigentümer und Entscheidungstermin festlegen',evidence:'Gate-Protokoll mit drei offenen Punkten',handoff:'Geschäftsführung',capability:'project.gate.coordinate' },
  { id:'DW-006',day:'2026-07-16',time:'13:00',role:'project',title:'Montagereife für Offshore-Einsatz prüfen',object:'Einsatz · MT-2607-014',project:'KD-2607-014',priority:'high',status:'waiting',source:'Firmen OS Mobile',next:'Zugang, Dokumente, Qualifikation und Material abgleichen',evidence:'Readiness-Check 17/20',handoff:'Montage / Service',capability:'project.installation.readiness' },
  { id:'DW-007',day:'2026-07-13',time:'10:00',role:'management',title:'Termin- und Kostenwirkung des Design-Blockers entscheiden',object:'Entscheidung · DEC-014',project:'KD-2607-014',priority:'high',status:'waiting',source:'Firmen OS',next:'Eskalationsoption A oder B freigeben',evidence:'Terminwirkung +8 Arbeitstage',handoff:'Projektleitung',capability:'decision.business.approve' },
  { id:'DW-008',day:'2026-07-17',time:'09:00',role:'management',title:'Wochenreview: Risiken und offene Freigaben',object:'Review · KW29',project:'Portfolio',priority:'medium',status:'open',source:'Firmen OS',next:'Drei Maßnahmen priorisieren und Verantwortliche bestätigen',evidence:'Wöchentlicher Evidence-Bericht',handoff:'Projektleitung',capability:'management.review' },
  { id:'DW-009',day:'2026-07-14',time:'07:30',role:'planning',title:'Arbeitsfolge für Plattformrahmen erstellen',object:'Arbeitsplan · AP-8821',project:'KD-2607-018',priority:'medium',status:'running',source:'ERP (simuliert)',next:'Schweißfolge, Prüfhaltepunkt und Ressourcen zuordnen',evidence:'Arbeitsplan Version 2',handoff:'Werkstatt',capability:'production.plan.prepare' },
  { id:'DW-010',day:'2026-07-15',time:'08:00',role:'planning',title:'Fertigungsreife FA-8830 stoppen',object:'Fertigungsauftrag · FA-8830',project:'KD-2607-014',priority:'high',status:'blocked',source:'Firmen OS Integration Hub',next:'Warten auf Design Freeze und gültige Revision',evidence:'Stop-Regel DESIGN_RELEASE_REQUIRED',handoff:'Projektleitung',capability:'production.release.hold' },
  { id:'DW-011',day:'2026-07-14',time:'10:30',role:'purchasing',title:'Liefertermin Antriebspaket bestätigen',object:'Bestellung · PO-4711',project:'KD-2607-018',priority:'high',status:'waiting',source:'ERP (simuliert)',next:'Lieferantennachweis und bestätigten Termin erfassen',evidence:'Auftragsbestätigung ausstehend',handoff:'Arbeitsvorbereitung',capability:'purchase.order.followup' },
  { id:'DW-012',day:'2026-07-16',time:'09:30',role:'purchasing',title:'Ersatzteilangebot für Serviceauftrag einholen',object:'Bedarf · SR-027-P01',project:'KS-2607-031',priority:'medium',status:'open',source:'ERP (simuliert)',next:'Technisch freigegebene Spezifikation versenden',evidence:'Bedarfsmeldung mit Asset-Bezug',handoff:'Service',capability:'purchase.request.create' },
  { id:'DW-013',day:'2026-07-14',time:'11:00',role:'logistics',title:'Wareneingang Charge AL-6082 prüfen',object:'Wareneingang · WE-773',project:'KD-2607-018',priority:'medium',status:'running',source:'Firmen OS Mobile',next:'Charge, Zertifikat und Lagerort bestätigen',evidence:'3.1-Zeugnis und Scannerbezug',handoff:'Qualität',capability:'warehouse.receipt.confirm' },
  { id:'DW-014',day:'2026-07-17',time:'07:45',role:'logistics',title:'Packliste für Werksabnahme vorbereiten',object:'Versand · VS-2607-018',project:'KD-2607-018',priority:'medium',status:'open',source:'ERP (simuliert)',next:'Bauteile, Prüfmittel und Dokumentensatz abgleichen',evidence:'Packliste Revision A',handoff:'Montage / Service',capability:'logistics.shipment.prepare' },
  { id:'DW-015',day:'2026-07-15',time:'06:45',role:'workshop',title:'Rahmenbau FA-8821 fortsetzen',object:'Fertigungsauftrag · FA-8821',project:'KD-2607-018',priority:'medium',status:'running',source:'ERP (simuliert)',next:'Schweißfolge Abschnitt 4 ausführen',evidence:'Zeichnung Rev. D + WPS-17',handoff:'Qualität',capability:'production.operation.execute' },
  { id:'DW-016',day:'2026-07-16',time:'07:00',role:'workshop',title:'Abweichung am Schnittstellenmaß melden',object:'Bauteil · BT-018-044',project:'KD-2607-018',priority:'high',status:'blocked',source:'Firmen OS Mobile',next:'Bauteil sperren, Messwert und Foto erfassen',evidence:'Messwert 124.8 mm statt 124.0 ±0.5',handoff:'Qualität',capability:'quality.deviation.report' },
  { id:'DW-017',day:'2026-07-15',time:'09:30',role:'quality',title:'Schweißnahtprüfung QP-221 abschließen',object:'Prüfauftrag · QP-221',project:'KD-2607-018',priority:'medium',status:'running',source:'Firmen OS Mobile',next:'Ergebnis, Prüferrolle und Bericht verknüpfen',evidence:'VT-Prüfbericht vorbereitet',handoff:'Arbeitsvorbereitung',capability:'quality.inspection.record' },
  { id:'DW-018',day:'2026-07-16',time:'08:00',role:'quality',title:'ABW-041 klassifizieren und Sperre setzen',object:'Abweichung · ABW-041',project:'KD-2607-018',priority:'high',status:'running',source:'Firmen OS',next:'Technische Entscheidung und Nacharbeit verlangen',evidence:'Messprotokoll + Foto + Chargenbezug',handoff:'Engineering',capability:'quality.deviation.classify' },
  { id:'DW-019',day:'2026-07-13',time:'11:30',role:'hse',title:'Offshore-Qualifikationen des Montageteams prüfen',object:'Einsatz · MT-2607-014',project:'KD-2607-014',priority:'high',status:'waiting',source:'Microsoft 365 (simuliert)',next:'Fehlende Zertifikate und Ablaufdaten nachfordern',evidence:'Qualifikationsmatrix 5/6 gültig',handoff:'Personal / Administration',capability:'hse.qualification.verify' },
  { id:'DW-020',day:'2026-07-16',time:'10:00',role:'hse',title:'Gefährdungsbeurteilung Baustellenzugang prüfen',object:'Sicherheitsakte · HSE-014',project:'KD-2607-014',priority:'high',status:'blocked',source:'Firmen OS',next:'Kundenunterlage zum Rettungskonzept anfordern',evidence:'GBU Version 3, Abschnitt 7 offen',handoff:'Projektleitung',capability:'hse.release.review' },
  { id:'DW-021',day:'2026-07-16',time:'14:00',role:'field',title:'Offline-Einsatzpaket für MT-2607-014 laden',object:'Montageeinsatz · MT-2607-014',project:'KD-2607-014',priority:'medium',status:'waiting',source:'Firmen OS Mobile',next:'Freigegebene Dokumente und Checklisten synchronisieren',evidence:'Sync-Paket noch blockiert',handoff:'IT / Datenschutz',capability:'field.package.sync' },
  { id:'DW-022',day:'2026-07-17',time:'08:30',role:'field',title:'Jahreswartung ASSET-DEMO-027 dokumentieren',object:'Serviceauftrag · SR-027',project:'KS-2607-031',priority:'medium',status:'running',source:'Firmen OS Mobile',next:'Messwerte, Fotos, Teile und Restpunkte erfassen',evidence:'Wartungscheckliste 14/18',handoff:'Buchhaltung',capability:'service.workorder.complete' },
  { id:'DW-023',day:'2026-07-15',time:'13:30',role:'finance',title:'Leistungsmeilenstein KD-2607-018 prüfen',object:'Meilenstein · MS-018-03',project:'KD-2607-018',priority:'medium',status:'waiting',source:'ERP (simuliert)',next:'Werksabnahme und Leistungsnachweis abgleichen',evidence:'Abnahmeprotokoll fehlt noch',handoff:'Projektleitung',capability:'finance.milestone.review' },
  { id:'DW-024',day:'2026-07-17',time:'13:00',role:'finance',title:'Serviceleistung SR-027 zur Rechnung vorbereiten',object:'Rechnungsvorschlag · INV-027',project:'KS-2607-031',priority:'medium',status:'open',source:'ERP (simuliert)',next:'Technikerzeiten, Teile und Kundenabnahme prüfen',evidence:'Leistungsnachweis in Bearbeitung',handoff:'Geschäftsführung',capability:'finance.invoice.prepare' },
  { id:'DW-025',day:'2026-07-13',time:'13:00',role:'hr',title:'Fehlendes Offshore-Zertifikat nachfordern',object:'Qualifikation · Q-MT-06',project:'KD-2607-014',priority:'high',status:'running',source:'Microsoft 365 (simuliert)',next:'Mitarbeiter informieren und Ersatzplanung vorbereiten',evidence:'Ablaufdatum überschritten',handoff:'Arbeitssicherheit',capability:'hr.qualification.manage' },
  { id:'DW-026',day:'2026-07-16',time:'11:30',role:'hr',title:'Reise- und Einsatzunterlagen vollständig machen',object:'Reiseakte · RA-2607-014',project:'KD-2607-014',priority:'medium',status:'waiting',source:'Microsoft 365 (simuliert)',next:'Freigegebene Teilnehmerliste übernehmen',evidence:'Reisecheck 8/10',handoff:'Montage / Service',capability:'hr.travel.prepare' },
  { id:'DW-027',day:'2026-07-13',time:'07:45',role:'it',title:'Werkstatt-Tablet in Geräteverwaltung prüfen',object:'Gerät · DEV-WKS-04',project:'Standort Hückeswagen Demo',priority:'medium',status:'running',source:'Firmen OS',next:'Offline-Speicher, Patchstand und Benutzerbindung bestätigen',evidence:'Gerätecheck 6/7',handoff:'Werkstatt',capability:'it.device.verify' },
  { id:'DW-028',day:'2026-07-16',time:'12:00',role:'it',title:'Mobile Sync für Einsatzpaket überwachen',object:'Integration · SYNC-MT-014',project:'KD-2607-014',priority:'high',status:'waiting',source:'Firmen OS Integration Hub',next:'Konfliktfreie Offline-Bereitstellung nach Freigabe prüfen',evidence:'0 Secrets im Clientcache',handoff:'Montage / Service',capability:'integration.sync.monitor' },
  { id:'DW-029',day:'2026-07-13',time:'06:30',role:'facility',title:'Leckage im Werkstatt-Nebenraum absichern',object:'Gebäudestörung · FAC-031',project:'Standort Hückeswagen Demo',priority:'high',status:'running',source:'Firmen OS Mobile',next:'Bereich markieren, Foto aufnehmen und Ursache melden',evidence:'QR-Ort RAUM-W2 bestätigt',handoff:'Arbeitssicherheit',capability:'facility.incident.report' },
  { id:'DW-030',day:'2026-07-17',time:'15:00',role:'facility',title:'Reinigungs- und Verbrauchsmittelrunde abschließen',object:'Gebäudeplan · CLN-KW29',project:'Standort Hückeswagen Demo',priority:'low',status:'open',source:'Firmen OS Mobile',next:'Aufgaben je Raum bestätigen und Mängel melden',evidence:'12 Raum-QRs, keine Projektdaten sichtbar',handoff:'Personal / Administration',capability:'facility.task.complete' }
];

const handoffs = [
  { id:'HO-001',from:'sales',to:'engineering',object:'ANF-1042',rule:'Technische Mindestangaben vollständig',proof:'12/14 Punkte, zwei Rückfragen offen' },
  { id:'HO-002',from:'engineering',to:'project',object:'ECO-014',rule:'Auswirkung auf Termin, Material und Montage dokumentiert',proof:'ECO-Matrix Version 1' },
  { id:'HO-003',from:'project',to:'management',object:'DEC-014',rule:'Entscheidungsoptionen mit Wirkung und Risiko',proof:'+8 Arbeitstage oder Sonderbeschaffung' },
  { id:'HO-004',from:'planning',to:'workshop',object:'AP-8821',rule:'Freigegebene Revision, Material und Prüfplan',proof:'Arbeitsplan Version 2' },
  { id:'HO-005',from:'purchasing',to:'planning',object:'PO-4711',rule:'Liefertermin und technische Bestellung bestätigt',proof:'Auftragsbestätigung ausstehend' },
  { id:'HO-006',from:'logistics',to:'quality',object:'WE-773',rule:'Charge und Materialzeugnis verknüpft',proof:'3.1-Zeugnis vorhanden' },
  { id:'HO-007',from:'workshop',to:'quality',object:'ABW-041',rule:'Bauteil gesperrt, Messwert und Foto vorhanden',proof:'124.8 mm statt 124.0 ±0.5' },
  { id:'HO-008',from:'quality',to:'engineering',object:'ABW-041',rule:'Abweichung klassifiziert, technische Entscheidung verlangt',proof:'Sperrstatus aktiv' },
  { id:'HO-009',from:'hse',to:'hr',object:'Q-MT-06',rule:'Fehlende oder ablaufende Qualifikation benannt',proof:'1 Zertifikat abgelaufen' },
  { id:'HO-010',from:'project',to:'field',object:'MT-2607-014',rule:'Personal, Zugang, Dokumente, Material und Verantwortung bereit',proof:'17/20 Readiness-Punkte' },
  { id:'HO-011',from:'field',to:'finance',object:'SR-027',rule:'Zeiten, Teile, Fotos und Abnahme vollständig',proof:'Wartungscheckliste 14/18' },
  { id:'HO-012',from:'facility',to:'hse',object:'FAC-031',rule:'Gefahrenstelle lokalisiert und abgesichert',proof:'QR-Ort + Foto + Zeitstempel' }
];

const messages = [
  { id:'MSG-101',roles:['sales','engineering','project','management'],object:'KD-2607-014 · G2',subject:'Lastannahme für Design Freeze fehlt',priority:'high',text:'Betreiberunterlage erneut angefordert. Terminwirkung wird bis 14:00 bewertet.' },
  { id:'MSG-102',roles:['workshop','quality','engineering','project'],object:'ABW-041',subject:'Prüfhalt am Schnittstellenmaß',priority:'high',text:'Bauteil bleibt gesperrt, bis technische Entscheidung und Nachweis vorliegen.' },
  { id:'MSG-103',roles:['hse','hr','field','project'],object:'MT-2607-014',subject:'Offshore-Zugang des Montageteams',priority:'high',text:'Einsatz bleibt blockiert, bis Qualifikation und Rettungskonzept vollständig sind.' },
  { id:'MSG-104',roles:['field','finance','project','purchasing'],object:'SR-027',subject:'Wartung und Ersatzteilbedarf',priority:'medium',text:'Ersatzteilposition wird nach technischer Prüfung zur Bestellung vorgeschlagen.' },
  { id:'MSG-105',roles:['facility','hse','it'],object:'FAC-031',subject:'Leckage im Werkstatt-Nebenraum',priority:'high',text:'Bereich markiert, Foto angehängt und Sicherheitsaufgabe erzeugt.' },
  { id:'MSG-106',roles:['it','field','project'],object:'SYNC-MT-014',subject:'Offline-Einsatzpaket wartet auf Freigabe',priority:'medium',text:'Noch keine nicht freigegebenen Revisionen auf dem Gerät gespeichert.' }
];

const processStages = [
  ['1','Anfrage','Technische Randbedingungen und Einsatzort'],
  ['2','Technische Klärung','Machbarkeit und Schnittstellen'],
  ['3','Angebot','Freigegebene Leistungsgrenze'],
  ['4','Konstruktion','Inventor/Vault Revision und ECO'],
  ['5','Einkauf','Bestellung und Liefertermin'],
  ['6','Fertigung','Arbeitsplan, Material und Prüfhaltepunkt'],
  ['7','Qualität','Prüfung, Abweichung und Freigabe'],
  ['8','Logistik & Montage','Readiness, Versand und Abnahme'],
  ['9','Anlagenakte','Konfiguration und Nachweise'],
  ['10','Service','Wartung, Prüfung und Lebenszyklus']
];

const sources = [
  { name:'Firmen OS',owner:'Prozess und Nachweis',detail:'Aufgaben, Freigaben, Übergaben, Nachrichten, Evidence und Audit.',key:'workflow' },
  { name:'Autodesk Inventor/Vault (simuliert)',owner:'Engineering',detail:'CAD-Datei, Revision, Lifecycle, ECO und technische Dokumente.',key:'cad-pdm' },
  { name:'ERP (simuliert)',owner:'Kaufmännisch / Produktion',detail:'Artikel, Bestellung, Lager, Fertigungsauftrag, Leistung und Rechnung.',key:'erp' },
  { name:'Microsoft 365 (simuliert)',owner:'Kommunikation',detail:'E-Mail, Kalender, Besprechung, Dokumentzusammenarbeit und Identität.',key:'m365' },
  { name:'Firmen OS Mobile',owner:'Vor-Ort-Arbeit',detail:'Scanner, Fotos, Messwerte, Checklisten und Offline-Warteschlange.',key:'mobile' },
  { name:'Integration Hub',owner:'Kontrollierter Datenaustausch',detail:'Import, Mapping, Provenance, Konflikte, Outbox und Reconciliation.',key:'integration' }
];

let activeRole = localStorage.getItem('fos-demo-role') || 'workshop';
let activeDay = localStorage.getItem('fos-demo-day') || days[0].id;
let activeView = 'work';
let deferredInstallPrompt = null;

const roleSelect = document.getElementById('role-select');
const daySelect = document.getElementById('day-select');
const content = document.getElementById('content');
const nav = document.getElementById('role-nav');
const title = document.getElementById('page-title');
const breadcrumb = document.getElementById('breadcrumb');
const sidebar = document.getElementById('sidebar');
const installButton = document.getElementById('install-button');

function currentRole(){ return roles.find((role) => role.id === activeRole) || roles[0]; }
function roleLabel(id){ return roles.find((role) => role.id === id)?.label || id; }
function dayLabel(id){ return days.find((day) => day.id === id)?.label || id; }
function esc(value){ return String(value).replace(/[&<>'"]/g,(char)=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char])); }
function pill(text, kind){ return `<span class="pill ${kind}">${esc(text)}</span>`; }

function initialize(){
  roleSelect.innerHTML = roles.map((role)=>`<option value="${role.id}">${role.label}</option>`).join('');
  daySelect.innerHTML = days.map((day)=>`<option value="${day.id}">${day.label}</option>`).join('');
  roleSelect.value = activeRole;
  daySelect.value = activeDay;
  renderNavigation();
  render();
}

function renderNavigation(){
  const role = currentRole();
  nav.className = 'role-nav';
  if(!role.allowed.includes(activeView)) activeView = 'work';
  nav.innerHTML = role.allowed.map((view)=>`<button data-view="${view}" class="${view===activeView?'active':''}"><span>${viewCatalog[view].icon}</span>${viewCatalog[view].label}</button>`).join('');
  nav.querySelectorAll('button').forEach((button)=>button.addEventListener('click',()=>{
    activeView = button.dataset.view;
    renderNavigation();
    render();
    sidebar.classList.remove('open');
  }));
}

function render(){
  const role = currentRole();
  title.textContent = viewCatalog[activeView].label;
  breadcrumb.textContent = `Firmen OS / ${role.label} / ${viewCatalog[activeView].label}`;
  if(activeView==='work') content.innerHTML = renderWork(role);
  if(activeView==='messages') content.innerHTML = renderMessages(role);
  if(activeView==='handoffs') content.innerHTML = renderHandoffs(role);
  if(activeView==='project') content.innerHTML = renderProject(role);
  if(activeView==='sources') content.innerHTML = renderSources(role);
  if(activeView==='submission') content.innerHTML = renderSubmission();
  bindContentActions();
}

function renderWork(role){
  const items = workItems.filter((item)=>item.role===role.id && item.day===activeDay);
  const blocked = items.filter((item)=>item.status==='blocked').length;
  const running = items.filter((item)=>item.status==='running').length;
  const relevantHandoffs = handoffs.filter((item)=>item.from===role.id || item.to===role.id).length;
  const focus = items.find((item)=>item.priority==='high') || items[0];
  return `
    <div class="hero-grid">
      <article class="hero-card">
        <span class="eyebrow">DEIN ARBEITSRAUM · ${esc(role.device)}</span>
        <h2>${esc(role.label)}: nur Aufgaben, Informationen und Entscheidungen für deine Rolle.</h2>
        <p><strong>Du darfst:</strong> ${esc(role.rights)}<br><strong>Bewusst verborgen:</strong> ${esc(role.hidden)}</p>
        <div class="hero-actions">
          <button class="primary" data-go="messages">Objekt-Nachrichten prüfen</button>
          ${role.allowed.includes('handoffs')?'<button class="secondary" data-go="handoffs">Übergaben öffnen</button>':''}
        </div>
      </article>
      <article class="panel focus-card">
        <span class="eyebrow">NÄCHSTER RELEVANTER VORGANG</span>
        ${focus?`<h3>${esc(focus.id)} · ${esc(focus.title)}</h3><p>${esc(focus.next)}</p><small>${esc(focus.object)} · ${esc(focus.project)}</small>`:'<h3>Keine Aufgabe für diesen Tag</h3><p>Die Rolle hat in der synthetischen Simulation an diesem Tag keinen offenen Vorgang.</p>'}
      </article>
    </div>
    <div class="metrics">
      <article class="metric"><span>Deine Vorgänge</span><strong>${items.length}</strong><small>${dayLabel(activeDay)}</small></article>
      <article class="metric"><span>Blockiert</span><strong>${blocked}</strong><small>Stop-Regel aktiv</small></article>
      <article class="metric"><span>In Arbeit</span><strong>${running}</strong><small>mit Nachweis</small></article>
      <article class="metric"><span>Übergaben</span><strong>${relevantHandoffs}</strong><small>rollenbezogen</small></article>
    </div>
    <article class="panel">
      <div class="panel-head"><h3>Meine Arbeit am ${dayLabel(activeDay)}</h3><span>${items.length} synthetische Vorgänge</span></div>
      <div class="work-list">${items.length?items.map(renderWorkCard).join(''):'<div class="empty">Keine Aufgabe für diese Rolle an diesem Betriebstag. Das ist Absicht, nicht ein kaputtes Dashboard.</div>'}</div>
    </article>`;
}

function renderWorkCard(item){
  const statusMap={open:'status-open',running:'status-running',waiting:'status-waiting',blocked:'status-blocked',done:'status-done'};
  const priorityMap={high:'priority-high',medium:'priority-medium',low:'priority-low'};
  return `<article class="work-card">
    <div class="work-top"><div>${pill(item.priority,priorityMap[item.priority])} ${pill(item.status,statusMap[item.status])}</div><strong>${esc(item.time)}</strong></div>
    <h3>${esc(item.id)} · ${esc(item.title)}</h3><p>${esc(item.object)} · ${esc(item.project)}</p>
    <div class="work-meta">
      <div><span>Nächste Aktion</span><strong>${esc(item.next)}</strong></div>
      <div><span>Nachweis</span><strong>${esc(item.evidence)}</strong></div>
      <div><span>Übergabe</span><strong>${esc(item.handoff)}</strong></div>
      <div><span>Capability</span><strong>${esc(item.capability)}</strong></div>
    </div>
    <div class="meta-row"><small>Quelle: ${esc(item.source)}</small><small>synthetisch</small></div>
  </article>`;
}

function renderMessages(role){
  const visible = messages.filter((message)=>message.roles.includes(role.id));
  return `<div class="two-col"><article class="panel"><div class="panel-head"><h3>Objektgebundene Nachrichten</h3><span>${visible.length} sichtbar</span></div><div class="message-list">${visible.length?visible.map((m)=>`<div class="message"><div class="work-top"><strong>${esc(m.id)} · ${esc(m.subject)}</strong>${pill(m.priority,m.priority==='high'?'priority-high':'priority-medium')}</div><small>${esc(m.object)}</small><p>${esc(m.text)}</p></div>`).join(''):'<div class="empty">Keine sichtbaren Threads für diese Rolle.</div>'}</div></article><article class="panel"><div class="panel-head"><h3>Messenger-Regeln</h3></div><ol class="rule-list"><li>Jede Nachricht gehört zu Projekt, Auftrag, Bauteil, Abweichung, Einsatz, Asset oder Standort.</li><li>Ein loses „OK“ ist keine technische oder kaufmännische Freigabe.</li><li>Nachrichten können Aufgaben, Entscheidungen oder Abweichungen erzeugen.</li><li>Externe Teilnehmer sehen nur ausdrücklich freigegebene Threads.</li><li>Produktiv erzwingt der Server Sichtbarkeit und Rechte, nicht die Oberfläche.</li></ol></article></div>`;
}

function renderHandoffs(role){
  const visible = handoffs.filter((item)=>item.from===role.id || item.to===role.id);
  return `<article class="panel"><div class="panel-head"><h3>Kontrollierte Abteilungsübergaben</h3><span>${visible.length} für ${esc(role.label)}</span></div><div class="handoff-list">${visible.map((item)=>`<article class="handoff-card"><div class="handoff-top"><strong>${esc(item.id)} · ${esc(item.object)}</strong>${pill(item.from===role.id?'abgeben':'übernehmen',item.from===role.id?'priority-medium':'status-running')}</div><h3>${esc(roleLabel(item.from))} → ${esc(roleLabel(item.to))}</h3><p><strong>Regel:</strong> ${esc(item.rule)}<br><strong>Nachweis:</strong> ${esc(item.proof)}</p></article>`).join('') || '<div class="empty">Keine Übergabe für diese Rolle.</div>'}</div></article>`;
}

function renderProject(role){
  return `<div class="two-col"><article class="panel"><div class="panel-head"><h3>Referenzprojekt KD-2607-014</h3><span>synthetisch</span></div><div class="timeline">${processStages.map(([num,label,proof])=>`<div class="timeline-step"><b>${num}</b><div><strong>${esc(label)}</strong><small>${esc(proof)}</small></div><span>${num<4?pill('belegt','status-done'):num==='4'?pill('läuft','status-running'):pill('wartet','status-waiting')}</span></div>`).join('')}</div></article><article class="panel"><div class="panel-head"><h3>Projekt-Gates</h3></div><ol class="rule-list"><li>Kein Angebot ohne technische Mindestklärung.</li><li>Keine Fertigung ohne gültige Revision und Design Freeze.</li><li>Kein nächster Arbeitsgang bei offenem Prüfhaltepunkt.</li><li>Keine Montage ohne Personal-, Sicherheits-, Dokument- und Materialreife.</li><li>Abnahme erzeugt Anlagenakte und Serviceplanung.</li></ol><p class="open-proof">Rolle ${esc(role.label)} sieht nur den fachlich benötigten Ausschnitt.</p></article></div>`;
}

function renderSources(){
  return `<article class="panel"><div class="panel-head"><h3>System-of-Record und Integrationsgrenzen</h3><span>alle Anbindungen simuliert</span></div><div class="source-grid">${sources.map((source)=>`<article class="source-card"><span class="eyebrow">${esc(source.owner)}</span><h3>${esc(source.name)}</h3><p>${esc(source.detail)}</p><code>${esc(source.key)}</code></article>`).join('')}</div><div class="safety-banner"><strong>Integrationsregel:</strong> Inventor/Vault, ERP und Microsoft 365 bleiben zunächst führende Fachsysteme. Firmen OS importiert, verknüpft, orchestriert und ersetzt Daten nur nach Vorschau, Mapping, Konfliktprüfung, Freigabe und Rücksetzpunkt.</div></article>`;
}

function renderSubmission(){
  return `<article class="panel"><div class="panel-head"><h3>Abgabe- und Beweisstand</h3><span>11. Juli 2026</span></div><div class="submission-grid"><div class="submission-card"><h3>Belegt</h3><p class="proof">5 Tage · 15 Rollen · 30 Vorgänge · 12 Übergaben · rollen-native Navigation · responsive PWA-Schale · Offline-Fallback.</p></div><div class="submission-card"><h3>Technisch geprüft</h3><p class="proof">Lint, TypeScript, Strukturvertrag, Demo-Vertrag, Isolation, RLS-Vertrag, Rollbackvertrag, Datenbank-Preflight und Produktions-Build.</p></div><div class="submission-card"><h3>Bewusst offen</h3><p class="open-proof">Keine Autorisierung durch Gebr. Käufer, keine echten Fachsystemzugänge, keine realen Mitarbeiterrechte, keine produktiven Unternehmensdaten.</p></div></div><div class="two-col" style="margin-top:14px"><article class="panel"><div class="panel-head"><h3>Abgabeumfang</h3></div><ol class="rule-list"><li>Öffentliche HTTPS-Demo mit synthetischen Daten.</li><li>Installierbare PWA-Schale für Desktop, Tablet und Smartphone.</li><li>Fünf-Tage-Betriebssimulation statt universellem Dashboard.</li><li>Klare Systemquellen, Rechte- und Übergabegrenzen.</li><li>Versionierte Evidence im privaten Entwicklungsrepository.</li></ol></article><article class="panel"><div class="panel-head"><h3>Haftung und Einordnung</h3></div><p>Dieser Prototyp ist eine unabhängige Branchenstudie. Er behauptet weder Zusammenarbeit, Beauftragung noch Freigabe durch Gebr. Käufer. Öffentliche Unternehmensmerkmale wurden ausschließlich zur fachlichen Modellierung verwendet; sämtliche konkreten Geschäftsvorgänge sind erfunden.</p></article></div></article>`;
}

function bindContentActions(){
  content.querySelectorAll('[data-go]').forEach((button)=>button.addEventListener('click',()=>{
    const target=button.dataset.go;
    if(currentRole().allowed.includes(target)){activeView=target;renderNavigation();render();}
  }));
}

roleSelect.addEventListener('change',(event)=>{
  activeRole=event.target.value;
  localStorage.setItem('fos-demo-role',activeRole);
  activeView='work';
  renderNavigation();render();
});
daySelect.addEventListener('change',(event)=>{
  activeDay=event.target.value;
  localStorage.setItem('fos-demo-day',activeDay);
  render();
});
document.getElementById('menu-button').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.getElementById('submission-button').addEventListener('click',()=>{
  activeView='submission';
  if(!currentRole().allowed.includes('submission')) activeRole='it';
  roleSelect.value=activeRole;
  renderNavigation();render();
});

function updateConnection(){
  const online=navigator.onLine;
  document.getElementById('connection-label').textContent=online?'online':'offline · Demo-Schale verfügbar';
  document.getElementById('connection-dot').classList.toggle('offline',!online);
}
window.addEventListener('online',updateConnection);
window.addEventListener('offline',updateConnection);
window.addEventListener('beforeinstallprompt',(event)=>{
  event.preventDefault();deferredInstallPrompt=event;installButton.hidden=false;
});
installButton.addEventListener('click',async()=>{
  if(!deferredInstallPrompt)return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;installButton.hidden=true;
});
window.addEventListener('appinstalled',()=>{installButton.hidden=true;deferredInstallPrompt=null;});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{}));}

updateConnection();
initialize();
