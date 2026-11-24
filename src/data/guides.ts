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
};

export function getGuide(name: string): Guide | undefined {
  return guides[name.trim().toLowerCase()];
}

export function videoUrl(name: string) {
  const q = getGuide(name)?.search ?? `${name} exercise form`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

// Stutt upphitun (~5 mín) – án hopps og djúpra hnébeygja.
export const warmup = [
  { id: 'w1', name: 'Rösk ganga eða létt þol', detail: '2 mín' },
  { id: 'w2', name: 'Handahringir fram og aftur', detail: '30 sek' },
  { id: 'w3', name: 'Teygja dregin í sundur', detail: '15 endurt.' },
  { id: 'w4', name: 'Armbeygjur við vegg', detail: '10 endurt.' },
  { id: 'w5', name: 'Upphitunarsett – fyrsta æfing, létt', detail: '10 endurt.' },
];
