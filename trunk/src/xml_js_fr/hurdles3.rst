`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Toujours les haies!
===================

Reeborg vit au Canada où non seulement il peut pleuvoir ou faire soleil,
mais où la neige peut également tomber ... habituellement pas les trois
(pluie, neige et soleil) en même temps ... mais ça arrive parfois...
Supposons que seulement une des trois choses peut arriver à la fois.
Dans ce cas, Reeborg pourrait se retrouver dans la situation suivante:

.. code:: jscode

    if ( il_pleut() ) {
        joue_dans_la_maison();
    } else if ( il_neige() ){
        va_skier();
    } else {
        va_nager(); // en supposant qu'il fait chaud!
    }

Notez l'utilisation de ``else`` pour les choix 2 et 3, et le ``if``
additionnel pour le deuxième cas. Si on devait considérer d'autres types
d'intempéries, comme la grêle, les orages, le brouillard, le crachin,
etc., on pourrait ajouter d'autres choix en utilisant les blocs de code
``else if {...}``.

Comme penser aux énoncés ``if / else if / ... / else``
------------------------------------------------------

Une série d'énoncés ``if / else if / ... / else`` est équivalente à
insérer le **premier** bloc de code dont la condition est équivalente à
``true``. Donc

.. code:: jscode

    if ( false ) {
        fonction_1();
    } else if ( true ){
        fonction_2();
    } else if ( true ){
        fonction_3();
    } else {
        fonction_4();
    }

est équivalent à

.. code:: jscode

    fonction_2();

alors que

.. code:: jscode

    if ( false ) {
        fonction_1();
    } else if ( false ){
        fonction_2();
    } else if ( false ){
        fonction_3();
    } else {
        fonction_4();
    }

est équivalent à

.. code:: jscode

    fonction_4();

etc.

De retour aux haies
-------------------

Deux leçons passées, vous avez écrit un programme qui permettait à
Reeborg de terminer les courses Haies 1 et Haies 2 mais pas Haies 3.
Votre programme ressemblait probablement à ce qui suit:

.. code:: jscode

    function saute() {
        // un bloc de code
    }

    function avance_et_saute_jusqu_au_but () {
        avance();
        if ( au_but() ) {
            terminé();
        }
        saute();
    }

    répète(avance_et_saute_jusqu_au_but, 42);

Ce programme ne fonctionnait pas avec Haies 3 parce qu'il suppose que
les haies sont espacées régulièrement, ce qui n'est pas le cas pour
Haies 3. Utilisons la condition ``rien_devant()`` et le mot-clé ``else``
pour résoudre ce problème.

Le programme suivant devrait faire l'affaire en autant que vous ajoutiez
les instructions qui manquent.

.. code:: jscode

    function saute() {
        // un bloc de code
    }

    function avance_et_saute_jusqu_au_but () {
        if ( au_but() ) {
            // instruction ...
        } else if ( rien_devant() ) {
            // instruction ...
        } else {
            // instruction ...
        }
    }

    répète(avance_et_saute_jusqu_au_but, 42);

Souvenez-vous que la série d'énoncés ``if/else`` résulte en un seul bloc
de code qui sera exécuté.

Écrivez-donc un tel programme et assurez-vous qu'il fonctionne
correctement.

**Est-ce que ce programme pourrait fonctionner tel quel pour le monde**
Haies 4? La réponse est *probablement* non ... mais étudiez-le pour
tirer votre propre conclusion avant de le tester pour vérifier votre
hypothèse.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
