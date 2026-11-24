// Leiðbeiningar fyrir æfingar. Flett upp eftir heiti æfingar.

export type Guide = {
  muscles: string;
  steps: string[];
  tips: string[];
  search: string; // leitarorð fyrir myndband (enska gefur bestu niðurstöður)
};

const guides: Record<string, Guide> = {
  'bekkpressa með handlóðum': {
    muscles: 'Brjóst · framaxlir · þríhöfði',
    steps: [
      'Leggstu á bekkinn með lóðin á lærunum og iljarnar fastar í gólfinu.',
      'Lyftu lóðunum upp yfir brjóstið, lófarnir snúa fram.',
      'Láttu lóðin síga rólega niður að hliðum brjóstsins, olnbogar í um 45° frá líkamanum.',
      'Pressaðu upp þar til hendurnar eru nánast beinar.',
    ],
    tips: ['Herðablöðin saman og niður allan tímann.', 'Ekki skella lóðunum saman efst.'],
    search: 'dumbbell bench press form',
  },
  'axlapressa sitjandi': {
    muscles: 'Axlir · þríhöfði',
    steps: [
      'Sestu upprétt/ur með bakið að bakstuðningi.',
      'Haltu lóðunum í axlarhæð, lófarnir snúa fram.',
      'Pressaðu beint upp yfir höfuðið án þess að læsa olnbogunum.',
      'Láttu lóðin síga rólega aftur niður í axlarhæð.',
    ],
    tips: ['Spenntu kviðinn og ekki fetta mjóbakið.', 'Horfðu beint fram.'],
    search: 'seated dumbbell shoulder press form',
  },
  hliðarlyftur: {
    muscles: 'Hliðaraxlir',
    steps: [
      'Stattu með lóð við hliðarnar og smá beygju í olnbogum.',
      'Lyftu lóðunum út til hliðanna upp í axlarhæð.',
      'Staldraðu stutt við efst.',
      'Láttu lóðin síga hægt niður.',
    ],
    tips: ['Notaðu létta þyngd – ekki sveifla.', 'Hugsaðu um að leiða hreyfinguna með olnbogunum.'],
    search: 'dumbbell lateral raise form',
  },
  'þríhöfðapressa í kapli': {
    muscles: 'Þríhöfði',
    steps: [
      'Taktu um handfang eða reipi í efstu stöðu á kaplinum.',
      'Haltu olnbogunum þétt við síðurnar.',
      'Ýttu niður þar til hendurnar eru beinar.',
      'Leyfðu þyngdinni að koma rólega upp þar til framhandleggir eru láréttir.',
    ],
    tips: ['Olnbogarnir hreyfast ekki – aðeins framhandleggirnir.'],
    search: 'cable triceps pushdown form',
  },
  'niðurtog í kapli': {
    muscles: 'Breiðir bakvöðvar · tvíhöfði',
    steps: [
      'Sestu með lærin undir púðanum og taktu breitt grip á stöngina.',
      'Hallaðu þér örlítið aftur og lyftu brjóstinu.',
      'Togaðu stöngina niður að efra brjósti með því að draga olnbogana niður.',
      'Slepptu rólega upp þar til hendurnar eru beinar.',
    ],
    tips: ['Ekki toga stöngina aftur fyrir hálsinn.', 'Engir rykkir – stjórnaðu þyngdinni.'],
    search: 'lat pulldown form',
  },
  'róður sitjandi': {
    muscles: 'Miðbak · aftanverðar axlir · tvíhöfði',
    steps: [
      'Sestu með fæturna á plötunum og smá beygju í hnjánum.',
      'Haltu bakinu beinu og brjóstinu uppi.',
      'Togaðu handfangið að kviðnum og kreistu herðablöðin saman.',
      'Teygðu hendurnar rólega fram án þess að hringja bakið.',
    ],
    tips: ['Ekki halla þér langt aftur til að ná þyngdinni.'],
    search: 'seated cable row form',
  },
  'face pull': {
    muscles: 'Aftanverðar axlir · efra bak',
    steps: [
      'Festu reipi á kapalinn í andlitshæð.',
      'Togaðu reipið að andlitinu og dragðu endana í sundur út við eyrun.',
      'Haltu olnbogunum háum.',
      'Staldraðu við og slepptu rólega.',
    ],
    tips: ['Létt þyngd – þetta er æfing fyrir axlaheilsu og líkamsstöðu.'],
    search: 'cable face pull form',
  },
  tvíhöfðakreppa: {
    muscles: 'Tvíhöfði',
    steps: [
      'Stattu eða sestu með lóðin við hliðarnar, lófarnir snúa fram.',
      'Beygðu olnbogana og lyftu lóðunum upp að öxlunum.',
      'Kreistu efst.',
      'Láttu lóðin síga hægt niður.',
    ],
    tips: ['Olnbogarnir kyrrir við síðurnar.', 'Ekki sveifla líkamanum.'],
    search: 'dumbbell biceps curl form',
  },
  'hallandi bekkpressa': {
    muscles: 'Efra brjóst · framaxlir · þríhöfði',
    steps: [
      'Stilltu bekkinn á 30–45° halla.',
      'Byrjaðu með lóðin yfir efra brjósti.',
      'Láttu þau síga rólega niður að efra brjósti.',
      'Pressaðu upp aftur.',
    ],
    tips: ['Ekki of brattan halla – þá tekur æfingin meira á axlirnar.'],
    search: 'incline dumbbell press form',
  },
  'einarma róður': {
    muscles: 'Breiðir bakvöðvar · miðbak',
    steps: [
      'Styddu annarri hendi á bekk, báðir fætur í gólfinu og bakið beint.',
      'Haltu lóðinu niðri með beinni hendi.',
      'Togaðu lóðið upp að mjöðminni með olnbogann nálægt líkamanum.',
      'Láttu það síga rólega niður.',
    ],
    tips: ['Ekki snúa bolnum til að ná lóðinu upp.'],
    search: 'one arm dumbbell row form',
  },
  'arnold-pressa': {
    muscles: 'Axlir (allir hlutar) · þríhöfði',
    steps: [
      'Sestu með lóðin fyrir framan axlirnar, lófarnir snúa að þér.',
      'Pressaðu upp og snúðu lófunum út á leiðinni.',
      'Efst snúa lófarnir fram.',
      'Snúðu til baka á leiðinni niður.',
    ],
    tips: ['Hæg og stjórnuð hreyfing.'],
    search: 'arnold press form',
  },
  'gólfpressa með handlóðum': {
    muscles: 'Brjóst · framaxlir · þríhöfði',
    steps: [
      'Leggstu á bakið á gólfinu með hnén beygð og iljarnar í gólfinu.',
      'Haltu lóðunum yfir brjóstinu, lófarnir snúa fram eða hvor að öðrum.',
      'Láttu lóðin síga þar til upphandleggirnir snerta gólfið létt, olnbogar í um 45° frá líkamanum.',
      'Pressaðu beint upp aftur.',
    ],
    tips: ['Ekki skella olnbogunum í gólfið – snertu létt.', 'Herðablöðin saman og niður.'],
    search: 'dumbbell floor press form',
  },
  'axlapressa standandi': {
    muscles: 'Axlir · þríhöfði',
    steps: [
      'Stattu með fætur í mjaðmabreidd og lóðin í axlarhæð.',
      'Spenntu kvið og rassvöðva.',
      'Pressaðu lóðin beint upp yfir höfuðið.',
      'Láttu þau síga rólega aftur niður í axlarhæð.',
    ],
    tips: ['Ekki fetta mjóbakið – haltu rifbeinunum niðri.', 'Ekki nota fæturna til að skjóta upp.'],
    search: 'standing dumbbell shoulder press form',
  },
  'þríhöfðaréttur yfir höfuð': {
    muscles: 'Þríhöfði',
    steps: [
      'Stattu og haltu einu handlóði með báðum höndum fyrir ofan höfuðið.',
      'Láttu lóðið síga aftur fyrir höfuðið með því að beygja olnbogana.',
      'Réttu úr olnbogunum og lyftu lóðinu aftur upp.',
    ],
    tips: ['Olnbogarnir vísa fram og haldast nálægt höfðinu.', 'Spenntu kviðinn.'],
    search: 'overhead dumbbell triceps extension form',
  },
  'framhallandi róður með handlóðum': {
    muscles: 'Bak · aftanverðar axlir · tvíhöfði',
    steps: [
      'Stattu með lóð í höndunum, smá beygju í hnjánum.',
      'Hallaðu þér fram frá mjöðmunum með beint bak, bolurinn í um 45°.',
      'Togaðu lóðin upp að mjöðmunum og kreistu herðablöðin saman.',
      'Láttu þau síga rólega niður.',
    ],
    tips: ['Bakið beint allan tímann – ekki hringja það.', 'Hálsinn í beinu framhaldi af bakinu.'],
    search: 'bent over dumbbell row form',
  },
  'niðurtog með teygju': {
    muscles: 'Breiðir bakvöðvar · aftanverðar axlir',
    steps: [
      'Haltu teygjunni beint upp yfir höfuðið, hendur aðeins breiðari en axlir.',
      'Dragðu teygjuna í sundur og niður að efra brjósti, olnbogarnir fara niður og út.',
      'Kreistu herðablöðin saman neðst.',
      'Farðu rólega aftur upp.',
    ],
    tips: ['Því þéttar sem þú heldur, því erfiðara verður það.'],
    search: 'resistance band lat pulldown',
  },
  'teygja dregin í sundur': {
    muscles: 'Aftanverðar axlir · efra bak',
    steps: [
      'Haltu teygjunni beint fyrir framan þig í axlarhæð.',
      'Dragðu hana í sundur út til hliðanna þar til hún snertir brjóstið.',
      'Kreistu herðablöðin saman.',
      'Farðu rólega til baka.',
    ],
    tips: ['Hendurnar haldast nánast beinar.', 'Ekki lyfta öxlunum upp að eyrum.'],
    search: 'band pull apart form',
  },
  'fluga á gólfi': {
    muscles: 'Brjóst',
    steps: [
      'Leggstu á gólfið með hnén beygð og lóðin beint upp yfir brjóstinu, lófarnir snúa saman.',
      'Með smá beygju í olnbogum, láttu lóðin síga út til hliðanna þar til upphandleggirnir snerta gólfið.',
      'Færðu lóðin aftur saman upp yfir brjóstið eins og þú sért að faðma tré.',
    ],
    tips: ['Létt þyngd – beygjan í olnbogunum breytist ekki.'],
    search: 'dumbbell floor fly form',
  },
  'einarma róður með stuðningi við vegg': {
    muscles: 'Breiðir bakvöðvar · miðbak',
    steps: [
      'Stattu skáhallt við vegg og styddu annarri hendinni á vegginn.',
      'Hallaðu þér fram með beint bak, lóðið hangir í hinni hendinni.',
      'Togaðu lóðið upp að mjöðminni með olnbogann nálægt líkamanum.',
      'Láttu það síga rólega niður.',
    ],
    tips: ['Ekki snúa bolnum til að ná lóðinu upp.'],
    search: 'one arm dumbbell row standing supported',
  },
  hamarskreppa: {
    muscles: 'Tvíhöfði · framhandleggir',
    steps: [
      'Stattu með lóðin við hliðarnar, lófarnir snúa hvor að öðrum.',
      'Beygðu olnbogana og lyftu lóðunum upp að öxlunum án þess að snúa úlnliðunum.',
      'Láttu þau síga hægt niður.',
    ],
    tips: ['Olnbogarnir kyrrir við síðurnar.'],
    search: 'dumbbell hammer curl form',
  },
  'armbeygjur við vegg': {
    muscles: 'Brjóst · axlir · þríhöfði',
    steps: [
      'Stattu armslengd frá vegg og leggðu lófana á vegginn í axlarhæð.',
      'Beygðu olnbogana og færðu brjóstið að veggnum.',
      'Ýttu þér aftur út.',
    ],
    tips: ['Líkaminn í beinni línu frá höfði niður í hæla.', 'Lengra frá veggnum = erfiðara.'],
    search: 'wall push up form',
  },
  'mjaðmalyfta með handlóði': {
    muscles: 'Rass · aftanlæri',
    steps: [
      'Leggstu á bakið með hnén beygð og iljarnar í gólfinu, nálægt rassinum.',
      'Leggðu handlóð þvert yfir mjaðmirnar og haltu því með báðum höndum.',
      'Ýttu í gegnum hælana og lyftu mjöðmunum þar til líkaminn er í beinni línu frá hnjám að öxlum.',
      'Kreistu rassinn efst í 1 sek og láttu síga rólega niður.',
    ],
    tips: ['Ýttu í gegnum hælana, ekki tærnar.', 'Ekki fetta mjóbakið efst.'],
    search: 'dumbbell glute bridge form',
  },
  'mjaðmalyfta á öðrum fæti': {
    muscles: 'Rass · aftanlæri',
    steps: [
      'Leggstu á bakið með annan fótinn í gólfinu og hinn beinan upp í loft eða að brjósti.',
      'Ýttu í gegnum hæl fótarins á gólfinu og lyftu mjöðmunum.',
      'Haltu mjöðmunum láréttum – ekki láta aðra hliðina síga.',
      'Láttu síga rólega og endurtaktu. Skiptu svo um fót.',
    ],
    tips: ['Byrjaðu án þyngdar.'],
    search: 'single leg glute bridge form',
  },
  'rúmensk réttstaða með handlóðum': {
    muscles: 'Aftanlæri · rass · mjóbak',
    steps: [
      'Stattu með lóðin fyrir framan lærin og smá beygju í hnjánum.',
      'Ýttu mjöðmunum aftur og láttu lóðin renna niður eftir lærunum með beint bak.',
      'Farðu niður þar til þú finnur teygju aftan í lærunum (um mitt sköflunginn).',
      'Ýttu mjöðmunum fram og stattu upp, kreistu rassinn efst.',
    ],
    tips: ['Beygjan í hnjánum breytist ekki – hreyfingin er í mjöðmunum.', 'Bakið beint allan tímann.'],
    search: 'dumbbell romanian deadlift form',
  },
  'rúmensk réttstaða á öðrum fæti': {
    muscles: 'Aftanlæri · rass · jafnvægi',
    steps: [
      'Stattu á öðrum fæti með lóð í gagnstæðri hendi. Styddu hinni hendinni létt við vegg ef þarf.',
      'Hallaðu bolnum fram og lyftu lausa fætinum aftur, mjaðmirnar haldast láréttar.',
      'Farðu niður þar til þú finnur teygju aftan í læri.',
      'Komdu aftur upp með því að ýta mjöðminni fram. Skiptu svo um fót.',
    ],
    tips: ['Smá beygja í hnénu á standandi fæti.', 'Rólegt og stjórnað.'],
    search: 'single leg romanian deadlift dumbbell form',
  },
  'hliðarganga með teygju': {
    muscles: 'Hliðar mjaðma (miðrassvöðvi)',
    steps: [
      'Settu teygju um fæturna rétt fyrir ofan hnén eða um ökklana.',
      'Stattu með fætur í mjaðmabreidd og smá beygju í hnjánum.',
      'Stígðu til hliðar og haltu spennu á teygjunni allan tímann.',
      'Taktu jafn mörg skref í hina áttina.',
    ],
    tips: ['Hnén vísa beint fram – ekki láta þau falla inn.'],
    search: 'banded lateral walk form',
  },
  kálfalyftur: {
    muscles: 'Kálfar',
    steps: [
      'Stattu með lóð í höndum og styddu þig við vegg ef þarf.',
      'Lyftu hælunum eins hátt og þú getur.',
      'Staldraðu stutt efst.',
      'Láttu hælana síga rólega niður.',
    ],
    tips: ['Hæg hreyfing niður gefur mest.'],
    search: 'dumbbell calf raise form',
  },
  'kálfalyftur á öðrum fæti': {
    muscles: 'Kálfar · ökklastöðugleiki',
    steps: [
      'Stattu á öðrum fæti og styddu þig við vegg með annarri hendi.',
      'Lyftu hælnum eins hátt og þú getur.',
      'Láttu hann síga rólega niður. Skiptu svo um fót.',
    ],
    tips: ['Haltu á lóði í lausu hendinni til að gera erfiðara.'],
    search: 'single leg calf raise form',
  },
  'grunn bikarbeygja': {
    muscles: 'Framanlæri · rass',
    steps: [
      'Haltu einu handlóði upp við brjóstið með báðum höndum.',
      'Fætur aðeins breiðari en mjaðmir, tærnar örlítið út.',
      'Ýttu mjöðmunum aftur og beygðu hnén – farðu aðeins hálfa leið niður (ekki dýpra en svo að lærin séu ofan við lárétt).',
      'Ýttu þér upp í gegnum hælana.',
    ],
    tips: ['Hnén fylgja tánum – ekki falla inn.', 'Ef hnéð verkjar, minnkaðu dýptina eða slepptu æfingunni.'],
    search: 'goblet box squat form',
  },
  veggseta: {
    muscles: 'Framanlæri',
    steps: [
      'Stattu með bakið upp við vegg og fæturna um hálfan metra frá veggnum.',
      'Renndu þér niður vegginn þar til hnén eru í um 45–60° beygju (ekki alveg lárétt læri).',
      'Haltu stöðunni í tilsettan tíma.',
      'Renndu þér upp aftur.',
    ],
    tips: ['Hærri staða = minna álag á hnén.', 'Andaðu jafnt – ekki halda niðri í þér andanum.'],
    search: 'wall sit form',
  },
  'aftursveifla með teygju': {
    muscles: 'Rass',
    steps: [
      'Settu teygju um ökklana og styddu þig við vegg.',
      'Með beint bak, ýttu öðrum fætinum beint aftur á móti teygjunni.',
      'Kreistu rassinn og komdu rólega til baka.',
      'Kláraðu endurtekningarnar og skiptu svo um fót.',
    ],
    tips: ['Ekki fetta mjóbakið – hreyfingin kemur frá mjöðminni.'],
    search: 'standing banded glute kickback',
  },
  'hliðarlega fótalyfta': {
    muscles: 'Hliðar mjaðma',
    steps: [
      'Leggstu á hliðina með fæturna beina hvor ofan á öðrum.',
      'Lyftu efri fætinum upp í um 45° með tærnar vísandi fram.',
      'Láttu hann síga hægt niður. Skiptu svo um hlið.',
    ],
    tips: ['Ekki rúlla aftur á bakið.', 'Teygja um ökklana gerir þetta erfiðara.'],
    search: 'side lying leg raise form',
  },
  'súmó réttstaða með handlóði': {
    muscles: 'Rass · innanlæri · aftanlæri',
    steps: [
      'Stattu gleiðstæð/ur með tærnar út og haltu einu þungu handlóði á milli fótanna.',
      'Ýttu mjöðmunum aftur og beygðu hnén lítillega – bringan uppi og bakið beint.',
      'Láttu lóðið síga niður þar til þú finnur teygju í aftanlærum og innanlærum.',
      'Ýttu mjöðmunum fram og stattu upp, kreistu rassinn efst.',
    ],
    tips: ['Hreyfingin kemur frá mjöðmunum – hnén beygjast bara smá.', 'Hnén vísa í sömu átt og tærnar.'],
    search: 'dumbbell sumo deadlift form',
  },
  'mjaðmalyfta með gangi': {
    muscles: 'Aftanlæri · rass',
    steps: [
      'Byrjaðu í mjaðmalyftu – mjaðmirnar uppi og iljarnar í gólfinu.',
      'Gakktu með fæturna smá skref út frá þér á hælunum á meðan mjaðmirnar haldast uppi.',
      'Farðu eins langt og þú ræður við án þess að mjaðmirnar sígi.',
      'Gakktu til baka í upphafsstöðu. Það er 1 endurtekning.',
    ],
    tips: ['Lítil skref.', 'Finnurðu fyrir krampa aftan í læri? Styttu leiðina.'],
    search: 'glute bridge walkout',
  },
  'mjaðmalyfta með teygju og lóði': {
    muscles: 'Rass · hliðar mjaðma',
    steps: [
      'Settu teygju um lærin rétt fyrir ofan hnén og leggðu handlóð yfir mjaðmirnar.',
      'Ýttu hnjánum út á móti teygjunni.',
      'Lyftu mjöðmunum upp og kreistu rassinn efst.',
      'Láttu síga rólega niður og haltu spennu á teygjunni allan tímann.',
    ],
    tips: ['Ekki láta hnén falla inn.'],
    search: 'banded dumbbell glute bridge',
  },
};

export function getGuide(name: string): Guide | undefined {
  return guides[name.trim().toLowerCase()];
}

export function videoUrl(name: string) {
  const q = getGuide(name)?.search ?? `${name} exercise form`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

// Stutt upphitun (~5 mín) – án hopps og djúpra hnébeygja.
export const warmup: ChecklistItem[] = [
  { id: 'w1', name: 'Rösk ganga eða létt þol', detail: '2 mín' },
  { id: 'w2', name: 'Handahringir fram og aftur', detail: '30 sek' },
  { id: 'w3', name: 'Teygja dregin í sundur', detail: '15 endurt.' },
  { id: 'w4', name: 'Armbeygjur við vegg', detail: '10 endurt.' },
  { id: 'w6', name: 'Mjaðmahringir standandi', detail: '10 hvora átt' },
  { id: 'w5', name: 'Upphitunarsett – fyrsta æfing, létt', detail: '10 endurt.' },
];

export type ChecklistItem = { id: string; name: string; detail: string; how?: string };

// Teygjur eftir æfingu (~8–10 mín). Engar teygjur á hnjánum.
export const cooldownLegs: ChecklistItem[] = [
  { id: 'c1', name: 'Framanlæristeygja standandi', detail: '30 sek hvor', how: 'Styddu þig við vegg, gríptu um ökklann og dragðu hælinn rólega að rassinum.' },
  { id: 'c2', name: 'Mjaðmabeygjuteygja standandi', detail: '30 sek hvor', how: 'Langt skref fram, aftari fótur beinn, kreistu rassinn og ýttu mjöðminni fram.' },
  { id: 'c3', name: 'Aftanlæristeygja liggjandi', detail: '45 sek hvor', how: 'Á bakinu, teygja um ilina og dragðu beinan fótinn upp.' },
  { id: 'c4', name: 'Rassteygja (mynd 4)', detail: '45 sek hvor', how: 'Á bakinu, ökkli yfir hitt hnéð og dragðu lærið að þér.' },
  { id: 'c5', name: 'Kálfateygja við vegg', detail: '30 sek hvor', how: 'Hendur á vegg, aftari fótur beinn og hællinn í gólfinu.' },
  { id: 'c6', name: 'Innanlæristeygja sitjandi', detail: '45 sek', how: 'Sestu með iljarnar saman og láttu hnén síga rólega út.' },
  { id: 'c7', name: 'Snúningur liggjandi', detail: '30 sek hvor', how: 'Á bakinu, láttu beygð hnén falla til hliðar og horfðu í hina áttina.' },
  { id: 'c8', name: 'Róleg öndun liggjandi', detail: '1 mín', how: 'Inn um nefið á 4 sek, út á 6 sek.' },
];

export const cooldownUpper: ChecklistItem[] = [
  { id: 'u1', name: 'Brjóstteygja við vegg', detail: '30 sek hvor', how: 'Framhandleggur á vegg í axlarhæð, snúðu bolnum rólega frá veggnum.' },
  { id: 'u2', name: 'Axlarteygja þvert yfir', detail: '30 sek hvor', how: 'Dragðu beina höndina yfir bringuna með hinni hendinni.' },
  { id: 'u3', name: 'Þríhöfðateygja yfir höfði', detail: '30 sek hvor', how: 'Hönd aftur fyrir höfuð og ýttu olnboganum létt niður.' },
  { id: 'u4', name: 'Bakteygja við vegg', detail: '45 sek', how: 'Hendur á vegg, gakktu aftur og ýttu bringunni niður á milli handanna.' },
  { id: 'u5', name: 'Tvíhöfðateygja við vegg', detail: '30 sek hvor', how: 'Lófi á vegg fyrir aftan þig, beinn handleggur, snúðu þér rólega frá.' },
  { id: 'u6', name: 'Hálsteygja til hliðar', detail: '30 sek hvor', how: 'Hallaðu eyranu að öxlinni, hin öxlin slök niður.' },
  { id: 'u7', name: 'Snúningur liggjandi', detail: '30 sek hvor', how: 'Á bakinu, láttu beygð hnén falla til hliðar og horfðu í hina áttina.' },
  { id: 'u8', name: 'Róleg öndun liggjandi', detail: '1 mín', how: 'Inn um nefið á 4 sek, út á 6 sek.' },
];

export function cooldownFor(title: string): ChecklistItem[] {
  return /fætur|neðri/i.test(title) ? cooldownLegs : cooldownUpper;
}
