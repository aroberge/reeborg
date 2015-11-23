Écoutez-moi, sinon ...
======================

.. index:: ! else

Apprendre la programmation informatique peut être très amusant, mais
vous ne devriez pas passer toute votre vie devant un écran d'ordinateur.
**Si il pleut, continuez à lire, sinon allez jouer dehors!** (Oui, même vous
grand-père!)

Deux choix...
-------------

Récrivons la phrase ci-dessus débutant avec **Si**.

.. code:: py3

    Si il pleut,
        continuez à lire,
    sinon
        allez jouer dehors!

Si nous exprimions cette idée en Python, on aurait quelque chose du
genre à la place::

    if il_pleut():
        continuez_à_lire()
    else:
        allez_jouez_dehors()

Oui, Python donne la possibilité d'avoir plus d'un choix avec le
mot-clé ``else``. Utilisons-le avec un autre exemple. Reeborg peut voir
s'il y a ou non un mur devant lui. Sélectionnez le monde **Autour 1**. À
l'aide de la nouvelle condition, ``rien_devant()``, que Reeborg utilise
pour déterminer s'il y a ou non un mur devant lui, on peut utiliser la
combinaison ``if/else`` pour écrire un programme permettant
à Reeborg de faire le tour du monde. Quelque chose comme ce qui suit
suffit::

    def avance_ou_tourne():
        if rien_devant() :
            # faire quelque chose
        else:
            # faire autre chose

    repeat 40:
       avance_ou_tourne()

.. topic:: Faites-le!

    Écrivez un programme utilisant le code ci-dessus faisant en
    sorte que Reeborg fasse le tour du monde **Autour 1**.

    Lorsque ce sera fait, pouvez-vous modifier le programme (en ajoutant une
    seule instruction) de telle sorte que Reeborg dépose un jeton à chaque
    coin?

Comment comprendre ``if/else``
------------------------------

Nous avons vu comment les énoncés ``def`` et ``if`` pouvaient être
interprétés comme étant parfois équivalent à insérer un bloc de code.
Les combinaisons ``if/else`` peuvent être considérées de la même façon.
Ainsi

.. code:: py3

    avance()
    if True:
        tourne_a_droite()
    else:
        tourne_a_gauche()
    avance()

est équivalent à::

    avance()
    tourne_a_droite()
    avance()

alors que::

    avance()
    if False:
        tourne_a_droite()
    else:
        tourne_a_gauche()
    avance()

est équivalent à::

    avance()
    tourne_a_gauche()
    avance()

On peut représenter ceci par l'organigramme suivant:

.. figure:: ../../../flowcharts/else2.jpg
   :align: center
