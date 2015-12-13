Un meilleur **repete()**
========================

.. note::

    Cette leçon couvre des concepts très avancés. Si vous ne comprenez
    pas tout, ceci ne devrait pas vous empêcher de continuer avec les autres
    leçons.

Vous avez vu comment on pouvait définir notre propre fonction
équivalente à ``repete()``, fonction qui permet d'éviter les répétitions
de lignes de code. Par exemple, si on veut simuler un virage à droite,
on peut écrire ``repete( tourne_a_gauche, 3)`` au lieu de répéter trois
fois la même instruction. Le problème avec cette approche en général est
que ceci n'améliore pas la lisibilité du code puisqu'on n'introduit pas
de noms descriptifs. Une meilleure approche que nous avons vu est
d'utiliser ``repete()`` mais de cacher ces répétitions à l'intérieur
d'une fonction::

    def tourne_a_droite():
        repeat(tourne_a_gauche, 3)

Cependant, on peut faire ceci d'une autre façon. Tout d'abord, revoyons
une définition possible de ``repete()``::

    def repete (fonction, n):
        for i in range(n):
            fonction()


Ensuite, rappelons-nous l'effet d'un énoncé ``return`` à l'intérieur
d'une fonction. Par exemple, si on a::

    def fonction_quelconque ():
        # quelques lignes de code
        return quelque_chose

    a = onction_quelconque()
    # a sera maintenant un synonyme pour "quelque_chose"

Tout comme on peut avoir des fonctions comme arguments d'autres
fonctions, on peut *retourner* des fonctions!

.. code:: py3

    def meilleur_répète (fn, n):
        def ancien_répète():
            for i in range(n):
                fn()
        return ancien_répète

    # on l'utilise pour définir un virage à droite
    mon_virage_à_droite = meilleur_répète(tourne_à_gauche, 3)

    mon_virage_à_droite()   # et on l'utilise


.. topic:: À votre tour!

    Vérifiez que le code ci-dessus fonctionne correctement.

Extension de cette idée
-----------------------

En plus d'utiliser cette approche pour des répétions, on peut l'utiliser
pour des conditions devant être vérifiées.

.. code-block:: py3

    def faire_pendant(fn, condition):
        def pendant():
            while condition():
                fn()
        return pendant

    marche_au_mur = faire_pendant(avance, rien_devant)
    marche_au_mur()

.. topic:: À votre tour!

    Vérifiez que ça fonctionne.

    Lorsque vous aurez terminé, vous pourrez tenter de définir une fonction
    ``faire_si_non(fn, condition)`` où nous faisons quelque chose jusqu'à ce
    qu'une condition ne soit **pas** satisfaite.



Une autre façon de répéter
==========================

Nous pouvons également utiliser une façon différente de répéter une
certaine instruction, qui est spécifique à cette instruction.
Supposons que l'on veuille *tourner à droite* ou *faire demi-tour*
mais qu'on voudrait n'avoir qu'un seul nom de fonction à se rappeler.
Une façon de faire ceci serait la suivante::

    def tourne(n)
        for i in range(n):
            tourne_a_gauche()

En utilisant cette définition, ``tourne_a_droite()`` serait ``tourne(3)``
et ``demi_tour()`` serait ``tourne(2)``. Essayez!

Comportement par défaut
------------------------

Vous vous rappelez du fait que ``prend()`` et ``prend("jeton")`` sont équivalents?
Ne serait-il pas utile d'avoir quelque chose de semblable pour ``tourne()`` où ``tourne()``,
sans argument, serait équivalent à ``tourne_a_gauche()``?

Ceci peut être fait de la façon suivante::

    def tourne(n):
        if n is None:    # None indique qu'aucun argument n'a été inclus
            n = 1        # valeur par défaut
        for i in range(n):
            tourne_a_gauche()

Si on spéficie un argument (entier) inférieur à 1, la boucle
``for`` sera ignorée et Reeborg ne tournera pas!

.. topic:: À votre tour!

   Écrivez des programmes qui utilisent les exemples de code ci-dessus.

