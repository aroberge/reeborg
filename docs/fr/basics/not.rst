Pas vrai!
=========

.. index:: ! not

Reeborg est fâché. Il ne pleut **pas**; il ne neige **pas**; mais
Reeborg ne peut **pas** aller jouer dehors et s’entraîner pour la course
aux haies. Il doit attendre que vous appreniez la négation en
Python.

C'est le temps d'être négatif
-----------------------------

Avec Python, on peut indiquer la négation d'une condition en ajoutant
le mot-clé ``not``; ainsi ``not True`` (pas vrai)
est synonyme de ``False``. De la même façon, ``not False`` (pas faux) est
synonyme de ``True``.

Faites plaisir à Reeborg
------------------------

Vous avez déjà écrit un programme permettant à Reeborg de prendre part à
une course aux haies. Une partie de votre programme se lisait comme
suit::

    def avance_et_saute_jusqu_au_but():
        if au_but():
            # instruction ...
        elif rien_devant():
            # instruction ...
        else:
            # instruction ...

.. topic:: Trois autres façons!

    Vous pouvez rendre Reeborg heureux en écrivant trois versions
    différentes de ce programme démontrant différents choix d'utilisation du
    mot-clé ``not`` ainsi que différentes combinaisons
    ``if/elif/else``


Inspirez vous des trois modèles indiqués ci-dessous en portant
attention à l'endoirt où le mot-clé ``not`` est utilisé et à ce qui
est également inclus dans chaque bloc de code.

.. code:: py3

    # premier choix:

    def avance_et_saute_jusqu_au_but():
        if au_but():
            # instruction ...
        elif not rien_devant():
            # instruction ...
        else:
            # instruction ...

    # deuxième choix ... plus difficile

    def avance_et_saute_jusqu_au_but():
        if not au_but():
            if rien_devant():
                # instruction ...
            else:
                # instruction ...
        else:
            # instruction ...


    # troisième choix

    def avance_et_saute_jusqu_au_but():
        if not au_but():
            if not rien_devant():
                # instruction ...
            else:
                # instruction ...
        else:
            # instruction ...

Une autre option
-----------------

.. index:: mur_devant()

Vous avez vu comment on peut changer l'ordre des conditions dans
un bloc de code ``if/elif/else`` mais réussir à accomplir la même tâche.
Deux programmeurs vont souvent utiliser des stratégies différentes
pour obtenir le même résultat final.  Il y a d'autres possibilités qui
peuvent mener à avoir des programmes différents par différents programmeurs:
l'utilisation de fonctions différentes.

La fonction ``rien_devant()`` indique à Reeborg s'il y a ou non un mur
qui bloque son chemin.  Il en sera de même pour de l'**eau**, des
**murs de briques**, des **clôtures**, etc., objets que nous n'avons
pas vus encore mais que nous pourrions rencontrer dans de futurs mondes.
Cependant, il existe une fonction plus spécifique aux murs, appelée
``mur_devant()``; je vous en laisse deviner la logique.

.. topic:: Essayez!

    Écrivez un programme utilisant ``mur_devant()`` au lieu de l'équivalent
    ``not rien_devant()``.
