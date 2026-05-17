const fs = require('fs');
const path = require('path');

const versesPath = path.join(process.cwd(), 'src/data/verses.json');
const verses = JSON.parse(fs.readFileSync(versesPath, 'utf8'));

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

// Extract verses by // Bpp_X // marker
const verseMap = new Map();
const intro = "namo bodhisattvāya mañjuśriye kumārabhūtāya /\n\n";

const matches = [...sanskritRaw.matchAll(/(.*?) \/\/ Bpp_(\d+) \/\/[\n\r]*/gs)];
// This regex might fail across newlines if not global dotall. JS default regex dot doesn't match newline.
// Rewriting splitter.

const parts = sanskritRaw.split(/\/\/ Bpp_(\d+) \/\//);
// parts[0] is intro + verse 1 text
// parts[1] is '1'
// parts[2] is verse 2 text (with leading whitespace/newlines)
// parts[3] is '2'
// ...

if (parts.length < 2) {
    console.error("Failed to parse Sanskrit text");
    process.exit(1);
}

// Bpp_1 is in parts[0] but we need to strip invocation or keep it.
// IDs mapping:
// ID 1: parts[0] (which is Bpp_1 text + invocation)
// ID 2 .. 24: parts[2*(n-1)] where n is Bpp number?
// Let's iterate.
// parts[0] = text of Bpp_1
// parts[1] = "1"
// parts[2] = text of Bpp_2
// parts[3] = "2"

const bppVerses = {};
// Store Bpp 1 to 69
// Special handling for Bpp_1 to strip the start newline if needed.
bppVerses[1] = parts[0].trim();

for (let i = 1; i < parts.length; i += 2) {
    const verseNum = parts[i];
    const nextText = parts[i + 1];
    if (nextText && i + 2 < parts.length) {
        bppVerses[parseInt(parts[i + 2])] = nextText.trim();
    }
}

// Now map to JSON IDs
verses.forEach(verse => {
    let sanskritText = "";

    if (verse.id >= 1 && verse.id <= 24) {
        sanskritText = bppVerses[verse.id] || "";
    } else if (verse.id === 25) {
        // Merge Bpp_25 and Bpp_26
        sanskritText = (bppVerses[25] || "") + "\n" + (bppVerses[26] || "");
    } else if (verse.id >= 26 && verse.id <= 68) {
        // Shift by 1: ID 26 = Bpp_27
        sanskritText = bppVerses[verse.id + 1] || "";
    }

    if (sanskritText) {
        verse.sanskrit = sanskritText;
    }
});

fs.writeFileSync(versesPath, JSON.stringify(verses, null, 2));
console.log("Updated verses.json with Sanskrit text");
