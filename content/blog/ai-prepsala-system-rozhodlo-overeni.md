---
title: "Přechod na nový systém s AI: kód je rychlý, ověření ne"
description: "Anthropic nechal Clauda přepsat svůj hlavní systém. První verze byla asi za týden, ověřování pět měsíců. Co z toho plyne pro váš přechod na nový systém."
date: 2026-11-25
author: Tomáš Andrlík
category: Automatizace
---

Anthropic, firma, která vyvíjí AI Claude, nechal Clauda přepsat systém, přes který k Claudovi chodí požadavky zákazníků i jejich vlastních aplikací. Jádro měl Claude v první verzi hotové asi za týden. Ověřování, jestli nový systém dělá to samé co starý, pak na skutečném provozu běželo od dubna do září 2026, tedy zhruba pět měsíců. Pro každou firmu, která plánuje přechod na nový systém, je v tom jednoduchá lekce: psaní softwaru zlevnilo, drahé zůstalo ověření.

:::kostka
- Anthropic přepsal svůj hlavní systém z Pythonu do Rustu, rychlejšího programovacího jazyka. První verzi jádra napsal Claude asi za týden.
- Automatické testy prošly zhruba z 98 %. Na skutečném provozu se ale se starým systémem shodovala jen asi čtvrtina porovnávaných požadavků.
- Rozhodlo porovnávání starého a nového systému na skutečném provozu. Starý systém sloužil jako vzor správného chování.
- Co je správně, musel rozhodnout člověk. AI jednou navrhla „opravu“, která shodu jen obešla.
- Pro vás z toho plyne, že nový systém je hotový, až je doložené, že funguje na vašich skutečných datech. Předvedení to nedokazuje.
:::

## Co Anthropic udělal

Systém, o který jde, je vstupní brána ke Claudovi. Projde jím každý požadavek, ať přijde od firmy, která Clauda používá ve svém produktu, nebo z aplikací samotného Anthropicu. Původně vznikl v roce 2023. Podle [článku, který Anthropic zveřejnil 25. 11. 2026](https://www.anthropic.com/research/migrating-api-to-rust), od začátku roku 2024 do podzimu 2026 vzrostl provoz zhruba 1 800krát a provoz starého řešení byl na každý požadavek drahý.

Rozhodli se ho proto přepsat z Pythonu, ve kterém vznikl, do rychlejšího Rustu. Psaní nechali z velké části na Claudovi a jádro měl v první verzi asi za týden. Ověřování na skutečném provozu pak trvalo od dubna do září 2026, kdy na nový systém přešel veřejný provoz. To je zhruba pět měsíců.

Výsledek podle Anthropicu stojí za to. Nový systém potřebuje asi o 70 % méně výpočetního výkonu na jeden požadavek a o víc než 80 % méně paměti. Medián čekání na první část odpovědi klesl asi o 20 %. Autoři sami upozorňují, že jde o přibližná čísla změřená jen na části provozu.

Celý příběh shrnují jednou větou: „Verification, not generation, had become the bottleneck.“ Úzkým hrdlem už nebylo napsat kód, ale ověřit ho.

## Testy prošly, a přesto to nefungovalo

Tohle je pro firmu nejdůležitější část celé zprávy. V dubnu nový systém prošel zhruba 98 % automatických testů. Kdo by se díval jen na testy, prohlásil by ho za skoro hotový. Když ho ale pustili na skutečný provoz a porovnali se starým, shodovalo se zadání, které oba systémy sestavily pro Clauda, jen asi u čtvrtiny porovnávaných požadavků. Začátkem května shoda krátce klesla na 6,5 %. Autoři poznamenávají, že se v čase měnilo, co se porovnávalo.

Proč testy klamou? Píšou je lidé, kteří vědí, jak má systém fungovat, a testují případy, na které si vzpomenou. Skutečný provoz přinese kombinace, na které nepomyslel nikdo. Anthropic navíc při kontrole našel přes 100 míst, kde převedené testy kontrolovaly méně, než měly. Zelená barva tak hlásila úspěch i tam, kde žádný nebyl.

Ve firmě to vypadá úplně stejně, jen se tomu neříká testy. Říká se tomu předvedení. Dodavatel ukáže nový systém na třech vzorových zakázkách, všechno sedí a všichni kývnou. Pak přijde první skutečný měsíc a s ním zakázka se slevou na položku, faktura rozdělená na dvě střediska a zákazník, který je v evidenci dvakrát pod jiným názvem. Tyhle věci ve vzorových datech nebyly.

:::pozor
Úspěšné předvedení není důkaz. Dokazuje jen to, že systém zvládne situace, které si někdo předem připravil. Ptejte se, na jakých datech bylo ověřené, a chtějte vidět výsledek na svých vlastních.
:::

## Starý systém jako vzor

Anthropic neměl dokonalý popis toho, jak se má nový systém chovat. Měl ale něco lepšího: starý systém, který roky fungoval. Nechali proto obě verze běžet vedle sebe na stejném provozu a výsledky porovnávali. Každý rozdíl roztřídili podle příčiny a postupně odstraňovali. V srpnu se u 99,6 % porovnávaných požadavků shodovalo zadání, které oba systémy posílaly Claudovi.

Tenhle princip funguje i u přechodu z Excelu do CRM nebo z CRM do ERP. Nejlepší měřítko správnosti je to, co ve firmě dnes funguje a čemu lidé věří:

- měsíční report, který jde na poradu, vychází v novém systému na stejná čísla,
- faktury za uzavřený měsíc sedí na korunu,
- počet otevřených zakázek a jejich stav odpovídá,
- obchodník najde své klienty se stejnou historií.

Když čísla nesedí, je to pro dodavatele cenná informace. Buď je chyba v novém systému, nebo se ukáže, že starý systém něco počítal jinak, než si všichni mysleli. I to se stává a je lepší to vědět před přechodem než po něm.

## Kde musí rozhodnout člověk

Nejzajímavější detail ze zprávy je malý. AI v jednu chvíli navrhla úpravu, se kterou výsledky obou systémů seděly. Seděly ale jen proto, že úprava obešla část, kterou nový systém před spuštěním stejně musel umět. Kontrola shody to nepoznala. Inženýr úpravu zamítl.

AI se snaží splnit zadaný cíl. Když je cílem „ať se to shoduje“, může navrhnout i cestu, která shodu splní, ale nic nevyřeší. U Anthropicu se to stalo a zachytil to člověk. Proto v Anthropicu nechávali konečné slovo lidem. A připomínky, které se opakovaly, převedli na pravidla a trvalé kontroly, aby se stejná chyba nevracela.

| Co může dělat AI | Co musí schválit člověk |
|---|---|
| napsat první verzi systému | co je pro firmu správný výsledek |
| porovnat tisíce záznamů starého a nového systému | jestli je rozdíl chyba, nebo vědomá změna |
| roztřídit rozdíly podle příčiny | které rozdíly se smí přijmout |
| navrhnout opravu | jestli oprava řeší problém, nebo ho jen schovává |
| hlídat, aby se opravené chyby nevrátily | kdy je systém připravený na ostrý provoz |

Pravá strana tabulky je práce pro někoho, kdo zná vaši firmu. Typicky je to člověk z účtárny, vedoucí obchodu nebo vy.

:::tip Z praxe
U firmy s montážemi a odečty teď připravujeme přechod z CRM na systém na míru. Než do nového systému převezmeme data, ověřili jsme na zkoušku, že jde obnovit ze zálohy. Převod dat budeme ověřovat proti starému systému, ne jen testy. Firma tak uvidí na vlastních záznamech, že je všechno na svém místě, a teprve potom se starý systém přestane používat.
:::

U nás tomu říkáme „hotovo = důkaz“. Každé řešení má automatickou kontrolu a bez ní ho nepředáváme. Kód, data i přístupy navíc zůstávají vám. Víc o tom, co stavíme, najdete na stránce [služby](/sluzby/).

## Kdy se souběh nevyplatí

Nechat starý a nový systém běžet vedle sebe něco stojí. Hlavně čas lidí, kteří porovnávají výsledky a rozhodují o rozdílech. Tohle je potřeba zvážit předem:

:::pozor
- **Malá firma s jednoduchou evidencí.** Když jde o pár desítek zakázek měsíčně, často stačí převést data, projít je ručně a starý systém si nechat jen pro čtení.
- **Úplně nový proces.** Pokud v novém systému zavádíte něco, co jste dřív nedělali vůbec, starý vzor neexistuje. Pak musíte správné chování popsat a odsouhlasit předem.
- **Vědomé změny.** Když nový systém má počítat jinak než starý (nové ceny, jiné rozdělení nákladů), rozdíly se nedají brát jako chyby. Musí být sepsané dopředu, jinak se v nich porovnávání utopí.
:::

## Co s tím udělat jako první

Nemusíte čekat na dodavatele. Tohle si připravíte sami a každý přechod na nový systém s tím půjde rychleji a bezpečněji:

:::kroky
1. Sepište 5–10 situací, které musí nový systém zvládnout stejně jako ten dnešní. Vzorovou zakázku, fakturu, dobropis, a hlavně výjimky, kvůli kterým dnes někdo něco dělá ručně.
2. Uložte si výstupy ze starého systému za jeden uzavřený měsíc. Reporty, faktury, seznam otevřených zakázek. To bude váš vzor.
3. Domluvte se s dodavatelem, jak doloží, že nový systém funguje, a na jakých datech. Odpověď „ukážeme vám to“ nestačí.
4. Určete, kdo za vás řekne „ano, je to správně“. Jeden konkrétní člověk s časem na to.
5. Starý systém nevypínejte, dokud čísla nesedí.
:::

Pokud teprve hledáte, co by se u vás dalo zautomatizovat, projděte si [katalog automatizací](/katalog/).

## Časté otázky

### Napíše dnes AI firemní software sama?

První verzi napíše rychle, jak ukazuje i případ Anthropicu. Hotový software to ale není. Musí ho někdo ověřit na skutečných datech, rozhodnout o každém rozdílu a odpovídat za výsledek. V Anthropicu tahle část běžela od dubna do září 2026 a rozhodovali v ní lidé.

### Jak poznám, že nový systém opravdu funguje?

Porovnáte ho s tím, co funguje dnes. Stejná data, stejné období, stejné výstupy: reporty, faktury, stav zakázek. Když se shodují, nebo když umíte vysvětlit každý rozdíl, systém funguje. Úspěšné předvedení na vzorových datech to neprokazuje.

### Jak dlouho nechat starý a nový systém běžet vedle sebe?

Aspoň přes jedno celé období, které má pro firmu význam, typicky přes uzavření měsíce. Tam se ukáže většina výjimek. U složitějších systémů déle. Konec souběhu určují čísla, která sedí. Kalendář ho neurčuje.

### Je software napsaný s pomocí AI méně spolehlivý?

Spolehlivost určuje hlavně to, jak důkladně kód někdo ověřil. Anthropic s kódem od Clauda došel v srpnu ke shodě zadání u 99,6 % porovnávaných požadavků a k tomu k nižší provozní náročnosti. Dubnová verze přitom seděla na skutečném provozu jen u čtvrtiny požadavků.

### Kolik stojí přechod na nový systém?

Záleží na tom, kolik dat převádíte, kolik má firma výjimek a jestli je s čím porovnávat. Ceny na web nedáváme, protože dva přechody nejsou stejné. Na telefonátu vám řekneme, s čím počítat u vás.

Zaujalo vás, jak bezpečně přejít na nový systém? [Domluvte si telefonát](/kontakt/) a zjistěte, jak můžeme i vám pomoci šetřit čas a klidně spát.
