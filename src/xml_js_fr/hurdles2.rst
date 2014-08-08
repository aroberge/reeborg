`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Encore les haies!
=================

Examinez les mondes Haies 1 et Haies 2. Ignorez pour l'instant le but à
atteindre (la maison de Reeborg). Un programme qui permettrait à Reeborg
de terminer la course pourrait être constitué d'une alternance des deux
instructions suivantes:

-  ``avance();``
-  ``saute();``

en autant qu'on ait une définition appropriée pour ``saute()``. Si vous
pouviez inclure une condition (énoncé ``if``) à quelque part pour
vérifier que vous avez atteint le but, vous pourriez alors définir une
fonction que nous pourrions appeler ``avance_et_saut_jusqu_au_but()`` de
telle sorte qu'un programme unique suffirait pour les mondes Haies 1 et
Haies 2:

.. code:: jscode

    répète(avance_et_saute_jusqu_au_but, 42);

Écrivez un tel programme et assurez-vous qu'il permette à Reeborg de
terminer la course.

**Est-ce que ce programme pourrait permettre à Reeborg de terminer la
course Haies 4?**

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
