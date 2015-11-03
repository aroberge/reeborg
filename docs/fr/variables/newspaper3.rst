Une nouvelle livraison de journaux
==================================

Retournons aux tâches de livraison de journaux, mais cette fois-ci nous
allons seulement considérer les livraisons de journaux non-gratuits.

Ci-dessous est une tentative de solution qui permettra à Reeborg de livrer le journal de
Madame Lovelace, **Journal 1**, ainsi que celui de Monsieur Babbage,
**Journal 2**:

.. code-block:: py3
    :emphasize-lines: 28

    from biblio import tourne_a_droite, demi_tour

    def monte_un_étage():
        tourne_a_gauche()
        avance()
        tourne_a_droite()
        avance()
        avance()

    def descend_un_étage():
        avance()
        avance()
        tourne_a_gauche()
        avance()
        tourne_a_droite()

    def prend_argent():
        while objet_ici():
            prend()

    # === Fin des définitions ===

    prend()        # prend le journal "étoile"
    while not objet_ici():
        monte_un_étage()

    prend_argent()
    depose()       # dépose le journal "étoile"
    demi_tour()
    while not au_but() :
        descend_un_étage()

.. topic:: Test important!

    Exécutez le programme ci-dessus et notez le résultat.


Rendu à la ligne ``depose()`` surlignée en jaune, Reeborg arrête
et crie ``Je transporte trop d'objets: je ne sais pas lequel déposer!``.

Le problème est que Reeborg transporte de l'argent **et** le journal
étoile.

.. topic:: Une solution?

    Faites en sorte que Reeborg dépose le journal **avant** qu'il
    ne prenne l'argent.   Est-ce que ça fonctionne?

Les arguments de fonctions
---------------------------

Lorsqu'il y a plus d'un type d'objet à un endroit donné, par exemple une
étoile et des jetons, et qu'on demande
à Reeborg ``prend()``, il ne peut pas savoir quel type d'objet il doit
prendre.  De la même façon, lorsqu'il transporte plus d'un type d'objets et
qu'on lui demande ``depose()``, il ne peut pas savoir lequel il doit déposer.

La solution: on doit être plus spécifique.

On a vu les arguments de fonction.  Et, par un heureux hasard (!), il
se trouve que les fonctions ``prend()`` et ``depose()`` peuvent accepter
un argument.   Dans le cas qui nous intéresse, le journal est représenté
par une étoile et l'argument à utiliser est ``"étoile"`` comme dans

.. code-block:: py3

    prend("étoile")
    depose("étoile")

Pour l'argent, on utilise ``"jeton"``.

.. topic:: À votre tour!

   Modifiez le programme pour spécifier quel type d'objet Reeborg doit
   prendre ou déposer.  Vérifiez que votre programme fonctionne correctment
   pour les deux mondes, **Journal 1** et **Journal 2**.

.. topic:: Vérification

   Modifiez votre programme pour remplacer ``objet_ici()`` par
   ``objet_ici("jeton")`` et vérifiez qu'il fonctionne toujours!
