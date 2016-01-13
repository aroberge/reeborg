/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false*/
/* jshint -W069 */
var RUR = RUR || {};

RUR.translation = {};
RUR.translation_to_english = {};


// required for object-handling functions e.g. take(object), put(object)
RUR.translation["apple"] = "pomme";
RUR.translation_to_english["pomme"] = "apple";
RUR.translation["banana"] = "banane";
RUR.translation_to_english["banane"] = "banana";
RUR.translation["box"] = "boîte";
RUR.translation_to_english["boîte"] = "box";
RUR.translation["bridge"] = "pont";
RUR.translation_to_english["pont"] = "bridge";
RUR.translation["carrot"] = "carotte";
RUR.translation_to_english["carotte"] = "carrot";
RUR.translation["daisy"] = "marguerite";
RUR.translation_to_english["marguerite"] = "daisy";
RUR.translation["dandelion"] = "pissenlit";
RUR.translation_to_english["pissenlit"] = "dandelion";
RUR.translation["leaf"] = "feuille";
RUR.translation_to_english["feuille"] = "leaf";
RUR.translation["orange"] = "orange";
RUR.translation_to_english["orange"] = "orange";
RUR.translation.square = "carré";
RUR.translation_to_english["carré"] = "square";
RUR.translation.star = "étoile";
RUR.translation_to_english["étoile"] = "star";
RUR.translation["strawberry"] = "fraise";
RUR.translation_to_english["fraise"] = "strawberry";
RUR.translation.token = "jeton";
RUR.translation_to_english["jeton"] = "token";
RUR.translation.triangle = "triangle";
RUR.translation_to_english["triangle"] = "triangle";
RUR.translation["tulip"] = "tulipe";
RUR.translation_to_english["tulipe"] = "tulip";

// in world.js
RUR.translation["Problem with onload code."] = "Code Javascript 'onload' non valide; veuillez contacter le créateur de ce monde.";

RUR.translation["# from library import *"] = "# 'from biblio import *' dans l'onglet Code Python est requis pour\n# pouvoir utiliser le code de cette bibliothèque.\n\n";
RUR.translation.move = "avance";
RUR.translation["Python Code"] = "Code Python";
RUR.translation["Javascript Code"] = "Code Javascript";

// in recorder.js
RUR.translation["Too many steps:"] = "Trop d'instructions: {max_steps}";
RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
RUR.translation["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
RUR.translation["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
RUR.translation["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
RUR.translation["Last instruction completed!"] = "Dernière instruction complétée!";
RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";


// in control.js
RUR.translation["Unknown object"] = "Objet inconnu: {obj}";
RUR.translation["No object found here"] = "Pas d'objet '{obj}'' trouvé ici !";
RUR.translation["object"] = "objet";
RUR.translation["I don't have any object to put down!"] = "Je n'ai pas de '{obj}'!";
RUR.translation["There is already a wall here!"] = "Il y a déjà un mur ici !";
RUR.translation["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
RUR.translation["Done!"] = "Terminé !";  // and recorder.js
RUR.translation["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
RUR.translation["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
RUR.translation["I carry too many different objects. I don't know which one to put down!"] = "Je transporte trop d'objets: je ne sais pas lequel déposer!";
RUR.translation["Many objects are here; I do not know which one to take!"] = "Beaucoup d'objets différents sont ici; je ne sais pas lequel prendre!";


// in robot.js (and possibly others)
RUR.translation.east = "est";
RUR.translation.north = "nord";
RUR.translation.west = "ouest";
RUR.translation.south = "sud";
RUR.translation["Unknown orientation for robot."] = "Orientation inconnue.";


// in ui.js
RUR.translation["World selected"] = "Monde {world} choisi";
RUR.translation["Could not find world"] = "Je ne peux pas trouver {world}";
RUR.translation["Object names"] = " biblio, jeton, étoile, triangle, carré, etc.";


// in doc_ready.js
RUR.translation["Invalid world file."] = "Fichier monde invalide.";
RUR.translation["PERMALINK"] = "PERMALIEN";

// in file_io.js
RUR.translation["Could not find link: "] = "Lien introuvable : ";

// in world_editor.js

RUR.translation["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
RUR.translation["Added robot."] = "Reeborg ajouté.";
RUR.translation["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
RUR.translation["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
RUR.translation["Click on world to add object."] = "Cliquez sur le monde pour ajouter des {obj}.";
RUR.translation["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
RUR.translation["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
RUR.translation["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
RUR.translation["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
RUR.translation["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
RUR.translation["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' comme but.";
RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg.";
RUR.translation[" is not a valid value!"] = " n'est pas une valeur valide!";
RUR.translation["Enter number of objects desired at that location."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' désiré à cet endroit.";
RUR.translation["Objects found here:"] = "Objets trouvés ici:";
RUR.translation["Description"] = "Description";
RUR.translation["A robot located here carries no objects."] = "A robot situé à {x},{y} ne transporte aucun objet.";
RUR.translation["A robot located here carries:"] = "Un robot situé à {x},{y} transporte:";
RUR.translation["random location"] = "une position choisie au hasard";
RUR.translation["Enter number of objects to give to robot."] = "Quel nombre de {obj} voulez-vous donner au robot?";
RUR.translation["Special information about this location:"] = "Information particulière au sujet de cet endroit:";
RUR.translation["Click on world to toggle tile."] = "Cliquez sur le monde pour ajouter/supprimer l'image: '{obj}'.";
RUR.translation["Click on desired tile below."] = "Cliquez sur l'image désirée ci-dessous.";
RUR.translation["mud"] = "boue";
RUR.translation["water"] = "eau";
RUR.translation["grass"] = "gazon";
RUR.translation["gravel"] = "gravier";
RUR.translation["ice"] = "glace";
RUR.translation["A wall must be built east of this location."] = "Un mur doit être construit à l'est de cet endroit.";
RUR.translation["A wall must be built north of this location."] = "Un mur doit être construit au nord de cet endroit.";
RUR.translation["A wall must be built west of this location."] = "Un mur doit être construit à l'ouest de cet endroit.";
RUR.translation["A wall must be built south of this location."] = "Un mur doit être construit au sud de cet endroit.";
RUR.translation["The final required position of the robot will be chosen at random."] = "La position finale requise pour Reeborg sera choisie au hasard.";
RUR.translation["The final position of the robot must be (x, y) = "] = "La position finale de Reeborg doit être (x, y) = ";
RUR.translation["Click on world to fill with given tile."] = "Cliquez sur le monde pour remplir avec cet objet.";
RUR.translation["Click on desired object below."] = "Cliquez sur l'image désirée.";
RUR.translation["Enter url of image to use as background."] = "Fournir l'adresse (URL) de l'image à utiliser.";
RUR.translation["Replace editor content"] = "Voulez-vous remplacer le contenu du code de votre éditeur par celui défini par le créateur du monde?";
RUR.translation["Replace library content"] = "Voulez-vous remplacer le contenu du code de votre biliothèque par celui défini par le créateur du monde?";
RUR.translation["colour"] = "couleur";


// in storage.js
RUR.translation["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
RUR.translation["No such world!"] = "Ce monde n'existe pas !";
RUR.translation["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde? Noms utilisés:";
RUR.translation["Enter world name to delete"] = "Écrivez le nom du monde à supprimer; mondes existant:";
RUR.translation["Goal to achieve:"] = "Résultat désiré :";
RUR.translation["Delete "] = "Effacer ";

// in runner.js
RUR.translation["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
RUR.translation["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
RUR.translation["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
RUR.translation["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";


// in images.js
RUR.translation["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
RUR.translation["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
RUR.translation["I'm slipping on ice!"] = "Je glisse sur la glace!";
RUR.translation["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et glissera à la prochaine case.";
RUR.translation["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
RUR.translation["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
RUR.translation["I'm in water!"] = "Je suis dans l'eau!";
RUR.translation["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il va être endommagé s'il s'y déplace.";
RUR.translation["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "tuile verte: Reeborg <b>peut</b> détecter ceci avec au_but().";
RUR.translation["Crash!"] = "Crash!";
RUR.translation["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mur de brique: Reeborg <b>peut</b> détecter ceci mais il se fera mal s'il essaie de passer au travers.";
RUR.translation["I hit a fence!"] = "J'ai frappé une clôture!";
RUR.translation["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Clôture: Reeborg <b>peut</b> détecter ceci mais il ne peut pas passer au travers.";
RUR.translation["Bridge:"] = "Pont: ";
RUR.translation["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Reeborg <b>peut</b> détecter ceci et sait que cela lui permettra de traverser l'eau en sureté.";


// =========
RUR.translation_to_english["pont"] = "bridge";
RUR.translation["Something is blocking the way!"] = "Quelque chose bloque le chemin!";
RUR.translation["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>peut</b> détecter ceci avec au_but().";
RUR.translation["green home tile:"] = "tuile verte pour l'arrivée:";
RUR.translation["home:"] = "la maison:";
RUR.translation["racing flag:"] = "drapeau d'arrivée:";
RUR.translation["house:"] = "maison:";

RUR.translation["fence_right"] = "clôture";
RUR.translation["fence_left"] = "clôture";
RUR.translation["fence_double"] = "clôture";
RUR.translation["fence_vertical"] = "clôture";

//=== in common_def.py
RUR.translation["Local variables"] = "Variables locales";
RUR.translation["Global variables"] = "Variables globales";
RUR.translation["Watched expressions"] = "Watched expressions";

// in zz_dr_blockly.js

RUR.translation["move forward"] = "avance";
RUR.translation["write"] = "ecrit";
RUR.translation["turn left"] = "tourne à gauche";
RUR.translation["turn_left"] = "tourne_a_gauche";
RUR.translation["take"] = "prend";
RUR.translation["take object"] = "prend l'objet";
RUR.translation["put"] = "depose";
RUR.translation["put object"] = "dépose l'objet";
RUR.translation["pause"] = "pause";
RUR.translation["Pause the program's execution."] = "Pause l'exécution du programme.";
RUR.translation["build_wall"] = "construit_un_mur";
RUR.translation["Build a wall in front of the robot."] = "Construit un mur devant le robot.";
RUR.translation["done"] = "termine";
RUR.translation["End the program's execution."] = "Termine l'exécution du programme.";
RUR.translation["True if a wall is blocking the way."] = "Vrai si un mur bloque le chemin.";
RUR.translation["wall_in_front"] = "mur_devant";
RUR.translation["wall_on_right"] = "mur_a_droite";
RUR.translation["True if nothing is blocking the way."] = "Vrai si rien ne bloque le chemin.";
RUR.translation["front_is_clear"] = "rien_devant";
RUR.translation["right_is_clear"] = "rien_a_droite";
RUR.translation["at_goal"] = "at_goal";
RUR.translation["True if desired destination."] = "Vrai si c'est la destination désirée.";
RUR.translation["carries_object"] = "transporte";
RUR.translation["True if robot carries at least one object."] = "Vrai si le robot transporte au moins un objet.";
RUR.translation["object_here"] = "objet_ici";
RUR.translation["True if there is at least one object here."] = "Vrai s'il y a au moins un objet ici.";
RUR.translation["is_facing_north"] = "est_face_au_nord";
RUR.translation["True if robot is facing North."] = "Vrai se le robot est face au nord.";
RUR.translation["sound"] = "son";
RUR.translation["think"] = "pense";
RUR.translation["Delay between actions; default is 300 ms."] = "Délai entre les actions; le défaut est de 300 ms.";
