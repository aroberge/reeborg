Toujours les haies!
===================

Reeborg vit au Canada où non seulement il peut pleuvoir ou faire soleil,
mais où la neige peut également tomber ... habituellement pas les trois
(pluie, neige et soleil) en même temps ... mais ça arrive parfois...
Supposons que seulement une des trois choses peut arriver à la fois.
Dans ce cas, Reeborg pourrait se retrouver dans la situation suivante::

    if il_pleut():
        joue_dans_la_maison()
    elif il_neige():
        va_skier()
    else:
        va_nager() # en supposant qu'il fait chaud!

Notez l'utilisation de ``else`` pour les choix 2 et 3, et le ``if``
additionnel pour le deuxième cas.
Remarquez l'utilisation de  ``elif`` (qui se veut une abréviation de "else if"
signifiant "autrement, si ...") pour le deuxième choix.  Si on tenait compte
de toutes les conditions météos possibles (brouillard, crachin, etc.), on pourrait
ajouter d'autre blocs de code ``elif: ...``.

Voici une représentation graphique des choix auxquels Reeborg fait face:

.. figure:: ../../flowcharts/elif2.jpg
   :align: center



Comme penser aux énoncés ``if / else if / ... / else``
------------------------------------------------------

Une série d'énoncés ``if / else if / ... / else`` est équivalente à
insérer le **premier** bloc de code dont la condition est équivalente à
``True``. Donc

.. code:: py3

    if False:
        fonction_1()
    elif True:
        fonction_2()
    elif True:
        fonction_3()
    else:
        fonction_4()

est équivalent à

.. code:: py3

    fonction_2()

alors que

.. code:: py3

    if False:
        fonction_1()
    elif False:
        fonction_2()
    elif False:
        fonction_3()
    else:
        fonction_4()

est équivalent à

.. code:: py3

    fonction_4()

etc.

De retour aux haies
-------------------

Deux leçons passées, vous avez écrit un programme qui permettait à
Reeborg de terminer les courses **Haies 1** et **Haies 2** mais pas **Haies 3**.
Votre programme ressemblait probablement à ce qui suit::


    def saute():
        # un bloc de code

    def avance_et_saute_jusqu_au_but():
        avance()
        if au_but():
            termine()
        saute()

    repeat 42:
        avance_et_saute_jusqu_au_but()

Ce programme ne fonctionnait pas avec **Haies 3** parce qu'il suppose que
les haies sont espacées régulièrement, ce qui n'est pas le cas pour
**Haies 3**. Utilisons la condition ``rien_devant()`` et le mot-clé ``else``
pour résoudre ce problème.

Le programme suivant devrait faire l'affaire en autant que vous ajoutiez
les instructions qui manquent.

.. code:: py3

    def saute():
        # un bloc de code

    def avance_et_saute_jusqu_au_but():
        if au_but():
            # instruction ...
        elif rien_devant():
            # instruction ...
        else:
            # instruction ...


Souvenez-vous que la série d'énoncés ``if/else`` résulte en un seul bloc
de code qui sera exécuté.

.. topic:: Faites-le!

    Écrivez-donc un tel programme et assurez-vous qu'il fonctionne
    correctement.

Est-ce que ce programme pourrait fonctionner tel quel pour le monde
**Haies 4**? La réponse est *probablement* non ... mais étudiez-le pour
tirer votre propre conclusion avant de le tester pour vérifier votre
hypothèse.


