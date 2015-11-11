Reeborg compte
==============

Sélectionnez le monde **Autour 1**. Vous avez vérifié précédemment que
Reeborg prend 9 pas pour rejoindre le mur à droite. Utilisons Reeborg
pour compter le nombre de pas à nouveau en se basant sur le nombre de
pas pour éviter de frapper le mur.

.. code:: py3

    nombre_de_pas = 0;
    while nombre_de_pas < 9:  # "<" signifie "plus petit que"
        avance()
        nombre_de_pas += 1

.. topic:: À votre tour!

    **Essayez!** Puis, modifiez le programme pour écrire la valeur de la
    variable ``nombre_de_pas`` dans le journal de Reeborg à chaque fois que
    sa valeur change.

Définition de ``repete()``?
---------------------------

Dans le programme ci-dessus, Reeborg comptait le nombre de pas et en
faisait un nombre total prédéterminé à l'avance. Nous avons vu comment
faire la même chose précédemment utilisant une seule instruction::

    repete(avance, 9)

Définissons une fonction que nous allons appeler ``mon_répète`` et qui
*cachera* le code apparaissant dans la boucle ``while`` ci-dessus::

    def mon_répète():
        nombre_de_pas = 0
        while nombre_de_pas < 9:
            avance()
            nombre_de_pas += 1

    mon_répète()   # on l'utilise!

Cette fonction n'est pas très utile comparativement à ``repete()``
puisque le nombre de pas à prendre ainsi que l'instruction à répéter
(``avance``) doivent être codées spécifiquement. On peut faire mieux en
*passant* des **arguments** à la fonction ``mon_répète`` comme ce qui
suit::

    def mon_répète(fonction_quelconque, valeur_maximale):
        nombre_de_pas = 0
        while nombre_de_pas < valeur_maximale:
            fonction_quelconque()
            nombre_de_pas += 1

    mon_répète(avance, 9)
    mon_répète(tourne_a_gauche, 4)

.. topic:: Vérifiez!

    Définissez la fonction comme ci-dessus et vérifiez qu'elle fonctionne correctement!


Portée des variables
--------------------

Comparez::

    nombre_de_pas = 0
    def mon_répète(fonction_quelconque, valeur_maximale):
        global nombre_de_pas
        while nombre_de_pas < valeur_maximale:
            fonction_quelconque()
            nombre_de_pas += 1

avec la définition précédente.  La définition précédente utilisait une
version **locale** de la variable ``nombre_de_pas``: sa valeur n'était pas
connue à l'extérieur de la fonction.  La nouvelle version utilise
une valeur globale, connue partout.

On utilise le terme de *portée* d'une
variable (*scope* en anglais) pour référer au fait que c'est une
variable locale ou globale. On recommande **fortement** d'utiliser des
variables locales lorsque c'est possible; ceci permet d'utiliser le même
nom pour d'autres variables locales utilisées ailleurs dans le programme
sans que les changements à leur valeur n'affecte celle de la variable
locale. Si vous utilisez des variables globales, un changement de valeur
à un endroit changera la valeur de cette variable partout ailleurs dans
le programme, ce qui peut mener à des bogues difficiles à retracer.

