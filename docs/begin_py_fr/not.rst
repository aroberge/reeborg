Pas vrai!
=========

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

