Compter sur la récursivité
==========================

Reeborg sait comment compter ... mais nous n'avons pas encore vu ceci et
nous ne le verrons pour quelque temps encore. Si vous avez appris la
programmation ailleurs, vous savez probablement comment utiliser des
variables numériques pour permettre à Reeborg de compter. Si c'est le
cas, je vous demande de ne **pas** les utiliser dans ce qui suit.

Sélectionnez le monde **Jetons 5**. Là où Reeborg se trouve, il y a un seul
jeton. Vous savez comment demander à Reeborg de prendre un jeton et
d'avancer d'un pas. Je vous demande de faire en sorte que Reeborg répète
ces deux instructions jusqu'à ce qu'il se trouve à un endroit où il n'y
a pas de jetons. À cet endroit, Reeborg doit déposer tous les jetons
qu'il a ramassé puis se déplacer au carré suivant.

Le même programme peut être utilisé pour le monde **Jetons 6**, qui a un
nombre différent de jetons; vous ne pouvez donc pas utiliser la fonction
``repete()`` si vous voulez avoir un seul programme pour les deux
mondes.

Reeborg commence avec un nombre illimité de jetons dans ses poches; vous
ne pouvez donc pas utiliser le test ``a_des_jetons()`` pour permettre à
Reeborg de déterminer quand il doit arrêter de déposer des jetons.

Pour satisfaire à toutes les contraintes mentionnées, vous allez
utiliser un programme récursif, dont l'esquisse suit, pour résoudre ces
problèmes.

.. code:: py3

    def collectionne():
        # instruction
        # instruction
        if condition:
            # instruction
        #instruction

    collectionne ()
    avance()

.. topic:: À votre tour!

    Écrivez le programme décrit ci-dessus et vérifiez qu'il fonctionne correctement.


.. topic:: Missions récursives

    Revoyez toutes les missions précédentes et tentez d'écrire de nouvelles solutions
    en utilisant la récursivité plutôt que des boucles ``while``.