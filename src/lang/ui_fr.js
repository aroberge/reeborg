// the following is used in a few places below
var mac_user_save_files_fr = ' <b>Utilisateurs Mac:</b> consultez <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Problèmes connus</a>.';

exports.ui_fr = ui_fr = {};
exports.fr_to_en = fr_to_en = {};

ui_fr["fr-en"] = "Mode mixte: interface graphique en français; programmation en anglais.<br>" +
    "Mixed mode: User Interface in French; programming language in English.<br>";

ui_fr["SITE NAME"] = "Le monde de Reeborg";
ui_fr["WORLD INFO"] = "Description";
ui_fr["EDITOR VISIBLE"] = "Garder l'éditeur visible";

ui_fr["apple"] = "pomme";
fr_to_en["pomme"] = "apple";
ui_fr["banana"] = "banane";
fr_to_en["banane"] = "banana";
ui_fr["beeper"] = "sonnette";
fr_to_en["sonnette"] = "beeper";
ui_fr["box"] = "boîte";
fr_to_en["boîte"] = "box";
ui_fr["bridge"] = "pont";
fr_to_en["pont"] = "bridge";
ui_fr["carrot"] = "carotte";
fr_to_en["carotte"] = "carrot";
ui_fr["daisy"] = "marguerite";
fr_to_en["marguerite"] = "daisy";
ui_fr["dandelion"] = "pissenlit";
fr_to_en["pissenlit"] = "dandelion";
ui_fr["leaf"] = "feuille";
fr_to_en["feuille"] = "leaf";
ui_fr.square = "carré";
fr_to_en["carré"] = "square";
ui_fr.star = "étoile";
fr_to_en["étoile"] = "star";
ui_fr["strawberry"] = "fraise";
fr_to_en["fraise"] = "strawberry";
ui_fr.token = "jeton";
ui_fr["tokens are Reeborg's favourite thing."] = "Les jetons sont les objets favoris de Reeborg.";
fr_to_en["jeton"] = "token";
ui_fr.triangle = "triangle";
fr_to_en["triangle"] = "triangle";
ui_fr["tulip"] = "tulipe";
fr_to_en["tulipe"] = "tulip";
ui_fr["bucket"] = "seau d'eau";
fr_to_en["seau d'eau"] = "bucket";
ui_fr["bulb"] = "bulbe de tulipe";
fr_to_en["bulbe de tulipe"] = "bulb";
ui_fr["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Bulbe de tulipe : pourrait devenir une belle tulipe avec un seau d'eau.";
ui_fr["bricks"] = "briques";
fr_to_en["briques"] = "bricks";

ui_fr["mud"] = "boue";
fr_to_en["boue"] = "mud";
ui_fr["soil"] = "sol";
fr_to_en["sol"] = "soil";
ui_fr["water"] = "eau";
fr_to_en["eau"] = "water";
ui_fr["grass"] = "gazon";
fr_to_en["gazon"] = "grass";
ui_fr["gravel"] = "gravier";
fr_to_en["gravier"] = "gravel";
ui_fr["ice"] = "glace";
fr_to_en["glace"] = "ice";
ui_fr["fire"] = "feu";
fr_to_en["feu"] = "fire";

ui_fr["infinite"] = "nombre infini";

ui_fr["fence_right"] = "clôture_droite";
fr_to_en["clôture_droite"] = "fence_right";
ui_fr["fence_left"] = "clôture_gauche";
fr_to_en["clôture_gauche"] = "fence_left";
ui_fr["fence_double"] = "clôture_double";
fr_to_en["clôture_double"] = "fence_double";
ui_fr["fence_vertical"] = "clôture_verticale";
fr_to_en["clôture_verticale"] = "fence_vertical";

ui_fr["Invalid Javascript code in Onload editor"] = "Code Javascript 'onload' non valide; veuillez contacter le créateur de ce monde.";
ui_fr["Invalid Python code in Onload editor"] = "Code Python 'onload' non valide; veuillez contacter le créateur de ce monde.";

ui_fr["Too many steps:"] = "Trop d'instructions: {max_steps}<br>Utilisez <code>max_nb_instructions(nb)</code> pour augmenter la limite.";
ui_fr["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
ui_fr["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
ui_fr["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
ui_fr["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
ui_fr["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
ui_fr["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
ui_fr["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
ui_fr["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
ui_fr["Last instruction completed!"] = "Dernière instruction complétée!";
ui_fr["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";

ui_fr["Unknown object"] = "Objet inconnu: <code>{obj}</code>";
ui_fr["No object found here"] = "Pas d'objet <code>{obj}</code> trouvé ici !";
ui_fr["object"] = "objet";
ui_fr["I don't have any object to put down!"] = "Je n'ai pas d'objet <code>{obj}</code>!";
ui_fr["There is already a wall here!"] = "Il y a déjà un mur ici !";
ui_fr["There is no wall to remove!"] = "Il n'y a pas de mur à enlever d'ici !";
ui_fr["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
ui_fr["Done!"] = "Terminé !";
ui_fr["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
ui_fr["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
ui_fr["I carry too many different objects. I don't know which one to put down!"] = "Je transporte trop d'objets: je ne sais pas lequel déposer!";
ui_fr["Many objects are here; I do not know which one to take!"] = "Beaucoup d'objets différents sont ici; je ne sais pas lequel prendre!";

ui_fr.east = "est";
ui_fr.north = "nord";
ui_fr.west = "ouest";
ui_fr.south = "sud";
fr_to_en["est"] = "east";
fr_to_en["nord"] = "north";
fr_to_en["ouest"] = "west";
fr_to_en["sud"] = "south";
ui_fr["Unknown orientation for robot."] = "Orientation inconnue.";

ui_fr["Invalid position."] = "{pos} n'est pas une position valide.";
ui_fr["Invalid orientation."] = "'{orient}' est une orientation inconnue.";

ui_fr["World selected"] = "Monde {world} choisi";
ui_fr["Could not find world"] = "Je ne peux pas trouver {world}";
ui_fr["Object names"] = " biblio, jeton, étoile, triangle, carré, etc.";

ui_fr["Invalid world file."] = "Fichier monde invalide.";
ui_fr["Could not find link: "] = "Lien introuvable : ";

ui_fr["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
ui_fr["Added robot."] = "Reeborg ajouté.";
ui_fr["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
ui_fr["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
ui_fr["Click on world to add object."] = "Cliquez sur le monde pour ajouter des <code>{obj}</code>.";
ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
ui_fr["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
ui_fr["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
ui_fr["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
ui_fr["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
ui_fr["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet <code>{obj}</code> comme but.";
ui_fr["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg.";
ui_fr[" is not a valid value!"] = " n'est pas une valeur valide!";
ui_fr["Enter number of objects desired at that location."] = "Cliquez sur le monde pour fixer le nombre d'objet <code>{obj}</code> désiré à cet endroit.";
ui_fr["Objects found here:"] = "Objets trouvés ici:";
ui_fr["Description"] = "Description";
ui_fr["A robot located here carries no objects."] = "Un robot situé à (x, y) = ({x}, {y}) ne transporte aucun objet.";
ui_fr["A robot located here carries:"] = "Un robot situé à (x, y) = ({x}, {y}) transporte:";
ui_fr["random location"] = "une position choisie au hasard";
ui_fr["Enter number of objects to give to robot."] = "Quel nombre de <code>{obj}</code> voulez-vous donner au robot?";
ui_fr["Special information about this location:"] = "Information particulière au sujet de cet endroit:";
ui_fr["Click on world to toggle tile."] = "Cliquez sur le monde pour ajouter/supprimer l'image: <code>{obj}</code>.";
ui_fr["Click on desired tile below."] = "Cliquez sur l'image désirée ci-dessous ou sur le sélecteur de couleur.";

ui_fr["A wall must be built east of this location."] = "Un mur doit être construit à l'est de cet endroit.";
ui_fr["A wall must be built north of this location."] = "Un mur doit être construit au nord de cet endroit.";
ui_fr["A wall must be built west of this location."] = "Un mur doit être construit à l'ouest de cet endroit.";
ui_fr["A wall must be built south of this location."] = "Un mur doit être construit au sud de cet endroit.";
ui_fr["The final required position of the robot will be chosen at random."] = "La position finale requise pour Reeborg sera choisie au hasard.";
ui_fr["The final position of the robot must be (x, y) = "] = "La position finale de Reeborg doit être (x, y) = ";
ui_fr["Click on world to fill with given tile."] = "Cliquez sur le monde pour remplir avec cet objet.";
ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré.";
ui_fr["Enter url of image to use as background."] = "Fournir l'adresse (URL) de l'image à utiliser.";
ui_fr["Replace editor content"] = "Voulez-vous remplacer le contenu du code de votre éditeur par celui défini par le créateur du monde?";
ui_fr["Replace library content"] = "Voulez-vous remplacer le contenu du code de votre biliothèque par celui défini par le créateur du monde?";
ui_fr["colour"] = "couleur";
ui_fr["There is already a bridge here."] = "Il y a déjà un pont ici.";

ui_fr["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
ui_fr["No such world!"] = "Ce monde n'existe pas !";
ui_fr["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde? Noms utilisés:";
ui_fr["Enter world name to delete"] = "Écrivez le nom du monde à supprimer; mondes existant:";
ui_fr["Goal to achieve:"] = "Résultat désiré :";
ui_fr["Delete "] = "Effacer ";

ui_fr["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
ui_fr["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
ui_fr["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
ui_fr["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";
ui_fr["I cannot help you with this problem."] = "Je ne peux pas vous aider avec ce problème.";

ui_fr["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
ui_fr["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
ui_fr["Soil: usually safe, but looks identical to mud."] = "Sol: habituellement sans problèmes, mais ressemble visuellement à la boue.";
ui_fr["I'm slipping on ice!"] = "Je glisse sur la glace!";
ui_fr["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et pourrait glisser à la prochaine case.";
ui_fr["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
ui_fr["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
ui_fr["I'm in water!"] = "Je suis dans l'eau!";
ui_fr["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il va être endommagé s'il s'y déplace.";
ui_fr["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "tuile verte: Reeborg <b>peut</b> détecter ceci avec au_but().";
ui_fr["Crash!"] = "Crash!";
ui_fr["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mur de brique: Reeborg <b>peut</b> détecter ceci mais il se fera mal s'il essaie de passer au travers.";
ui_fr["I hit a fence!"] = "J'ai frappé une clôture!";
ui_fr["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Clôture: Reeborg <b>peut</b> détecter ceci mais il ne peut pas passer au travers.";
ui_fr["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Pont: Reeborg <b>peut</b> détecter ceci et sait que cela lui permettra de traverser l'eau en sureté.";
ui_fr["My joints are melting!"] = "Mes articulations fondent !";
ui_fr["A bucket full of water"] = "Un seau rempli d'eau.";


fr_to_en["pont"] = "bridge";
ui_fr["Something is blocking the way!"] = "Quelque chose bloque le chemin!";
ui_fr["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>peut</b> détecter ceci avec au_but().";
ui_fr["green home tile:"] = "tuile verte pour l'arrivée :";
ui_fr["home:"] = "la maison :";
ui_fr["racing flag:"] = "drapeau d'arrivée :";
ui_fr["house:"] = "maison :";

ui_fr["Local variables"] = "Variables locales";
ui_fr["Global variables"] = "Variables globales";
ui_fr["Watched expressions"] = "Watched expressions";

ui_fr["move forward"] = "avance";
ui_fr["turn left"] = "tourne à gauche";
ui_fr["take object"] = "prend l'objet";
ui_fr["put object"] = "dépose l'objet";
ui_fr["Pause the program's execution."] = "Pause l'exécution du programme.";
ui_fr["Build a wall in front of the robot."] = "Construit un mur devant le robot.";
ui_fr["End the program's execution."] = "Termine l'exécution du programme.";
ui_fr["True if a wall is blocking the way."] = "Vrai si un mur bloque le chemin.";
ui_fr["True if nothing is blocking the way."] = "Vrai si rien ne bloque le chemin.";
ui_fr["True if desired destination."] = "Vrai si c'est la destination désirée.";
ui_fr["True if robot carries at least one object."] = "Vrai si le robot transporte au moins un objet.";
ui_fr["True if there is at least one object here."] = "Vrai s'il y a au moins un objet ici.";
ui_fr["True if robot is facing North."] = "Vrai se le robot est face au nord.";
ui_fr["Delay between actions; default is 300 ms."] = "Délai entre les actions; le défaut est de 300 ms.";

ui_fr["Save world in browser"] = "Sauvegarder le monde dans le navigateur";
ui_fr["Save permalink"] = "Sauvegarder le permalien";
ui_fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
ui_fr["LOAD BLOCKLY"] = "Ouvrir un programme (blocs)";
ui_fr["LOAD BLOCKLY EXPLAIN"] = "Ouvre un fichier local et remplace les blocs (Blockly) par le contenu du fichier.";
ui_fr["LOAD EDITOR"] = "Ouvrir un programme";
ui_fr["LOAD EDITOR EXPLAIN"] = "Ouvre un fichier local et remplace le contenu de l'éditeur par le contenu du fichier.";
ui_fr["LOAD LIBRARY"] = "Importer une bibliothèque";
ui_fr["LOAD LIBRARY EXPLAIN"] = "Ouvre un fichier contenant un programme et remplace le contenu de la bibliothèque par le contenu du fichier choisi.";
ui_fr["LOAD WORLD"] = "Ouvrir un monde";
ui_fr["LOAD WORLD EXPLAIN"] = "Ouvre un monde à partir d'un fichier.";
ui_fr["SAVE BLOCKLY"] = "Sauvegarder les blocs.";
ui_fr["SAVE BLOCKLY EXPLAIN"] = "Sauvegarde le programme (blocs)." + mac_user_save_files_fr;
ui_fr["SAVE EDITOR"] = "Sauvegarder le programme";
ui_fr["SAVE EDITOR EXPLAIN"] = "Sauvegarde le contenu de l'éditeur dans un fichier." + mac_user_save_files_fr;
ui_fr["SAVE LIBRARY"] = "Sauvegarder la bibliothèque";
ui_fr["SAVE LIBRARY EXPLAIN"] = "Sauvegarde le contenu de la bibliothèque dans un fichier." + mac_user_save_files_fr;
ui_fr["SAVE WORLD"] = "Sauvegarder le monde";
ui_fr["SAVE WORLD EXPLAIN"] = "Sauvegarde le monde dans un fichier (format json) sur votre ordinateur." + mac_user_save_files_fr;


ui_fr["PROGRESS SECTION TITLE"] = "Le résumé des tâches";
ui_fr["PROGRESS EXPLAIN"] = "Les tâches résolues sont indiqués par " + RUR.CHECKMARK +
    "dans le sélecteur de monde et l'information est sauvegardée dans votre navigateur. " +
    "Si vous utilisez un navigateur différent, les tâches que vous avez résolues ailleurs n'apparaîtront pas. " +
    "Si vous cliquez sur le bouton sauvegarder, un fichier nommé progress.json sera sauvegardé avec l'information requise. " +
    "vous pouvez importer ce fichier dans un autre navigateur pour mettre vos tâches à jour dans ce dernier.";
ui_fr["SAVE PROGRESS"] = "Sauvegarder";
ui_fr["IMPORT PROGRESS"] = "Importer";
ui_fr["RETRIEVE SOLUTION"] = "Récupérer la solution";
ui_fr["RETRIEVE SOLUTION EXPLAIN"] = "Si une solution (blocs, ou code et possiblement code dans la biblio) pour ce monde et pour le mode de programmation courant a été sauvegardée dans le navigateur, elle sera récupérée et remplacera le programme présent.";

ui_fr["ADD CONTENT TO WORLD"] = "Ajouter au monde le contenu des items indiqués ci-dessous.";
ui_fr["ADD BLOCKLY TEXT"] = "Blocs de code";
ui_fr["ADD EDITOR TEXT"] = "Code dans l'éditeur";
ui_fr["ADD LIBRARY TEXT"] = "Biblio";
ui_fr["ADD PRE TEXT"] = "Pre";
ui_fr["ADD POST TEXT"] = "Post";
ui_fr["ADD DESCRIPTION TEXT"] = "Description";
ui_fr["ADD ONLOAD TEXT"] = "Onload";

ui_fr["KEYBOARD BUTTON"] = "Clavier de Reeborg";
ui_fr["ADDITIONAL OPTIONS"] = "Autres options";

ui_fr["BASIC COMMANDS"] = "Commandes";
ui_fr["DEFINING"] = "Définitions";
ui_fr["LOOPS"] = "Boucles";
ui_fr["DECISIONS"] = "Décisions";
ui_fr["CONDITIONS"] = "Conditions";
ui_fr["USING VARIABLES"] = "Utiliser des variables";
ui_fr["COMMANDS"] = "Commandes";
ui_fr["OTHER"] = "Autres";
ui_fr["OBJECTS"] = "Objets";

ui_fr["Python Code"] = "Code Python";
ui_fr["Javascript Code"] = "Code Javascript";
ui_fr["LIBRARY"] = "biblio";
ui_fr["EXTRA"] = "extra";
ui_fr["PRE"] = "Pre";
ui_fr["POST"] = "Post";
ui_fr["DESCRIPTION"] = "Desc.";
ui_fr["ONLOAD"] = "Onload";

ui_fr["HIGHLIGHT IMPOSSIBLE"] = "Un problème non-identifié avec votre code a fait en sorte que j'ai arrêté le surlignage du code dans l'éditeur.";
ui_fr["COMMAND RESULT"] = "Sélectionnez l'action à performer dans le menu ci-dessous.";

ui_fr["DELETE WORLD TEXT"] = "En cliquant sur un bouton, éliminez un monde connu de la mémoire de votre nagivageur.";
ui_fr["PYTHON ONLY"] = "Python seulement";
ui_fr["COLLABORATION"] = "Collaboration";
ui_fr["TOGETHERJS EXPLAIN"] = "Outil qui permet la collaboration à distance en utilisant l'outil TogetherJS de Mozilla (interface en anglais seulement). Ne fonctionne pas avec Blockly.";
ui_fr["WORLD CREATION TITLE"] = "Monde : édition, création, ...";
ui_fr["EDIT WORLD"] = "Édition du monde";
ui_fr["EDIT WORLD EXPLAIN"] = "Vous pouvez créer vos propres mondes en modifiant un monde existant.";
ui_fr["PROGRAM IN EDITOR"] = "Programme dans l'éditeur";
ui_fr["PROGRAM IN BLOCKLY WORKSPACE"] = "Programme de blocs";
ui_fr["CONTACT"] = "Courriel :";
ui_fr["ISSUES"] = "Rapports de bogues, suggestions, autres problèmes, etc. (en anglais ou en français seulement).";
ui_fr["FORUM"] = "Forum de discussions (en anglais ou en français seulement).";
ui_fr["HELP"] = "Aide";
ui_fr["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/fr" target="_blank" rel="noopener">Documentation</a>';
ui_fr["PYTHON HELP"] = "En utilisant Python, executez un programme avec <code>help()</code> pour obtenir une liste de commandes ou <code>help(avance)</code> pour obtenir de l'aide sur la fonction <code>avance()</code>, etc.";
ui_fr["KEYBOARD HELP"] = "Cliquez sur le clavier de Reeborg keyboard pour voir une liste des commandes, la syntaxe Python, etc.";

ui_fr["WORLD EDITOR"] = "Éditeur de monde";
ui_fr["m-east"] = "Est";
ui_fr["m-north"] = "Nord";
ui_fr["m-west"] = "Ouest";
ui_fr["m-south"] = "Sud";
ui_fr["m-random"] = "Aléatoire";
ui_fr["m-dimensions"] = "Taille du monde";
ui_fr["m-add"] = "Ajouter";
ui_fr["m-add-robot"] = "Ajouter Reeborg";
ui_fr["m-robot"] = "Robot";
ui_fr["m-position"] = "Position(s)";
ui_fr["m-turn"] = "Orientation";
ui_fr["m-objects"] = "Objets";
ui_fr["m-walls"] = "Murs";
ui_fr["m-objects2"] = "Objets";
ui_fr["m-tiles"] = "Tuiles";
ui_fr["m-fill"] = "Remplir";
ui_fr["m-solid"] = "Obstacles";
ui_fr["m-decorative"] = "Objets décoratifs";
ui_fr["m-background"] = "Image de fond";
ui_fr["m-goal"] = "But";
ui_fr["mg-robot"] = "Robot";
ui_fr["mg-walls"] = "Murs";
ui_fr["mg-objects"] = "Objets";

ui_fr["Reeborg says: I'm done!"] = "Reeborg dit : J'ai fini !";
ui_fr["Reeborg writes:"] = "Reeborg écrit :";
ui_fr["Reeborg shouts: Something is wrong!"] = "Reeborg crie: Quelque chose ne va pas !";
ui_fr["Reeborg explores some Javascript code"] = "Reeborg explore le code Javascript";
ui_fr["Reeborg states:"] = "Reeborg informe :";
ui_fr["Reeborg watches some variables!"] = "Reeborg observe des variables !";
ui_fr["Click on the world to get some additional information."] = "Cliquez sur le monde pour obtenir de l'information supplémentaire.";

ui_fr["Reeborg's basic keyboard"] = "Le clavier spécial de Reeborg";
ui_fr["kbd-command-btn"] = "Commandes";
ui_fr["kbd-condition-btn"] = "Conditions";
ui_fr["kbd-python-btn"] = "Python";
ui_fr["kbd-py-console-btn"] = "Python";
ui_fr["kbd-javascript-btn"] = "Javascript";
ui_fr["kbd-cpp-btn"] = "C++";
ui_fr["kbd-coffee-btn"] = "CoffeeScript";
ui_fr["kbd-objects-btn"] = "Objets";
ui_fr["kbd-special-btn"] = "Spécial";

ui_fr["UNDO"] = "RENVERSER";
ui_fr["REDO"] = "REFAIRE";
ui_fr["tab"] = "TAB";
ui_fr["shift-tab"] = "Maj-TAB";
ui_fr["enter"] = "\u23CE";
ui_fr["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> n'est pas un véritable mot-clé Python.";

ui_fr["Colour:"] = "Couleur :";
ui_fr["Enter a colour"] = "Spécifiez une couleur";

ui_fr["Background image"] = "Image de fond";

ui_fr["NAME:"] = "Nom :";
ui_fr["Save world in browser"] = "Mémoriser une copie du monde";


ui_fr["Set the world's dimensions"] = "Dimensions du monde";
ui_fr["set-dimensions-explain"] = "Vous pouvez changer les dimensions (hauteur et largeur) du monde. Rappelez-vous que les mondes très grands pourraient être difficile à visualiser sur des écrans plus petits.";
ui_fr["Maximum x value:"] = "Valeur maximale pour 'x'";
ui_fr["Maximum y value:"] = "Valeur maximale pour 'y'";
ui_fr["Use small tiles"] = "Utilisez une petite grille";

ui_fr["Set goal number for object"] = "Nombre d'objets désirés";
ui_fr["dialog-goal-object-explain"] = "Cliquez sur la case à cocher si vous désirez que le nombre d'objet soit égal au nombre total d'objet de ce genre présent dans le monde au tout début.";
ui_fr["Number of objects"] = "Nombre d'objets";
ui_fr["All such objects"] = "Tous les objets de ce genre";

ui_fr["Number of objects:"] = "Nombre d'objets :";
ui_fr["Maximum:"] = "Maximum :";
ui_fr["Add object in the world"] = "Modifier le nombre d'objets";
ui_fr["ADD OBJECT EXPLAIN"] = "Choisissez la valeur zéro pour ne pas avoir un tel objet à cet endroit. Si <code>Maximum</code> a une valeur supérieure à <code>Nombre d'objets</code> alors un nombre aléatoire d'objets, entre ces deux valeurs, sera choisi au tout début de l'exécution d'un programme.";

ui_fr["Unlimited:"] = "Nombre illimité ";
ui_fr["Give object to robot"] = "Donner des objets à Reeborg";
ui_fr["GIVE OBJECT EXPLAIN"] = "Choisissez un nombre d'objects que Reeborg aura en sa possession au début du programme. Cliquez sur la case à cocher si vous voulez un nombre illimité.";

ui_fr["UPDATE BLOCKLY CONTENT"] = "Ce monde inclus des blocs différents de ceux qui s'y trouvent présentement. Pour remplacer les blocs présents par ceux définis par le monde, cliquez sur le bouton.";
ui_fr["UPDATE BLOCKLY BUTTON"] = "Remplacer les blocs";
ui_fr["Contents from World"] = "Remplacement de contenus";

ui_fr["WARNING: Do not change this comment."] = "ATTENTION: Ne modifiez pas ce commentaire.";
ui_fr["Library Code is below."] = "Le code de la biblio est ci-dessous.";
ui_fr["No solution can be saved when using REPL (Py)."] = "Aucune solution ne peut être sauvegardée dans le mode REPL (Py).";
ui_fr["No solution can be loaded when using REPL (Py)."] = "Aucune solution ne peut être chargée dans le mode REPL (Py).";

ui_fr["You are not allowed to use <code>done</code> in this world!"] = "Il n'est pas permis d'utiliser <code>termine()</code> dans ce monde !";
ui_fr["Execution ended before the <em>Post</em> code was executed."] = "L'exécution du programme a terminé avant que le code <em>Post</em> ne soit interprété.";

ui_fr["Difficulty level"] = "Niveau de difficulté";

ui_fr["Expected result"] = "Résultat attendu";
ui_fr["Differences highlighted"] = "Différences observées";
ui_fr["Actual result"] = "Résultat observé";

ui_fr["Cannot parse progress file."] = "Impossible d'extraire les données du fichier.";
ui_fr["Cannot merge progress."] = "Impossible d'incorporer les données.";
ui_fr["No solution found for this world."] = "Pas de solution trouvée pour ce monde.";

ui_fr["THINKING"] = "Je pense ...";
