Demi-tour!
==========

En plus d'instruire Reeborg de tourner à droite, vous avez probablement
eu à lui faire demi-tour à quelques reprises. On peut définir une
fonction ``demi_tour()`` de la façon suivante::

    def demi_tour():
        tourne_a_gauche()
        tourne_a_gauche()

Faites-le!

De retour à ``tourne_a_droite()``
---------------------------------

Vous vous souvenez de ``tourne_a_droite()``? Revoici sa définition::

    def tourne_a_droite():
        tourne_a_gauche()
        tourne_a_gauche()
        tourne_a_gauche()


On remarque que les deux premières instructions sont identiques à la
définition de ``demi_tour()``. Lorsque quelque chose du genre arrive, il
est bon de se rappeler de la règle numéro 3:

.. important::

    **Règle numéro 3**
        Lorsque vous écrivez des programmes informatiques, ne vous répétez
        pas.
        Je répète: `ne vous répétez
        pas! <http://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas>`__

Donc, nous avons une répétitions d'instructions. Bien que
``tourne_a_droite()`` soit déjà toute simple, une bonne habitude à
développer en programmation informatique est de remplacer les parties de
codes qui se répètent par une simple fonction. Donc, nous devrions
redéfinir ``tourne_a_droite()`` de la façon suivante::

    def tourne_a_droite():
        demi_tour()
        tourne_a_gauche()

L'idée suggérant cette pratique est que, plus la définition d'une
fonction est courte, plus il est facile de détecter des problèmes ...
et, en bout de ligne, de s'assurer qu'il n'y a pas de bogues. De plus,
une fois que nous avons défini et testé une fonction pour nous assurer
qu'elle ne comporte pas de bogues, on réduit la possibilité de bogues
ailleurs en l'utilisant aussi souvent que possible. J’admets que
l'exemple choisi peut sembler ridicule en raison de la simplicité des
fonctions utilisées ... mais je n'ai pas d'exemples plus compliqués à
vous offrir à ce moment-ci pour illustrer cette idée très importante.

.. topic:: À votre tour!

    Définissez la fonction ``recule()`` qui est l'opposé de la fonction
    ``avance()``. Par ceci, je veux dire que si vous ceci devrait permettre
    le code suivant::

         # départ au point x, y
        avance()
        recule()
        # de retour au point x, y,
        # faisant face à la même direction qu'au départ

    Assurez-vous de vérifier que le tout fonctionne!

N'utilisez pas l'indice sauf si vous en avez absolument besoin!


.. hint::

   Vous voudrez probablement utiliser ``demi_tour()`` deux fois dans la définition
   de ``recule()``.