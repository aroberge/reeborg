`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Écoutez-moi, sinon ...
======================

Apprendre la programmation informatique peut être très amusant, mais
vous ne devriez pas passer toute votre vie devant un écran d'ordinateur.
Si il pleut, continuez à lire, sinon allez jouer dehors! (Oui, même vous
grand-père!)

Deux choix...
-------------

Récrivons la phrase ci-dessus débutant avec **Si**.

.. code:: jscode

    Si il pleut,
        continuez à lire,
    sinon
        allez jouer dehors!

Si nous exprimions cette idée en Javascript, on aurait quelque chose du
genre à la place

.. code:: jscode

    if ( il_pleut() ) {
        continuez_à_lire();
    } else {
        allez_jouez_dehors();
    }

Oui, Javascript donne la possibilité d'avoir plus d'un choix avec le
mot-clé ``else``. Utilisons-le avec un autre exemple. Reeborg peut voir
s'il y a ou non un mur devant lui. Sélectionnez le monde Autour 1. À
l'aide de la nouvelle condition, ``rien_devant()``, que Reeborg utilise
pour déterminer s'il y a ou non un mur devant lui, on peut utiliser la
combinaison ``if/else`` ``if/else`` pour écrire un programme permettant
à Reeborg de faire le tour du monde. Quelque chose comme ce qui suit
suffit:

.. code:: jscode

    function avance_ou_tourne () {
        if ( rien_devant() ) {
            // faire quelque chose
        } else {
            // faire autre chose
        }
    }

    répète(avance_ou_tourne, 40);

Faites-le!
----------

Lorsque ce sera fait, pouvez-vous modifier le programme (en ajoutant une
seule instruction) de telle sorte que Reeborg dépose un jeton à chaque
coin?

Comment comprendre ``if/else``
------------------------------

Nous avons vu comment les énoncés ``function`` et ``if`` pouvaient être
interprétés comme étant parfois équivalent à insérer un bloc de code.
Les combinaisons ``if/else`` peuvent être considérées de la même façon.
Ainsi

.. code:: jscode

    avance();
    if ( true ) {
        tourne_à_droite();
    } else {
        tourne_à_gauche();
    }
    avance();

est équivalent à

.. code:: jscode

    avance();
    tourne_à_droite();
    avance();

alors que

.. code:: jscode

    avance();
    if ( false ) {
        tourne_à_droite();
    } else {
        tourne_à_gauche();
    }
    avance();

est équivalent à

.. code:: jscode

    avance();
    tourne_à_gauche();
    avance();

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
