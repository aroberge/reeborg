`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Reeborg compte
==============

Sélectionnez le monde Autour 1. Vous avez vérifié précédemment que
Reeborg prend 9 pas pour rejoindre le mur à droite. Utilisons Reeborg
pour compter le nombre de pas à nouveau en se basant sur le nombre de
pas pour éviter de frapper le mur.

.. code:: jscode

    var nombre_de_pas = 0;
    while (nombre_de_pas < 9 ){  // "<" signifie "plus petit que"
        avance();
        nombre_de_pas++;
    }

**Essayez!** Puis, modifiez le programme pour écrire la valeur de la
variable ``nombre_de_pas`` dans le journal de Reeborg à chaque fois que
sa valeur change.

Définition de ``répète()``?
---------------------------

Dans le programme ci-dessus, Reeborg comptait le nombre de pas et en
faisait un nombre total prédéterminé à l'avance. Nous avons vu comment
faire la même chose précédemment utilisant une seule instruction:

.. code:: jscode

    répète(avance, 9);

Définissons une fonction que nous allons appeler ``mon_répète`` et qui
*cachera* le code apparaissant dans la boucle ``while`` ci-dessus :

.. code:: jscode

    function mon_répète() {
        var nombre_de_pas = 0;
        while (nombre_de_pas < 9 ){
            avance();
            nombre_de_pas++;
        }
    }

    mon_répète();   // on l'utilise!

Cette fonction n'est pas très utile comparativement à ``répète()``
puisque le nombre de pas à prendre ainsi que l'instruction à répéter
(``avance``) doivent être codées spécifiquement. On peut faire mieux en
*passant* des **arguments** à la fonction ``mon_répète`` comme ce qui
suit:

.. code:: jscode

    function mon_répète(fonction_quelconque, valeur_maximale) {
        var nombre_de_pas = 0;
        while (nombre_de_pas < valeur_maximale ){
            fonction_quelconque();
            nombre_de_pas++;
        }
    }

    mon_répète(avance, 9);
    mon_répète(tourne_à_gauche, 4);

**Essayez!**

Portée des variables
--------------------

Comparez

.. code:: jscode

    var nombre_de_pas = 0;
    function mon_répète(fonction_quelconque, valeur_maximale) {
        while (nombre_de_pas < valeur_maximale ){
            fonction_quelconque();
            nombre_de_pas++;
        }
    }

avec la définition précédente. Vous devriez d'abord remarquer que la
couleur de la variable ``nombre_de_pas`` est différente dans ces deux
cas. Si vous regardez de plus près, vous verrez que dans un cas, cette
variable est définie, à l'aide du mot-clé ``var``, à *l'intérieur* de la
fonction alors que dans l'autre cas elle est définie à l'extérieur.
Lorsqu'une variable est définie à l'intérieur d'une fonction on dit que
c'est une variable **locale**: sa valeur est seulement connue à
l'intérieur de la fonction et non dans le reste du programme. Autrement,
on a une variable **globale**. On utilise le terme de *portée* d'une
variable (*scope* en anglais) pour référer au fait que c'est une
variable locale ou globale. On recommande fortement d'utiliser des
variables locales lorsque c'est possible; ceci permet d'utiliser le même
nom pour d'autres variables locales utilisées ailleurs dans le programme
sans que les changements à leur valeur n'affecte celle de la variable
locale. Si vous utilisez des variables globales, un changement de valeur
à un endroit changera la valeur de cette variable partout ailleurs dans
le programme, ce qui peut mener à des bogues difficiles à retracer.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
