Argument de méthode
---------------------

Nous avons vu comment spécifier des arguments pour une fonction.
Un exemple que nous avions présenté était celui de la fonction suivante::

    def tourne(nombre=1):
        for _ in range(nombre):
            tourne_a_gauche()

Nous pouvons spécifier des arguments de la même façon pour des
**méthodes**; il suffit de se rappeler que le premier argument doit
être celui qui réfère à l'objet, et qui est nommé ``self`` par convention.

.. code-block:: py3

    class RobotTournant(RobotUsage):

        def tourne(self, nombre=1):
            for _ in range(nombre):
                self.tourne_a_gauche()

    reeborg = RobotTournant()
    reeborg.tourne(2)

.. topic:: À votre tour!

    Définissez un robot avec une méthode supplémentaire prenant un ou
    plusieurs arguments et utilisez ce robot pour résoudre une tâche.
