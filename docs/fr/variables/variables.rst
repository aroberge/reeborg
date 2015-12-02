


.. note::

   En français, on appelle *synonymes* deux noms qui ont la même signification.
   Il peut être utile de penser à une *variable* comme étant un
   synonyme pour un objet donné.

Plusieurs noms pour un même objet
----------------------------------

Nous avons obtenu précédemment, en parlant des améliorations progressives,
une façon d'écrire une solution pour le monde **Autour 4** qui était la
suivante::

    from biblio import tourne_a_droite

    # On note le point de départ en déposant un jeton
    depose()

    # On trouve une direction où un mur ne bloque pas le chemin
    while not rien_devant():
        tourne_a_gauche()
    avance()

    # On sait qu'on a fait le tour du monde lorsqu'on revient
    # au point de départ, là où on a déposé un jeton.

    while not objet_ici():
        if rien_a_droite():    # on garde la droite
            tourne_a_droite()
            avance()
        elif rien_devant():    # on avance ... suivant le mur
            avance()
        else:
            tourne_a_gauche()  # on suit le mur


Par la suite, on avait défini de nouvelles fonctions pour mieux
capturer l'essentiel de cette solution, en réduisant le besoin
d'écrire des commentaires.  Une de ces fonctions, la seule que
nous allons utiliser ici, était la suivante::

    def suis_le_mur_à_droite():
        if rien_a_droite():
            tourne_a_droite()
            avance()
        elif rien_devant():
            avance()
        else:
            tourne_a_gauche()

.. important::

    Rappel: les commentaires sont ignorés par Python. Il est donc toujours
    préférable de faire en sorte que l'intention d'un programme soit bien
    décrite par la façon dont il est écrit.


Ici, nous allons utiliser une autre façon de rendre le tout
plus clair en utilisant des variables.  Par exemple,
au lieu d'écrire::

    # On note le point de départ en déposant un jeton
    depose()

On écrira plutôt::

    marque_le_point_de_départ = depose

    marque_le_point_de_départ()

De la même façon, au lieu d'écrire::

    # On trouve une direction où un mur ne bloque pas le chemin
    while not rien_devant():
        tourne_a_gauche()

on écrira plutôt::

    chemin_bloqué = mur_devant  # au lieu d'utiliser la négation de rien_devant!

    while chemin_bloqué():
        tourne_a_gauche()

Également, au lieu d'écrire::


    # On sait qu'on a fait le tour du monde lorsqu'on revient
    # au point de départ, là où on a déposé un jeton.

    while not objet_ici():

on écrira::

    revenu_au_point_de_départ = objet_ici
    while not revenu_au_point_de_départ():


Faisons tous ces changements, en écrivant d'abord les défitions de nouveaux noms
de variables, suivi du reste du programme::


    from biblio import tourne_a_droite

    marque_le_point_de_départ = depose
    revenu_au_point_de_départ = objet_ici
    chemin_bloqué = mur_devant

    def suis_le_mur_à_droite():
        if rien_a_droite():
            tourne_a_droite()
            avance()
        elif rien_devant():
            avance()
        else:
            tourne_a_gauche()

    # --- fin des définitions et début du programme

    marque_le_point_de_départ()

    while chemin_bloqué():
        tourne_a_gauche()
    avance()

    while not revenu_au_point_de_départ():
        suis_le_mur_à_droite():


Beaucoup moins de commentaires que précédemment, tout en gardant le
sens du programme aussi clair avec des bons noms de variables.
L'avantage d'utiliser des variables est que Python exécute le code correspondant
et, si le résultat est différent de ce qui était prévu, on le constate
immédiatement.
Par contre, Python ignore les commentaires; si les commentaires ne représentent
pas vraiment ce qui est fait dans le code, Python ne peut pas nous l'indiquer.
