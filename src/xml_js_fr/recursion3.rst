`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Encore de la récursivité
========================

Le dernier programme que nous avons vu était le suivant:

.. code:: jscode

    function va_au_but(){
        avance();
        if (!au_but()) {
            va_au_but();
        }
        tourne_à_gauche();
    }

    // définition complétée; on y va!
    va_au_but();

Vous avez fort probablement compris comment il fonctionne. Néanmoins,
analysons-le en supposant que Reeborg est dans le monde Maison 1. Comme
toujours, nous commençons avec la première invocation

.. code:: jscode

    va_au_but();

que nous remplaçons par le corps de la fonction telle que définie

.. code:: jscode

    avance();
    if (!au_but()) {
        va_au_but();
    }
    tourne_à_gauche();

Après l'instruction ``avance()``, Reeborg n'a pas atteint son but et le
bloc ``if`` est exécuté

.. code:: jscode

    avance();
        va_au_but();
    tourne_à_gauche();

Une fois de plus, on remplace ``va_au_but();`` par sa définition

.. code:: jscode

    avance();
        avance();
        if (!au_but()) {
            va_au_but();
        }
        tourne_à_gauche();
    tourne_à_gauche();

Après la deuxième invocation de l'instruction ``avance()``, Reeborg a
atteint son but et le bloc ``if`` n'est **pas** exécuté.

.. code:: jscode

    avance();
        avance();
        tourne_à_gauche();
    tourne_à_gauche();

Donc, après avoir atteint son but, Reeborg tourne deux fois à gauche
(une petite danse pour célébrer peut-être?) avant de terminer le
programme.

Un autre test
-------------

Sans changer de monde, pouvez-vous prédire l'orientation finale de
Reeborg s'il exécute le programme suivant?

.. code:: jscode

    function va_au_but() {
        avance();
        if (!au_but()) {
            va_au_but();
            tourne_à_gauche();
        }
        tourne_à_gauche();
    }

    // définition complétée; on y va!
    va_au_but();

Essayez de prédire par vous-mêmes **avant** de demander à Reeborg
d'exécuter ce programme.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
