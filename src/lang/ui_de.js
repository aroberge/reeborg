// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac Nutzer:</b> Siehe <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">bekannte Probleme</a>.';

exports.ui_de = ui_de = {};
exports.en_to_de = en_to_de = {};
exports.de_to_en = de_to_en = {};

ui_de["de-en"] =  "Gemischter Modus: Benutzeroberfläche in Deutsch; Programmiersprache in Englisch." +
                  "Mixed mode: User Interface in Deutsch; programming language English.<br>";

ui_de["SITE NAME"] = "Reeborg's Welt";
ui_de["WORLD INFO"] = "Welt Info";
ui_de["EDITOR VISIBLE"] = "Editor sichtbar bleiben lassen";

ui_de["apple"] = en_to_de["apple"] = "Apfel";
ui_de["banana"] = en_to_de["banana"] = "Banane";
ui_de["beeper"] = en_to_de["beeper"] = "Piepser";
ui_de["box"] = en_to_de["box"] = "Box";
ui_de["bridge"] = en_to_de["bridge"] = "Brücke";
ui_de["carrot"] = en_to_de["carrot"] = "Karotte";
ui_de["daisy"] = en_to_de["daisy"] = "Gänseblümchen";
ui_de["dandelion"] = en_to_de["dandelion"] = "Löwenzahn";
ui_de["leaf"] = en_to_de["leaf"] = "Blatt";
ui_de["square"] = en_to_de["square"] = "Quadrat";
ui_de["star"] = en_to_de["star"] = "Stern";
ui_de["strawberry"] = en_to_de["strawberry"] = "Erdbeere";
ui_de["token"] = en_to_de["token"] = "Token";
ui_de["tokens are Reeborg's favourite thing."] = "Tokens sind Reeborg's Lieblingsding.";
ui_de["triangle"] = en_to_de["triangle"] = "Dreieck";
ui_de["tulip"] = en_to_de["tulip"] = "Tulpe";
ui_de["bucket"] = en_to_de["bucket"] = "Eimer";
ui_de["bulb"] = en_to_de["bulb"] = "Glühbirne";
ui_de["bricks"] = en_to_de["bricks"] = "Ziegel";

ui_de["mud"] = en_to_de["mud"] = "Schlamm";
ui_de["soil"] = en_to_de["soil"] = "Dreck";
ui_de["water"] = en_to_de["water"] = "Wasser";
ui_de["grass"] = en_to_de["grass"] = "Gras";
ui_de["gravel"] = en_to_de["gravel"] = "Kies";
ui_de["ice"] = en_to_de["ice"] = "Eis";
ui_de["fire"] = en_to_de["fire"] = "Feuer";

ui_de["infinite"] = "unbegrenzte Anzahl";

ui_de["fence_right"] = en_to_de["fence_right"] = "Zaun_rechts";
ui_de["fence_left"] = en_to_de["fence_left"] = "Zaun_links";
ui_de["fence_vertical"] = en_to_de["fence_vertical"] = "Zaun_vertilal";
ui_de["fence_double"] = en_to_de["fence_double"] = "Zaun_doppelt";

ui_de["Invalid Javascript code in Onload editor"] = "Ungültiger Javascript onload code; kontaktiere den Ersteller der Welt.";
ui_de["Invalid Python code in Onload editor"] = "Ungültiger Python onload code; kontaktiere den Ersteller der Welt.";

ui_de["Too many steps:"] = "Zu viele Schritte: {max_steps}<br>Nutze <code>set_max_nb_steps(nb)</code> um das Limit zu erhöhen.";
ui_de["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg ist an der korrekten x-Position.</li>";
ui_de["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg ist an der falschen x-Position.</li>";
ui_de["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg ist an der korrekten y-Position.</li>";
ui_de["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg ist an der falschen y-Position.</li>";
ui_de["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Alle Objekte sind an der korrekten Position.</li>";
ui_de["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Eines oder mehrere Objekte sind nicht an der korrekten Position.</li>";
ui_de["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Alle Wände wurden korrekt gebaut.</li>";
ui_de["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Eine oder mehrere Wände fehlen oder wurden an der falschen Position gebaut.</li>";
ui_de["Last instruction completed!"] = "Letzte Anweisung vollendet!";
ui_de["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Anweisung <code>done()</code> ausgeführt.</p>";

ui_de["Unknown object"] = "Unbekanntes Objekt: <code>{obj}</code>";
ui_de["No object found here"] = "<code>{obj}</code> hier nicht gefunden!";
ui_de["object"] = "Objekt";
ui_de["I don't have any object to put down!"] = "Ich habe kein <code>{obj}</code> um es abzulegen!";
ui_de["There is already a wall here!"] = "Hier ist schon eine Wand!";
ui_de["There is no wall to remove!"] = "Hier ist keine Wand, die entfernt werden kann!";
ui_de["Ouch! I hit a wall!"] = "Autsch! Ich bin gegen die Wand gelaufen!";
ui_de["Done!"] = "Fertig!";
ui_de["There is no position as a goal in this world!"] = "In dieser Welt gibt es keine Ziel-Position!";
ui_de["There is no goal in this world!"] = "In dieser Welt gibt es kein Ziel!";
ui_de["I carry too many different objects. I don't know which one to put down!"] = "Ich trage zu viele verschiedene Objekte. Ich weis nicht, welches ich ablegen soll!";
ui_de["Many objects are here; I do not know which one to take!"] = "Hier sind viele verschiedene Objekte; Ich weis nicht, welches ich nehmen soll!";

ui_de.east = en_to_de.east = "Ost";
ui_de.north = en_to_de.north = "Nord";
ui_de.west = en_to_de.west = "West";
ui_de.south = en_to_de.south = "Süd";
ui_de["Unknown orientation for robot."] = "Unbekannte Roboter-Ausrichtung.";

ui_de["Invalid position."] = "{pos} ist eine ungültige Position.";
ui_de["Invalid orientation."] = "'{orient}' ist eine ungültige Ausrichtung.";

ui_de["World selected"] = "Welt {world} ausgewählt";
ui_de["Could not find world"] = "Welt {world} konnte nicht gefunden werden";
ui_de["Object names"] = " library, token, star, triangle, square, etc.";

ui_de["Invalid world file."] = "Ungültige world Datei.";
ui_de["PERMALINK"] = "PERMALINK";
ui_de["Could not find link: "] = "Link konnte nicht gefunden werden: ";

ui_de["Click on world to move robot."] = "Klicke auf die Welt um mögliche Start-Positionen für Reeborg hinzuzufügen oder zu entfernen.";
ui_de["Added robot."] = "Reeborg hinzugefügt.";
ui_de["Click on image to turn robot"] = "Klicke auf das Bild um Reeborg zu drehen";
ui_de["Robot now has tokens."] = "Reeborg hat jetzt {x_tokens} Tokens.";
ui_de["Click on world to add object."] = "Klicke auf die Welt um eine Anzahl für <code>{obj}</code> zu setzen.";
ui_de["Click on desired object below."] = "Klicke unterhalb auf das gewünschte Objekt.";
ui_de["Click on world to toggle walls."] = "Klicke auf die Welt um Wände ein- oder auszuschalten.";
ui_de["Click on world to set home position for robot."] = "Klicke auf die Welt um mögliche finale Positionen für den Roboter hinzuzufügen / zu entfernen.";
ui_de["Click on world to toggle additional walls to build."] = "Klicke auf die Welt um das Bauen zusätzlicher Wände zu (de)aktivieren.";
ui_de["Click on desired goal object below."] = "Klicke unterhalb auf das gewünschte Zielobjekt.";
ui_de["Click on world to set number of goal objects."] = "Klicke auf die Welt um die Anzahl des Ziels <code>{obj}</code> zu setzen.";
ui_de["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Gib die Anzahl der Tokens ein, die Reeborg tragen soll.";
ui_de[" is not a valid value!"] = " ist kein gültiger Wert!";
ui_de["Enter number of objects desired at that location."] = "Klicke auf die Welt um die Anzahl von <code>{obj}</code> zu setzen.";
ui_de["Objects found here:"] = "Objekte, die hier gefunden wurden:";
ui_de["Description"] = "Beschreibung";
ui_de["A robot located here carries no objects."] = "Ein Roboter an der Position (x, y) = ({x}, {y}) trägt keine Objekte.";
ui_de["Goal to achieve:"] = "Zu erreichendes Ziel:";
ui_de["A robot located here carries:"] = "Ein Roboter an der Position (x, y) = ({x}, {y}) trägt:";
ui_de["random location"] = "zufällige Position";
ui_de["Enter number of objects to give to robot."] = "Gib die Anzahl von <code>{obj}</code> ein, die dem Roboter gegeben werden sollen.";
ui_de["Special information about this location:"] = "Spezifische Informationen über diese Position:";
ui_de["Click on world to toggle tile."] = "Klicke auf die Welt um <code>{obj}</code> Kachel zu (de)aktivieren.";
ui_de["Click on desired tile below."] = "Klicke unterhalb auf die gewünschte Kachel oder auf die Farbauswahl.";
ui_de["A wall must be built east of this location."] = "Östlich von dieser Position muss eine Wand gebaut werden.";
ui_de["A wall must be built north of this location."] = "Nördlich von dieser Position muss eine Wand gebaut werden.";
ui_de["A wall must be built west of this location."] = "Westlich von dieser Position muss eine Wand gebaut werden.";
ui_de["A wall must be built south of this location."] = "Südlich von dieser Position muss eine Wand gebaut werden.";
ui_de["The final required position of the robot will be chosen at random."] = "Die benötigte finale Position des Roboters wird zufällig ausgewählt werden.";
ui_de["The final position of the robot must be (x, y) = "] = "Die finale Position des Roboters muss sein: (x, y) = ";
ui_de["Click on world to fill with given tile."] = "Klicke auf die Welt um mit der gegebenen Kachel zu füllen.";
ui_de["Click on desired object below."] = "Klicke unterhalb auf das gewünschte Objekt.";
ui_de["Enter url of image to use as background."] = "Gebe die URL des Bildes ein, das als Hintergrund genutzt werden soll.";
ui_de["Replace editor content"] = "Möchtest du deinen Editor-Code durch den vom Weltersteller vorgegebenen ersetzen?";
ui_de["Replace library content"] = "Möchtest du deinen Library-Code durch den vom Weltersteller vorgegebenen ersetzen?";
ui_de["colour"] = "Farbe";
ui_de["There is already a bridge here."] = "There is already a bridge here.";

ui_de["Name already exist; confirm that you want to replace its content."] = "Name existiert bereits; bestätige, dass du seinen Inhalt ersetzen möchtest.";
ui_de["No such world!"] = "Eine solche Welt existiert nicht!";
ui_de["Enter world name to save"] = "Gibt den Namen der Welt zum speichern ein; Namen in Benutzung: ";
ui_de["Enter world name to delete"] = "Gib den Namen der zu löschenden Welt ein; existierende Welten: ";
ui_de["Delete "] = "Lösche ";

ui_de["Error found at or near line {number}."] = "Fehler nahe oder in Zeile {number} gefunden.";
ui_de["<br>Perhaps a missing colon is the cause."] = "<br>Vielleicht ist ein fehlender Strichpunkt der Grund.";
ui_de["<br>Perhaps you forgot to add parentheses ()."] = "<br>Vielleicht hast du vergessen, Klammern () hinzuzufügen.";
ui_de["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Vielleicht hast du ein Wort falsch geschrieben oder hast vergessen eine Methode / Variable zu definieren.";
ui_de["I cannot help you with this problem."] = "Bei diesem Problem kann ich dir nicht helfen.";

ui_de["I'm stuck in mud."] = "Ich stecke im Schlamm fest.";
ui_de["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Schlamm: Reeborg <b>kann</b> das <b>nicht</b> feststellen und wird feststecken wenn er sich zu dieser Position bewegt.";
ui_de["Soil: usually safe, but looks identical to mud."] = "Dreck: normalerweise sicher, aber sieht genau so aus wie Schlamm.";
ui_de["I'm slipping on ice!"] = "Ich rutsche auf Eis!";
ui_de["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Eis: Reeborg <b>kann</b> das <b>nicht</b> feststellen und <em>könnte</em> zur nächsten Position rutschen wenn er sicht zu dieser Position bewegt.";
ui_de["Grass: usually safe."] = "Gras: normalerweise sicher.";
ui_de["Gravel: usually safe."] = "Kies: normalerweise sicher.";
ui_de["I'm in water!"] = "Ich bin im Wasser!";
ui_de["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Wasser: Reeborg <b>kann</b> das <b>nicht</b> feststellen und wird beschädigt wenn er sicht zu dieser Position bewegt.";
ui_de["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "grüne Home-Kachel: Reeborg <b>kann</b> sie mit at_goal() aufspüren.";
ui_de["Crash!"] = "Crash!";
ui_de["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Ziegelwand: Reeborg <b>kann</b> sie erkennen wird sich verletzen wenn er versucht, sich durch die Wand zu bewegen.";
ui_de["I hit a fence!"] = "Ich bin gegen einen Zaun gelaufen!";
ui_de["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Zaun: Reeborg <b>kan</b> ihn erkennen aber wird durch ihn gestoppt werden.";
ui_de["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Brücke: Reeborg <b>kann</b> sie erkennen und wird wissen dass sie das sichere Passieren über Wasser ermöglicht.";
ui_de["My joints are melting!"] = "Meine Verbindungsstücke schmelzen!";
ui_de["A bucket full of water."] = "Ein Eimer voll Wasser.";
ui_de["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulpenknolle: kann mit etwas Wasser zu einer schönen Tulpe heranwachsen.";


ui_de["Something is blocking the way!"] = "Etwas blockiert den Weg!";
ui_de["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>kann</b> das mit at_goal() erkennen.";
ui_de["green home tile:"] = "grüne Home-Kachel:";
ui_de["home:"] = "Home:";
ui_de["racing flag:"] = "Rennflagge:";
ui_de["house:"] = "Haus:";

ui_de["Local variables"] = "Lokale Variablen";
ui_de["Global variables"] = "Globale Variablen";
ui_de["Watched expressions"] = "Bewachte Ausdrücke";

ui_de["move forward"] = "schritt nach vorne";
ui_de["turn left"] = "nach links drehen";
ui_de["take object"] = "Objekt nehmen";
ui_de["put object"] = "Objekt ablegen";
ui_de["Pause the program's execution."] = "Ausführung des Programms pausieren.";
ui_de["Build a wall in front of the robot."] = "Eine Wand vor dem Roboter bauen.";
ui_de["End the program's execution."] = "Ausführung des Programms beenden.";
ui_de["True if a wall is blocking the way."] = "Wahr wenn eine Wand den Weg blockiert.";
ui_de["True if nothing is blocking the way."] = "Wahr wenn nichts den Weg blockiert.";
ui_de["True if desired destination."] = "Wahr wenn gewünschte Position.";
ui_de["True if robot carries at least one object."] = "Wahr wenn der Roboter mindestens ein Objekt trägt.";
ui_de["True if there is at least one object here."] = "Wahr wenn hier mindestens ein Objekt ist.";
ui_de["True if robot is facing North."] = "Wahr wenn der Roboter nach Norden schaut.";
ui_de["Delay between actions; default is 300 ms."] = "Verzögerung zwischen Aktionen; Standard: 300 ms.";

ui_de["Save world in browser"] = "Welt in Browser speichern";
ui_de["LOAD BLOCKLY"] = "Programm aus Datei importieren (Blockly)";
ui_de["LOAD BLOCKLY EXPLAIN"] = "Öffnet eine lokale Datei und nutzt seinen Inhalt um den Inhalt des Blockly-Workspace zu ersetzen.";
ui_de["LOAD EDITOR"] = "Programm aus Datei importieren";
ui_de["LOAD EDITOR EXPLAIN"] = "Öffnet eine lokale Datei und nutzt seinen Inhalt um den Inhalt des Code-Editor zu ersetzen.";
ui_de["LOAD LIBRARY"] = "Library aus Datei importieren";
ui_de["LOAD LIBRARY EXPLAIN"] = "Öffnet eine lokale Datei und nutzt seinen Inhalt um den Inhalt der Library zu ersetzen.";
ui_de["LOAD WORLD"] = "Welt aus Datei öffnen";
ui_de["LOAD WORLD EXPLAIN"] = "Lädt eine Welt aus einer Datei auf deinem Computer.";
ui_de["SAVE BLOCKLY"] = "Programm in Datei speichern";
ui_de["SAVE BLOCKLY EXPLAIN"] = "Speichert die aktuellen Blöcke in einer Datei." + mac_user_save_files_en;
ui_de["SAVE EDITOR"] = "Programm in Datei speichern";
ui_de["SAVE EDITOR EXPLAIN"] = "Speichert den Inahlt des Editors in einer Datei." + mac_user_save_files_en;
ui_de["SAVE LIBRARY"] = "Speichert die Library";
ui_de["SAVE LIBRARY EXPLAIN"] = "Speichert den Inhalt der Library in einer Datei." + mac_user_save_files_en;
ui_de["SAVE WORLD"] = "Welt in Datei speichern";
ui_de["SAVE WORLD EXPLAIN"] = "Speichert die Welt (als JSON-Objekt) in einer Datei auf deinem Computer." + mac_user_save_files_en;

ui_de["PROGRESS SECTION TITLE"] = "Verfolge gelöste Aufgaben:";
ui_de["PROGRESS EXPLAIN"] = "Gelöste Aufgaben sind mit " + RUR.CHECKMARK +
    "in der Weltauswahl markiert und die Informationen werden in deinem Browser gespeichert. Wenn du einen anderen Browser nutzt, " +
    "werden die Aufgaben die du bereits mit einem anderen Browser gelöst hast nicht gezeigt. " +
    "Wenn du unterhalb auf den Speichern Knopf drückst, wird eine Datei mit dem Namen progress.json mit den gelösten Aufgaben gepseichert werden, " +
    "die im aktuellen Browser aufgezeichnet wurden. Du kannst diese Datei in einem anderen Browser importieren, damit dein Fortschritt aktualisiert werden kann.";
ui_de["SAVE PROGRESS"] = "Speichern";
ui_de["IMPORT PROGRESS"] = "Importieren";
ui_de["RETRIEVE SOLUTION"] = "Lösung holen!";
ui_de["RETRIEVE SOLUTION EXPLAIN"] = "Falls eine Lösung (Blöcke, oder Code und möglicherweise Code in der Library) für diese Welt im Browser für den Aktuellen Programmier-Modus gespeichert wurde, wird sie geholt und der aktuelle Inhalt durch sie ersetzt.";

ui_de["ADD CONTENT TO WORLD"] = "Inhalt zur Welt von den unterhalb ausgewählen Gegenständen hinzuzufügen.";
ui_de["ADD BLOCKLY TEXT"] = "Code Blöcke";
ui_de["ADD EDITOR TEXT"] = "Code im Editor";
ui_de["ADD LIBRARY TEXT"] = "Bibliothek";
ui_de["ADD PRE TEXT"] = "Vor";
ui_de["ADD POST TEXT"] = "Nach";
ui_de["ADD DESCRIPTION TEXT"] = "Beschreibung";
ui_de["ADD ONLOAD TEXT"] = "Laden";

ui_de["KEYBOARD BUTTON"] = "Reeborg's Tastatur";
ui_de["ADDITIONAL OPTIONS"] = "Zusätzliche Optionen";

ui_de["BASIC COMMANDS"] = "Grundlegende Kommandos";
ui_de["DEFINING"] = "Definieren";
ui_de["LOOPS"] = "Schleifen";
ui_de["DECISIONS"] = "Entscheidungen";
ui_de["CONDITIONS"] = "Bedingungen";
ui_de["USING VARIABLES"] = "Nutzung von Variablen";
ui_de["COMMANDS"] = "Kommandos";
ui_de["OTHER"] = "Andere";
ui_de["OBJECTS"] = "Objekte";

ui_de["Python Code"] = "Python Code";
ui_de["Javascript Code"] = "Javascript Code";
ui_de["LIBRARY"] = "Library";
ui_de["EXTRA"] = "Zusatz";
ui_de["PRE"] = "Vor";
ui_de["POST"] = "Nach";
ui_de["DESCRIPTION"] = "Beschreibung";
ui_de["ONLOAD"] = "Laden";

ui_de["HIGHLIGHT IMPOSSIBLE"] = "Durch ein Problem mit deinem Code musste ich Code-Highlighting deaktivieren.";
ui_de["COMMAND RESULT"] = "Wähle eine auszuführende Aktion vom Menü unterhalb aus.";

ui_de["DELETE WORLD TEXT"] = "Das Nachfolgende bezieht sich auf die aktuell in deinem Browser gespeicherten Welten, die du löschen kannst:";
ui_de["PYTHON ONLY"] = "Nur Python";
ui_de["COLLABORATION"] = "Kooperation";
ui_de["TOGETHERJS EXPLAIN"] = "Tool zur Zusammenarbeit mit einer oder mehreren anderen Personen durch Nutzung von Mozilla's TogetherJS. Funktioniert nicht mit Blockly.";
ui_de["WORLD CREATION TITLE"] = "Welt: Erstellung, Edition, ...";
ui_de["EDIT WORLD"] = "Welt editieren";
ui_de["EDIT WORLD EXPLAIN"] = "Du kannst deine eigene Welt erstellen, indem du die aktuelle editierst.";
ui_de["PROGRAM IN EDITOR"] = "Programm im Editor";
ui_de["PROGRAM IN BLOCKLY WORKSPACE"] = "Programm im Blockly-Workspace";
ui_de["CONTACT"] = "(Nur Englisch/Französisch) Email:";
ui_de["ISSUES"] = "Bugmeldungen, Vorschläge, andere Anliegen, etc. (nur Englisch/Französisch)";
ui_de["FORUM"] = "Diskussionsforum (nur Englisch/Französisch)";
ui_de["HELP"] = "Hilfe";
ui_de["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Dokumentation</a>';
ui_de["PYTHON HELP"] = "In Python: Führe ein Programm mit <code>help()</code> aus, um eine Liste von Kommandos zu erhalten oder <code>help(move)</code> um Hilfe zur <code>move()</code> Funktion zu erhalten, etc.";
ui_de["KEYBOARD HELP"] = "Klicke auf die Reeborg Tastatur um eine Liste von verfügbaren Kommandos, Python Schlüsselwörtern, etc. zu erhalten.";

ui_de["WORLD EDITOR"] = "Welteditor";
ui_de["m-east"] = "Osten";
ui_de["m-north"] = "Norden";
ui_de["m-west"] = "Westen";
ui_de["m-south"] = "Süden";
ui_de["m-random"] = "zufällig";
ui_de["m-dimensions"] = "Weltmaße";
ui_de["m-add"] = "Hinzufügen";
ui_de["m-add-robot"] = "Roboter hinzufügen";
ui_de["m-robot"] = "Roboter";
ui_de["m-position"] = "Position(en)";
ui_de["m-turn"] = "Drehen";
ui_de["m-objects"] = "Objekte";
ui_de["m-walls"] = "Wände";
ui_de["m-objects2"] = "Objekte";
ui_de["m-tiles"] = "Kacheln";
ui_de["m-fill"] = "Füllen";
ui_de["m-solid"] = "Hindernisse";
ui_de["m-decorative"] = "Dekorative Objekte";
ui_de["m-background"] = "Hintergrundbild";
ui_de["m-goal"] = "Ziel";
ui_de["mg-robot"] = "Roboter";
ui_de["mg-walls"] = "Wände";
ui_de["mg-objects"] = "Objekte";

ui_de["Reeborg says: I'm done!"] = "Reeborg sagt: Ich bin fertig!";
ui_de["Reeborg writes:"] = "Reeborg schreibt:";
ui_de["Reeborg shouts: Something is wrong!"] = "Reeborg schreit: Hier ist etwas falsch!";
ui_de["Reeborg explores some Javascript code"] = "Reeborg entdeckt etwas JavaScript Code";
ui_de["Reeborg states:"] = "Reeborg sagt:";
ui_de["Reeborg watches some variables!"] = "Reeborg beobachtet einige Variablen!";
ui_de["Click on the world to get some additional information."] = "Klicke auf die Welt um einige zusätzliche Informationen zu erhalten.";

ui_de["Reeborg's basic keyboard"] = "Reeborg's grundlegende Tastatur";
ui_de["kbd-command-btn"] = "Kommandos";
ui_de["kbd-condition-btn"] = "Bedingungen";
ui_de["kbd-python-btn"] = "Python";
ui_de["kbd-py-console-btn"] = "Python";
ui_de["kbd-javascript-btn"] = "JavaScript";
ui_de["kbd-cpp-btn"] = "C++";
ui_de["kbd-coffee-btn"] = "CoffeeScript";
ui_de["kbd-objects-btn"] = "Objekte";
ui_de["kbd-special-btn"] = "Speziell";

ui_de["UNDO"] = "Rückgängig";
ui_de["REDO"] = "Wiederholen";
ui_de["tab"] = "TAB";
ui_de["shift-tab"] = "Shift-TAB";
ui_de["enter"] = "\u23CE";
ui_de["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> ist kein richtiges Python Schlüsselwort.";

ui_de["Colour:"] = "Farbe:";
ui_de["Enter a colour"] = "Gib eine Farbe ein";

ui_de["Background image"] = "Hintergrundbild";

ui_de["NAME:"] = "Name:";
ui_de["Save world in browser"] = "Welt in Browser speichern";

ui_de["Set the world's dimensions"] = "Setze die Maße der Welt";
ui_de["set-dimensions-explain"] = "Falls gewünscht, kannst du die Größe der Welt zu anderen als den Standardmaßen setzen. Bitte denke daran, dass eine geringere AuflösungIf so desired, you can set the size of the world to be different from the default dimensions. Please remember that smaller resolution screens may not be able to display very large worlds.";
ui_de["Maximum x value:"] = "Maximaler x-Wert:";
ui_de["Maximum y value:"] = "Maximaler  y-Wert:";
ui_de["Use small tiles"] = "Verwende kleine Bilder";

ui_de["Set goal number for object"] = "Setze Zielnummer für das Objekt";
ui_de["dialog-goal-object-explain"] = "Klicke don the checkbox if you wish that number to be equal  to the total number of such objects found in the world at the beginning.";
ui_de["Number of objects"] = "Anzahl der Objekte";
ui_de["All such objects"] = "Alle Objekte der Art";

ui_de["Number of objects:"] = "Anzahl der Objekte:";
ui_de["Maximum:"] = "Maximum:";
ui_de["Add object in the world"] = "Set number of object";
ui_de["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_de["Unlimited:"] = "Unlimited:";
ui_de["Give object to robot"] = "Give object to robot";
ui_de["GIVE OBJECT EXPLAIN"] = "Choose a number of objects for the robot to carry. Click on the checkbox if you wish that number to be unlimited.";

ui_de["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_de["UPDATE BLOCKLY BUTTON"] = "Ersetze bisherige Blöcke";
ui_de["Contents from World"] = "Inhalte von World";

ui_de["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_de["Library Code is below."] = "Code-Bibliothek ist unten.";
ui_de["No solution can be saved when using REPL (Py)."] = "Mit REPL (Py) können keine Lösungen gespeichert werden!.";
ui_de["No solution can be loaded when using REPL (Py)."] = "Mit REPL (Py) können keine Lösungen geladen werden!.";

ui_de["You are not allowed to use <code>done</code> in this world!"] = "Du darfst <code>done()</code> nicht in dieser Welt verwenden!";
ui_de["Execution ended before the <em>Post</em> code was executed."] = "Ausführung wurde beendet. bevor der Code <em>Post</em> ausgeführt wurde.";

ui_de["Difficulty level"] = "Schwierigkeitsgrad";

ui_de["Expected result"] = "Erwartetes Ergebnis";
ui_de["Differences highlighted"] = "Differenzen markiert";
ui_de["Actual result"] = "Aktuelles Ergebnis";

ui_de["Cannot parse progress file."] = "Kann die Datei mit dem Fortschritt nicht lesen.";
ui_de["Cannot merge progress."] = "Fortschritt kann nicht hinzugefügt werden.";
ui_de["No solution found for this world."] = "Keine Lösung für diese Welt.";

ui_de["THINKING"] = "Denke ...";

function inverse(obj){
  var retobj = {};
  for(var key in obj){
    retobj[obj[key]] = key;
  }
  return retobj;
}

de_to_en = inverse(en_to_de)
