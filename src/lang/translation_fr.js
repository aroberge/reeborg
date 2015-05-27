/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */

var RUR = RUR || {};

RUR.translation = {};
RUR.translation_to_english = {};


// required for object-handling functions e.g. take(object), put(object)
RUR.translation.triangle = "triangle";
RUR.translation.star = "étoile";
RUR.translation.square = "carré";
RUR.translation.token = "jeton";
RUR.translation_to_english["étoile"] = "star";
RUR.translation_to_english["carré"] = "square";
RUR.translation_to_english["triangle"] = "triangle";
RUR.translation_to_english["jeton"] = "token";


// in rur_utils.js
RUR.translation["# 'from my_lib import *' in Python Code is required to use\n# the code in this library. \n\n"] =
    "# 'from biblio import *' dans l'onglet Code Python est requis pour\n# pouvoir utiliser le code de cette bibliothèque.\n\n";
RUR.translation.move = "avance";
RUR.translation["Python Code"] = "Code Python";
RUR.translation["Javascript Code"] = "Code Javascript";
RUR.translation["CoffeeScript Code"] = "Code CoffeeScript";

// in recorder.js
RUR.translation["Too many steps:"] = "Trop d'instructions: {max_steps}";
RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
RUR.translation["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
RUR.translation["<li class='failure'>One or more object are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
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
RUR.translation["I am afraid of the void!"] = "J'ai peur du néant !";
RUR.translation["Done!"] = "Terminé !";  // and recorder.js
RUR.translation["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
RUR.translation["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";

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


// in world_editor.js

RUR.translation["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
RUR.translation["Added robot."] = "Reeborg ajouté.";
RUR.translation["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
RUR.translation["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
RUR.translation["Click on world to add object."] = "Cliquez sur le monde pour ajouter des {obj} (utilisez a-b pour indiquer un nombre entier aléatoire entre a et b inclusivement).";
RUR.translation["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
RUR.translation["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
RUR.translation["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
RUR.translation["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
RUR.translation["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
RUR.translation["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' comme but; utilisez un nombre spécifique ou 'all' pour signifier tous les objets de ce type à mettre à cet endroit.";
RUR.translation["Click on world at x=1, y=1 to have no object left as a goal."] = "Cliquez sur le monde en x=1, y=1 pour confirmer avoir comme but aucun objet qui reste dans le monde.";
RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg (utilisez 'inf' pour un nombre infini ou a-b pour indiquer un nombre entier aléatoire entre a et b inclusivement).";
RUR.translation[" is not a valid value!"] = " n'est pas une valeur valide!";
RUR.translation["Goal: no object left in world."] = "But: aucun objet qui reste dans le monde.";

// in storage.js
RUR.translation["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
RUR.translation["No such world!"] = "Ce monde n'existe pas !";
RUR.translation["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde?";
RUR.translation["Enter world name to delete"] = "Écrivez le nom du monde à supprimer.";


// in runner.js
RUR.translation["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
RUR.translation["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
RUR.translation["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
RUR.translation["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";


// in tiles.js
RUR.translation["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
RUR.translation["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
RUR.translation["I'm slipping on ice!"] = "Je glisse sur la glace!";
RUR.translation["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et glissera à la prochaine case.";
RUR.translation["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
RUR.translation["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
RUR.translation["I'm in water!"] = "Je suis dans l'eau!";
RUR.translation["Water: Reeborg <b>can</b> detect this but will drawn if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il se noiera s'il s'y déplace.";

