Répète
======

Comme nous l'avons vu, il arrive souvent que l'on doive répéter une
instruction donnée un certains nombre de fois. Il y a une façon standard
de faire ceci en Python ... mais ceci requiert de comprendre trop de
nouveaux concepts à la fois. Je vais juste vous montrer le code requis
pour ceci puis présenter une fonction plus simple à comprendre,
``repete()``, fonction unique au monde de Reeborg. Plus tard je vous
expliquerai comment ``repete()`` est définie à l'aide du code utilisé
habituellement.

La façon standard s'appelle une *boucle ``for``* et est écrite de la
façon suivante

Repeat

.. code-block:: python

    for i in range(n):
        # diverses
        # instructions
        # ici

.. note::

   Souvenez-vous que ``prend("jeton")`` pourrait simplement être écrit comme ``prend()``.

Maintenant que vous avez entrevu le code cryptique incluant deux
mots-clés ``for`` et ``in``, nous présentons plutôt la fonction
``repete()``. Nous allons utiliser la fonction ``prend_la_monnaie()`` de la
tâche de livraison de journaux que nous avons tout juste vue::

    def prendre_la_monnaie():
        prend("jeton")
        prend("jeton")
        prend("jeton")
        prend("jeton")
        prend("jeton")

Le corps de ``prendre_la_monnaie()`` est constitué de 5 répétitions de
``prend("jeton")``. Utilisant ``repete()``, nous pouvons récrire ceci de
la façon suivante:::

    def prendre_la_monnaie():
        repete(prend, 5)

Notez que les parenthèses ``()`` ne sont **pas** incluse pour
``prend`` comme *argument* de ``repete()``. Donc, en utilisant
``repete()``, nous avons une autre façon d'éliminer les répétitions dans
nos programmes. Cela dit, si j'avais eu à spécifier l'argument
``"jeton"``, je n'aurais pas pu utiliser ``repete`` car il ne prend
que le nom d'une fonction comme argument (ainsi que le nombre de répétitions) sans
parenthèses: on ne peut donc pas spécifier d'argument à cette deuxième fonction.

.. topic:: À votre tour!

    Si vous avez toujours dans l'éditeur de code une copie
    du programme permettant à Reeborg de livrer le journal, modifiez-le de
    façon à utiliser ``repete()`` à toutes les fois que ceci permet de
    raccourcir le code. Si vous n'avez pas une copie du programme, retourner
    à la leçon précédente et refaites-le en utilisant ``repete()``.


