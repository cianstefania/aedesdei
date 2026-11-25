// Aedes Dei Academy · Venapunctie training. Content from the Cursusboek Venapunctie.
// Module: {id, t (title), s (subtitle), lessons:[{t, cards:[{h, b (html), img?}]}], quiz:[{q, a:[options], c: correct index, e: explanation}]}
window.COURSE = [
{ id:"m1", t:"De bloedsomloop", s:"Hart, bloedvaten en bloed", lessons:[
  { t:"Het systeem", cards:[
    { h:"Wat is de bloedsomloop?", b:"<p>De bloedsomloop is het systeem dat bloed door het hele lichaam laat circuleren. Het <b>hart</b> pompt het bloed via de <b>bloedvaten</b> naar de organen en weefsels.</p><p>De bloedsomloop bestaat uit het hart, de bloedvaten en het bloed.</p>", img:"circulatie.jpg" },
    { h:"Functies van het bloed", b:"<ul><li>Vervoeren van zuurstof en voedingsstoffen</li><li>Afvoeren van koolstofdioxide en afvalstoffen</li><li>Beschermen tegen ziekteverwekkers</li><li>Reguleren van de lichaamstemperatuur</li><li>Voorkomen van bloedverlies door bloedstolling</li></ul>" },
    { h:"Hoeveel bloed?", b:"<div class='stats'><div><b>7–8%</b><span>van het lichaamsgewicht</span></div><div><b>4–5 L</b><span>vrouw, gemiddeld</span></div><div><b>5–6 L</b><span>man, gemiddeld</span></div></div><p>De hoeveelheid hangt af van onder andere lichaamsgewicht, lengte en lichaamsbouw.</p>" }
  ]},
  { t:"Bloedvaten en samenstelling", cards:[
    { h:"Drie soorten bloedvaten", b:"<dl><dt>Slagaders (arteriën)</dt><dd>Vervoeren bloed van het hart af.</dd><dt>Aders (venen)</dt><dd>Vervoeren bloed terug naar het hart.</dd><dt>Haarvaten (capillairen)</dt><dd>Uitwisseling van zuurstof, voedingsstoffen en afvalstoffen met de weefsels.</dd></dl>" },
    { h:"Twee bloedsomlopen", b:"<p><b>Kleine bloedsomloop:</b> rechterharthelft → longen (zuurstof opnemen) → linkerharthelft.</p><p><b>Grote bloedsomloop:</b> linkerharthelft → lichaam → zuurstofarm terug in de rechterharthelft.</p>" },
    { h:"Waar bestaat bloed uit?", b:"<div class='stats'><div><b>± 55%</b><span>bloedplasma</span></div><div><b>± 45%</b><span>bloedcellen en bloedplaatjes</span></div></div><dl><dt>Rode bloedcellen</dt><dd>Vervoeren zuurstof met hemoglobine.</dd><dt>Witte bloedcellen</dt><dd>Beschermen tegen infecties.</dd><dt>Bloedplaatjes</dt><dd>Helpen bij de bloedstolling.</dd></dl>", img:"samenstelling.jpg" },
    { h:"Goed om te weten", b:"<p><b>Serum</b> is de vloeistof die overblijft nadat bloed is gestold en gecentrifugeerd. <b>Plasma</b> wordt verkregen uit bloed waarvan de stolling is geremd.</p><p>We prikken meestal in een <b>ader</b>: aders liggen relatief oppervlakkig en hebben een lagere druk dan slagaders.</p>" }
  ]}],
  quiz:[
    { q:"Welk bloedvat vervoert bloed terug naar het hart?", a:["Slagader","Ader","Haarvat"], c:1, e:"Aders (venen) vervoeren bloed terug naar het hart." },
    { q:"Hoeveel procent van het bloed is ongeveer plasma?", a:["35%","45%","55%","75%"], c:2, e:"Bloed bestaat voor ongeveer 55% uit plasma en 45% uit cellen en plaatjes." },
    { q:"Welke cellen vervoeren zuurstof?", a:["Rode bloedcellen","Witte bloedcellen","Bloedplaatjes"], c:0, e:"Rode bloedcellen vervoeren zuurstof met behulp van hemoglobine." },
    { q:"De kleine bloedsomloop loopt via…", a:["het hele lichaam","de longen","de nieren"], c:1, e:"De kleine bloedsomloop gaat van de rechterharthelft naar de longen en terug naar links." },
    { q:"Wat is serum?", a:["Bloed waarvan de stolling is geremd","Vloeistof na stolling en centrifugeren","Een soort witte bloedcel"], c:1, e:"Serum blijft over nadat bloed is gestold en gecentrifugeerd." },
    { q:"Waarom prikken we meestal in een ader?", a:["Aders bevatten meer bloed","Aders liggen oppervlakkig en hebben een lagere druk","Aders bevatten zuurstofrijk bloed"], c:1, e:"Aders liggen relatief oppervlakkig en de druk is lager dan in slagaders." }
  ]},
{ id:"m2", t:"Indicaties bloedonderzoek", s:"Waarom bloed wordt onderzocht", lessons:[
  { t:"Diagnose en verloop", cards:[
    { h:"Waarom bloedonderzoek?", b:"<p>Met bloedonderzoek kunnen artsen aandoeningen <b>opsporen, diagnosticeren, uitsluiten of controleren</b>, het effect van een behandeling volgen, risico’s vroeg herkennen en erfelijke aandoeningen onderzoeken.</p>" },
    { h:"Vaststellen of uitsluiten", b:"<dl><dt>Bloedarmoede</dt><dd>Hb, MCV, ferritine, vitamine B12</dd><dt>Diabetes mellitus</dt><dd>Glucose, HbA1c</dd><dt>Schildklier</dt><dd>TSH, vrij T4</dd><dt>Infecties</dt><dd>CRP, leukocyten</dd><dt>Nieren</dt><dd>Creatinine, eGFR</dd><dt>Lever</dt><dd>ALAT, ASAT, AF, GGT, bilirubine</dd><dt>Hartschade</dt><dd>Troponine</dd></dl>" },
    { h:"Verloop en behandeling", b:"<p>Bij chronische ziekten wordt regelmatig bloed afgenomen: <b>HbA1c</b> bij diabetes, <b>eGFR</b> bij nierziekte, <b>TSH</b> bij schildklieraandoeningen.</p><p>Ook het effect van een behandeling wordt gevolgd, zoals de <b>INR</b> bij bloedverdunners en het bloedbeeld bij chemotherapie.</p>" }
  ]},
  { t:"Preventie, erfelijkheid en NIPT", cards:[
    { h:"Preventief onderzoek", b:"<p>Risicofactoren herkennen vóór er klachten zijn: cholesterol (hart- en vaatziekten), HbA1c en glucose (diabetes), eGFR (nierfunctie), Lp(a), ferritine en het bloedbeeld.</p>" },
    { h:"Erfelijke aandoeningen", b:"<p>Bijvoorbeeld sikkelcelziekte, thalassemie, hemofilie, cystische fibrose, de ziekte van Huntington en erfelijke aanleg voor borst- en eierstokkanker (BRCA1/BRCA2).</p><p class='note'>Een gewone bloedtelling is niet hetzelfde als DNA-onderzoek: daarvoor wordt gericht onderzoek aangevraagd.</p>" },
    { h:"Vruchtbaarheid en NIPT", b:"<p>Hormonen zoals FSH, LH, oestradiol, progesteron, AMH, prolactine, testosteron en TSH helpen bij vruchtbaarheidsonderzoek.</p><p>De <b>NIPT</b> is in Nederland mogelijk vanaf <b>10 weken</b> zwangerschap en screent op trisomie 21, 18 en 13. Het is een screening, geen definitieve diagnose.</p>" },
    { h:"De aanvraag", b:"<p>Een aanvraag komt van een arts, verpleegkundige of andere <b>gemachtigde zorgverlener</b>, bijvoorbeeld een verloskundige: digitaal of via een papieren labformulier.</p>" }
  ]}],
  quiz:[
    { q:"Welke bepaling hoort bij het controleren van diabetes?", a:["TSH","HbA1c","Troponine"], c:1, e:"HbA1c en glucose worden gebruikt bij diabetes." },
    { q:"Welke waarde volg je bij bloedverdunners zoals acenocoumarol?", a:["INR","CRP","Ferritine"], c:0, e:"De INR wordt gebruikt bij bepaalde antistollingsmiddelen." },
    { q:"Vanaf hoeveel weken zwangerschap is de NIPT mogelijk in Nederland?", a:["6 weken","10 weken","20 weken"], c:1, e:"De NIPT is mogelijk vanaf 10 weken zwangerschap." },
    { q:"Wat is de NIPT?", a:["Een definitieve diagnose","Een screeningstest","Een vruchtwaterpunctie"], c:1, e:"De NIPT is een screeningstest; bij een afwijkende uitslag volgt vervolgonderzoek." },
    { q:"Welke bepaling wijst op hartschade?", a:["Troponine","eGFR","LDL"], c:0, e:"Troponine wordt onderzocht bij hartschade, zoals een hartinfarct." },
    { q:"Wie mag bloedonderzoek aanvragen?", a:["Iedere zorgvrager zelf","Een gemachtigde zorgverlener","Alleen het laboratorium"], c:1, e:"Een arts, verpleegkundige of andere gemachtigde zorgverlener, bijv. een verloskundige." }
  ]},
{ id:"m3", t:"Soorten bloedonderzoek", s:"Buizen, methoden en uitslagen", lessons:[
  { t:"Onderzoek en de juiste buis", cards:[
    { h:"Buiskleuren", b:"<ul class='tubes'><li><i style='background:#3F8E5B'></i><b>Groen / geel</b> klinische chemie: nier, lever. <b>Grijs</b> (NaF): glucose</li><li><i style='background:#7A55A8'></i><b>Paars (EDTA)</b> hematologie: bloedbeeld, en DNA-diagnostiek</li><li><i style='background:#7DB7E2'></i><b>Lichtblauw (citraat)</b> stolling: INR, APTT, PT</li><li><i style='background:#E79CBC'></i><b>Roze of paars</b> bloedgroep en transfusie</li><li><i style='background:#E2B43A'></i><b>Geel (serum)</b> immunologie: ANA, IgE, antistoffen</li></ul>" },
    { h:"Veneus of capillair", b:"<p><b>Veneus:</b> uit een ader, meestal in de elleboogplooi, met naald en afnamesysteem. Grotere hoeveelheid, meerdere buizen.</p><p><b>Capillair:</b> een prikje met een lancet in de vingertop, bij pasgeborenen de zijkant van de hiel, soms de oorlel. Voor kleine hoeveelheden.</p>", img:"capillair.jpg" },
    { h:"Wat kan capillair?", b:"<p><b>Wel:</b> glucose, Hb, CRP, HbA1c, cholesterol, triglyceriden, INR-sneltest.</p><p><b>Niet standaard:</b> bloedkweken, APTT, PT/INR (laboratorium), BSE, kruisproef, uitgebreid hormoononderzoek.</p>" }
  ]},
  { t:"Bloedgas, kweken en uitslagen", cards:[
    { h:"Arterieel bloedgas (ABG)", b:"<p>Bloed uit een <b>slagader</b>, meestal de polsslagader (a. radialis). Meet pO₂, pCO₂, pH en bicarbonaat. Uitslag binnen enkele minuten. Alleen door een arts of bevoegde, bekwame gespecialiseerde zorgverlener.</p>" },
    { h:"Bloedkweken", b:"<p>Bij verdenking op sepsis: veneus bloed in een <b>aerobe en een anaerobe</b> fles. Een eerste positieve melding volgt soms binnen 24–48 uur; definitief negatief meestal na ongeveer <b>5 dagen</b>.</p>" },
    { h:"Betrouwbare uitslagen", b:"<p>Houd het bloed zo ‘zuiver’ mogelijk. Werk zoveel mogelijk met <b>gesloten systemen</b>, zodat de kans op vervuiling uit de omgeving zo klein mogelijk is.</p>" }
  ]}],
  quiz:[
    { q:"Welke dopkleur hoort bij stollingsonderzoek (INR, APTT)?", a:["Paars","Lichtblauw","Geel"], c:1, e:"Lichtblauw: natriumcitraat, voor stollingsonderzoek." },
    { q:"Welke buis gebruik je voor een bloedbeeld?", a:["Paars (EDTA)","Grijs (NaF)","Groen"], c:0, e:"Hematologisch onderzoek gaat in de paarse EDTA-buis." },
    { q:"Waar prik je capillair bij een pasgeborene?", a:["Vingertop","Oorlel","Zijkant van de hiel"], c:2, e:"Bij pasgeborenen via de zijkant van de hiel." },
    { q:"Welke bepaling kan níet standaard capillair?", a:["Glucose","Bloedkweek","CRP"], c:1, e:"Bloedkweken worden niet capillair afgenomen." },
    { q:"Waar wordt een arterieel bloedgas meestal afgenomen?", a:["Elleboogplooi","Polsslagader","Vingertop"], c:1, e:"Meestal de arteria radialis (polsslagader)." },
    { q:"Hoe lang duurt een definitief negatieve bloedkweek meestal?", a:["24 uur","2 dagen","Ongeveer 5 dagen"], c:2, e:"Meestal ongeveer 5 dagen, afhankelijk van het protocol." },
    { q:"Grijze dop (natriumfluoride) gebruik je vooral voor…", a:["Glucose","Bloedgroep","DNA"], c:0, e:"NaF remt de afbraak van glucose." }
  ]},
{ id:"m4", t:"Venapunctie", s:"Bevoegdheid en indicatie", lessons:[
  { t:"Mag jij prikken?", cards:[
    { h:"Een voorbehouden handeling", b:"<p>Venapunctie is een <b>voorbehouden handeling</b> volgens de Wet BIG. Je moet <b>bevoegd én aantoonbaar bekwaam</b> zijn.</p><p>Niet-zelfstandig bevoegd? Dan heb je een opdracht nodig van een zelfstandig bevoegde zorgverlener.</p>", img:"venapunctie.jpg" },
    { h:"Wat je moet kennen", b:"<ul><li>De juiste techniek</li><li>De hygiënevoorschriften</li><li>Het handelen bij complicaties</li><li>Aanvullende eisen en protocollen van je zorginstelling</li></ul>" },
    { h:"Zorgvuldig afnemen", b:"<ul><li>Controleer altijd de aanvraag en de identiteit</li><li>Neem alleen de benodigde hoeveelheid bloed af</li><li>Gebruik bij kinderen en kwetsbare patiënten zo mogelijk kleinere buizen</li><li>Voorkom onnodige herhaalde afnames (risico op anemie)</li><li>Controleer of een nabepaling op eerder afgenomen bloed mogelijk is</li></ul>" }
  ]}],
  quiz:[
    { q:"Venapunctie is volgens de Wet BIG een…", a:["vrije handeling","voorbehouden handeling","handeling alleen voor artsen"], c:1, e:"Het is een voorbehouden handeling." },
    { q:"Wat heb je nodig als je niet-zelfstandig bevoegd bent?", a:["Een opdracht van een zelfstandig bevoegde zorgverlener","Toestemming van het laboratorium","Niets extra"], c:0, e:"Een opdracht van een zelfstandig bevoegde zorgverlener." },
    { q:"Waarom voorkom je onnodig herhaalde bloedafnames?", a:["Vanwege het risico op anemie","Omdat buizen duur zijn","Omdat de uitslag anders verandert"], c:0, e:"Herhaalde afnames verhogen het risico op anemie." },
    { q:"Wat controleer je altijd vóór een venapunctie?", a:["Alleen de buizen","De aanvraag en de identiteit","De bloedgroep"], c:1, e:"Controleer altijd de aanvraag en de identiteit van de patiënt." }
  ]},
{ id:"m5", t:"Materialen", s:"Systemen, buizen en benodigdheden", lessons:[
  { t:"Open en gesloten", cards:[
    { h:"Open systeem", b:"<p>Bloed wordt met een <b>spuit en naald</b> afgenomen en daarna overgebracht naar de buizen. Risico’s: bloedcontact, contaminatie, prikaccident, hemolyse en stolsels.</p><p class='note'>Handmatig inspuiten met een naald in een buis is niet aanbevolen: gebruik een gesloten transferhulpmiddel.</p>" },
    { h:"Gesloten systeem", b:"<p>Het vacuüm- of Vacutainer-systeem. Het bloed stroomt <b>direct</b> uit de ader in de vacuümbuis, zonder contact met de buitenlucht. De voorkeur bij routinebloedafname (ook van de WHO).</p><p>Onderdelen: <b>dubbelzijdige naald</b>, <b>naaldhouder</b> en <b>vacuümbuis</b>.</p>", img:"vacutainer.jpg" },
    { h:"Rechte naald of butterfly", b:"<p>De <b>rechte naald</b> met houder past bij de meeste routineafnames. De <b>butterfly</b> (vleugelnaald met slangetje) is handig bij kleine of moeilijk bereikbare aderen.</p>", img:"butterfly.jpg" }
  ]},
  { t:"Buizen en benodigdheden", cards:[
    { h:"Additieven", b:"<dl><dt>Stollingsremmers</dt><dd>EDTA, citraat, heparine</dd><dt>Stollingsactivatoren</dt><dd>Voor het verkrijgen van serum</dd><dt>Glycolyseremmers</dt><dd>Remmen de afbraak van glucose</dd></dl>" },
    { h:"Volgorde van afname", b:"<p>Houd de volgorde aan (<i>order of draw</i>), zodat additieven niet in de volgende buis terechtkomen en de uitslag beïnvloeden.</p>", img:"volgorde.jpg" },
    { h:"Let op bij een gesloten systeem", b:"<ul><li>Houdbaarheidsdatum en juiste buis controleren</li><li>Buizen voldoende vullen, vooral citraatbuizen</li><li>Rustig omkeren volgens de fabrikant, niet schudden</li><li>Veiligheidsnaald direct in de naaldencontainer</li></ul>" },
    { h:"Benodigdheden", b:"<p>Gesloten afnamesysteem, buizen/kweekflesjes en etiketten, chloorhexidine-alcohol 70%, gaasjes, stuwband, hypoallergene pleister, onderlegger, naaldencontainer, afvalbak en materiaal voor een drukverband.</p>", img:"benodigdheden.jpg" }
  ]}],
  quiz:[
    { q:"Wat is het belangrijkste kenmerk van een gesloten systeem?", a:["Bloed gaat eerst in een spuit","Bloed stroomt direct in de vacuümbuis","Er is geen naald nodig"], c:1, e:"Bij het gesloten systeem stroomt het bloed direct in de vacuümbuis." },
    { q:"Welk risico hoort bij het open systeem?", a:["Hemolyse door te veel druk","Te veel vacuüm","Geen enkel risico"], c:0, e:"Door te veel druk kunnen rode bloedcellen beschadigen (hemolyse)." },
    { q:"Wanneer is een butterfly handig?", a:["Bij grote, goed zichtbare aderen","Bij kleine of moeilijk bereikbare aderen","Alleen bij bloedkweken"], c:1, e:"De vleugelnaald is handig bij kleine of moeilijk bereikbare aderen." },
    { q:"Hoe meng je een buis met additief?", a:["Krachtig schudden","Rustig omkeren volgens de fabrikant","Niet mengen"], c:1, e:"Rustig omkeren, niet schudden." },
    { q:"Waarom houd je de volgorde van afname aan?", a:["Om versleping van additieven te voorkomen","Omdat de laatste buis altijd vol moet","Voor de administratie"], c:0, e:"Zo komen additieven niet in de volgende buis terecht." },
    { q:"Welke buizen moeten vooral goed gevuld zijn?", a:["Citraatbuizen","Serumbuizen","EDTA-buizen"], c:0, e:"Citraatbuizen voor stollingsonderzoek moeten voldoende gevuld zijn." },
    { q:"Wat is een stollingsremmer?", a:["EDTA","Een glycolyseremmer","Serum"], c:0, e:"EDTA, citraat en heparine zijn stollingsremmers." }
  ]},
{ id:"m6", t:"Voorbereiding", s:"Tien stappen vóór het aanprikken", lessons:[
  { t:"De tien stappen", cards:[
    { h:"Stap 1–4", b:"<ol><li><b>Rustige, veilige omgeving</b>: licht, privacy, schone werkplek.</li><li><b>Aanvraag controleren</b>: welke onderzoeken en buizen?</li><li><b>Identificeren</b>: laat de zorgvrager zelf naam en geboortedatum noemen en vergelijk.</li><li><b>Informeren</b>: uitleggen, toestemming, vragen naar flauwvallen.</li></ol>" },
    { h:"Stap 5–7", b:"<ol start='5'><li><b>Comfortabele houding</b>: zittend met ondersteunde arm, of liggend bij flauwvalrisico.</li><li><b>Materialen klaarleggen</b>: houdbaarheid, intacte verpakking, juiste buizen.</li><li><b>Handhygiëne</b> en wegwerphandschoenen.</li></ol>" },
    { h:"Stap 8–10", b:"<ol start='8'><li><b>Desinfectiemateriaal</b> voorbereiden.</li><li><b>Veiligheidsnaald</b> in de houder; beschermkap blijft zitten tot het aanprikken.</li><li><b>Etiketten en buizen</b> controleren; etiketteer direct na afname bij de zorgvrager.</li></ol>" }
  ]}],
  quiz:[
    { q:"Hoe identificeer je de zorgvrager?", a:["Je leest de naam voor en vraagt of het klopt","De zorgvrager noemt zelf naam en geboortedatum","Je kijkt alleen naar het etiket"], c:1, e:"Laat de zorgvrager zelf de volledige naam en geboortedatum noemen." },
    { q:"Welke houding kies je bij een verhoogd risico op flauwvallen?", a:["Staand","Zittend zonder steun","Liggend"], c:2, e:"Liggend bij een verhoogd risico op flauwvallen." },
    { q:"Wanneer etiketteer je de buizen?", a:["Direct na afname bij de zorgvrager","Aan het einde van de dag","Voor de afname, alvast in de kast"], c:0, e:"Direct na afname, bij de zorgvrager." },
    { q:"Wanneer haal je de beschermkap van de naald?", a:["Bij het klaarleggen","Op het moment van aanprikken","Na het desinfecteren van je handen"], c:1, e:"De beschermkap blijft zitten tot het aanprikken." }
  ]},
{ id:"m7", t:"Plaatsbepaling", s:"De juiste ader kiezen", lessons:[
  { t:"Arm, stuwband en ader", cards:[
    { h:"Arm en stuwband", b:"<p>Laat de arm ontspannen en licht naar beneden hangen, goed ondersteund.</p><div class='stats'><div><b>7–10 cm</b><span>stuwband boven de punctieplaats</span></div><div><b>≤ 1 min</b><span>stuwen</span></div></div>" },
    { h:"Palperen en kiezen", b:"<p>Voel met <b>wijs- en middelvinger</b>: ligging, dikte, elasticiteit en verloop.</p><p>De <b>vena mediana cubiti</b> in de elleboogplooi heeft meestal de voorkeur. Vermijd blauwe plekken, zwellingen, ontstekingen en beschadigde huid.</p>" },
    { h:"Desinfecteren", b:"<p>Desinfecteer volgens protocol en laat <b>volledig drogen</b>. Raak de huid daarna niet opnieuw aan, tenzij aseptisch. Bij bloedkweken werk je extra aseptisch en desinfecteer je ook de doppen van de flesjes.</p><p class='note'>Laat de zorgvrager niet herhaaldelijk krachtig een vuist maken of pompen: dit beïnvloedt bloedwaarden.</p>" }
  ]}],
  quiz:[
    { q:"Hoeveel cm boven de punctieplaats breng je de stuwband aan?", a:["2–3 cm","7–10 cm","15–20 cm"], c:1, e:"Ongeveer 7–10 cm boven de punctieplaats." },
    { q:"Hoe lang stuw je bij voorkeur maximaal?", a:["1 minuut","3 minuten","5 minuten"], c:0, e:"Bij voorkeur maximaal 1 minuut." },
    { q:"Welke ader heeft meestal de voorkeur?", a:["Vena mediana cubiti","Arteria radialis","Een ader in de hand"], c:0, e:"De vena mediana cubiti in de elleboogplooi." },
    { q:"Waarom laat je niet herhaaldelijk vuistpompen?", a:["Het is pijnlijk","Het kan bloedwaarden beïnvloeden","De ader rolt dan weg"], c:1, e:"Pompen kan bepaalde bloedwaarden beïnvloeden." },
    { q:"Wat doe je na het desinfecteren?", a:["Direct prikken terwijl het nat is","Volledig laten drogen","Nog even palperen met je vinger"], c:1, e:"Laat volledig drogen en raak de huid niet opnieuw aan." }
  ]},
{ id:"m8", t:"Uitvoering", s:"De afname, stap voor stap", lessons:[
  { t:"Aanprikken en vullen", cards:[
    { h:"Aanprikken", b:"<ol><li>Naald tussen duim en wijsvinger, <b>bevel naar boven</b>.</li><li>Fixeer de ader: trek de huid ongeveer <b>3–5 cm</b> onder de punctieplaats licht strak.</li><li>Prik aan onder een hoek van ongeveer <b>15–30 graden</b>.</li></ol>" },
    { h:"Buizen vullen", b:"<ol start='4'><li>Fixeer de houder en plaats de buis, zodat de dop wordt doorprikt.</li><li>Vul de buizen in de <b>juiste volgorde</b>; het vacuüm doet het werk.</li><li>Maak de <b>stuwband los</b> zodra het bloed goed stroomt.</li><li>Meng de buizen rustig door omkeren.</li></ol>" },
    { h:"Afronden", b:"<ol start='8'><li>Eerst de laatste buis eruit, dan de naald. <b>Activeer direct het veiligheidsmechanisme</b> en gooi de naald in de naaldencontainer.</li><li>Druk af met een schoon gaasje <b>zonder de arm te buigen</b>; daarna een pleister.</li></ol>" }
  ]}],
  quiz:[
    { q:"Onder welke hoek prik je de ader aan?", a:["5–10 graden","15–30 graden","45–60 graden"], c:1, e:"Ongeveer 15–30 graden." },
    { q:"Hoe houd je de naald vast?", a:["Bevel naar boven","Bevel naar beneden","Maakt niet uit"], c:0, e:"Met de naaldopening (bevel) naar boven." },
    { q:"Wanneer maak je de stuwband los?", a:["Pas na het verwijderen van de naald","Zodra het bloed goed stroomt","Vóór het aanprikken"], c:1, e:"Zodra de bloedstroom goed op gang is." },
    { q:"Wat verwijder je eerst bij het afronden?", a:["De naald","De laatste buis","De stuwband en dan de naald tegelijk"], c:1, e:"Eerst de laatste buis, daarna de naald." },
    { q:"Hoe druk je de punctieplaats af?", a:["Met gebogen arm","Zonder de arm te buigen","Niet nodig, direct een pleister"], c:1, e:"Afdrukken zonder de arm te buigen." }
  ]},
{ id:"m9", t:"Aandachtspunten", s:"Prikplaatsen en veiligheid", lessons:[
  { t:"Waar prik je niet?", cards:[
    { h:"Vermijden of eerst beoordelen", b:"<ul><li>Arm na borstamputatie met okselklierverwijdering (lymfoedeem; volg protocol)</li><li>Littekens</li><li>Blauwe plekken (hematomen)</li><li>Oedeem</li><li>Arm met een infuus</li><li>Brandwonden</li><li>Arm met een dialyseshunt</li><li>Ontstoken of geïnfecteerde huid</li><li>Arm aan de verlamde zijde</li></ul>" },
    { h:"Tijdens en na de afname", b:"<dl><dt>Prikpogingen</dt><dd>Maximaal 2 per zorgverlener, daarna een ervaren collega.</dd><dt>Cytostatica</dt><dd>Extra voorzichtig; volg het veiligheidsprotocol.</dd><dt>Stolling</dt><dd>Bij antistolling langer afdrukken.</dd><dt>Bloedkweken</dt><dd>Vóór de overige buizen afnemen.</dd><dt>Naald</dt><dd>Beschermkap nooit terugplaatsen.</dd></dl>" }
  ]},
  { t:"Noodsituaties", cards:[
    { h:"Prikaccident", b:"<ol><li>Stop en zorg voor een veilige situatie.</li><li>Laat rustig bloeden, <b>niet uitknijpen</b>.</li><li>Spoelen met stromend water, reinigen met zeep.</li><li>Desinfecteren volgens protocol.</li><li>Direct melden bij leidinggevende en bedrijfsarts/arbodienst.</li></ol><p class='note'>Bij mogelijke hiv-blootstelling moet PEP zo snel mogelijk starten, bij voorkeur binnen enkele uren.</p>" },
    { h:"Flauwvallen", b:"<p>Vaak een vasovagale reactie: bloeddruk en soms hartslag dalen plotseling.</p><ol><li>Stop direct, verwijder de naald veilig.</li><li>Plat op de rug, benen eventueel omhoog.</li><li>Bewustzijn en ademhaling controleren, hulp inroepen.</li><li>Knellende kleding los, frisse lucht.</li><li>Rustig laten bijkomen, langzaam rechtop.</li></ol><p class='note'><b>112</b> bij ernstige situatie. Geen normale ademhaling: reanimeren en AED laten halen.</p>" }
  ]}],
  quiz:[
    { q:"Hoeveel prikpogingen doe je maximaal per zorgverlener?", a:["1","2","4"], c:1, e:"Maximaal 2, daarna een ervaren collega inschakelen." },
    { q:"Wat doe je níet bij een prikaccident?", a:["Laten bloeden","De wond uitknijpen","Spoelen met water"], c:1, e:"Niet uitknijpen; laat de wond rustig bloeden." },
    { q:"In welke arm prik je bij voorkeur als de zorgvrager een infuus heeft?", a:["In de arm met het infuus","In de andere arm","Maakt niet uit"], c:1, e:"Bij voorkeur in de andere arm; anders kan het monster verdund of verontreinigd raken." },
    { q:"Welke houding bij flauwvallen?", a:["Rechtop zitten met het hoofd tussen de knieën","Plat op de rug, benen eventueel omhoog","Staan en lopen"], c:1, e:"Plat op de rug en eventueel de benen iets omhoog." },
    { q:"Mag je de beschermkap terugplaatsen op een gebruikte naald?", a:["Ja, altijd","Nooit","Alleen bij een butterfly"], c:1, e:"Plaats de beschermkap nooit terug." },
    { q:"Wat neem je af vóór de overige bloedbuizen?", a:["Bloedkweken","EDTA-buis","Citraatbuis"], c:0, e:"Bloedkweken neem je vóór de overige buizen af." },
    { q:"Wanneer moet PEP bij mogelijke hiv-blootstelling starten?", a:["Binnen een week","Zo snel mogelijk, bij voorkeur binnen enkele uren","Na de uitslag van het laboratorium"], c:1, e:"Zo snel mogelijk, bij voorkeur binnen enkele uren." }
  ]},
{ id:"m10", t:"Complicaties & tips", s:"Als het niet gaat zoals verwacht", lessons:[
  { t:"Complicaties", cards:[
    { h:"Geen bloed, hematoom, geen ader", b:"<dl><dt>Geen bloed in de buis</dt><dd>Aansluiting controleren, naald voorzichtig corrigeren, niet lang zoeken.</dd><dt>Hematoom</dt><dd>Stuwband los, naald eruit, stevig afdrukken.</dd><dt>Geen ader voelbaar</dt><dd>Arm lager, warm kompres, hand ontspannen.</dd></dl>" },
    { h:"Rollen, hard, rood, zwelling", b:"<dl><dt>Ader rolt weg</dt><dd>Huid en ader goed fixeren of andere ader.</dd><dt>Ader voelt hard</dt><dd>Vermijden; andere plek zoeken.</dd><dt>Pulserend, helderrood bloed</dt><dd>Mogelijk een slagader: stoppen, langdurig drukken, direct medische beoordeling.</dd><dt>Zwelling tijdens prikken</dt><dd>Bloed buiten de ader: stoppen, stuwband los, naald eruit, afdrukken.</dd></dl>" }
  ]},
  { t:"Tips uit de praktijk", cards:[
    { h:"De zorgvrager", b:"<ul><li>Neem de tijd en werk rustig</li><li>Stel gerust en leg kort uit</li><li>Laat angstige zorgvragers bij voorkeur liggend prikken</li><li>Leid af met rustig ademhalen</li><li>Spreek af of iemand wil weten wanneer je prikt</li></ul>" },
    { h:"De techniek", b:"<ul><li>Voel goed waar de ader loopt, prik niet overhaast</li><li>Een warm kompres helpt aderen voelbaar te maken</li><li>Forceer nooit een punctie: vraag tijdig een collega</li><li>Let op bleekheid, zweten en misselijkheid</li><li>Controleer de prikplaats en laat rustig opstaan</li></ul>" }
  ]}],
  quiz:[
    { q:"Er stroomt pulserend, helderrood bloed. Wat is er waarschijnlijk aan de hand?", a:["Een hematoom","Een slagader is aangeprikt","De buis is vol"], c:1, e:"Mogelijk is een slagader aangeprikt: stoppen en langdurig drukken." },
    { q:"De ader rolt weg. Wat doe je?", a:["Harder prikken","Huid en ader goed fixeren","De stuwband strakker"], c:1, e:"Fixeer de huid en ader goed onder de punctieplaats." },
    { q:"Wat helpt als er geen ader voelbaar is?", a:["Laten vuistpompen","Een warm kompres","Langer stuwen dan 3 minuten"], c:1, e:"Een warm kompres en de arm iets lager kunnen helpen." },
    { q:"Er ontstaat een zwelling tijdens het prikken. Wat doe je?", a:["Doorgaan tot de buis vol is","Stoppen, stuwband los, naald eruit, afdrukken","Een tweede buis aanprikken"], c:1, e:"Bloed stroomt buiten de ader: stop en druk goed af." },
    { q:"De punctie lukt niet. Wat is juist?", a:["Blijven proberen tot het lukt","Niet forceren en tijdig een collega inschakelen","De zorgvrager naar huis sturen"], c:1, e:"Forceer nooit een punctie." }
  ]}
];
