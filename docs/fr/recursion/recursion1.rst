Récursivité: un exemple simple
==============================

Le plus simple exemple qu'on peut donner est celui d'une fonction qui
s'invoque elle-même basé sur une certaine condition.

.. code:: py3

    def récursive():
        ...
        if tâche_pas_terminée():
            récursive()   # la même fonction est invoquée ...

.. topic:: Exemple concret

    Sélectionnez **Maison 1** et exécutez le programme suivant::

        def va_au_but():
            if not au_but():
                avance()
                va_au_but()


        # définition complétée; on y va!
        va_au_but()

Lorsque vous aurez exécuté le programme ci-dessus et compris comment il
fonctionne, passez à la leçon suivante où nous verrons un exemple un peu
plus compliqué.
