Encore de la récursivité
========================

Le dernier programme que nous avons vu était le suivant::

    def va_au_but():
        if not au_but():
            avance()
            va_au_but()
        tourne_a_gauche()

    # définition complétée; on y va!
    va_au_but()    # invoqué une première fois

Vous avez fort probablement compris comment il fonctionne. Néanmoins,
analysons-le en supposant que Reeborg est dans le monde **But 1**. Comme
toujours, nous commençons avec la première invocation::

    va_au_but()

que nous remplaçons par le corps de la fonction telle que définie::

    if not au_but():
        avance()
        va_au_but()   # deuxième invocation

    tourne_a_gauche()

Après l'instruction ``avance()``, Reeborg n'a pas atteint son but et le
bloc ``if`` est exécuté::

    avance()
    va_au_but()       # deuxième invocation
    tourne_a_gauche()

Une fois de plus, on remplace ``va_au_but()`` par sa définition::

    avance()
    if not au_but():
        avance()
        va_au_but()   # troisième invocation

    tourne_a_gauche()
    tourne_a_gauche()

Après la deuxième invocation de l'instruction ``avance()``, Reeborg a
atteint son but et le bloc ``if`` n'est **pas** exécuté::

    avance()
    avance()
    if not au_but():
         avance()       # ne sera pas exécuté
         va_au_but()    # ne sera pas exécuté
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()

.. note::

   ``va_au_but`` est invoqué trois fois ... et Reeborg tourne trois fois à gauche.
   Peut-être que Reeborg peut utiliser cette tactique pour compter ... rappelez-vous de ceci!

Donc, après avoir atteint son but, Reeborg tourne trois fois à gauche
(une petite danse pour célébrer peut-être?) avant de terminer le
programme.

.. topic:: À votre tour!

   En exécutant le programme, vérifiez que la description que nous en avons donnée est correcte.


Un autre test
-------------

Sans changer de monde, pouvez-vous prédire l'orientation finale de
Reeborg s'il exécute le programme suivant?

.. code:: py3

    def va_au_but():
        if not au_but():
            avance()
            va_au_but()
            tourne_a_gauche()
        tourne_a_gauche()

    # définition complétée; on y va!
    va_au_but()

.. topic:: À votre tour!

    Essayez de prédire par vous-mêmes **avant** de demander à Reeborg
    d'exécuter ce programme.  Qu'arriverait-il si Reeborg se trouvait
    déjà à son but avant le début de l'exécution du programme?

