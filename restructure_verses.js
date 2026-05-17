const fs = require('fs');
const path = require('path');

const versesPath = path.join(process.cwd(), 'src/data/verses.json');
const verses = JSON.parse(fs.readFileSync(versesPath, 'utf8'));

const newVerses = [];

verses.forEach(v => {
    if (v.id < 25) {
        newVerses.push(v);
    } else if (v.id === 25) {
        // Split Verse 25 into 25 and 26

        // English Split
        // Old:
        // "Here I shall clearly write of how
        // When he was Ambarāja long ago,
        // Manjushri aroused bodhichitta
        // As was described within The Sutra
        // Of the Array of Qualities
        // Of Manjushri’s Buddha Realm."

        const engLines = v.english.split('\n');
        // Let's split first 2 lines for 25, rest for 26?
        // "Here I shall clearly write of how / When he was Ambarāja long ago,"
        const eng25 = engLines.slice(0, 2).join('\n');
        const eng26 = engLines.slice(2).join('\n');

        // Tibetan Split
        // Old has 6 lines.
        const tibLines = v.tibetan.split('\n');
        const tib25 = tibLines.slice(0, 2).join('\n');
        const tib26 = tibLines.slice(2).join('\n');

        newVerses.push({
            id: 25,
            chapter: v.chapter,
            scope: v.scope,
            tibetan: tib25,
            english: eng25,
            logic_link: [26]
        });

        newVerses.push({
            id: 26,
            chapter: v.chapter, // Same chapter
            scope: v.scope,
            tibetan: tib26,
            english: eng26,
            logic_link: [27]
        });

    } else {
        // Shift ID (old 26 -> new 27)
        const newV = { ...v, id: v.id + 1 };

        // Update logic links inside this verse
        if (newV.logic_link) {
            newV.logic_link = newV.logic_link.map(l => l >= 26 ? l + 1 : l);
            // Warning: Old 26 pointed to 27. 
            // If we blindly map l >= 26 to l+1:
            // Old 26 (now 27) pointed to 27. Should point to 28.
            // Old 25 pointed to 26.
            // Wait, logic links are IDs.
            // Old 26 linked to [27]. Now New 27 (was 26) should link to 28 (was 27).
            // Yes.
        }
        newVerses.push(newV);
    }
});

// also fix logic links for IDs < 25
newVerses.forEach(v => {
    if (v.id < 25 && v.logic_link) {
        v.logic_link = v.logic_link.map(l => l >= 26 ? l + 1 : l);
        // if old 24 linked to 25, it stays 25.
        // if old 24 linked to 26 (unlikely), it becomes 27.
        // Actually, if old 24 linked to 25, that's fine. 25 is the new split start.
    }
});

// Now apply Sanskrit text accurately from Bpp_1 to Bpp_69
const sanskritRaw = `
namo bodhisattvāya mañjuśriye kumārabhūtāya /


kālatrayākhilajināṃśca tadīyadharmān saṅghān mahādaratayā praṇipatya cāpi /
bodhiprabheṇa kathito viśadīkaromi śiṣyottamena khalu bodhipathapradipam // Bpp_1 //
puruṣāstrividhā jñeyā uttamādhamamadhmāḥ /
likhyate lakṣaṇaṃ teṣāṃ sphuṭaṃ pratyekabhedataḥ // Bpp_2 //
upāyena tu kenāpi kevalaṃ saṃsṛteḥ sukham /
svasyaivārthe ya īheta jñeyaḥ so puruṣo 'dhamaḥ // Bpp_3 //
pāpakarmanivṛttātmā bhavasukhāt parāṅmukhaḥ /
ātmanirvāṇamātrārthī yo naro madhyamastu saḥ // Bpp_4 //
svasantānagatairduḥkhairduḥkhasyānyasya sarvathā /
sarvasya yaḥ kṣayaṃ kāṅkṣeduttamaḥ puruṣastu saḥ // Bpp_5 //
kāṅkṣanto hi varāṃ bodhiṃ sattvānāmuttamāstathā /
darśitān gurubhistebhyaḥ sadupāyāṃ pracakṣmahe // Bpp_6 //
sambuddhacitramūrtyādistūpasaddharmasammukhaḥ /
puṣpaidhupaiḥ padārthaiśca yathāprāptaiḥ supūjayet // Bpp_7 //
samantabhadracaryoktā pūjā saptavidhāpi ca /
bodhisārasya paryantam avaivartikacittataḥ // Bpp_8 //
suśraddhayā triratneyaḥ bhumau saṃsthāpya jānunī /
bhūtvā kṛtāñjaliścāpi triścādau śaraṇaṃ vrajet // Bpp_9 //
tataḥ samastasattveṣu maitrīcitta puraskṛtaḥ /
durgatitrayājanmādisaṅkrāntimaraṇādibhiḥ // Bpp_10 //
dṛṣṭvāśeṣaṃ jagaddukhaṃ duḥkhena dukhitāyāśca /
duḥkhahetostathā duḥkhāt jagatāṃ muktikāṅkṣayā // Bpp_11 //
bodhicittaṃ samutpādyamanāpāyipratijñayā /
evaṃ praṇidhicittānām utpādetu guṇāśca ye // Bpp_12 //
te gaṇḍavyūhasūtreṣu maitreyeṇa prabhāṣitāḥ /
sūtrasya tasya paṭhanācchravaṇād gurorvā
sambodhicittaguṇakāni nirantakāni // Bpp_13 //
vijñāya tasya khalu saṃsthitārarṇāna /
cittaṃ tathā samudayeta muhurmuhaśca /
vīradattaparīpṛcchāsūtre puṇyaṃ pradarśitam // Bpp_14 //
yattacślokatrayeṇaiva samāsenātralikhyate /
bodhicittāddhi yatpuṇyaṃ tacca rupi bhavedyadi // Bpp_15 //
ākāśadhātuṃ sampūrya bhuyaścottari tadbhavet /
gaṅgāvālikasaṅkhyāni buddhakṣetrāṇi yo naraḥ // Bpp_16 //
dadyātsadratna pūrṇāni lokanāthebhya eva hi /
yaścaikaḥ prāñjalirbhūtvā cittaṃ bodhāya nāmayet // Bpp_17 //
iyaṃ viśeṣyate pūjā yasyānto 'pi na vidyate /
utpādyabodhipraṇidhānacittaṃ naikaprayatnaiḥ parivardhitavyam // Bpp_18 //
janmāntare 'pi smaraṇārthamasya śikṣā yathoktā paripālanīyā /
prasthānacitte svayamātiriktaṃ samyagbhavenna praṇidhānavṛddhiḥ // Bpp_19 //
sambodhisaṃvāra vivṛddhikāmaḥ tasmād dhruvaṃ cainamavāpnuyāta /
saptadhāprātimokṣaiśca sadānyasaṃvarānvitaḥ // Bpp_20 //
bhāgyaṃ bodhisattvānāṃ saṃvarasya na cānyathā /
saptadhā prātimokṣeṣu bhāṣiteṣu tathāgataiḥ // Bpp_21 //
brahmacaryaśriyaḥ śreṣṭhāḥ bhikṣusaṃvara iṣyate /
śīlādhyāyoktavidhinā bodhisattvasya bhumiṣu // Bpp_22 //
saṃvaraḥ sadgurorgrāhyaḥ samyaglakṣaṇayuktataḥ /
yaḥ saṃvaravidhau dakṣaḥ svayaṃ ca saṃvare sthitaḥ // Bpp_23 //
kṛpāluḥ saṃvare śaktaḥ jñātavyaḥ sadgurustu saḥ /
tatra yatnena na prāpto guruścaitādṛśo yadi // Bpp_24 //
saṃvaragrahaṇasyānyo vidhiḥ tasmāt samuyacte /
ambararājabhutena pūrvaṃ mañjuśriyā yathā // Bpp_25 //
bodhicittaṃ samutpādi suspaṣṭaṃ cātra likhyate /
mañjuśribuddhakṣetrālaṅkārasūtroktivat tathā // Bpp_26 //
utpādayāmi sambodhau cittaṃ nāthasya sammukham /
nimantraye jagatsarvaṃ dāridyānmocitāsmi tat // Bpp_27 //
vyāpādakhilacittaṃ vā īrṣyāmātsaryameva va /
adhyāgre na kariṣyāmi bodhiṃ prāpsyāmi yāvatā // Bpp_28 //
brahmacaryaṃ cariṣyāmi kāmāṃstyakṣyāmi pāpakān /
buddhānāmānuśikṣiṣye śīlasaṃvara saṃyame // Bpp_29 //
nāhaṃ tvaritarupeṇa bodhiṃ prāptumihotsahe /
parāntakoṭiṃ sthāsyāmi sattvasyaikasya kāraṇāt // Bpp_30 //
kṣetraṃ viśodhiṣyāmi aprameyamacintim /
nāmadheyaṃ kariṣyāmi daśadikṣu ca viśrutam // Bpp_31 //
kāyavākkarmaṇī cāhaṃ śodhayiṣyāmi sarvaśaḥ /
śodhayiṣye manaskarma kartāsmi nāśabham // Bpp_32 //
svakāyavākacittaviśuddhihetu, prasthānacittātmayamasthitena /
triśīlaśikṣāpariśiyeta cet, triśīlaśikṣāsu mahādarasyāt // Bpp_33 //
śuddhasambodhisattvānāṃ tasmāt saṃvarasaṃvṛtau /
yatnāt sambodhisambhāraḥ paripūrṇo bhaviṣyati // Bpp_34 //
puṇyajñānasvabhāvasya sambhārasya tu pūrtaye /
sarvabuddhamatoheturabhijñotpāda eva hi // Bpp_35 //
pakṣavṛddhiṃ vinā pakṣī khe noḍaḍetuṃ yathā kṣamaḥ /
tathābhijñābalairhīnaḥ sattvārthakaraṇe 'kṣamaḥ // Bpp_36 //
abhijñasya divārātrau yāni puṇyāni santi vai /
abhijñāyāśca rāhitye naiva janmaśateṣu ca // Bpp_37 //
śīghraṃ sambodhisambhāraṃ sampūrayitumicchati /
nirālasyena yatnenābhijñāṃ saṃsādhayettu saṃ // Bpp_38 //
śamathasiddhayabhāve 'bhijñānaṃ na jāyate /
ataḥ śamathasiddhayarthaṃ yatitavyaṃ punaḥ punaḥ // Bpp_39 //
śamathaṅgaprahīṇatve tadyatnairbhāvite 'pi ca /
saṃvatsarasahasraiśca samādhirnaiva setsyati // Bpp_40 //
ataḥ samādhisambhārādhyāyoktāṅgasamāśritaḥ /
kasmiṃścit alambane 'pi puṇye saṃsthāpayenmanaḥ // Bpp_41 //
yoginaḥ śamathe siddhe 'bhijñānaṃ cāpi setsyati /
prajñāpāramitāyogaṃ vinā nāvaraṇakṣayaḥ // Bpp_42 //
kleśajñeyāvṛtestasmāt prahāṇārthamaśeṣataḥ /
prajñāpāramitāṃ yogī sopāyaṃ bhāvayet sadā // Bpp_43 //
upāyarahitā prajñāpyupāyaḥ prajñayā vinā /
yato bandha iti proktau praheyaṃ nobhayaṃ tataḥ // Bpp_44 //
kā prajñā ka upāyaśca śaṅkāmiti nirāsitum /
upāyasya ca prajñāyāḥ bhedaḥ samyak prakāśyate // Bpp_45 //
prajñāpāramitāṃ tyaktvā dānapāramitādayaḥ /
sarve hi kuśalāḥ dharmāḥ upāyāḥ jinabhāṣitāḥ // Bpp_46 //
upāyābhyāsavaśyātmā yo hi prajñāṃ vibhāvayet /
śīghraṃ sa labhate bodhiṃ na nairātmyaikabhāvanāt // Bpp_47 //
skandhāyatanadhātūnāmanutpādāvabodhinām /
svabhāvaśūnyatājñānaṃ prajñeti parikīrtitā // Bpp_48 //
sadutpattirayuktāsti asaccāpi khapuṣpavat /
dvayordoṣaprasaṅgatvāt udbhāvo na dvayorapi // Bpp_49 //
anutpannaḥ svato bhāvo parato nobhayorapi /
ahetuteśca no tasmāt niḥsvabhāvaḥ svarupataḥ // Bpp_50 //
athavā sarvadharmāṇāṃ caikānekavicāraṇe /
svarupāprāpyamāṇatvāt niḥsvabhāvatvaniścayaḥ // Bpp_51 //
śunyatāsaptau yuktau mūlamadhyamakādiṣu /
siddho bhāvasvabhāvastu śunyatāyāṃ bhāṣitaḥ // Bpp_52 //
granthasya gauravo yasmāt atra tasmānna vistaraḥ /
siddhasiddhāntamātraikaṃ bhāvanārthaṃ prabhāṣitam // Bpp_53 //
tasmādaśeṣadharmāṇāṃ svabhāvanāmalābhataḥ /
nairātmyabhāvanā yā hi sā prajñāyāstu bhāvanā // Bpp_54 //
prajñayā sarvadharmaṇāṃ yatsvabhāvo na dṛṣṭavat /
yuktayā parīkṣya tāṃ prajñāṃ so 'vikalpena bhāvayet // Bpp_55 //
bhavo vikalpobhūto 'yaṃ tadvikalpātmakastataḥ /
sarvakalpaparityāgaḥ nivārṇaḥ paramo 'sti hi // Bpp_56 //

evamapyuktaṃ bhagavatā - -

mahāvidyā vikalpo hi saṃsārārṇavapātakaḥ /
nirvikalpasamādhisthe 'vikalpo bhāsate khavat // Bpp_57 //

avikalpapraveśadhāraṇyāmapi uktam - -

cintitenirvikalpe 'smin saddharme jinaputrakaiḥ /
vikalpaṃ durgamaṃ tīrtvāvikalpo prāpsyate kramāt // Bpp_58 //
niścayīyāgamayuktibhyāṃ svabhāva rahitān tathā /
sarvān dharmānutpannānavikalpaṃ bhāvayet // Bpp_59 //
bhāvayannidamevetthaṃ prāpyoṣṇatvādikaṃ kramāt /
labhate pramuditvādiṃ buddhabodhirna lambitā // Bpp_60 //
sādhitairmantraśaktayā hi śāntivistarakarmabhiḥ /
bhadrakumbhādisiddhāṣṭamahāsiddhibalena ca // Bpp_61 //
abhīṣṭā bodhisambhāraparipūrtiḥ sukhena cet /
kriyācaryādi tantrokam guhyācaraṇabhiṣyate // Bpp_62 //
tadācāryabhiṣekārthaṃ mahāratnādidānataḥ /
sadguruṃ prīṇayed bhaktayā sarvāñjñādipālanaiḥ // Bpp_63 //
prasanne ca gurau bhūte pūrṇācāryābhiṣekataḥ /
sarvapāpaviśuddhātmā siddhibhāgī bhaviṣyati // Bpp_64 //
ādibuddhamahātantre prayatnena niṣedhataḥ /
guhyaprajñābhiṣekastu na grahyā brahmacārariṇā // Bpp_65 //
so 'bhiṣeko gṛhītaścet brahyacaryatapaḥ sthitaiḥ /
niṣiddhācaraṇatvāt tattapaḥ samvarakṣayaḥ // Bpp_66 //
jāyante vratinastasya pārājikavipattayaḥ /
saḥ pateddurgatau nūnaṃ siddhirnaiva kadācana // Bpp_67 //
sarvatantraśrutau bhāṣye homayajñādikarmāsu /
labdhācāryābhiṣekaśca tattvavida naiva duṣyati // Bpp_68 //
dīpaṅkaraśriyā bodhipathaḥ proktaḥ samāsataḥ /
dṛaṣṭvā sūtrādidharmoktiṃ bodhiprabhanivedanāt // Bpp_69 //
`;

const parts = sanskritRaw.split(/\/\/ Bpp_(\d+) \/\//);
const bppVerses = {};
bppVerses[1] = parts[0].trim();
for (let i = 1; i < parts.length; i += 2) {
    const nextText = parts[i + 1];
    if (nextText && i + 2 < parts.length) {
        bppVerses[parseInt(parts[i + 2])] = nextText.trim();
    }
}

// Assign correct Sanskrit
newVerses.forEach(v => {
    if (bppVerses[v.id]) {
        v.sanskrit = bppVerses[v.id];
    }
});

fs.writeFileSync(versesPath, JSON.stringify(newVerses, null, 2));
console.log("Restructured to 69 verses with aligned Sanskrit");
