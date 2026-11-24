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

## Gögn

- Allt vistast á tækinu (AsyncStorage / localStorage í Safari).
- Æfingum er breytt í appinu: Æfingar → dagur → Breyta.

## Næstu skref

1. Tilkynningar á æfingadögum
2. Skrá þyngdir í hverju setti
