`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Si seulement ...
================

Si seulement Reeborg pouvait prendre des décisions de lui-même, écrire
des programmes serait tellement plus simple ... **OUPS !** J'ai oublié
de vous le mentionner: Reeborg **peut** prendre ses propres décisions!

Le mot-clé ``if``
-----------------

Sélectionnez le monde Seul) et faites-en sorte que Reeborg exécute le
programme suivant

.. code:: jscode

    if (true) {
        avance();
    }

    if (false) {
        tourne_à_gauche();
    }

``true`` (signifiant **vrai**) et ``false`` (signifiant **faux**) sont
deux mots-clés de Javascript. Je vous suggère de les échanger l'un pour
l'autre et d'exécuter le programme à nouveau. Est-ce que Reeborg
``avance`` ou ``tourne_à_gauche``?

Énoncé ``if``
-------------

L'*énoncé* ``if`` suit un patron semblable à celui de ``function``:

.. code:: jscode

    function nom_quelconque() {
        // bloc de code
    }

    if (condition_quelconque) {
        // bloc de code
    }

Comment interpréter les énoncés ``if``
--------------------------------------

Lorsque nous avons présenté les fonctions, nous avons expliqué comment
on pouvait interpréter l'**invocation** d'une fonction comme étant
équivalente à insérer le bloc de code du corps de la fonction à
l'endroit de l'invocation. Ainsi:

.. code:: jscode

    avance();
    tourne_à_droite();  // invocation
    avance();

est équivalent à

.. code:: jscode

    avance();
    // début du bloc de code pour tourne_à_droite()
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();
    // fin du bloc de code
    avance();

Les énoncés ``if`` peuvent être interprétés de façon similaire, sauf que
nous avons une *insertion* ou une *élimination* **conditionnelle** du
bloc de code. Ainsi:

.. code:: jscode

    avance();
    if (true) {
        tourne_à_gauche();
        tourne_à_gauche();
    }
    avance();

est équivalent à

.. code:: jscode

    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    avance();

alors que

.. code:: jscode

    avance();
    if (false) {
        tourne_à_gauche();
        tourne_à_gauche();
    }
    avance();

est équivalent à

.. code:: jscode

    avance();
    avance();

Il est important de noter que cette insertion ou élimination d'un bloc
de code n'est pas quelque chose de permanent: si, pour quelque raison,
l'exécution du programme faisait en sorte que l'énoncé ``if`` était
répété à nouveau, la condition serait réévaluée à chaque fois, ce qui
pourrait mener à des résultats différents d'une évaluation à l'autre.

PLus utile que vous ne le pensez...
-----------------------------------

Avoir à spécifier ``true`` ou ``false`` dans un programme n'aide pas
Reeborg à décider de lui-même. Cependant, il existe des fonctions que
Reeborg reconnaît comme lui indiquant des décisions à prendre. Une de
ces fonctions est ``jeton_ici()`` qui indique à Reeborg si un ou
plusieurs jetons se trouvent aux coordonnées où Reeborg est situé. Par
exemple, si on demandait à Reeborg de collectionner des jetons, une
partie du code pourrait être:

.. code:: jscode

    if ( jeton_ici() ) {
        prendre_jeton();
    }

Examinez à tour de rôle les mondes Jetons 1 et Jetons 2. Dans chaque
cas, en supposant que Reeborg se déplace le long d'une ligne, tout ce
qu'il a à faire lorsqu'il trouve un jeton est:

#. prendre ce jeton
#. avancer d'une case
#. déposer ce jeton
#. avancer d'une autre case
#. et il a ``terminé()``

où j'ai introduit une nouvelle instruction que Reeborg comprend:
``terminé()``. En fait, vous pouvez penser à cette instruction comme
quelque chose que Reeborg dit lui-même lorsqu'il déclare avoir terminé
une tâche.

Écrivons donc le une esquisse d'un programme unique qui pourrait
permettre à Reeborg d'accomplir la tâche dans les deux mondes mentionnés
ci-dessus, soit Jetons 1 et Jetons 2

.. code:: jscode

    function avance_jusque_tâche_terminée() {
        avance();
        if ( jeton_ici() ){
            // quelque chose
            // quelque chose d'autre
            // autre chose encore
            // une de plus
            terminé();
        }
    }

    répète(avance_jusque_tâche_terminée, 42);

Pourquoi 42? ... Je n'ai pas de véritable raisons pour ce choix. Tout ce
que je veux est que Reeborg avance suffisamment de fois pour compléter
sa tâche peu importe la dimension du monde. Les deux mondes en questions
sont suffisamment petit que de répéter 42 fois est plus que suffisant
(certains diraient que c'est excessif). Je suis d'accord avec vous, ceci
ne semble pas être une façon très intelligente de faire les choses ...
On fera mieux plus tard.

Pour l'instant, copiez le code ci-dessus dans l'éditeur de code, ajouter
les instructions manquantes, et vérifiez que votre programme fonctionne
dans les mondes Jetons 1 et Jetons 2.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
