Le journal de Reeborg
=====================

Cliquez sur le bouton **Monde** au haut de l'écran pour cacher le monde
de Reeborg. Cliquez également sur le bouton **Journal** pour voir le
journal de Reeborg, là où notre robot favori écrit.

Exécutez le programme suivant::

    print(42)

Vous devriez voir que Reeborg écrit la réponse à la question ultime au
sujet de la Vie, de l'Univers et du Reste [du moins selon le livre *Le
guide du voyageur galactique*] dans son journal.

Écrire des textes
-----------------

.. note::

    En plus de la fonction Python ``print``, le monde de Reeborg
    inclut une fonction ``ecrit`` qui fait presque la même chose.
    Essayez de l'utiliser à l'occasion.

Dans le jargon de la programmation, un *caractère* est n'importe quelle
lettre, chiffre ou symbole qui peut être imprimé, et une *chaîne de
caractères*, ou plus simplement une *chaîne*, est n'importe quelle
combinaison de caractères pouvant être imprimés. Par exemple, exécutez
les instructions suivantes::


    print("Bonjour monde!")
    print('Bonjour encore.')

Notez que les guillemets **anglais** qui encadrent la *chaîne* doivent
être semblables, soient doubles, ", ou simples, ", doivent être les
mêmes; à noter que ce ne sont **pas** des guillemets français « ». Si
vous voulez inclure un guillemet dans une chaîne, vous pouvez soit
utiliser des guillemets d'un type différent pour encadrer la chaîne, ou
les précéder du *caractère d'échappement* ``\``.

.. code:: py3

    print("Ajourd'hui.")
    print('Aujourd\'hui.')

On peut combiner les chaînes en utilisant le symbole d'addition ``+``::

    print("Au revoir! " + "Et merci pour tout.")

Vous pouvez également débuter une nouvelle ligne en utilisant la
*séquence d'échappement* ``\n``::


    print("Merci. \nEssayez encore")

Reeborg connaît les maths
-------------------------

Exécutez le programme suivant et observez le résultat dans le journal de
Reeborg.

.. topic:: Faites des maths!

    Essayez les exemples suivants::

        print( 2 + 3 )  # addition
        print( 2 * 3 )  # multiplication
        print( 3 - 2 )  # soustraction
        print( 6 / 2 )  # division
        print( 1 + 3 * 2 ) # multiplication avant addition
        print( (1 + 3) * 2 )  # Les parenthèses indiquent l'ordre des opérations

Utilisation des variables
-------------------------

Nous avons déjà vu l'idée d'utiliser différents noms (synonymes) pour le
même concept. Utilisons-le à nouveau dans un
contexte mathématique.

.. code:: py3

    longueur = 4
    largeur = 6
    aire = longueur * largeur;  # aire d'un rectangle
    print(aire)  # imprimera 24

.. topic:: À votre tour!

    Reproduisez l'exemple ci-dessus, puis inventez vos propres exemples.


Avis
----

Combiner des chaînes et des nombres peut donner des résultats
inattendus:

.. code:: py3

    print("2" + 2)

.. warning::

    Le *caractère* "2" n'est pas le même que le *chiffre* 2.

Finalement, notez que les espaces autour des opérateurs comme ``+``,
sont ignorés par Python; cependant, ils peuvent faciliter la lecture
(et la compréhension) pour les humains.
