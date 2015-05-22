/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */

var RUR = RUR || {};

RUR.translation = {};
RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"] =
    "/* 'import_lib();' dans l'onglet Code Javascript est requis pour\n pouvoir utiliser le code de cette bibliothèque.*/\n\n";
RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"] =
    "# 'from biblio import *' dans l'onglet Code Python est requis pour\n# pouvoir utiliser le code de cette bibliothèque.\n\n";
RUR.translation["# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n"] =
    "# 'import_lib()' dans l'onglet Code CoffeeScript est requis pour\n# pouvoir utiliser le code de cette bibliothèque.\n\n";

RUR.translation["Too many steps:"] = "Trop d'instructions: {max_steps}";
RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "] =
    "Le temps de réflexion de Reeborg doit être spécifié en millisecondes, entre 0 et 10000; la valeur spécifiée était : {delay}";
RUR.translation["No token found here!"] = "Pas de jetons trouvés ici !";
RUR.translation["I don't have any token to put down!"] = "Je n'ai pas de jetons !";

RUR.translation.triangle = "triangle";
RUR.translation.star = "étoile";
RUR.translation.square = "carré";
// reverse translation needed as well ... triangle not needed as it is the same in both languages
RUR.translation["étoile"] = "star";
RUR.translation["carré"] = "square";
RUR.translation["Unknown shape"] = "Forme inconnue: {shape}";
RUR.translation["No shape found here"] = "Pas de {shape} trouvé ici !";
RUR.translation["There is already something here."] = "Il y a déjà quelque chose ici.";
RUR.translation["I don't have any shape to put down!"] = "Je n'ai pas de {shape}!";
RUR.translation["There is already a wall here!"] = "Il y a déjà un mur ici !";
RUR.translation["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
RUR.translation["I am afraid of the void!"] = "J'ai peur du néant !";
RUR.translation.east = "est";
RUR.translation.north = "nord";
RUR.translation.west = "ouest";
RUR.translation.south = "sud";
RUR.translation.move = "avance";
RUR.translation.token = "jeton";
RUR.translation["Unknown orientation for robot."] = "Orientation inconnue.";
RUR.translation["Done!"] = "Terminé !";
RUR.translation["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
RUR.translation["There is no orientation as a goal in this world!"] = "Aucune orientation n'a été spécifiée comme but dans ce monde!";
RUR.translation["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"] = "<li class='success'>Reeborg a la bonne orientation.</li>";
RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"] = "<li class='failure'>Reeborg a la mauvaise orientation.</li>";
RUR.translation["<li class='success'>All shapes are at the correct location.</li>"] = "<li class='success'>Tous les objets (jetons non compris) sont aux bons endroits.</li>";
RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets (jetons non compris) ne sont pas aux bons endroits.</li>";
RUR.translation["<li class='success'>All tokens are at the correct location.</li>"] = "<li class='success'>Tous les jetons sont aux bons endroits.</li>";
RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs jetons ne sont pas aux bons endroits.</li>";
RUR.translation["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
RUR.translation["Last instruction completed!"] = "Dernière instruction complétée!";
RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";
RUR.translation.robot = "robot";
RUR.translation[", tokens="] = ", jetons=";
RUR.translation["World selected"] = "Monde {world} choisi";
RUR.translation["Could not find world"] = "Je ne peux pas trouver {world}";
RUR.translation["Invalid world file."] = "Fichier monde invalide.";

RUR.translation["Python Code"] = "Code Python";
RUR.translation["Javascript Code"] = "Code Javascript";
RUR.translation["CoffeeScript Code"] = "Code CoffeeScript";

/* translations from world_editor.js */

RUR.translation["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
RUR.translation["Added robot."] = "Reeborg ajouté.";
RUR.translation["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
RUR.translation["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
RUR.translation["Click on world to set number of tokens."] = "Cliquez sur le monde pour ajouter des jetons (utilisez a-b pour indiquer un nombre entier aléatoire entre a et b inclusivement).";
RUR.translation["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
RUR.translation["Click on world to toggle star."] = "Cliquez sur le monde pour ajouter/supprimer une étoile.";
RUR.translation["Click on world to toggle triangle."] = "Cliquez sur le monde pour ajouter/supprimer un triangle.";
RUR.translation["Click on world to toggle square."] = "Cliquez sur le monde pour ajouter/supprimer un carré.";
RUR.translation["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
RUR.translation["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot, ou cliquer sur une image (si visible ci-dessous) pour choisir l'orientation désirée.";
RUR.translation["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
RUR.translation["Click on desired goal object below."] = "Cliquez sur l'objet but désiré.";
RUR.translation["Click on world to set number of goal tokens."] = "Cliquez sur le monde pour fixer le nombre de jetons comme but.";
RUR.translation["Click on world to toggle star goal."] = "Cliquez sur le monde pour ajouter/supprimer une étoile comme but.";
RUR.translation["Click on world to toggle triangle goal."] = "Cliquez sur le monde pour ajouter/supprimer un triangle comme but.";
RUR.translation["Click on world to toggle square goal."] = "Cliquez sur le monde pour ajouter/supprimer un carré comme but.";
RUR.translation["Click on world at x=1, y=1 to have no object left as a goal."] = "Cliquez sur le monde en x=1, y=1 pour confirmer avoir comme but aucun objet (sauf possiblement des jetons) qui reste.";
RUR.translation["Click on world at x=1, y=1 to have no tokens left as a goal."] = "Cliquez sur le monde en x=1, y=1 pour confirmer avoir comme but aucun jetons qui reste.";
RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg (utilisez inf pour un nombre infini ou a-b pour indiquer un nombre entier aléatoire entre a et b inclusivement).";
RUR.translation[" is not a valid value!"] = " n'est pas une valeur valide!";
RUR.translation["Other object here; can't put tokens"] = "Autre objet ici; on ne peut pas mettre des jetons.";
RUR.translation["Enter number of tokens for at that location."] = "Entrez le nombre de jetons requis à cet endroit.";
RUR.translation["Other object goal here; can't put tokens"] = "Autre objet comme but ici; on ne peut pas mettre des jetons.";
RUR.translation["Enter number of tokens for at that location."] = "Entrez le nombre de jetons requis à cet endroit.";
RUR.translation["tokens here; can't put another object"] = "Jetons ici; on ne peut pas mettre un autre objet.";
RUR.translation["tokens as a goal here; can't set another object as goal."] = "Jetons comme but ici; on ne peut pas mettre un autre objet comme but ici.";
RUR.translation["Click on same position to remove, or robot to set orientation."] = "Cliquez sur la même position pour supprimer, ou sur un robot pour choisir l'orientation.";
RUR.translation["Goal: no object left in world."] = "But: aucun objet (sauf possiblement des jetons) qui reste dans le monde.";
RUR.translation["Goal: no tokens left in world."] = "But: aucun jetons qui reste dans le monde.";
RUR.translation["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
RUR.translation["No such world!"] = "Ce monde n'existe pas !";
RUR.translation["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde?";
RUR.translation["Enter world name to delete"] = "Écrivez le nom du monde à supprimer.";
RUR.translation["Object names"] = " biblio, jeton, étoile, triangle et carré.";
RUR.translation["Unexplained Error"] = "Erreur inexplicable";
RUR.translation["Please turn highlighting off"] = "SVP désactivez le surlignement";
RUR.translation["and try running your program again."] = "et essayez d'exécuter votre programme à nouveau.";


RUR.translation["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
RUR.translation["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
RUR.translation["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
RUR.translation["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";

