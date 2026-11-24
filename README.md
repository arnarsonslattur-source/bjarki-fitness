# Bjarki Fitness

iPhone æfingaapp – React Native, Expo, TypeScript, Expo Router.

## Keyra appið

```bash
npm install
npx expo install --fix   # samræmir pakkaútgáfur við Expo SDK
npx expo start
```

Skannaðu QR-kóðann með myndavélinni á iPhone (Expo Go appið þarf að vera uppsett – ókeypis).

## Uppbygging

```
app/
  _layout.tsx            Rótarleiðsögn (Stack, dökkt þema)
  (tabs)/_layout.tsx     Flipastika: Heim · Æfingar · Framfarir · Stillingar
  (tabs)/index.tsx       Heim
  (tabs)/aefingar.tsx    Vikuáætlun
  (tabs)/framfarir.tsx   Framfarir og hnéverkur
  (tabs)/stillingar.tsx  Áminningar og endurhæfing
  aefing/[dagur].tsx     Æfing dagsins (sett og endurtekningar)
src/
  theme.ts               Litir, bil, letur
  components/ui.tsx      Sameiginlegir íhlutir
  data/plan.ts           Vikuáætlun (sýnidögn)
```

## Öryggi

- Engar endurhæfingar- eða hnéálagsæfingar eru fyrirfram skráðar.
- Neðri líkami og endurhæfing eru læst þar til sjúkraþjálfari samþykkir.
- Æfingarnar í `src/data/plan.ts` eru staðgenglar sem á að breyta.

## Næstu skref

1. Vista æfingasögu á tæki (AsyncStorage)
2. Staðbundnar tilkynningar kl. 16:00 (expo-notifications)
3. Breyta tíma tilkynninga
4. Skrá hnéverk og bata
5. Ritill fyrir endurhæfingaræfingar með samþykki sjúkraþjálfara
