
import { TeamConfig, Resource } from './types';
import { BookOpen, Users, Clock, Gavel, Package, Star } from 'lucide-react';

export const TEAMS: Record<string, TeamConfig> = {
  red: { id: 'red', name: 'Rood', hex: '#e73546', textColor: 'text-white' },
  green: { id: 'green', name: 'Groen', hex: '#63b986', textColor: 'text-white' },
  yellow: { id: 'yellow', name: 'Geel', hex: '#e4e022', textColor: 'text-black' },
  orange: { id: 'orange', name: 'Oranje', hex: '#f28b39', textColor: 'text-white' },
};

export const RESOURCE_CONFIG: Record<Resource, { label: string; color: string; icon: any }> = {
  kennis: { label: 'Kennis', color: 'bg-res-kennis', icon: BookOpen },
  samenwerking: { label: 'Samenwerking', color: 'bg-res-samenwerking', icon: Users },
  tijd: { label: 'Tijd', color: 'bg-res-tijd', icon: Clock },
  besluitkracht: { label: 'Besluitkracht', color: 'bg-res-besluitkracht', icon: Gavel },
  materiaal: { label: 'Materiaal', color: 'bg-res-materiaal', icon: Package },
  keuze: { label: 'Token naar keuze', color: 'bg-yellow-500', icon: Star },
};

export const BUILDING_COSTS: Record<string, Array<{ resource: Resource; amount: number }>> = {
  route: [
    { resource: 'samenwerking', amount: 1 },
    { resource: 'tijd', amount: 1 },
    { resource: 'kennis', amount: 1 }
  ],
  door: [
    { resource: 'materiaal', amount: 1 },
    { resource: 'kennis', amount: 1 },
    { resource: 'samenwerking', amount: 1 }
  ],
  brandblusser: [
    { resource: 'samenwerking', amount: 1 },
    { resource: 'tijd', amount: 1 },
    { resource: 'materiaal', amount: 1 },
    { resource: 'besluitkracht', amount: 1 }
  ]
};

export const INCIDENT_REWARDS: Resource[] = ['samenwerking', 'kennis'];

export const CHALLENGE_INCIDENTS = [
  {
    id: 1,
    title: "Bewustzijnscontrole",
    scenario: "Je ziet een collega plotseling in elkaar zakken bij het koffiezetapparaat. De omgeving is veilig en je bent direct bij het slachtoffer.",
    q1: {
      question: "Wat is de meest correcte en volledige methode om het bewustzijn vast te stellen bij dit slachtoffer?",
      options: [
        "Je schudt voorzichtig aan de schouders, vraagt luid \"Gaat het?\" en geeft tegelijkertijd een pijnprikkel door stevig in de monnikskapspier (schouder/nek) te knijpen.",
        "Je spreekt het slachtoffer luid aan, schudt voorzichtig aan de schouders en observeert direct of er sprake is van enige verbale of motorische reactie.",
        "Je tikt het slachtoffer aan, vraagt \"Wat is er gebeurd?\" en voert direct de kinlift uit om te zien of de ogen openslaan."
      ],
      correctAnswer: "Je spreekt het slachtoffer luid aan, schudt voorzichtig aan de schouders en observeert direct of er sprake is van enige verbale of motorische reactie."
    },
    q2: {
      question: "De collega reageert niet, maar ademt wel normaal. Wat is de vervolgstap?",
      options: [
        "Je belt (of laat bellen) direct 112, meldt een bewusteloos slachtoffer met normale ademhaling en legt het slachtoffer vervolgens in de stabiele zijligging.",
        "Je controleert eerst gedurende maximaal 10 seconden de halsslagader om circulatie te bevestigen voordat je het slachtoffer in de stabiele zijligging legt.",
        "Je laat direct een AED halen en sluit deze aan (\"Stand-by mode\"), zodat je direct kunt handelen mocht de ademhaling alsnog stoppen."
      ],
      correctAnswer: "Je belt (of laat bellen) direct 112, meldt een bewusteloos slachtoffer met normale ademhaling en legt het slachtoffer vervolgens in de stabiele zijligging."
    }
  },
  {
    id: 2,
    title: "Gebruik van de AED",
    scenario: "Tijdens een reanimatie brengt een omstander de AED. Je bent op dat moment bezig met de borstcompressies.",
    q1: {
      question: "Zodra de AED naast het slachtoffer wordt geplaatst, wat is de meest kritieke eerste handeling om de kans op een succesvolle defibrillatie te maximaliseren?",
      options: [
        "Je stopt de reanimatie onmiddellijk om de borstkas vrij te maken van kleding en eventueel vocht, zodat de elektroden direct contact maken.",
        "Je zet het apparaat aan en ontbloot de borstkas van het slachtoffer pas op het moment dat de gesproken instructies hier specifiek om vragen.",
        "Je zet het apparaat direct aan terwijl de tweede hulpverlener de borstcompressies continu voortzet tot het moment van de automatische ritme-analyse."
      ],
      correctAnswer: "Je zet het apparaat direct aan terwijl de tweede hulpverlener de borstcompressies continu voortzet tot het moment van de automatische ritme-analyse."
    },
    q2: {
      question: "De AED heeft de analyse voltooid en geeft aan: \"Schok geadviseerd. Apparaat wordt opgeladen. Raak het slachtoffer niet aan.\" Wat is op dit specifieke moment de juiste procedure?",
      options: [
        "Je houdt de kinlift (luchtweg) van het slachtoffer vast om te voorkomen dat de tong de luchtweg blokkeert tijdens de schok, maar raakt de rest van het lichaam niet aan.",
        "Je roept luid \"Iedereen afstand!\", controleert visueel of niemand (inclusief jijzelf) fysiek contact heeft met het slachtoffer en drukt pas op de knop als de omgeving veilig is.",
        "Je gaat door met de borstcompressies tijdens het opladen van de AED en stopt pas op de seconde dat de schokknop oplicht om de 'hands-off time' zo kort mogelijk te houden."
      ],
      correctAnswer: "Je roept luid \"Iedereen afstand!\", controleert visueel of niemand (inclusief jijzelf) fysiek contact heeft met het slachtoffer en drukt pas op de knop als de omgeving veilig is."
    }
  },
  {
    id: 3,
    title: "Ernstig letsel in het magazijn",
    scenario: "Een collega valt van een trap. Je treft het slachtoffer aan met een open botbreuk aan het onderbeen: er is sprake van een uitstekend botdeel.",
    q1: {
      question: "Je bereidt de verzorging van de wond voor terwijl je wacht op de ambulance. Wat is de juiste procedure voor het behandelen van het zichtbare botdeel?",
      options: [
        "Je dekt het botdeel en de wond steriel af met een niet-verklevend kompres of snelverband, waarbij je de drukplekken van het verband naast het botdeel plaatst om verschuiving te voorkomen.",
        "Je brengt een stevig drukkend wonddrukverband aan over het botstuk heen om te voorkomen dat er alsnog een secundaire bloeding ontstaat tijdens het vervoer.",
        "Je reinigt het uitstekende botstuk voorzichtig met water of een ontsmettingsmiddel om te voorkomen dat bacteriën bij de eerste de beste beweging dieper de wond in gaan."
      ],
      correctAnswer: "Je dekt het botdeel en de wond steriel af met een niet-verklevend kompres of snelverband, waarbij je de drukplekken van het verband naast het botdeel plaatst om verschuiving te voorkomen."
    },
    q2: {
      question: "Je hebt de wond afgedekt en professionele hulp is onderweg. Hoe ga je nu verder te werk wat betreft de verzorging van het letsel?",
      options: [
        "Je immobiliseert het onderbeen door steun te geven in de positie waarin je het been aantrof.",
        "Je legt een noodspalk aan met behulp van harde materialen om de breukdelen volledig te fixeren.",
        "Je voert een controle uit van de bloedcirculatie nabij van de breuk (zoals de kleur en temperatuur van de voet) en herhaalt deze controle regelmatig tot de ambulance arriveert."
      ],
      correctAnswer: "Je immobiliseert het onderbeen door steun te geven in de positie waarin je het been aantrof."
    }
  },
  {
    id: 4,
    title: "Diabetes op de werkvloer",
    scenario: "Een bezoeker met diabetes wordt plotseling erg zweterig, trillerig en gedraagt zich verward. Hij is nog wel in staat om te praten en te slikken.",
    q1: {
      question: "Je twijfelt of de bezoeker een te lage bloedsuikerspiegel (hypo) of een te hoge bloedsuikerspiegel (hyper) heeft. Wat is de juiste handelwijze?",
      options: [
        "Je probeert eerst vast te stellen of de bezoeker een acetonlucht (zoete appeltjes) uitademt; is dit niet het geval, dan ga je er altijd vanuit dat het een 'hypo' is.",
        "Bij twijfel behandel je het slachtoffer altijd als een 'hypo' door suikers toe te dienen, omdat een 'hypo' op korte termijn veel gevaarlijker is dan een 'hyper'.",
        "Je dient geen suikers toe zolang je het niet zeker weet, maar laat de bezoeker veel water drinken om een eventueel suikeroverschot te verdunnen."
      ],
      correctAnswer: "Bij twijfel behandel je het slachtoffer altijd als een 'hypo' door suikers toe te dienen, omdat een 'hypo' op korte termijn veel gevaarlijker is dan een 'hyper'."
    },
    q2: {
      question: "Je besluit de bezoeker suikers aan te bieden. Waar moet je specifiek op letten?",
      options: [
        "Je dient de suikers alleen toe als de bezoeker nog zelfstandig kan slikken en houdt de bezoeker nauwlettend in de gaten; bij verslechtering van het bewustzijn stop je direct.",
        "Je helpt de bezoeker door de vloeistof voorzichtig in kleine slokjes in de mond te gieten.",
        "Je adviseert de bezoeker om direct na de suikers ook een extra eenheid insuline te spuiten."
      ],
      correctAnswer: "Je dient de suikers alleen toe als de bezoeker nog zelfstandig kan slikken en houdt de bezoeker nauwlettend in de gaten; bij verslechtering van het bewustzijn stop je direct."
    }
  },
  {
    id: 5,
    title: "Brandmelding en voorzieningen",
    scenario: "Het brandalarm gaat af. Je begeeft je naar de brandmeldcentrale (BMC) en ziet een melding in de serverruimte. Je gaat op verkenning uit.",
    q1: {
      question: "Boven de gesloten deur van de serverruimte brandt een rood lampje (nevenindicator). Wat is de primaire functie hiervan?",
      options: [
        "Het geeft aan dat de automatische blusgasinstallatie in de achterliggende ruimte reeds is geactiveerd.",
        "Het dient als waarschuwing dat de stroomvoorziening in de serverruimte automatisch is uitgeschakeld.",
        "Het stelt je in staat om snel de brandhaard te lokaliseren zonder de deur te hoeven openen."
      ],
      correctAnswer: "Het stelt je in staat om snel de brandhaard te lokaliseren zonder de deur te hoeven openen."
    },
    q2: {
      question: "De serverruimte is beveiligd met een automatische blusgasinstallatie. Wat moet de BHV'er doen?",
      options: [
        "De ruimte direct betreden om te kijken waar de rook vandaan komt.",
        "De ruimte niet betreden en wachten tot de brandweer de ruimte veilig heeft verklaard.",
        "De ventilatie in het hele gebouw maximaal aanzetten."
      ],
      correctAnswer: "De ruimte niet betreden en wachten tot de brandweer de ruimte veilig heeft verklaard."
    }
  },
  {
    id: 6,
    title: "Diepe snijwond met actieve bloeding",
    scenario: "Een collega snijdt zich aan een glasscherf. Het bloed is helderrood en spuit pulserend uit de wond aan de onderarm.",
    q1: {
      question: "Wat is jouw allereerste handeling om het levensbedreigende bloedverlies te beperken?",
      options: [
        "Je brengt direct een tourniquet aan op de bovenarm.",
        "Je oefent onmiddellijk krachtige, directe druk uit op de wond met je handen.",
        "Je legt de arm van het slachtoffer zo laag mogelijk om de bloeddruk te verlagen."
      ],
      correctAnswer: "Je oefent onmiddellijk krachtige, directe druk uit op de wond met je handen."
    },
    q2: {
      question: "Je start met het aanleggen van een wonddrukverband. Wanneer is dit verband correct aangelegd?",
      options: [
        "Als het verband zo strak zit dat de polsslag niet meer voelbaar is.",
        "Als je een tweede, koude laag aanbrengt om de stolling te bevorderen.",
        "Als de actieve bloeding is gestelpt."
      ],
      correctAnswer: "Als de actieve bloeding is gestelpt."
    }
  },
  {
    id: 7,
    title: "Oogletsel door chemicaliën",
    scenario: "Tijdens werkzaamheden spat er een bijtende ontstopper (base/loog) in het rechteroog van een medewerker.",
    q1: {
      question: "Wat is de juiste richtlijn voor de tijdsduur en de nazorg bij een bijtende stof?",
      options: [
        "Je spoelt het oog gedurende 10 minuten intensief en dekt het oog daarna luchtdicht af.",
        "Je spoelt het oog minimaal 15 tot 20 minuten onafgebroken met lauw stromend water en schakelt professionele hulp in.",
        "Je spoelt het oog kortstondig (ca. 5 minuten) totdat de pH-waarde is geneutraliseerd."
      ],
      correctAnswer: "Je spoelt het oog minimaal 15 tot 20 minuten onafgebroken met lauw stromend water en schakelt professionele hulp in."
    },
    q2: {
      question: "Hoe voer je de spoeling technisch correct uit om verspreiding te voorkomen?",
      options: [
        "Je spoelt met een zachte straal van de neus af naar de buitenkant van het gezicht.",
        "Je richt een krachtige straal direct op de pupil om de stof onder de oogleden vandaan te spuiten.",
        "Je laat het slachtoffer het hoofd achterover kantelen en giet het water recht van boven op de neusrug."
      ],
      correctAnswer: "Je spoelt met een zachte straal van de neus af naar de buitenkant van het gezicht."
    }
  },
  {
    id: 8,
    title: "Brandpreventie in het gebouw",
    scenario: "Je ziet dat een collega een stoel tussen een zelfsluitende branddeur heeft gezet om een gang te ventileren.",
    q1: {
      question: "Wat is de meest kritieke reden waarom deze deur direct gesloten moet worden bij een beginnende brand?",
      options: [
        "Branddeuren zijn primair ontworpen om de verspreiding van giftige rook te beperken.",
        "De deur fungeert als een luchtsluis die voorkomt dat de overdrukinstallatie ontregelt raakt.",
        "Als een branddeur te lang openstaat, vervalt de brandwerendheid van het materiaal."
      ],
      correctAnswer: "Branddeuren zijn primair ontworpen om de verspreiding van giftige rook te beperken."
    },
    q2: {
      question: "Het gebouw is opgedeeld in brandcompartimenten (bijv. 60 min). Wat betekent dit voor jouw tactiek?",
      options: [
        "Je moet de deuren naar het brandende compartiment zo snel mogelijk sluiten.",
        "Je hebt gegarandeerd 60 minuten de tijd om iedereen uit het brandende compartiment te halen.",
        "Compartimentering is enkel bedoeld voor de brandweer; voor de BHV is de enige grens de buitendeur."
      ],
      correctAnswer: "Je moet de deuren naar het brandende compartiment zo snel mogelijk sluiten."
    }
  },
  {
    id: 9,
    title: "Shock na een ongeval",
    scenario: "Een medewerker is bekneld geraakt onder een palletwagen. Het slachtoffer heeft een grauwe huidskleur en voelt klam aan.",
    q1: {
      question: "Hoe onderscheid je deze levensbedreigende shocktoestand van een relatief onschuldige flauwte?",
      options: [
        "Bij een flauwte wordt de hartslag tijdelijk traag en herstelt men snel plat liggend; bij shock blijft de hartslag hoog en verslechtert de toestand.",
        "Bij een shock zal het slachtoffer altijd het bewustzijn verliezen binnen 2 minuten.",
        "Het belangrijkste verschil is de lichaamstemperatuur; shock geeft altijd hoge koorts."
      ],
      correctAnswer: "Bij een flauwte wordt de hartslag tijdelijk traag en herstelt men snel plat liggend; bij shock blijft de hartslag hoog en verslechtert de toestand."
    },
    q2: {
      question: "Het slachtoffer klaagt over extreme dorst. Waarom mag je niets te drinken geven?",
      options: [
        "Het drinken van water kan de bloedsuikerspiegel verder verstoren.",
        "Bij shock ligt de spijsvertering stil en is de kans op braken groot; dit kan de luchtwegen blokkeren bij bewusteloosheid.",
        "Water verdunt het resterende bloed, waardoor het zuurstoftransport nog verder afneemt."
      ],
      correctAnswer: "Bij shock ligt de spijsvertering stil en is de kans op braken groot; dit kan de luchtwegen blokkeren bij bewusteloosheid."
    }
  },
  {
    id: 10,
    title: "Rook in het trappenhuis",
    scenario: "Tijdens een controleronde ontdek je rookontwikkeling in een centraal trappenhuis dat dienstdoet als hoofdvluchtweg.",
    q1: {
      question: "Welk type melder is hier het meest effectief voor vroege detectie van smeulbranden?",
      options: [
        "Een thermische melder; deze reageert pas boven de 60 graden.",
        "Een optische rookmelder; deze reageert snel op zichtbare rookdeeltjes.",
        "Een vlammenmelder; deze scant op infraroodstraling."
      ],
      correctAnswer: "Een optische rookmelder; deze reageert snel op zichtbare rookdeeltjes."
    },
    q2: {
      question: "De brand is niet meer met kleine middelen te bestrijden. Wat is je belangrijkste tactische handeling?",
      options: [
        "Je sluit alle deuren naar het trappenhuis en start de ontruiming via alternatieve vluchtwegen.",
        "Je houdt de deuren naar de gangen juist open om de rookdruk in het trappenhuis te verlagen.",
        "Je activeert de handbrandmelder opnieuw om het volume van het alarm te verhogen."
      ],
      correctAnswer: "Je sluit alle deuren naar het trappenhuis en start de ontruiming via alternatieve vluchtwegen."
    }
  },
  {
    id: 11,
    title: "AED op een metalen vloer",
    scenario: "In een fabriekshal met een metalen roostervloer tref je een slachtoffer aan met een circulatiestilstand.",
    q1: {
      question: "Wat is het juiste veiligheidsprotocol voor het toedienen van een schok op een metalen ondergrond?",
      options: [
        "Het gebruik van de AED is veilig, omdat de stroom alleen tussen de elektroden over de borstkas loopt.",
        "Je moet het slachtoffer eerst naar een niet-geleidende ondergrond verplaatsen.",
        "De schok mag alleen worden toegediend als de BHV'er en het slachtoffer volledig geïsoleerd zijn."
      ],
      correctAnswer: "Het gebruik van de AED is veilig, omdat de stroom alleen tussen de elektroden over de borstkas loopt."
    },
    q2: {
      question: "Wat doe je als de borstkas van het slachtoffer erg behaard is?",
      options: [
        "De elektroden over het haar heen plakken.",
        "Het haar op de plakplaatsen wegscheren met het mesje uit de AED-set.",
        "Geen AED gebruiken en alleen borstcompressies geven."
      ],
      correctAnswer: "Het haar op de plakplaatsen wegscheren met het mesje uit de AED-set."
    }
  },
  {
    id: 12,
    title: "Verstikking",
    scenario: "Tijdens de kerstlunch verslikt een collega zich in een stuk vlees. Hij kan niet meer praten en loopt blauw aan.",
    q1: {
      question: "Welke handeling voer je als eerste uit?",
      options: [
        "5 rugslagen tussen de schouderbladen.",
        "Direct 30 borstcompressies.",
        "De buikstoten (Heimlich)."
      ],
      correctAnswer: "5 rugslagen tussen de schouderbladen."
    },
    q2: {
      question: "Het slachtoffer verliest het bewustzijn en zakt in elkaar. Wat doe je nu?",
      options: [
        "Doorgaan met de buikstoten op de grond.",
        "112 bellen en direct de reanimatie starten.",
        "Het slachtoffer in de stabiele zijligging leggen."
      ],
      correctAnswer: "112 bellen en direct de reanimatie starten."
    }
  },
  {
    id: 13,
    title: "Gebouwvoorzieningen (Sprinkler)",
    scenario: "In een archiefruimte is brand ontstaan. De hitte stijgt op naar het plafond.",
    q1: {
      question: "Gaan alle sprinklers in het hele gebouw nu tegelijkertijd af?",
      options: [
        "Ja, dat is het systeem.",
        "Nee, alleen de sprinklerkoppen die door de hitte van de brand worden geactiveerd.",
        "Alleen de sprinklers op dezelfde verdieping."
      ],
      correctAnswer: "Nee, alleen de sprinklerkoppen die door de hitte van de brand worden geactiveerd."
    },
    q2: {
      question: "Wat is de functie van de vloeistof in het glazen buisje van de sprinkler?",
      options: [
        "Het detecteert rook.",
        "Het zet uit door warmte, waardoor het buisje knapt en het water vrijkomt.",
        "Het dooft het vuur met chemische gassen."
      ],
      correctAnswer: "Het zet uit door warmte, waardoor het buisje knapt en het water vrijkomt."
    }
  },
  {
    id: 14,
    title: "Reanimatie wissel",
    scenario: "Je reanimeert samen met een andere BHV'er. De AED is aangesloten.",
    q1: {
      question: "Wanneer is het beste moment om van reanimator te wisselen?",
      options: [
        "Zodra de AED het hartritme gaat analyseren (elke 2 minuten).",
        "Na elke 30 borstcompressies.",
        "Alleen als de ambulancebroeder het vraagt."
      ],
      correctAnswer: "Zodra de AED het hartritme gaat analyseren (elke 2 minuten)."
    },
    q2: {
      question: "Waarom is deze wissel na 2 minuten belangrijk?",
      options: [
        "Om te voorkomen dat de reanimator vermoeid raakt en de kwaliteit afneemt.",
        "Omdat de AED anders oververhit raakt.",
        "Om de andere BHV'er ook een kans te geven."
      ],
      correctAnswer: "Om te voorkomen dat de reanimator vermoeid raakt en de kwaliteit afneemt."
    }
  },
  {
    id: 15,
    title: "Brandwonden op de hand",
    scenario: "Een collega heeft kokend water over zijn hand gekregen. De huid is rood en pijnlijk.",
    q1: {
      question: "Welke term gebruiken we voor een brandwond waarbij alleen de opperhuid is aangetast?",
      options: [
        "Gedeeltelijk.",
        "Oppervlakkig.",
        "Volledig."
      ],
      correctAnswer: "Oppervlakkig."
    },
    q2: {
      question: "Wat is de belangrijkste regel bij het koelen van brandwonden?",
      options: [
        "Koelen met ijskoud water uit de vriezer.",
        "Koelen met lauw, zacht stromend kraanwater.",
        "De wond insmeren met brandzalf voordat je gaat koelen."
      ],
      correctAnswer: "Koelen met lauw, zacht stromend kraanwater."
    }
  },
  {
    id: 16,
    title: "Oogzorg (Vuiltje in het oog)",
    scenario: "Een collega krijgt een vliegje of een loszittend vuiltje in het oog. Het oog is rood en traant.",
    q1: {
      question: "Wat mag het slachtoffer absoluut niet doen?",
      options: [
        "Knipperen met de ogen.",
        "In het oog wrijven.",
        "Naar de grond kijken."
      ],
      correctAnswer: "In het oog wrijven."
    },
    q2: {
      question: "Hoe kun je proberen het vuiltje te verwijderen als het op het oogwit zit?",
      options: [
        "Met de punt van een schoon zakdoekje naar de neus toe strijken.",
        "Met een pincet het vuiltje eraf pakken.",
        "Hard op de oogbol drukken tot het eruit springt."
      ],
      correctAnswer: "Met de punt van een schoon zakdoekje naar de neus toe strijken."
    }
  },
  {
    id: 17,
    title: "Nooduitgangen en vluchtwegen",
    scenario: "Tijdens een preventieve ronde controleer je of de vluchtwegen vrij zijn en de nooduitgangen functioneren.",
    q1: {
      question: "Aan welke eis moet een nooddeur voldoen?",
      options: [
        "Deze moet altijd gesloten blijven worden.",
        "Deze moet met één handeling zonder sleutel te openen zijn.",
        "Deze mag alleen geopend worden als de brandweer er is."
      ],
      correctAnswer: "Deze moet met één handeling zonder sleutel te openen zijn."
    },
    q2: {
      question: "Wat is de minimale vrije breedte van een vluchtweg?",
      options: [
        "Minimaal 85 cm.",
        "Altijd precies 1 meter.",
        "Dat maakt niet uit, zolang je er maar zijwaarts doorheen kunt."
      ],
      correctAnswer: "Minimaal 85 cm."
    }
  },
  {
    id: 18,
    title: "Brandblusmiddelen",
    scenario: "Je ontdekt een beginnende brand in een prullenbak. Je pakt een sproeischuimblusser.",
    q1: {
      question: "Wat is de eerste handeling bij het activeren van een draagbaar blustoestel?",
      options: [
        "De slang op het vuur richten.",
        "De borgpen eruit trekken.",
        "De blusser hard op de grond slaan."
      ],
      correctAnswer: "De borgpen eruit trekken."
    },
    q2: {
      question: "Waarom moet je een brand altijd aan de basis (onderkant) blussen?",
      options: [
        "Om de brandhaard direct af te dekken of af te koelen.",
        "Omdat daar de meeste vlammen zitten.",
        "Omdat het blusmiddel anders wegwaait."
      ],
      correctAnswer: "Om de brandhaard direct af te dekken of af te koelen."
    }
  },
  {
    id: 19,
    title: "Meldprocedure",
    scenario: "Een collega is van een ladder gevallen en buiten bewustzijn. Je belt 112.",
    q1: {
      question: "Welke combinatie van gegevens is belangrijk voor de centralist?",
      options: [
        "Naam, exacte locatie, aard van het incident en toestand van vitale functies.",
        "Dichtstbijzijnde ziekenhuis en aard van het letsel.",
        "Exacte locatie en aantal slachtoffers."
      ],
      correctAnswer: "Naam, exacte locatie, aard van het incident en toestand van vitale functies."
    },
    q2: {
      question: "Hoe ga je om met de verbinding tijdens het gesprek?",
      options: [
        "Je legt de telefoon neer zodra de locatie bekend is.",
        "Je zet de telefoon op de luidspreker en blijft aan de lijn tot de centralist verbreekt.",
        "Je verbreekt de verbinding zodra je sirenes hoort."
      ],
      correctAnswer: "Je zet de telefoon op de luidspreker en blijft aan de lijn tot de centralist verbreekt."
    }
  },
  {
    id: 20,
    title: "Rookverspreiding en deuren",
    scenario: "Je hoort een rookmelder in een afgesloten kantoorruimte en ruikt een brandlucht.",
    q1: {
      question: "Hoe controleer je de temperatuur van de deur?",
      options: [
        "Je raakt de deurklink kort aan met je vingertoppen.",
        "Je controleert de deur met de rug van je hand van onder naar boven.",
        "Je legt beide handpalmen plat tegen het midden van de deur."
      ],
      correctAnswer: "Je controleert de deur met de rug van je hand van onder naar boven."
    },
    q2: {
      question: "De deur voelt niet warm aan. Hoe voer je de opening technisch correct uit?",
      options: [
        "Je opent de deur in één snelle beweging volledig.",
        "Je plaatst je voet tegen de onderkant en opent de deur op een kleine kier.",
        "Je vraagt een collega om ramen in de gang open te zetten voor ventilatie."
      ],
      correctAnswer: "Je plaatst je voet tegen de onderkant en opent de deur op een kleine kier."
    }
  },
  {
    id: 21,
    title: "Wervelletsel (Val van hoogte)",
    scenario: "Een schilder is van een steiger gevallen. Hij is bij bewustzijn maar heeft hevige rugpijn.",
    q1: {
      question: "Waarom benader je het slachtoffer strikt binnen zijn gezichtsveld?",
      options: [
        "Dit is de standaardprocedure voor de 'Kinlift-methode'.",
        "Zodat je direct kunt zien of er sprake is van uitwendige bloedingen.",
        "Om te voorkomen dat het slachtoffer een reflexmatige hoofdbeweging maakt."
      ],
      correctAnswer: "Om te voorkomen dat het slachtoffer een reflexmatige hoofdbeweging maakt."
    },
    q2: {
      question: "Wat is jouw taak bij het stabiliseren van de nek (manuele fixatie)?",
      options: [
        "Je dwingt het hoofd met kracht in de neutrale anatomische positie.",
        "Je fixeert het hoofd voorzichtig in de aangetroffen stand en geeft geruststelling.",
        "Je legt zware voorwerpen strak tegen beide kanten van het hoofd."
      ],
      correctAnswer: "Je fixeert het hoofd voorzichtig in de aangetroffen stand en geeft geruststelling."
    }
  }
];


export const SKILLS = [
  { id: 'ehbo-1', name: 'Eerste Hulp verlenen' },
  { id: 'brand-1', name: 'Brandbestrijding' },
  { id: 'ontruim-1', name: 'Ontruiming begeleiden' },
  { id: 'reanim-1', name: 'Reanimatie (AED)' },
  { id: 'comm-1', name: 'Communicatie' }
];

export const QUESTIONS = [
  { id: 1, question: "Wat is de verhouding tussen borstcompressies en mond-op-mondbeademing?", answer: "30:2" },
  { id: 2, question: "Waar staat de afkorting 'RICE' voor bij letsel?", answer: "Rust, IJs, Compressie, Elevatie" },
  { id: 3, question: "Wat doe je als eerste bij een vlam in de pan?", answer: "Deksel op de pan schuiven" },
  { id: 4, question: "Wat is de minimale leeftijd voor een BHV'er?", answer: "16 jaar" },
  { id: 5, question: "Hoe herken je een beroerte?", answer: "Scheve mond, lamme arm, onduidelijke spraak (FAST)" }
];
