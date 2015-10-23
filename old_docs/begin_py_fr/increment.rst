Incrément
=========

.. todo::

   Revoir d'abord l'exemple::

        longueur = 4
        largeur = 6
        aire = longueur * largeur

   en détails, se concentrant sur l'association de la variable
   ``aire`` avec l'objet (chiffre) 24 qui est calculé en premier, puis à qui
   on associe le nom de la variable.

Assurez-vous d'avoir les panneaux **Éditeur**, **Monde** et **Journal**
ouverts. Sélectionnez le monde **Autour 1**.

Supposons que nous voulons compter le nombre de pas pris par Reeborg
pour atteindre le mur à droite à partir de son point de départ. Une
façon de faire ceci est d'utiliser une variable que je vais appeler
``nombre_de_pas`` et à laquelle je vais attribuer 0 comme valeur
initiale. Puis, à chaque fois que Reeborg prendra un pas, j'ajouterai 1
à la valeur *précédente* de ``nombre_de_pas``. En Python, ceci est
fait en utilisant la syntaxe suivante::

    nombre_de_pas = nombre_de_pas + 1

**Ceci n'est pas une équation mathématique!** Si on avait une équation
mathématique, une variable du côté gauche du signe d'égalité aurait la
même valeur que si elle se trouvait à droite du même signe. En
Python, et dans plusieurs autres langages de programmation, le
symbole ``=`` est utilisé pour *affecter* une valeur: Python
détermine en premier la valeur de l'expression à la droite du signe
``=``, puis utilise le nom de la variable à gauche de ce signe comme
aide-mémoire pour se rappeler de la valeur. Ainsi, si nous avons::

    n = 1
    n = n + 3
    print(n)  # donne 4

c'est équivalent à::

    n = 1
    n = 1 + 3  # nous avons écrit "1" au lieu de "n"
    print(n)   # donne 4

.. topic:: À votre tour!

   Vérifiez par vous-mêmes!

Puisque ce type d'opération, connue sous le nom d'*incrémenter* une
variable, est fait très souvent, Python, et plusieurs autres
langages de programmation, utilise une notation raccourcie et
l'opérateur ``+=``::

    n = 1
    n += 3
    print(n)  # donne 4

.. topic:: À votre tour!

    Vérifiez que ceci fonctionne comme vous le comprenez!

Compter les pas
---------------

Nous sommes maintenant prêts à écrire un programme qui permettra à
Reeborg de compter les nombres de pas, en utilisant le monde **Autour 1**.
Transcrivez le code suivant dans l'éditeur et exécutez-le. Idéalement,
vous devriez le modifier pour vérifier les autres façons d'incrémenter
une variable décrites ci-dessus.

.. code:: py3

    nombre_de_pas = 0;

    def avance_et_compte():
        global nombre_de_pas
        avance()
        nombre_de_pas += 1

    while rien_devant():
        avance_et_compte()

    print(nombre_de_pas)  # devrait être 9

.. todo::

   Éliminez la fonction et reporter à plus tard la discussion du
   mot-clé ``global``


Dans le programme ci-dessus, on utilise le mot-clé ``global`` pour indiquer
à Python que la variable ``nombre_de_pas`` utilisée à l'intérieur de la
fonction ``avance_et_compte`` est la même variable que celle utilisée
ailleurs.

Si vous exécutez ce programme, vous remarquerez que le nombre de pas est imprimé
**avant** que Reeborg ne se déplace.  La raison pour ceci est que le
programme est exécuté et enregistré secrètement en coulisses, puis le résultat
est démontré comme une animation dans un film.  Si au lieu d'utiliser la fonction
Python ``print``, vous utilisez plutôt ``ecrit`` qui est spécifique au monde
de Reeborg, vous verrez que le résultat de cette fonction est imprimé comme s'il
s'agissait d'une étape individuelle dans le programme.


.. topic:: À votre tour!

    Écrivez un programme qui fera en sorte que Reeborg fasse le tour du
    monde Autour 1 tout en comptant le nombre de pas **ainsi que** le nombre
    de virages à gauche, écrivant le résultat dans son journal à la fin.
    Vous devriez commencer par déposer un jeton pour indiquer la position de
    départ (et d'arrivée).

