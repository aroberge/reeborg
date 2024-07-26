// the following is used in a few places below
var mac_user_save_files_en = ' <b>"Mac" naudotojai:</b> žiūrėkite <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Žinomos problemos</a>.';

exports.ui_lt = ui_lt = {};
exports.lt_to_en = lt_to_en = {};
exports.en_to_lt = en_to_lt = {};

ui_lt["lt-en"] =  "Mišrus režimas: vartotojo sąsaja lietuvių kalba; programavimo kalba anglų kalba." +
    "Mišrus režimas: naudotojo sąsaja lietuvių kalba; programavimo kalba anglų kalba.<br>";

ui_lt["SITE NAME"] = "Robočiuko pasaulis";
ui_lt["WORLD INFO"] = "Pasaulio informacija";
ui_lt["EDITOR VISIBLE"] = "Laikyti redaktorių įjungtą";

ui_lt["apple"] = en_to_lt["apple"] = "obuolys";
ui_lt["banana"] = en_to_lt["banana"] = "bananas";
ui_lt["beeper"] = en_to_lt["beeper"] = "pypsiukas";
ui_lt["box"] = en_to_lt["box"] = "dėžė";
ui_lt["bridge"] = en_to_lt["bridge"] = "tiltas";
ui_lt["carrot"] = en_to_lt["carrot"] = "morka";
ui_lt["daisy"] = en_to_lt["daisy"] = "ramunė";
ui_lt["dandelion"] = en_to_lt["dandelion"] = "pienė";
ui_lt["leaf"] = en_to_lt["leaf"] = "lapas";
ui_lt["square"] = en_to_lt["square"] = "kvadratas";
ui_lt["star"] = en_to_lt["star"] = "žvaigždė";
ui_lt["strawberry"] = en_to_lt["strawberry"] = "braškė";
ui_lt["token"] = en_to_lt["token"] = "ženkliukas";
ui_lt["tokens are Reeborg's favourite thing."] = "Robočiukas mėgsta ženkliukus.";
ui_lt["triangle"] = en_to_lt["triangle"] = "trikampis";
ui_lt["tulip"] = en_to_lt["tulip"] = "tulpė";
ui_lt["bucket"] = en_to_lt["bucket"] = "kibiras";
ui_lt["bulb"] = en_to_lt["bulb"] = "lempa";
ui_lt["bricks"] = en_to_lt["bricks"] = "plytos";
ui_lt["bricks"] = en_to_lt["bricks"] = "plytos";
ui_lt["pale_grass"] = en_to_lt["pale_grass"] = "šviesi_žolė";

lt_to_en["obuolys"] = "apple";
lt_to_en["bananas"] = "banana";
lt_to_en["pypsiukas"] = "beeper";
lt_to_en["dėžė"] = "box";
lt_to_en["tiltas"] = "bridge";
lt_to_en["morka"] = "carrot";
lt_to_en["ramunė"] = "daisy";
lt_to_en["pienė"] = "dandelion";
lt_to_en["lapas"] = "leaf";
lt_to_en["kvadratas"] = "square";
lt_to_en["žvaigždė"] = "star";
lt_to_en["braškė"] = "strawberry";
lt_to_en["ženkliukas"] = "token";
lt_to_en["trikampis"] = "triangle";
lt_to_en["tulpė"] = "tulip";
lt_to_en["kibiras"] = "bucket";
lt_to_en["lempa"] = "bulb";
lt_to_en["plytos"] = "bricks";
lt_to_en["šviesi_žolė"] = "pale_grass";

ui_lt["mud"] = en_to_lt["mud"] = "purvas";
ui_lt["soil"] = en_to_lt["soil"] = "žemė";
ui_lt["water"] = en_to_lt["water"] = "vanduo";
ui_lt["grass"] = en_to_lt["grass"] = "žolė";
ui_lt["gravel"] = en_to_lt["gravel"] = "žvyras";
ui_lt["ice"] = en_to_lt["ice"] = "ledas";
ui_lt["fire"] = en_to_lt["fire"] = "ugnis";

lt_to_en["purvas"] = "mud";
lt_to_en["žemė"] = "soil";
lt_to_en["vanduo"] = "water";
lt_to_en["žolė"] = "grass";
lt_to_en["žvyras"] = "gravel";
lt_to_en["ledas"] = "ice";
lt_to_en["ugnis"] = "fire";

ui_lt["infinite"] = "begalinis skaičius";
ui_lt["Super!"] = "Super!";

ui_lt["fence_right"] = en_to_lt["fence_right"] = "tvora_dešinėje";
ui_lt["fence_left"] = en_to_lt["fence_left"] = "tvora_kairėje";
ui_lt["fence_vertical"] = en_to_lt["fence_vertical"] = "vertikali_tvora";
ui_lt["fence_double"] = en_to_lt["fence_double"] = "dviguba_tvora";

lt_to_en["tvora_dešinėje"] = "fence_right";
lt_to_en["tvora_kairėje"] = "fence_left";
lt_to_en["vertikali_tvora"] = "fence_vertical";
lt_to_en["dviguba_tvora"] = "fence_double";

ui_lt["Invalid Javascript code in Onload editor"] = "Netinkamas Javascript onload kodas; kreipkitės į šio pasaulio kūrėją.";
ui_lt["Invalid Python code in Onload editor"] = "Netinkamas Python onload kodas; kreipkitės į šio pasaulio kūrėją.";

ui_lt["Too many steps:"] = "Per daug žingsnių: {max_steps}<br>Naudokite <code>set_max_nb_steps(nb)</code> ribos padidinimui.";
ui_lt["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Robotukas yra teisingoje x pozicijoje.</li>";
ui_lt["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Robotukas yra neteisingoje x pozicijoje.</li>";
ui_lt["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Robotukas yra teisingoje y pozicijoje.</li>";
ui_lt["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Robotukas yra neteisingoje y pozicijoje.</li>";
ui_lt["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Visi objektai teisingose pozicijose.</li>";
ui_lt["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Vienas ar daugiau objektų nėra tinkamoje vietoje.</li>";
ui_lt["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Visos sienos pastatytos teisingai.</li>";
ui_lt["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Trūksta vienos ar daugiau sienų arba jos pastatytos netinkamoje vietoje.</li>";
ui_lt["Last instruction completed!"] = "Paskutinė instrukcija įvykdyta!";
ui_lt["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instrukcija <code>done()</code> įvykdyta.</p>";

ui_lt["Unknown object"] = "Nežinomas objektas: <code>{obj}</code>";
ui_lt["No object found here"] = "Nerasta: <code>{obj}</code>!";
ui_lt["object"] = "objektas";
ui_lt["I don't have any object to put down!"] = "Neturiu <code>{obj}</code>, kad galėčiau padėti!";
ui_lt["There is already a wall here!"] = "Čia jau yra siena!";
ui_lt["There is no wall to remove!"] = "Nėra sienos, kurią reikėtų pašalinti!";
ui_lt["Ouch! I hit a wall!"] = "Oj! Aš atsitrenkiau į sieną!";
ui_lt["Done!"] = "Padaryta!";
ui_lt["There is no position as a goal in this world!"] = "Šiame pasaulyje nėra pozicijos kaip tikslo!";
ui_lt["There is no goal in this world!"] = "Šiame pasaulyje nėra tikslo!";
ui_lt["I carry too many different objects. I don't know which one to put down!"] = "Nešiojuosi per daug įvairių daiktų. Nežinau, kurį padėti!";
ui_lt["Many objects are here; I do not know which one to take!"] = "Čia daug įvairių daiktų, nežinau, kurį paimti!";

ui_lt.east = en_to_lt.east = "rytai";
ui_lt.north = en_to_lt.north = "šiaurė";
ui_lt.west = en_to_lt.west = "vakarai";
ui_lt.south = en_to_lt.south = "pietūs";
ui_lt["Unknown orientation for robot."] = "Nežinoma robotuko kryptis";

lt_to_en["rytai"] = "east";
lt_to_en["šiaurė"] = "north";
lt_to_en["vakarai"] = "west";
lt_to_en["pietūs"] = "south";

ui_lt["Invalid position."] = "{pos} yra netinkama pozicija.";
ui_lt["Invalid orientation."] = "'{orient}' yra netinkama orientacija.";

ui_lt["World selected"] = "Parinktas pasaulis: {world}";
ui_lt["Could not find world"] = "Neradau pasaulio: {world}";
ui_lt["Object names"] = " biblioteka, ženkliukas, žvaigždė, trikampis, kvadratas, kt.";

ui_lt["Invalid world file."] = "Neteisinkas pasaulio failas.";
ui_lt["PERMALINK"] = "PERMALINKas";
ui_lt["Could not find link: "] = "Nerasta nuoroda: ";

ui_lt["Click on world to move robot."] = "Paspauskite ant pasaulio, kad pridėtumėte arba pašalintumėte galimas starto pozicijas.";
ui_lt["Added robot."] = "Pridėtas robotas.";
ui_lt["Click on image to turn robot"] = "Paspauskite ant paveikslėlio, kad įjungtumėte Robotuką.";
ui_lt["Robot now has tokens."] = "Robotukas turi ženkliukų: {x_tokens}.";
ui_lt["Click on world to add object."] = "Spustelkite nurodydami objektus: <code>{obj}</code>.";
ui_lt["Click on desired object below."] = "Spustelėkite norimą objektą žemiau.";
ui_lt["Click on world to toggle walls."] = "Paspauskite ant pasaulio, kad perjungtumėte sienas.";
ui_lt["Click on world to set home position for robot."] = "Paspauskite ant pasaulio, kad pridėtumėte/pašalintumėte galimas galutines roboto pozicijas.";
ui_lt["Click on world to toggle additional walls to build."] = "Paspauskite ant pasaulio, kad perjungtumėte papildomas sienas.";
ui_lt["Click on desired goal object below."] = "Žemiau spustelėkite norimą tikslo objektą.";
ui_lt["Click on world to set number of goal objects."] = "Paspauskite ant pasaulio, kad nustatytumėte tikslo <code>{obj}</code> skaičių.";
ui_lt["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Įveskite ženkliukų, kuriuos turi nešti robotukas, skaičių.";
ui_lt[" is not a valid value!"] = " nėra galima reikšmė!";
ui_lt["Enter number of objects desired at that location."] = "Spustelėkite ant pasaulio, kad nustatytumėte <code>{obj}</code> skaičių.";
ui_lt["Objects found here:"] = "Čia rasti objektai:";
ui_lt["Description"] = "Aprašymas";
ui_lt["A robot located here carries no objects."] = "Robotas, esantis taške (x, y) = ({x}, {y}), neturi jokių objektų.";
ui_lt["Goal to achieve:"] = "Siekiamas tikslas:";
ui_lt["A robot located here carries:"] = "Robotas, esantis taške (x, y) = ({x}, {y}), turi:";
ui_lt["random location"] = "atsitiktinė vieta";
ui_lt["Enter number of objects to give to robot."] = "Įveskite <code>{obj}</code> skaičių, kurį norite perduoti robotui.";
ui_lt["Special information about this location:"] = "Speciali informacija apie šią vietą:";
ui_lt["Click on world to toggle tile."] = "Paspauskite ant pasaulio, kad perjungtumėte <code>{obj}</code> plytelę.";
ui_lt["Click on desired tile below."] = "Spustelėkite žemiau esančią norimą plytelę arba spalvų rinkiklį.";
ui_lt["A wall must be built east of this location."] = "Siena turi būti pastatyta į rytus nuo šios vietos.";
ui_lt["A wall must be built north of this location."] = "Siena turi būti pastatyta į šiaurę nuo šios vietos.";
ui_lt["A wall must be built west of this location."] = "Siena turi būti pastatyta į vakarus nuo šios vietos.";
ui_lt["A wall must be built south of this location."] = "Siena turi būti pastatyta į pietus nuo šios vietos.";
ui_lt["The final required position of the robot will be chosen at random."] = "Galutinė reikalaujama roboto padėtis bus pasirinkta atsitiktine tvarka.";
ui_lt["The final position of the robot must be (x, y) = "] = "Galutinė roboto padėtis turi būti (x, y) = ";
ui_lt["Click on world to fill with given tile."] = "Spustelėkite ant pasaulio, kad užpildytumėte jį tam tikra plytele.";
ui_lt["Click on desired object below."] = "Spustelėkite norimą objektą žemiau.";
ui_lt["Enter url of image to use as background."] = "Įveskite paveikslėlio, kuris bus naudojamas kaip fonas, url.";
ui_lt["Replace editor content"] = "Ar norite savo redaktoriaus kodą pakeisti šio pasaulio kūrėjo pateiktu kodu?";
ui_lt["Replace library content"] = "Ar norėtumėte savo bibliotekos kodą pakeisti šio pasaulio kūrėjo pateiktu kodu?";
ui_lt["colour"] = "spalva";
ui_lt["There is already a bridge here."] = "There is already a bridge here.";

ui_lt["Name already exist; confirm that you want to replace its content."] = "Pavadinimas jau egzistuoja; patvirtinkite, kad norite pakeisti jo turinį.";
ui_lt["No such world!"] = "Tokio pasaulio nėra!";
ui_lt["Enter world name to save"] = "Įveskite pasaulio pavadinimą, kad išsaugotumėte; naudojami pavadinimai: ";
ui_lt["Enter world name to delete"] = "Įveskite pasaulio pavadinimą, kurį norite ištrinti; esami pasauliai: ";
ui_lt["Delete "] = "Ištrinti ";

ui_lt["Error found at or near line {number}."] = "Klaida rasta eilutėje {number} arba netoli jos.";
ui_lt["<br>Perhaps a missing colon is the cause."] = "<br>Galbūt priežastis - praleistas dvitaškis.";
ui_lt["<br>Perhaps you forgot to add parentheses ()."] = "<br>Galbūt pamiršai pridėti skliaustelius ().";
ui_lt["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Galbūt neteisingai parašėte žodį arba pamiršote apibrėžti funkciją ar kintamąjį.";
ui_lt["I cannot help you with this problem."] = "Negaliu jums padėti išspręsti šios problemos.";

ui_lt["I'm stuck in mud."] = "Įstrigau purve.";
ui_lt["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Purvas: Robotukas <b>negali</b> to aptikti ir įstrigs, jei keliaus į šią vietą.";
ui_lt["Soil: usually safe, but looks identical to mud."] = "Žemė: paprastai saugus, bet atrodo lygiai taip pat kaip purvas.";
ui_lt["I'm slipping on ice!"] = "Aš slystu ant ledo!";
ui_lt["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Ledas: Robotukas <b>negali</b> jo aptikti ir <em>gali</em> paslysti ir pereiti į kitą vietą, jei keliaus į šią vietą.";
ui_lt["Grass: usually safe."] = "Žolė: paprastai saugi.";
ui_lt["Gravel: usually safe."] = "Žvyras: paprastai saugus.";
ui_lt["I'm in water!"] = "Esu vandenyje!";
ui_lt["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Vanduo: Robotukas <b>gali</b> jį aptikti, bet bus pažeistas, jei keliaus į šią vietą.";
ui_lt["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "žaliosios namų plytelės: Robotukas <b>gali</b> aptikti šią plytelę naudodamas funkciją at_goal().";
ui_lt["Crash!"] = "Avarija!";
ui_lt["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mūrinė siena: Robotukas <b>gali</b> ją aptikti, tačiau bandydamas pro ją prasibrauti susižeis.";
ui_lt["I hit a fence!"] = "Atsitrenkiau į tvorą!";
ui_lt["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Tvora: Robotukas <b>gali</b> ją aptikti, bet bus sustabdytas.";
ui_lt["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Tiltas: Robotukas <b>gali</b> jį aptikti ir žinos, kad jis leidžia saugiai pereiti per vandenį.";
ui_lt["My joints are melting!"] = "Mano jungtys tirpsta!";
ui_lt["A bucket full of water."] = "Pilnas kibiras vandens.";
ui_lt["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulpės svogūnėlis: šiek tiek vandens iš kibiro ir jis gali išaugti į gražią tulpę.";

ui_lt["Something is blocking the way!"] = "Kažkas blokuoja kelią!";
ui_lt["Reeborg <b>can</b> detect this tile using at_goal()."] = "Robotukas <b>gali</b> aptikti šią plytelę naudodamas at_goal().";
ui_lt["green home tile:"] = "žaliosios namų plytelės:";
ui_lt["home:"] = "namai:";
ui_lt["racing flag:"] = "lenktynių vėliava:";
ui_lt["house:"] = "namas:";

ui_lt["Local variables"] = "Lokalūs kintamieji";
ui_lt["Global variables"] = "Globalūs kintamieji";
ui_lt["Watched expressions"] = "Stebimos išraiškos";

ui_lt["move forward"] = "judėti pirmyn";
ui_lt["turn left"] = "pasisukti kairėn";
ui_lt["take object"] = "paimti objektą";
ui_lt["put object"] = "padėti objektą";
ui_lt["Pause the program's execution."] = "Pristabdyti programos vykdymą.";
ui_lt["Build a wall in front of the robot."] = "Pastatykite sieną priešais robotą.";
ui_lt["End the program's execution."] = "Baigti programos vykdymą.";
ui_lt["True if a wall is blocking the way."] = "True, jei kelią užstoja siena";
ui_lt["True if nothing is blocking the way."] = "True, jei niekas neblokuoja kelio.";
ui_lt["True if desired destination."] = "True, jei pageidaujama paskirties vieta.";
ui_lt["True if robot carries at least one object."] = "True, jei robotas neša bent vieną objektą.";
ui_lt["True if there is at least one object here."] = "True, jei čia yra bent vienas objektas.";
ui_lt["True if robot is facing North."] = "True, jei robotas pasisukęs į šiaurę.";
ui_lt["Delay between actions; default is 300 ms."] = "Laikas tarp veiksmų; numatytasis nustatymas yra 300 ms.";

ui_lt["Save world in browser"] = "Išsaugoti pasaulį naršyklėje";
ui_lt["LOAD BLOCKLY"] = "Importuoti programą (blokelius) iš failo";
ui_lt["LOAD BLOCKLY EXPLAIN"] = "Atidaro failą ir naudoja jo turinį blokelių aplinkos turiniui pakeisti.";
ui_lt["LOAD EDITOR"] = "Importuoti programą iš failo";
ui_lt["LOAD EDITOR EXPLAIN"] = "Atidaro failą ir juo pakeičia kodo redaktoriaus turinį.";
ui_lt["LOAD LIBRARY"] = "Importuoti biblioteką iš failo";
ui_lt["LOAD LIBRARY EXPLAIN"] = "Atidaro failą ir naudoja jo turinį vietoj dabartinio bibliotekos turinio.";
ui_lt["LOAD WORLD"] = "Įkelti pasaulį iš failo";
ui_lt["LOAD WORLD EXPLAIN"] = "Įkelia pasaulį iš kompiuteryje esančio failo.";
ui_lt["SAVE BLOCKLY"] = "Išsaugoti programą į failą";
ui_lt["SAVE BLOCKLY EXPLAIN"] = "Įrašo esamus blokelius į failą." + mac_user_save_files_en;
ui_lt["SAVE EDITOR"] = "Išsaugoti programą į failą";
ui_lt["SAVE EDITOR EXPLAIN"] = "Įrašo redaktoriaus turinį į failą." + mac_user_save_files_en;
ui_lt["SAVE LIBRARY"] = "Išsaugoti biblioteką";
ui_lt["SAVE LIBRARY EXPLAIN"] = "Įrašo bibliotekos turinį į failą." + mac_user_save_files_en;
ui_lt["SAVE WORLD"] = "Įrašyti pasaulį į failą";
ui_lt["SAVE WORLD EXPLAIN"] = "Įrašo pasaulį (kaip json objektą) į failą kompiuteryje." + mac_user_save_files_en;

ui_lt["PROGRESS SECTION TITLE"] = "Išspręstų užduočių stebėjimas";
ui_lt["PROGRESS EXPLAIN"] = "Išspręstos užduotys pažymimos " + RUR.CHECKMARK +
    "pasaulio pasirinkimo langelyje, o informacija išsaugoma naršyklėje. Jei naudojate kitą naršyklę, " +
    "tai užduotys, kurias jau išsprendėte naudodami ankstenę naršyklę, nebus rodomos. " +
    "Jei spustelėsite toliau esantį išsaugojimo mygtuką, bus išsaugotas failas pavadinimu progress.json su išspręstomis užduotimis, " +
    "kurios išsaugotos dabartinėje naršyklėje. Galite importuoti failą kitose našyklės ir taip progresas bus atnaujintas.";
ui_lt["SAVE PROGRESS"] = "Išsaugoti";
ui_lt["IMPORT PROGRESS"] = "Importuoti";
ui_lt["RETRIEVE SOLUTION"] = "Paimti sprendimą";
ui_lt["RETRIEVE SOLUTION EXPLAIN"] = "Jei šio pasaulio sprendimas (blokai arba kodas ir galbūt kodas bibliotekoje) buvo išsaugotas dabartinio programavimo režimu naršyklėje, jis bus paimtas ir pakeistas dabartiniu turiniu.";

ui_lt["ADD CONTENT TO WORLD"] = "Papildykite pasaulį žemiau parinktais elementais.";
ui_lt["ADD BLOCKLY TEXT"] = "Programuoti blokeliais";
ui_lt["ADD EDITOR TEXT"] = "Programuoti redaktoriuje";
ui_lt["ADD LIBRARY TEXT"] = "Biblioteka";
ui_lt["ADD PRE TEXT"] = "Prieš";
ui_lt["ADD POST TEXT"] = "Po";
ui_lt["ADD DESCRIPTION TEXT"] = "Aprašymas";
ui_lt["ADD ONLOAD TEXT"] = "Užkraunant";

ui_lt["KEYBOARD BUTTON"] = "Robotuko klaviatūra";
ui_lt["ADDITIONAL OPTIONS"] = "Papildomi nustatymai";

ui_lt["BASIC COMMANDS"] = "Komandos";
ui_lt["DEFINING"] = "Funkcijos";
ui_lt["LOOPS"] = "Ciklai";
ui_lt["DECISIONS"] = "Pasirinkimai";
ui_lt["CONDITIONS"] = "Sąlygos";
ui_lt["USING VARIABLES"] = "Kintamieji";
ui_lt["COMMANDS"] = "Komandos";
ui_lt["OTHER"] = "Kita";
ui_lt["OBJECTS"] = "Objektai";

ui_lt["Python Code"] = "Pitono kodas";
ui_lt["Javascript Code"] = "Javascript kodas";
ui_lt["Coffeescript Code"] = "Coffeescript kodas";
ui_lt["LIBRARY"] = "biblioteka";
ui_lt["EXTRA"] = "ekstra";
ui_lt["PRE"] = "Prieš";
ui_lt["POST"] = "Po";
ui_lt["DESCRIPTION"] = "Apr.";
ui_lt["ONLOAD"] = "Užkraunant";

ui_lt["HIGHLIGHT IMPOSSIBLE"] = "Dėl neteisingo kodo teko išjungti jo paryškinimą.";
ui_lt["COMMAND RESULT"] = "Iš pateikto meniu pasirinkite veiksmą, kurį norite atlikti.";

ui_lt["DELETE WORLD TEXT"] = "Čia pateikiami jūsų naršyklėje saugomi pasauliai, kuriuos galite ištrinti:";
ui_lt["PYTHON ONLY"] = "Tik Pitonas";
ui_lt["COLLABORATION"] = "Bendradarbiavimas";
ui_lt["TOGETHERJS EXPLAIN"] = "Įrankis, leidžiantis bendradarbiauti su vienu ar keliais kitais naudotojais naudojant Mozilla programą TogetherJS. Neveikia su blokeliais.";
ui_lt["WORLD CREATION TITLE"] = "Pasaulis: kūrimas, redagavimas, ...";
ui_lt["EDIT WORLD"] = "Redaguoti pasaulį";
ui_lt["EDIT WORLD EXPLAIN"] = "Redaguodami esamą pasaulį galite sukurti savo pasaulį.";
ui_lt["PROGRAM IN EDITOR"] = "Programa redaktoriuje";
ui_lt["PROGRAM IN BLOCKLY WORKSPACE"] = "Programa blokelių aplinkoje";
ui_lt["CONTACT"] = "El. paštas:";
ui_lt["ISSUES"] = "Pranešimai apie klaidas, pasiūlymai, kita";
ui_lt["FORUM"] = "Diskusijų forumas";
ui_lt["HELP"] = "Pagalba";
ui_lt["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Dokumentacija</a>';
ui_lt["PYTHON HELP"] = "Naudodami Pitoną, vykdykite programą su <code>help()</code>, kad gautumėte komandų sąrašą, arba <code>help(move)</code>, kad gautumėte pagalbą apie <code>move()</code> funkciją ir t. t.";
ui_lt["KEYBOARD HELP"] = "Spustelėkite *Robotuko klaviatūra*, kad pamatytumėte galimų komandų, Pitono raktažodžių ir kt. sąrašą.";

ui_lt["WORLD EDITOR"] = "Pasaulio redaktorius";
ui_lt["m-east"] = "Rytai";
ui_lt["m-north"] = "Šiaurė";
ui_lt["m-west"] = "Vakarai";
ui_lt["m-south"] = "Pietūs";
ui_lt["m-random"] = "Atsitiktinai";
ui_lt["m-dimensions"] = "Pasaulio matmenys";
ui_lt["m-add"] = "Pridėti";
ui_lt["m-add-robot"] = "Pridėti robotą";
ui_lt["m-robot"] = "Robotas";
ui_lt["m-position"] = "Pozicija(-os)";
ui_lt["m-turn"] = "Pasisukti";
ui_lt["m-objects"] = "Objektai";
ui_lt["m-walls"] = "Sienos";
ui_lt["m-objects2"] = "Objektai";
ui_lt["m-tiles"] = "Plytelės";
ui_lt["m-fill"] = "Užpildas";
ui_lt["m-solid"] = "Kliūtys";
ui_lt["m-decorative"] = "Dekoracijų objektai";
ui_lt["m-background"] = "Foninis paveiksliukas";
ui_lt["m-goal"] = "Tikslas";
ui_lt["mg-robot"] = "Robotas";
ui_lt["mg-walls"] = "Sienos";
ui_lt["mg-objects"] = "Objektai";

ui_lt["Reeborg says: I'm done!"] = "Robotukas sako: Aš įveikiau!";
ui_lt["Reeborg writes:"] = "Robotukas rašo:";
ui_lt["Reeborg shouts: Something is wrong!"] = "Robotukas šaukia: Kažkas negerai!";
ui_lt["Reeborg explores some Javascript code"] = "Robotukas tyrinėja kai kuriuos Javascript kodus";
ui_lt["Reeborg states:"] = "Robotukas teigia:";
ui_lt["Reeborg watches some variables!"] = "Robutukas stebi kintamuosius!";
ui_lt["Click on the world to get some additional information."] = "Paspauskite ant pasaulio, kad gautumėte papildomos informacijos.";

ui_lt["Reeborg's basic keyboard"] = "Robotuko pagrindinė klaviatūra";
ui_lt["kbd-command-btn"] = "Komandos";
ui_lt["kbd-condition-btn"] = "Sąlygos";
ui_lt["kbd-python-btn"] = "Pitonas";
ui_lt["kbd-py-console-btn"] = "Pitonas";
ui_lt["kbd-javascript-btn"] = "Javascript";
ui_lt["kbd-cpp-btn"] = "C++";
ui_lt["kbd-coffee-btn"] = "CoffeeScript";
ui_lt["kbd-objects-btn"] = "Objektai";
ui_lt["kbd-special-btn"] = "Specialūs";

ui_lt["UNDO"] = "ATŠAUKTI";
ui_lt["REDO"] = "ATKARTOTI";
ui_lt["tab"] = "TAB";
ui_lt["shift-tab"] = "Shift-TAB";
ui_lt["enter"] = "\u23CE";
ui_lt["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> nėra Pitono raktažodis.";

ui_lt["Colour:"] = "Spalva:";
ui_lt["Enter a colour"] = "Įveskite spalvą";

ui_lt["Background image"] = "Foninis paveiksliukas";

ui_lt["NAME:"] = "Pavadinimas:";
ui_lt["Save world in browser"] = "Išsaugoti pasaulį naršyklėje";

ui_lt["Set the world's dimensions"] = "Nustatyti pasaulio matmenis";
ui_lt["set-dimensions-explain"] = "Jei pageidaujate, galite nustatyti kitokį pasaulio dydį nei numatytieji matmenys. Atminkite, kad mažesnės raiškos ekranuose gali nepavykti rodyti labai didelių pasaulių.";
ui_lt["Maximum x value:"] = "Maksimali x reikšmė:";
ui_lt["Maximum y value:"] = "Maksimali y reikšmė:";
ui_lt["Use small tiles"] = "Naudoti mažas plyteles";

ui_lt["Set goal number for object"] = "Nustatyti tikslų skaičių objektui";
ui_lt["dialog-goal-object-explain"] = "Spustelėkite žymimąjį langelį, jei norite, kad šis skaičius būtų lygus bendram pasaulio objektų skaičiui.";
ui_lt["Number of objects"] = "Objektų skaičius";
ui_lt["All such objects"] = "Visi tokie objektai";

ui_lt["Number of objects:"] = "Objektų skaičius:";
ui_lt["Maximum:"] = "Daugiausiai:";
ui_lt["Add object in the world"] = "Nustatyti objektų skaičių";
ui_lt["ADD OBJECT EXPLAIN"] = "Pasirinkite nulį, kad pašalintumėte bet kokį šioje vietoje esantį tokį objektą. Jei <code>Daugiausiai</code> nustatyta didesnė reikšmė nei <code>Objektų skaičius</code>, kiekvieną kartą paleidus programą atsitiktine tvarka bus parenkamas objektų skaičius tarp šių dviejų verčių.";

ui_lt["Unlimited:"] = "Neribota:";
ui_lt["Give object to robot"] = "Suteikite robotui objektą";
ui_lt["GIVE OBJECT EXPLAIN"] = "Pasirinkite kelis objektus, kuriuos robotas turi gabenti. Spustelėkite žymimąjį langelį, jei norite, kad šis skaičius būtų neribotas.";

ui_lt["UPDATE BLOCKLY CONTENT"] = "Šis pasaulis turi tam tikrą numatytoji blokelių aplinkos turinį. Jei norite pakeisti dabartinį blokelių turinį, spustelėkite mygtuką";
ui_lt["UPDATE BLOCKLY BUTTON"] = "Pakeisti esamus blokelius";
ui_lt["Contents from World"] = "Turinys iš pasaulio";

ui_lt["WARNING: Do not change this comment."] = "DĖMESIO: Nepakeiskite šio komentaro.";
ui_lt["Library Code is below."] = "Bibliotekos kodas yra žemiau.";
ui_lt["No solution can be saved when using REPL (Py)."] = "Naudojant REPL (Py) negalima išsaugoti jokio sprendimo.";
ui_lt["No solution can be loaded when using REPL (Py)."] = "Naudojant REPL (Py) negalima įkelti jokio sprendimo.";

ui_lt["You are not allowed to use <code>done</code> in this world!"] = "Šiame pasaulyje neleidžiama naudoti <code>done()</code>!";
ui_lt["Execution ended before the <em>Post</em> code was executed."] = "Vykdymas baigėsi prieš įvykdant <em>Post</em> kodą.";

ui_lt["Difficulty level"] = "Sunkumo lygis";

ui_lt["Expected result"] = "Laukiami rezultatai";
ui_lt["Differences highlighted"] = "Skirtumai paryškinti";
ui_lt["Actual result"] = "Gautas rezultatas";

ui_lt["Cannot parse progress file."] = "Nepavyksta apdoroti progreso failo.";
ui_lt["Cannot merge progress."] = "Nepavyksta sujungti progresą.";
ui_lt["No solution found for this world."] = "Šiam pasauliui nerastas joks sprendimas.";

ui_lt["THINKING"] = "Galvoju...";
