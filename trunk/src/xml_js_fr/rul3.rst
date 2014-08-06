`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Règle numéro 3
==============

Après avoir aidé Reeborg à accomplir ses tâches, vous devez être prêt
pour apprendre et comprendre la troisième règle de programmation:

**Règle numéro 3**
    Lorsque vous écrivez des programmes informatiques, ne vous répétez
    pas.
     Je répète: `ne vous répétez
    pas! <http://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas>`__

Être gauche trois fois peut nous rendre (a)droit
------------------------------------------------

Puisque vous avez écrit plusieurs programmes, vous devez avoir réalisé
que lorsqu'on demande à Reeborg de tourner trois fois vers la gauche
ceci revient à la même chose que si on lui demandait de tourner une
seule fois à droit. Mais c'est fastidieux d'écrire trois fois
``tourne_à_gauche();`` alors qu'un simple ``tourne_à_droite();``
suffirait si Reeborg n'était pas défectueux. C'est le temps de remédier
à ceci.

Définir des fonctions
---------------------

Ce que nous avons appelé *instructions* jusqu'ici étaient en fait des
**fonctions** Javascript. Donc ``tourne_à_gauche()`` est une fonction,
tout comme ``avance()``. Le mot fonction s'écrit *function* en anglais.
Pour définir des fonctions en Javascript, on procède de la façon
suivante:

.. code:: jscode

    function nom_bien_choisi () {
        // des lignes de code ...
    }

``function`` est notre premier **mot-clé** Javascript; les mot-clés sont
des noms réservés dans un langage de programmation et qui possède un
sens bien particulier à ce langage. Notez que le mot-clé ``function`` a
une couleur différente du reste du texte dans la définition de la
fonction ``nom_bien_choisi`` ci-dessus; tous les mot-clés Javascript
seront de la même couleur lorsqu'ils apparaissent dans un programme
informatique, ou une partie de programme informatique sur ce site. Notez
également les accolades ``{ }`` qui entourent ce qu'on appelle un *bloc
de code* et constitue le *corps* de la fonction. Par habitude, on
*indente* de tels blocs de code pour qu'il soit plus facile de les
identifier, ce qui rend le programme plus facile à lire.

Nous sommes prêts à définir notre toute première fonction Javascript:

.. code:: jscode

    function tourne_à_droite () {
        tourne_à_gauche();
        tourne_à_gauche();
        tourne_à_gauche();
    }

C'est tout! Plus besoin d'écrire ``tourne_à_gauche();`` trois fois de
suite à chaque fois que vous voulez que Reeborg tourne à droite!

Donc, définissez-vous même la fonction ``tourne_à_droite`` dans un
programme et utilisez-la. Si vous êtes à cours d'inspiration quant au
programme à écrire pour la tester, faites-en sorte que Reeborg suive un
parcours en forme de carré, en alternant ``tourne_à_droite();`` et
``avance();`` à quatre reprises.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
