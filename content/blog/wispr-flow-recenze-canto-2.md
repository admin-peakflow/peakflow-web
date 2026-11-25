---
title: "Wispr Flow: recenze po půl roce a nový model Canto-2"
description: "Wispr Flow používáme v PeakFlow přes půl roku. Jak funguje v češtině, co přináší model Canto-2, kolik stojí a na co si dát pozor u firemních dat."
date: 2026-11-25
author: Tomáš Andrlík
category: Nástroje
---

Wispr Flow je aplikace, která přepíše, co řeknete, přímo tam, kde máte kurzor: do e-mailu, do CRM, do dokumentu. V PeakFlow ho používáme přes půl roku a 24. listopadu 2026 k němu Wispr vydal nový model pro převod řeči na text Canto-2. Náš verdikt: kdo ve firmě hodně píše, ušetří čas od prvního dne. U češtiny a firemních dat ale musíte vědět, co nastavit.

:::kostka
- Podržíte klávesu, mluvíte, pustíte. Text se vloží do aplikace, ve které právě pracujete, i s interpunkcí.
- Česky diktujeme a funguje to. Češtinu ale musíte zapnout ručně a mezi 14 jazyky, na kterých Wispr Canto-2 testoval, není.
- V testu Wispru má Canto-2 v angličtině zhruba 2,7 % chyb, o více než 15 % méně než předchozí verze. V průměru 14 dalších jazyků má o 36 % méně chyb. Nezávislé ověření jsme nenašli.
- Verze zdarma dává 2 000 slov týdně na počítači. Pro stojí 15 USD měsíčně, při ročním placení 12 USD.
- Data se zpracovávají v USA a sdílení pro zlepšování modelu je ve výchozím nastavení zapnuté. Vypněte ho dřív, než začnete diktovat firemní věci.
:::

## Co je Wispr Flow a jak funguje

Na počítači podržíte klávesu (Fn na Macu, Ctrl+Win na Windows) a řeknete, co chcete napsat. Po puštění se text objeví tam, kde stojí kurzor. Nic nekopírujete a nepřepínáte okna. Na iPhonu se diktuje přes klávesnici Flow, na Androidu přes plovoucí bublinu.

Wispr Flow nepřepisuje doslova. Podle [dokumentace](https://docs.wisprflow.ai/articles/5373093536-how-do-i-use-smart-formatting-and-backtrack) doplní interpunkci a velká písmena, na počítači vyhodí vycpávková slova a když se v půlce věty opravíte („ve čtvrtek, vlastně v pátek“), zapíše jen opravenou verzi. Výčet nadiktovaný jedním dechem udělá jako seznam.

| Zařízení | Podmínka |
|---|---|
| Mac | macOS 12 a novější |
| Windows | Windows 10 a 11, jen počítače s procesorem x64 |
| iPhone | iOS 18.3 a novější |
| Android | Android 13 a novější |

iPad, Linux ani Chromebook podle [systémových požadavků](https://docs.wisprflow.ai/articles/1036674442-supported-devices-and-system-requirements) podporované nejsou. Bez internetu Wispr Flow nediktuje.

Jestli vám diktování sedne, zjistíte nejrychleji tak, že si [Wispr Flow vyzkoušíte zdarma](https://ref.wisprflow.ai/tomas-andrlik "affiliate") (partnerský odkaz).

## Co je nového: Canto-2

Canto-2 je nový model pro převod řeči na text, který Wispr představil 23. a 24. listopadu 2026. Podle Wispru je desetkrát větší než předchozí Canto-1. Čísla níže pocházejí z jeho [vlastního článku o modelu](https://wisprflow.ai/canto-2).

- Angličtina: na 10 hodinách skutečných diktátů z Flow měl Canto-2 chybovost zhruba 2,7 %, o více než 15 % méně než Canto-1.
- Čtrnáct dalších jazyků: průměrná chybovost klesla z 9,9 % u Canto-1 na 6,3 %, tedy o 36 %. Test zahrnoval mimo jiné němčinu, polštinu, ruštinu, francouzštinu a španělštinu.
- Jména a odborné termíny ze slovníku: Canto-2 jich v testu zachytil správně 69 %, Canto-1 41 %.

Ne v každém jazyce je první. V polštině měl v testu Wispru nižší chybovost jiný z porovnávaných modelů a ve španělštině vyšel jiný model stejně. Je fér, že to Wispr sám zveřejnil.

Model se spouští postupně. K 25. 11. 2026 podle [přehledu novinek](https://wisprflow.ai/whats-new) běží na všech platformách v Americe a do ostatních regionů se teprve dostává.

:::pozor Co z čísel neplyne
- Všechny testy dělal Wispr sám, z velké části na datech vlastních uživatelů. Nezávislé ověření jsme nenašli.
- Čeština v testu není. Pro české diktování žádné číslo nemáme my, ani Wispr.
- Úspěšnost u jmen klesá s velikostí slovníku: při 1 000 položkách byla v testu 54 %, při 2 000 položkách 46 %. Do slovníku dávejte jen to, co opravdu používáte.
- 36 % platí jen pro test neanglických jazyků, ne pro angličtinu.
:::

## Funkce, které ve firmě opravdu použijete

### Slovník

Jména klientů, názvy produktů, oborové zkratky. Zadáte je ručně a Wispr Flow se k tomu učí z vašich oprav. Pro obchodníka, který denně píše jména firem a kontaktních osob, je to první věc k nastavení. Slovník je ve všech plánech včetně verze zdarma.

### Hlasové zkratky

Řeknete krátkou frázi a vloží se celý připravený text: podpis, odkaz na rezervaci schůzky, standardní odpověď na častý dotaz. Podle [dokumentace](https://docs.wisprflow.ai/articles/5784437944-create-and-use-snippets) má spouštěcí fráze nejvýš 60 znaků a vložený text až 4 000 znaků. Taky ve všech plánech.

### Command Mode

Označíte text a hlasem řeknete, co s ním: zkrátit, přepsat formálněji, odpovědět. Umí napsat i nový text nebo něco najít na webu. Funguje jen na počítači, v placeném plánu nebo ve zkušební době, a zapíná se mezi experimentálními funkcemi.

### Notetaker na porady

Nahrává poradu přímo v zařízení, do hovoru se nepřipojuje žádný bot. Podle [dokumentace](https://docs.wisprflow.ai/articles/3512887047-use-notetaker-with-multiple-languages) umí 21 jazyků včetně češtiny a jazyk pozná sám. Běží na Macu, na Windows a od 19. 11. 2026 i na iPhonu. Používáme ho taky. Účastníkům vždycky řekněte, že poradu nahráváte.

## Psaní, vestavěné diktování, nebo Wispr Flow

Diktovat umí i systém v počítači a v telefonu, zadarmo. Rozdíl je v tom, co se s textem stane potom.

| | Psaní na klávesnici | Diktování zabudované v systému | Wispr Flow |
|---|---|---|---|
| Úprava textu | celá na vás | interpunkce, zbytek ručně | interpunkce, vycpávková slova, opravy přeřeknutí, seznamy |
| Jména klientů a termíny | píšete sami | liší se podle systému | vlastní slovník, učí se z oprav |
| Opakované texty | kopírujete | liší se podle systému | hlasové zkratky |
| Čeština | ano | na počítači ano | ano, zapnout ručně |
| Cena | nic | součást systému | zdarma do limitu, Pro 15 USD měsíčně |
| Internet | nepotřebuje | podle systému | potřebuje vždy |

Na krátkou zprávu v telefonu vám vestavěné diktování stačí. Wispr Flow dává smysl tam, kde byste nadiktovaný text jinak dlouho upravovali: u e-mailů, zápisů a delších zadání.

:::tip Z praxe: půl roku diktování v PeakFlow
Nejvíc nám Wispr Flow změnil věci, které se dřív odkládaly. Zápis po schůzce nadiktujeme hned, ještě v autě na parkovišti, dokud si pamatujeme detaily. Dlouhé zadání pro kolegu nebo klienta řekneme nahlas jako do telefonu a text pak jen projdeme. Stejně tak e-maily a poznámky po hovoru.

Klientům ho proto doporučujeme jako jednu z nejrychlejších výher. Obchodníkovi, asistentce nebo vedení ušetří čas od prvního dne, nic se nenapojuje a licenci si každý založí sám.
:::

## Kolik stojí

Ceny v USD podle [ceníku Wispru](https://wisprflow.ai/pricing) k 25. 11. 2026, limity verze zdarma podle [dokumentace](https://docs.wisprflow.ai/articles/9559327591-flow-plans-and-what-s-included):

| Plán | Cena | Co v něm je |
|---|---|---|
| Free | zdarma | 2 000 slov týdně na počítači, limit se obnovuje v neděli. Na mobilu je týdenní limit nižší a Wispr ho mění, aktuální hodnotu uvidíte v aplikaci |
| Pro | 15 USD měsíčně, nebo 144 USD ročně (12 USD měsíčně) | diktování bez týdenního limitu, Command Mode |
| Growth | 23 USD měsíčně, nebo 216 USD ročně; s Notetakerem 33 USD měsíčně, nebo 312 USD ročně | týmový plán, jednotné přihlášení (SSO) |
| Enterprise | na dotaz | správa uživatelů a zařízení, sdílení dat pro trénování napevno vypnuté |

Studenti mají slevu 50 %, pedagogové 40 %.

:::vypocet Vyplatí se vám Pro?
**Předpoklady (dosaďte svoje čísla):**
- Psaním e-mailů, zápisů a zadání strávíte M minut denně. V příkladu 60 minut.
- Nadiktovat stejný text vám zabere část toho času. V příkladu počítáme s polovinou. Je to ilustrační předpoklad, ne naměřené číslo. Kolik to bude u vás, ukáže týden zkoušení.
- Měsíc má 20 pracovních dní.

**Výpočet:**
- Ušetřeno denně: 60 × 0,5 = 30 minut.
- Za měsíc: 30 × 20 = 600 minut, tedy 10 hodin.
- Těch 10 hodin vynásobte tím, kolik vás hodina práce daného člověka stojí, a porovnejte s licencí Pro za 15 USD měsíčně.

Když za týden nadiktujete méně než 2 000 slov, vystačíte si s verzí zdarma.
:::

Plán Pro si můžete [předplatit přes náš partnerský odkaz](https://ref.wisprflow.ai/tomas-andrlik "affiliate"). Když si přes něj Wispr Flow předplatíte, dostaneme provizi. Vás to nestojí nic navíc a doporučujeme ho proto, že ho sami používáme.

## Na co se připravit

Než Wispr Flow nasadíte ve firmě, počítejte s těmito věcmi.

- Češtinu vyberete ručně. Automatické rozpoznání jazyka ji podle [dokumentace](https://docs.wisprflow.ai/articles/3191899797-use-flow-with-multiple-languages) nepozná. Občas se plete se slovenštinou.
- Data se zpracovávají v USA. Wispr je podle svých [bezpečnostních informací](https://docs.wisprflow.ai/articles/3467817258-security-and-compliance-faq) zpracovává a ukládá v USA, o hostingu v EU dokumentace nic neříká. Uvádí šifrování při přenosu i v úložišti, certifikace SOC 2 Type II a ISO/IEC 27001:2022 pro diktování a nabízí smlouvu o zpracování dat (DPA). Notetaker v těchto auditech zahrnutý není. Audio z porad maže po 7 dnech. **Jestli to stačí na data, se kterými pracujete, musí rozhodnout vaše firma.**
- Sdílení dat pro zlepšování modelu. Volba „Improve the model for everyone“ je ve výchozím nastavení zapnutá, pokud ji neomezuje tarif nebo správce. Jde [vypnout](https://docs.wisprflow.ai/articles/9609615338-private-cloud-sync-and-data-sharing-preferences-in-wispr-flow) a u firemního používání to doporučujeme udělat hned.
- Diktování vyžaduje internet. Ve vlaku bez signálu nebo na stavbě bez pokrytí nenadiktujete.
- Windows na počítačích x64. Notebooky s procesory ARM, třeba Snapdragon, podporované nejsou. Před nákupem licencí si to pro celý tým ověřte.
- Styly v angličtině. Přizpůsobení tónu podle aplikace, do které píšete, je podle dokumentace [jen pro angličtinu](https://docs.wisprflow.ai/articles/2368263928-how-to-setup-flow-styles).

A jedna věc, kterou žádná aplikace nevyřeší: nadiktovaný text si před odesláním přečtěte. Hlavně jména a čísla.

## Co s tím udělat jako první

:::kroky
1. Nainstalujte si verzi zdarma a týden diktujte všechno, co jde: e-maily, zápisy, zadání.
2. V nastavení ručně vyberte češtinu.
3. Do slovníku přidejte jména největších klientů, produktů a kolegů.
4. Vypněte sdílení dat pro zlepšování modelu.
5. Na konci týdne se podívejte, kolik slov jste nadiktovali. Pod 2 000 vám stačí Free, nad tím dosaďte svoje čísla do výpočtu výše.
:::

Wispr Flow si můžete [stáhnout tady](https://ref.wisprflow.ai/tomas-andrlik "affiliate") (partnerský odkaz, z předplatného dostaneme provizi). Diktování je jen jeden kus. Další práci, kterou lidé ve firmě dnes dělají ručně, najdete v [katalogu 15 automatizací](/katalog/) a v přehledu [našich služeb](/sluzby/).

## Časté otázky

### Umí Wispr Flow česky?

Ano. Češtinu si vyberete v nastavení, automatické rozpoznání jazyka ji ale nepozná, takže ji musíte zapnout ručně. My česky diktujeme a funguje to. Mezi 14 jazyky, na kterých Wispr testoval model Canto-2, čeština není, takže čísla o přesnosti pro ni neexistují.

### Je Wispr Flow zdarma?

Základní verze ano. Na počítači dává 2 000 slov týdně a limit se obnovuje každou neděli. Na mobilu je limit nižší a Wispr ho mění, aktuální hodnotu uvidíte v aplikaci. Plán Pro stojí podle ceníku Wispru k 25. 11. 2026 15 USD měsíčně, nebo 12 USD měsíčně při ročním placení.

### Co je Canto-2?

Nový model pro převod řeči na text, který Wispr vydal v listopadu 2026. V testech Wispru má v angličtině zhruba 2,7 % chyb, o více než 15 % méně než Canto-1, a ve 14 dalších jazycích v průměru o 36 % méně chyb. Spouští se postupně, nejdřív v Americe. Nezávislé ověření jsme nenašli.

### Je Wispr Flow bezpečný pro firemní data?

Wispr data šifruje, pro diktování má certifikace SOC 2 Type II a ISO/IEC 27001:2022 (Notetaker v nich zahrnutý není) a nabízí smlouvu o zpracování dat. Zpracování probíhá v USA a sdílení dat pro zlepšování modelu je ve výchozím nastavení zapnuté. Doporučujeme ho vypnout. Zda to stačí, rozhoduje vaše firma.

### Funguje Wispr Flow bez internetu?

Ne. Převod řeči na text probíhá v cloudu, takže bez připojení nediktujete. Na místech se slabým signálem, ve vlaku nebo na stavbě, s tím počítejte a mějte po ruce klávesnici nebo diktování zabudované v telefonu.

Zaujalo vás, kolik času jde ušetřit diktováním místo psaní? [Domluvte si telefonát](/kontakt/) a zjistěte, jak můžeme i vám pomoci šetřit čas a klidně spát.
