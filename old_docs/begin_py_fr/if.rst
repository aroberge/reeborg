Si seulement ...
================

Si seulement Reeborg pouvait prendre des décisions de lui-même, écrire
des programmes serait tellement plus simple ... **OUPS !** J'ai oublié
de vous le mentionner: Reeborg **peut** prendre ses propres décisions!

Le mot-clé ``if``
-----------------


.. topic:: Faites ceci!

    Sélectionnez le monde **Seul** et faites-en sorte que Reeborg exécute le
    programme suivant

    .. code-block:: python

        if True:
            avance()

        if False:
            tourne_a_gauche()

``True`` (vrai) et ``False`` (faux) sont deux mots-clés Python.  Vous voudrez peut-être
les interchanger juste pour voir.  Le mot anglais ``if`` est l'équivalent
de la conjonction ``si`` en français.


Énoncé ``if``
----------------

L'*énoncé* ``if`` suit un patron semblable à celui de ``def``::

    def un_nom():
        # bloc de code

    if une_condition:
        # bloc de code

Comment interpréter les énoncés ``if``
--------------------------------------

Lorsque nous avons présenté les fonctions, nous avons expliqué comment
on pouvait interpréter l'**invocation** d'une fonction comme étant
équivalente à insérer le bloc de code du corps de la fonction à
l'endroit de l'invocation. Ainsi::


    avance()
    tourne_a_droite()  # invocation
    avance()

est équivalent à::

    avance()
    # début du bloc de code pour tourne_a_droite()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()
    # fin du bloc de code
    avance()

Les énoncés ``if`` peuvent être interprétés de façon similaire, sauf que
nous avons une *insertion* ou une *élimination* **conditionnelle** du
bloc de code. Ainsi::

    avance()
    if True:
        tourne_a_gauche()
        tourne_a_gauche()
    avance()

est équivalent à::

    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    avance()

alors que::

    avance()
    if False:
        tourne_a_gauche()
        tourne_a_gauche()
    avance()

est équivalent à::

    avance()
    avance()

Il est important de noter que cette insertion ou élimination d'un bloc
de code n'est pas quelque chose de permanent: si, pour quelque raison,
l'exécution du programme faisait en sorte que l'énoncé ``if`` était
répété à nouveau, la condition serait réévaluée à chaque fois, ce qui
pourrait mener à des résultats différents d'une évaluation à l'autre.

On peut représenter un énoncé ``if`` par un organigramme:

.. figure:: ../../flowcharts/if2.jpg
   :align: center

Plus utile que vous ne le pensez...
-----------------------------------

Avoir à spécifier ``True`` ou ``False`` dans un programme n'aide pas
Reeborg à décider de lui-même. Cependant, il existe des fonctions que
Reeborg reconnaît comme lui indiquant des décisions à prendre. Une de
ces fonctions est ``objet_ici()`` qui indique à Reeborg si un ou
plusieurs objets se trouvent aux coordonnées où Reeborg est situé. Par
exemple, si on demandait à Reeborg de collectionner des jetons, une
partie du code pourrait être::

    if objet_ici():
        prend()




Examinez à tour de rôle les mondes **Jetons 1** et **Jetons 2**. Dans chaque
cas, en supposant que Reeborg se déplace le long d'une ligne, tout ce
qu'il a à faire lorsqu'il trouve un jeton est:

#. prendre ce jeton
#. avancer d'une case
#. déposer ce jeton
#. avancer d'une autre case
#. et il ``termine()``

où j'ai introduit une nouvelle instruction que Reeborg comprend:
``termine()``.

Écrivons donc le une esquisse d'un programme unique qui pourrait
permettre à Reeborg d'accomplir la tâche dans les deux mondes mentionnés
ci-dessus, soit **Jetons 1** et **Jetons 2**::

    def avance_jusque_tâche_terminée():
        avance()
        if objet_ici():
            # quelque chose
            # quelque chose d'autre
            # autre chose encore
            # une de plus
            termine()

    repeat 42:
        avance_jusque_tâche_terminée()

Pourquoi 42? ... Je n'ai pas de véritable raisons pour ce choix. Tout ce
que je veux est que Reeborg avance suffisamment de fois pour compléter
sa tâche peu importe la dimension du monde. Les deux mondes en questions
sont suffisamment petit que de répéter 42 fois est plus que suffisant
(certains diraient que c'est excessif). Je suis d'accord avec vous, ceci
ne semble pas être une façon très intelligente de faire les choses ...
On fera mieux plus tard.


.. topic:: À votre tour!

    Copiez le code ci-dessus dans l'éditeur de code, ajouter
    les instructions manquantes, et vérifiez que votre programme fonctionne
    dans les mondes **Jetons 1** et **Jetons 2**.

.. admonition:: Pour les enseignants

    Si plusieurs objets pourraient se trouver dans un monde donné
    et qu'on ne s'intéresse qu'à un seul type d'objet, on peut spécifier
    le type en utilisant un argument::

        if objet_ici("jeton"):
            prend("jeton")
