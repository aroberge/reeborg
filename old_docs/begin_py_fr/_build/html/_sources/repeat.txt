Répète
======

Comme nous l'avons vu, il arrive souvent que l'on doive répéter une
instruction donnée un certains nombre de fois. Il y a une façon standard
de faire ceci en Python ... mais ceci requiert de comprendre trop de
nouveaux concepts à la fois. Je vais juste vous montrer le code requis
pour ceci puis présenter un mot clé plus simple à comprendre,
``repeat``, unique au monde de Reeborg.

La façon standard s'appelle une *boucle* ``for``
et est écrite de la façon suivante::

    for _ in range(n):
        # diverses
        # instructions
        # ici


.. note::

   ``repeat`` est un mot anglais qu'on pourrait traduire en français
   par **répète**.

Dans le monde de Reeborg, on peut écrire une *boucle* ``repeat``
de la façon suivante::

    repeat n:    # "n" est un nombre entier
        # diverses
        # instructions
        # ici


Par exemple, le code suivant ferait en sorte que Reeborg dessine
un carré::

    repeat 4:
        avance()
        tourne_a_gauche()


En utilisant ``repeat`` on peut récrire certains fonctions
sans avoir à répéter des instructions, comme par exemple::

    def tourne_a_droite():
        repeat 3:
            tourne_a_gauche()


.. topic:: À votre tour!

    Si vous avez toujours dans l'éditeur de code une copie
    du programme permettant à Reeborg de livrer le journal à Monsieur Pattis,
    modifiez-le de façon à utiliser une boucle ``repeat``
    à toutes les fois que ceci permet de raccourcir le code.


.. admonition:: Pour les enseignants

    Comme ce tutoriel reporte à plus tard l'introduction du concept
    de variables ainsi que de l'utilisation d'arguments de fonctions,
    j'ai jugé préférable de modifier la syntaxe traditionnelle de Python
    en ajoutant le mot-clé ``repeat`` pour éviter d'introduire trois
    concepts différents en même temps (les boucles, les variables, le
    arguments de fonction).   Ceci est un choix personnel, et tout à fait
    subjectif.
