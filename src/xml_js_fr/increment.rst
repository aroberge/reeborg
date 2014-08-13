`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Incrément
=========

Assurez-vous d'avoir les panneaux **Éditeur**, **Monde** et **Journal**
ouverts. Sélectionnez le monde Autour 1 et ajustez la largeur du panneau
**Monde** pour que vous puissiez voir tout le monde de Reeborg. (Vous
pouvez ajustez la largeur en "saisissant" la ligne pointillée entre les
panneaux et en la glissant avec la souris.)

Supposons que nous voulons compter le nombre de pas pris par Reeborg
pour atteindre le mur à droite à partir de son point de départ. Une
façon de faire ceci est d'utiliser une variable que je vais appeler
``nombre_de_pas`` et à laquelle je vais attribuer 0 comme valeur
initiale. Puis, à chaque fois que Reeborg prendra un pas, j'ajouterai 1
à la valeur *précédente* de ``nombre_de_pas``. En Javascript, ceci est
fait en utilisant la syntaxe suivante:

.. code:: jscode

    nombre_de_pas = nombre_de_pas + 1;

**Ceci n'est pas une équation mathématique!** Si on avait une équation
mathématique, une variable du côté gauche du signe d'égalité aurait la
même valeur que si elle se trouvait à droite du même signe. En
Javascript, et dans plusieurs autres langages de programmation, le
symbole ``=`` est utilisé pour *affecter* une valeur: Javascript
détermine en premier la valeur de l'expression à la droite du signe
``=``, puis utilise le nom de la variable à gauche de ce signe comme
aide-mémoire pour se rappeler de la valeur. Ainsi, si nous avons

.. code:: jscode

    var n;
    n = 1;
    n = n + 3;
    écrit(n);  // donne 4

c'est équivalent à

.. code:: jscode

    var n;
    n = 1;
    n = 1 + 3;  // nous avons écrit "1" au lieu de "n"
    écrit(n);  // donne 4

**Vérifiez par vous-mêmes!**

Puisque ce type d'opération, connue sous le nom d'*incrémenter* une
variable, est fait très souvent, Javascript, et plusieurs autres
langages de programmation, utilise une notation raccourcie et
l'opérateur ``+=``:

.. code:: jscode

    var n;
    n = 1;
    n += 3;
    écrit(n);  // donne 4

Si la valeur par laquelle on veut *incrémenter* la variable est 1, on
peut utiliser une notation encore plus courte:

.. code:: jscode

    var n;
    n = 1;
    n++;
    écrit(n);  // donne 2

**Essayez!**

Compter les pas
---------------

Nous sommes maintenant prêts à écrire un programme qui permettra à
Reeborg de compter les nombres de pas, en utilisant le monde Autour 1.
Transcrivez le code suivant dans l'éditeur et exécutez-le. Idéalement,
vous devriez le modifier pour vérifier les autres façons d'incrémenter
une variable décrites ci-dessus.

.. code:: jscode

    var nombre_de_pas = 0;

    function avance_et_compte() {
        avance();
        nombre_de_pas++;
    }

    while (rien_devant()){
        avance_et_compte();
    }

    écrit(nombre_de_pas);  // devrait être 9

À votre tour
------------

Écrivez un programme qui fera en sorte que Reeborg fasse le tour du
monde Autour 1 tout en comptant le nombre de pas **ainsi que** le nombre
de virages à gauche, écrivant le résultat dans son journal à la fin.
Vous devriez commencer par déposer un jeton pour indiquer la position de
départ (et d'arrivée).

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
