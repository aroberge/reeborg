// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_pl = ui_pl = {};
exports.pl_to_en = pl_to_en = {};

ui_pl["pl-en"] = "Mixed mode: User Interface in Polish; programming language in English.<br>" +
    "Tryb mieszany: interfejs użytkownika w języku polskim; język programowania w języku angielskim.";

ui_pl["SITE NAME"] = "Świat Reeborga";
ui_pl["WORLD INFO"] = "Informacje";
ui_pl["EDITOR VISIBLE"] = "Zostaw Edytor Widoczny";

ui_pl["apple"] = "jabłko";
ui_pl["banana"] = "banan";
ui_pl["beeper"] = "brzęczyk";
ui_pl["box"] = "pudełko";
ui_pl["bridge"] = "most";
ui_pl["carrot"] = "marchewka";
ui_pl["daisy"] = "stokrotka";
ui_pl["dandelion"] = "mlecz";
ui_pl["leaf"] = "liść";
ui_pl["square"] = "kwadrat";
ui_pl["star"] = "gwiazda";
ui_pl["strawberry"] = "truskawka";
ui_pl["token"] = "token";
ui_pl["tokens are Reeborg's favourite thing."] = "Reeborg uwielbia tokeny";
ui_pl["triangle"] = "trójkąt";
ui_pl["tulip"] = "tulipan";
ui_pl["bucket"] = "wiadro";
ui_pl["bulb"] = "żarówka";

ui_pl["bricks"] = "bricks";  // translation needed
pl_to_en["bricks"] = "bricks";


pl_to_en["jabłko"] = "apple";
pl_to_en["banan"] = "banana";
pl_to_en["brzęczyk"] = "beeper";
pl_to_en["pudełko"] = "box";
pl_to_en["most"] = "bridge";
pl_to_en["marchewka"] = "carrot";
pl_to_en["stokrotka"] = "daisy";
pl_to_en["mlecz"] = "dandelion";
pl_to_en["liść"] = "leaf";
pl_to_en["kwadrat"] = "square";
pl_to_en["gwiazda"] = "star";
pl_to_en["truskawka"] = "strawberry";
pl_to_en["token"] = "token";
pl_to_en["trójkąt"] = "triangle";
pl_to_en["tulipan"] = "tulip";
pl_to_en["wiadro"] = "bucket";
pl_to_en["żarówka"] = "bulb";

ui_pl["mud"] = "błoto";
ui_pl["soil"] = "gleba";
ui_pl["water"] = "woda";
ui_pl["grass"] = "trawa";
ui_pl["gravel"] = "żwir";
ui_pl["ice"] = "lód";
ui_pl["fire"] = "ogień";

pl_to_en["błoto"] = "mud";
pl_to_en["gleba"] = "soil";
pl_to_en["woda"] = "water";
pl_to_en["trawa"] = "grass";
pl_to_en["żwir"] = "gravel";
pl_to_en["lód"] = "ice";
pl_to_en["ogień"] = "fire";

ui_pl["infinite"] = "infinite number";

ui_pl["fence_right"] = "płotek_po_prawa";
ui_pl["fence_left"] = "płotek_po_lewo";
ui_pl["fence_vertical"] = "płotek_pionowy";
ui_pl["fence_double"] = "podwójny_płotek";

pl_to_en["płotek_po_prawa"] = "fence_right";
pl_to_en["płotek_po_lewo"] = "fence_left";
pl_to_en["płotek_pionowy"] = "fence_vertical";
pl_to_en["podwójny_płotek"] = "fence_double";

ui_pl["Invalid Javascript code in Onload editor"] = "Niewłaściwie załadowany kod Javascript, skontaktuj się ze stwórcą tego świata.";
ui_pl["Invalid Python code in Onload editor"] = "Niewłaściwie załadowany kod Python-a, skontaktuj się ze stwórcą tego świata.";
ui_pl["Too many steps:"] = "Za dużo kroków: {max_steps}<br>Use <code>set_max_nb_steps(nb)</code> by zwiększyć limit.";
ui_pl["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg jest we właściwej pozycji x.</li>";
ui_pl["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg jest w złej pozycji x.</li>";
ui_pl["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg jest we dobrej pozycji y.</li>";
ui_pl["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg jest w złej pozycji y.</li>";
ui_pl["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Wszystkie obiekty są w dobrym miejscu.</li>";
ui_pl["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Jeden lub więcej obiektów nie jest na swoim miejscu.</li>";
ui_pl["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Wszystkie ściany zostały wybudowane poprawnie.</li>";
ui_pl["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Brakuje jednej lub więcej ścian, bądź są w złej lokalizacji.</li>";
ui_pl["Last instruction completed!"] = "Ostatnia instrukcja wykonana!";
ui_pl["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instrukcja <code>done()</code> wykonana.</p>";

ui_pl["Unknown object"] = "Nieznany obiekt: <code>{obj}</code>";
ui_pl["No object found here"] = "Nie znaleziono obiektu: <code>{obj}</code>";
ui_pl["object"] = "obiekt";
ui_pl["I don't have any object to put down!"] = "Nie mam żadnych <code>{obj}</code> do odłożenia!";
ui_pl["There is already a wall here!"] = "Tu już stoi mur!";
ui_pl["There is no wall to remove!"] = "Tu nie ma muru do usunięcia!";
ui_pl["Ouch! I hit a wall!"] = "Ou! Uderzyłem w mur!";
ui_pl["Done!"] = "Skończone!";
ui_pl["There is no position as a goal in this world!"] = "Lokalizacja celu na tym świecie nie jest ustalona!";
ui_pl["There is no goal in this world!"] = "Nie ma ustalonego celu na tym świecie!";
ui_pl["I carry too many different objects. I don't know which one to put down!"] = "Trzymam zbyt dużo obiektów! Nie wiem który odłożyć!";
ui_pl["Many objects are here; I do not know which one to take!"] = "Tu jest zbyt dużo obiektów, nie wiem który mam wziać!";

ui_pl.east = "wschód";
ui_pl.north = "północ";
ui_pl.west = "zachód";
ui_pl.south = "południe";
ui_pl["Unknown orientation for robot."] = "Nieznana orientacja dla robota.";

pl_to_en["wschód"] = "east";
pl_to_en["północ"] = "north";
pl_to_en["zachód"] = "west";
pl_to_en["południe"] = "south";

ui_pl["Invalid position."] = "{pos} jest niewłaściwą pozycją.";
ui_pl["Invalid orientation."] = "'{orient}' jest nieznaną orientacją.";

ui_pl["World selected"] = "Świat {world} wybrany";
ui_pl["Could not find world"] = "Nie można znaleźć światu {world}";
ui_pl["Object names"] = " biblioteka, token, gwiazda, trójkąt, kwadrat, etc.";

ui_pl["Invalid world file."] = "Nieprawidłowy plik świata.";
ui_pl["PERMALINK"] = "PERMALINK";
ui_pl["Could not find link: "] = "Nie można znaleźć link-u : ";

ui_pl["Click on world to move robot."] = "Kliknij na świat by dodać bądź usunąć możliwą pozycje startową Reeborga.";
ui_pl["Added robot."] = "Dodano Reeborga.";
ui_pl["Click on image to turn robot"] = "Kliknij na obrazek by obrócić Reeborga";
ui_pl["Robot now has tokens."] = "Reeborg ma teraz {x_tokens} tokenów.";
ui_pl["Click on world to add object."] = "Kliknij na świat by ustawić <code>{obj}</code>.";
ui_pl["Click on desired object below."] = "Kliknij na porządany obiekt poniżej.";
ui_pl["Click on world to toggle walls."] = "Kliknij na świat by dodać mury.";
ui_pl["Click on world to set home position for robot."] = "Kliknij na świat by dodać/usunąć możliwą finalną pozycje";
ui_pl["Click on world to toggle additional walls to build."] = "Kliknij na świat by włączyć dodatkowe mury.";
ui_pl["Click on desired goal object below."] = "Kliknij na porządany cel poniżej.";
ui_pl["Click on world to set number of goal objects."] = "Kliknij na świat by dodać numery celów <code>{obj}</code>.";
ui_pl["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Wpisz ilośc tokenów które ma trzymać Reeborg.";
ui_pl[" is not a valid value!"] = " to nie jest prawidłowy numer!";
ui_pl["Enter number of objects desired at that location."] = "Naciśnij na świat by wybrać numer <code>{obj}</code>.";
ui_pl["Objects found here:"] = "Obiekty znalezione tutaj:";
ui_pl["Description"] = "Opisy";
ui_pl["A robot located here carries no objects."] = "Robot położony (x, y) = ({x}, {y}) nie trzyma żadnych obiektów.";
ui_pl["Goal to achieve:"] = "Cele do osiągnięcia:";
ui_pl["A robot located here carries:"] = "Robot położony (x, y) = ({x}, {y}) trzyma:";
ui_pl["random location"] = "losowe położenie";
ui_pl["Enter number of objects to give to robot."] = "Wpisz ilość obiektów <code>{obj}</code> które dasz robotowi.";
ui_pl["Special information about this location:"] = "Specjalne informacje o tej lokacji:";
ui_pl["Click on world to toggle tile."] = "Kliknij na świat by go włączyć <code>{obj}</code> pokrycie.";
ui_pl["Click on desired tile below."] = "Kliknij na pożądaną płytke niżej bądź wyborze kolorów.";
ui_pl["A wall must be built east of this location."] = "Mury muszą być wybudowane na wschód od tej lokalizacji.";
ui_pl["A wall must be built north of this location."] = "Mury muszą być wybudowane na północ od tej lokalizacji.";
ui_pl["A wall must be built west of this location."] = "Mury muszą być wybudowane na zachód od tej lokalizacji.";
ui_pl["A wall must be built south of this location."] = "Mury muszą być wybudowane na południe od tej lokalizacji.";
ui_pl["The final required position of the robot will be chosen at random."] = "Finalna wymagana pozycja robota będzie wygenerowana losowo .";
ui_pl["The final position of the robot must be (x, y) = "] = "Finalna pozycja robota musi być na (x, y) = ";
ui_pl["Click on world to fill with given tile."] = "Kliknij na świat by uzupełnić podane kratki.";
ui_pl["Click on desired object below."] = "Kliknij na porządany obiekt poniżej";
ui_pl["Enter url of image to use as background."] = "Zamieść url obrazka by użyć w tle.";
ui_pl["Replace editor content"] = "Czy chcesz przenieść swój edytor kodu na zapewniony Ci przez stwórce świata?";
ui_pl["Replace library content"] = "Czy chcesz przenieść swoją bibioteke kodów na zapewnioną Ci przez stwórce świata?";
ui_pl["colour"] = "color";
ui_pl["There is already a bridge here."] = "There is already a bridge here.";

ui_pl["Name already exist; confirm that you want to replace its content."] = "Nazwa już istnieje; potwierdź, że chcesz zamienić zawartość.";
ui_pl["No such world!"] = "Nie ma takiego świata!";
ui_pl["Enter world name to save"] = "Wpisz nazwe świata by zapisać; imiona są używane: ";
ui_pl["Enter world name to delete"] = "Wpisz nazwe świata by usunąć; istniejący świat: ";
ui_pl["Delete "] = "usuń";

ui_pl["Error found at or near line {number}."] = "Błąd znaleziony na pobliskiej lini {number}.";
ui_pl["<br>Perhaps a missing colon is the cause."] = "<br>Być może brauje dwukropka.";
ui_pl["<br>Perhaps you forgot to add parentheses ()."] = "<br>Być może zapomniałeś wstawić nawiasów().";
ui_pl["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Być możę źle napisałeś źle słowo, zapomniałeś zdefiniować funkcje bądź zmienną.";
ui_pl["I cannot help you with this problem."] = "Nie mogę Ci pomóc z tym problemem.";

ui_pl["I'm stuck in mud."] = "Utknąłem w błocie.";
ui_pl["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Błoto: Reeborg <b>cannot</b> Dostrzegnij to, utkniesz jak jeżeli to przeniesie się do tej lokalizacji";
ui_pl["Soil: usually safe, but looks identical to mud."] = "Gleba: zazwyczaj bezpieczne, ale wygląda zupełnie jak błoto.";
ui_pl["I'm slipping on ice!"] = "Ślizgam się na lodzie!";
ui_pl["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Lód: Reeborg <b>cannot</b> zwracaj na to uwage <em>might</em> ślizgnij się i przenieś na następną pozycje jeżeli to przeniesie się do tej lokacji.";
ui_pl["Grass: usually safe."] = "Trawa: raczej bezpieczna.";
ui_pl["Gravel: usually safe."] = "Żwir: najczęściej bezpieczny.";
ui_pl["I'm in water!"] = "Jestem w wodzie!";
ui_pl["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Woda: Reeborg <b>can</b> spójrz na to ale coś Ci się stanie, jeżeli to przemieści Się tutaj.";
ui_pl["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "płytka zielonego domu: Reeborg <b>can</b> zwróć uwagę na to w_celu().";
ui_pl["Crash!"] = "Wypadek!";
ui_pl["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Ceglany Mur: Reeborg <b>can</b> spójrz na to, ale ma skrzywdzi go, jeżeli będzie próbował w to wejść.";
ui_pl["I hit a fence!"] = "Uderzyłem w płotek!";
ui_pl["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Płotek: Reeborg <b>can</b> spójrz na to, ale on zostanie przez to zatrzymany.";
ui_pl["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Most: Reeborg <b>can</b> spójrz, to umożliwi bezpieczne przejście nad wodą.";
ui_pl["My joints are melting!"] = "Moje stawy się topią!";
ui_pl["A bucket full of water."] = "Wiadro pełne wody.";
ui_pl["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulipanowa żarówka: może urosnąć w ładnym tulipanie z jakimś wiaderkiem wody.";


ui_pl["Something is blocking the way!"] = "Coś mi blokuje droge!";
ui_pl["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> patrz na to używając w_celu().";
ui_pl["green home tile:"] = "płytka zielonego domu:";
ui_pl["home:"] = "dom:";
ui_pl["racing flag:"] = "flaga wyścigowa:";
ui_pl["house:"] = "dom:";

ui_pl["Local variables"] = "Lokalne zmienne";
ui_pl["Global variables"] = "Globalne zmienne";
ui_pl["Watched expressions"] = "Oglądane wyrażenia";

ui_pl["move forward"] = "ruch naprzód";
ui_pl["turn left"] = "obróć w lewo";
ui_pl["take object"] = "weź obiekt";
ui_pl["put object"] = "połóż obiekt";
ui_pl["Pause the program's execution."] = "Zastopuj wykonywane przez program czynności.";
ui_pl["Build a wall in front of the robot."] = "Wybuduj mur na przeciwko robota.";
ui_pl["End the program's execution."] = "Zakończ wykonywane przez program czynności.";
ui_pl["True if a wall is blocking the way."] = "Prawda jeżeli mur blokuje droge";
ui_pl["True if nothing is blocking the way."] = "Prawda jeżeli nic nie blokuje drogi.";
ui_pl["True if desired destination."] = "Prawda, jeżeli porządany cel.";
ui_pl["True if robot carries at least one object."] = "Prawda jeżeli robot trzymał chociaż jeden obiekt jeden obiekt.";
ui_pl["True if there is at least one object here."] = "Prawda jeżeli robot był chociaż jeden obiekt tutaj.";
ui_pl["True if robot is facing North."] = "Prawda jeżeli robot jest skierowany na północ.";
ui_pl["Delay between actions; default is 300 ms."] = "Opóźnienie pomiędzy akcjami; zaniedbanie wynosi 300 ms.";

ui_pl["Save world in browser"] = "Zapisz świat w przeglądarce";
ui_pl["LOAD BLOCKLY"] = "Zaimportuj program (blocks) z pliku";
ui_pl["LOAD BLOCKLY EXPLAIN"] = "Otwórz lokalne pliki i użyj ich zawartości by przenieść zawartość przestrzeni roboczej Blockly.";
ui_pl["LOAD EDITOR"] = "Zaimportuj program z plików";
ui_pl["LOAD EDITOR EXPLAIN"] = "Otwórz lokalne pliki i użyj ich zawartości by przenieść zawartość Edytora Kodu.";
ui_pl["LOAD LIBRARY"] = "Import library from a file";
ui_pl["LOAD LIBRARY EXPLAIN"] = "Otwórz lokalne pliki i użyj ich zawartości by przenieść zawartość bierzącej zawartości Biblioteki.";
ui_pl["LOAD WORLD"] = "Załaduj świat z pliku";
ui_pl["LOAD WORLD EXPLAIN"] = "Załaduj świat z pliku na Twoim komputerze.";
ui_pl["SAVE BLOCKLY"] = "Zapisz program do pliku";
ui_pl["SAVE BLOCKLY EXPLAIN"] = "Zapisz bierzące bloki w pliku." + mac_user_save_files_en;
ui_pl["SAVE EDITOR"] = "Zapisz program do pliku";
ui_pl["SAVE EDITOR EXPLAIN"] = "Zapisz zawartość edytora w pliku." + mac_user_save_files_en;
ui_pl["SAVE LIBRARY"] = "Zapisz biblioteke";
ui_pl["SAVE LIBRARY EXPLAIN"] = "Zapisz zawartość biblioteki w pliku." + mac_user_save_files_en;
ui_pl["SAVE WORLD"] = "Zapisz świat w pliku";
ui_pl["SAVE WORLD EXPLAIN"] = "Zapisz świat (jako json obiekt) w pliku na Twoim komputerze." + mac_user_save_files_en;

ui_pl["PROGRESS SECTION TITLE"] = "Keeping track of tasks solved";
ui_pl["PROGRESS EXPLAIN"] = "Tasks solved are marked with " + RUR.CHECKMARK +
    "in the world selector and the information is saved in your browser. If you use a different browser, " +
    "the tasks you have already solved using a different browser will not be shown. " +
    "If you click on the save button below, a file named progress.json will be saved with the tasks solved " +
    "recorded in the current browser. You can import this file in a different browser so that your progress can be updated.";
ui_pl["SAVE PROGRESS"] = "Save";
ui_pl["IMPORT PROGRESS"] = "Import";
ui_pl["RETRIEVE SOLUTION"] = "Retrieve solution";
ui_pl["RETRIEVE SOLUTION EXPLAIN"] = "If a solution (blocks, or code and possibly code in library) for this world has been saved in the browser for the current programming mode, it will be retrieved and replace the current content.";


ui_pl["ADD CONTENT TO WORLD"] = "Dodaj zawartość do świata z wybranych przedmiotów poniżej.";
ui_pl["ADD BLOCKLY TEXT"] = "Bloki kodujące";
ui_pl["ADD EDITOR TEXT"] = "Kod w edytorze";
ui_pl["ADD LIBRARY TEXT"] = "Biblioteka";
ui_pl["ADD PRE TEXT"] = "Przed";
ui_pl["ADD POST TEXT"] = "Stanowisko";
ui_pl["ADD DESCRIPTION TEXT"] = "Opis";
ui_pl["ADD ONLOAD TEXT"] = "Onload";

ui_pl["KEYBOARD BUTTON"] = "klawiatura Reeborga";
ui_pl["ADDITIONAL OPTIONS"] = "Dodatkowe opcje";

ui_pl["BASIC COMMANDS"] = "Podstawowe komendy";
ui_pl["DEFINING"] = "Określający";
ui_pl["LOOPS"] = "Pętle";
ui_pl["DECISIONS"] = "Decyzje";
ui_pl["CONDITIONS"] = "Warunki";
ui_pl["USING VARIABLES"] = "Używane zmienne";
ui_pl["COMMANDS"] = "Komendy";
ui_pl["OTHER"] = "Inne";
ui_pl["OBJECTS"] = "Obiekty";

ui_pl["Python Code"] = "Kod Pythona";
ui_pl["Javascript Code"] = "Kod Javascript";
ui_pl["LIBRARY"] = "biblioteka";
ui_pl["EXTRA"] = "extra";
ui_pl["PRE"] = "Przed";
ui_pl["POST"] = "Stanowisko";
ui_pl["DESCRIPTION"] = "Desc.";
ui_pl["ONLOAD"] = "Onload";

ui_pl["HIGHLIGHT IMPOSSIBLE"] = "Problem z Twoim kodem spowodował wyłączenie podświetlenia kodu.";
ui_pl["COMMAND RESULT"] = "Wybierz akcje do wykonania z menu poniżej.";

ui_pl["DELETE WORLD TEXT"] = "Bierzące przekazania dla świata zostały składowane w przeglądarce, możesz je usunąć:";
ui_pl["PYTHON ONLY"] = "Tylko Python";
ui_pl["COLLABORATION"] = "Współpraca";
ui_pl["TOGETHERJS EXPLAIN"] = "Narzędzia któ©e pozwalają współpracować z jednym bądź wiecej użytkownikiem Mozilla's TogetherJS. Nie działa z Blockly.";
ui_pl["WORLD CREATION TITLE"] = "Świat: stworzenie, edytowanie, ...";
ui_pl["EDIT WORLD"] = "Edytuj świat";
ui_pl["EDIT WORLD EXPLAIN"] = "Możesz stworzyć swój świat edytująć bierzący.";
ui_pl["PROGRAM IN EDITOR"] = "Program w edytorze";
ui_pl["PROGRAM IN BLOCKLY WORKSPACE"] = "Program w przestrzeni roboczej blockly";
ui_pl["CONTACT"] = "(Tylko Angielski/Francuski) Email:";
ui_pl["ISSUES"] = "Raporty bugów, sugestie, inne sprawy, etc. (Tylko Angielski/Francuski)";
ui_pl["FORUM"] = "Forum dyskusyje (Tylko Angielski/Francuski)";
ui_pl["HELP"] = "Pomoc";
ui_pl["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentation</a>';
ui_pl["PYTHON HELP"] = "Używając Pythona, wykonaj program <code>help()</code> by dostać liste komend bądź <code>help(move)</code> by dostać pomoc w <code>move()</code> funkcje, etc.";
ui_pl["KEYBOARD HELP"] = "Kliknij na klawiature Reeborga by zobaczyć osiągalne komendy, klawiatura Pythona, etc.";

ui_pl["WORLD EDITOR"] = "Edytor świata";
ui_pl["m-east"] = "Wschód";
ui_pl["m-north"] = "Północ";
ui_pl["m-west"] = "Zachód";
ui_pl["m-south"] = "Połódnie";
ui_pl["m-random"] = "Losowo";
ui_pl["m-dimensions"] = "Wymiary świata";
ui_pl["m-add"] = "Dodaj";
ui_pl["m-add-robot"] = "Dodaj robota";
ui_pl["m-robot"] = "Robot";
ui_pl["m-position"] = "Pozycja(s)";
ui_pl["m-turn"] = "Obrót";
ui_pl["m-objects"] = "Obiekty";
ui_pl["m-walls"] = "Mury";
ui_pl["m-objects2"] = "Obiekty";
ui_pl["m-tiles"] = "Płytki";
ui_pl["m-fill"] = "Wypełnić";
ui_pl["m-solid"] = "Przeszkody";
ui_pl["m-decorative"] = "Dekoracyjne obiekty";
ui_pl["m-background"] = "Obrazek w tle";
ui_pl["m-goal"] = "Cel";
ui_pl["mg-robot"] = "Robot";
ui_pl["mg-walls"] = "Mury";
ui_pl["mg-objects"] = "Obiekty";

ui_pl["Reeborg says: I'm done!"] = "Reeborg powiedział: Skończyłem!";
ui_pl["Reeborg writes:"] = "Reeborg pisze:";
ui_pl["Reeborg shouts: Something is wrong!"] = "Reeborg krzyknął: Coś jest źle!";
ui_pl["Reeborg explores some Javascript code"] = "Reeborg odkrywa jakiś kod Javascript";
ui_pl["Reeborg states:"] = "Reeborg państwo:";
ui_pl["Reeborg watches some variables!"] = "Reeborg ogląda jakieś zmienne!";
ui_pl["Click on the world to get some additional information."] = "Kliknij na świat by dostać jakieś dodatkowe informacje.";

ui_pl["Reeborg's basic keyboard"] = "Podstawowa klawiatura Reeborga";
ui_pl["kbd-command-btn"] = "Komendy";
ui_pl["kbd-condition-btn"] = "Warunki";
ui_pl["kbd-python-btn"] = "Python";
ui_pl["kbd-py-console-btn"] = "Python";
ui_pl["kbd-javascript-btn"] = "Javascript";
ui_pl["kbd-cpp-btn"] = "C++";
ui_pl["kbd-coffee-btn"] = "CoffeeScript";
ui_pl["kbd-objects-btn"] = "Obiekty";
ui_pl["kbd-special-btn"] = "Specialne";

ui_pl["UNDO"] = "UNDO";
ui_pl["REDO"] = "REDO";
ui_pl["tab"] = "TAB";
ui_pl["shift-tab"] = "Shift-TAB";
ui_pl["enter"] = "\u23CE";
ui_pl["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> nie jest prawdziwą klawiaturą Pythona.";

ui_pl["Colour:"] = "Kolor:";
ui_pl["Enter a colour"] = "Dodaj kolor";

ui_pl["Background image"] = "Obrazek w tle";

ui_pl["NAME:"] = "Imię:";
ui_pl["Save world in browser"] = "Zapisz świat w przeglądarce";

ui_pl["Set the world's dimensions"] = "Wybierz wymiary świata";
ui_pl["set-dimensions-explain"] = "Jeśli chcesz, możesz zmienić wymiar świata z początkowego na inny. Pamiętaj, że mniejsza rozdzielczość ekranu może nie być odpowiednia do odpalenia większych światów.";
ui_pl["Maximum x value:"] = "Maksymalna wartość x:";
ui_pl["Maximum y value:"] = "Maksymalna wartość y:";
ui_pl["Use small tiles"] = "Użyj małych płytek";

ui_pl["Set goal number for object"] = "Wybierz numer celu dla obiektu";
ui_pl["dialog-goal-object-explain"] = "Klinij na checkboxa jeżeli chcesz tą ilość by była równa z ilościa wszystkich obiektów znajdujących się na początku w świecie";
ui_pl["Number of objects"] = "Numer obiektu";
ui_pl["All such objects"] = "Wszystkie obiekty";

ui_pl["Number of objects:"] = "Ilośc obiektów:";
ui_pl["Maximum:"] = "Maksimum:";
ui_pl["Add object in the world"] = "Wybierz ilość obiektów";
ui_pl["ADD OBJECT EXPLAIN"] = "Wybierz zero by usunąć wszystkie obiekty z tego położenia. Jeżeli <code>Maximum</code> jest ustawiony na wartość większą niż <code>Number of objects</code>, ilość obiektów pomiędzy tymi dwoma wartościami zostanie wygenerowana losowo, gdy program zacznie działać.";

ui_pl["Unlimited:"] = "Nielimitowany:";
ui_pl["Give object to robot"] = "Daj obiekt robotowi";
ui_pl["GIVE OBJECT EXPLAIN"] = "Wybierz liczbe przedmiotów, które ma trzymać robot. Kliknij na checkboxa jeżeli chcesz, by ta ilośc była nielimitowana.";

ui_pl["UPDATE BLOCKLY CONTENT"] = "Ten świat ma domyślne przestrzenie robocze dla bloków. By przenieść bierzącą zawartość bloków, kliknij na przycisk";
ui_pl["UPDATE BLOCKLY BUTTON"] = "Przenieś istniejące bloki";
ui_pl["Contents from World"] = "Zawartośc ze świata";

ui_pl["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_pl["Library Code is below."] = "Library Code is below.";
ui_pl["No solution can be saved when using REPL (Py)."] = "No solution can be saved when using REPL (Py).";
ui_pl["No solution can be loaded when using REPL (Py)."] = "No solution can be loaded when using REPL (Py).";

ui_pl["You are not allowed to use <code>done</code> in this world!"] = "You are not allowed to use <code>done()</code> in this world!";
ui_pl["Execution ended before the <em>Post</em> code was executed."] = "Execution ended before the <em>Post</em> code was executed.";

ui_pl["Difficulty level"] = "Difficulty level";

ui_pl["Expected result"] = "Expected result";
ui_pl["Differences highlighted"] = "Differences highlighted";
ui_pl["Actual result"] = "Actual result";

ui_pl["Cannot parse progress file."] = "Cannot parse progress file.";
ui_pl["Cannot merge progress."] = "Cannot merge progress.";
ui_pl["No solution found for this world."] = "No solution found for this world.";

ui_pl["THINKING"] = "Thinking ...";
