`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Avant les récoltes
==================

Sélectionnez le monde Récolte 4 qui représente l'état du jardin peu de
temps après les semences. Certaines graines de carottes ont bien germé,
d'autres ont germé trop rapprochées les unes des autres, alors que
certaines n'ont pas germées du tout. Aidez Reeborg à enlever les
carottes en excès et à semer à nouveau lorsque c'est requis de telle
sorte qu'il n'y ait qu'une seule carotte par endroit. Dans ce monde, les
carottes sont représentées par des jetons, ce qui suggère d'adopter le
vocabulaire suivant:

.. code:: jscode

    var carotte_ici = jeton_ici;
    var sème_carotte = dépose;
    var enlève_carotte = prend;

    function une_seule_carotte():
      ...

Faites le!

Prêt pour la récolte
--------------------

L'aménagement des semences s'est bien passé, et c'est le temps des
récoltes. Sélectionnez le monde Récolte 1 ou Récolte 2 et faites en
sorte que Reeborg ramasse tous les jetons qui représentent des plantes à
récolter.

On peut voir que le monde Récolte 1 a des rangs horizontaux (ou
verticaux) de la même longueur alors que le monde Récolte 2 peut être
perçu comme ayant des rangs diagonaux de la même longueur.

Une approche possible aux problèmes des récoltes est de définir trois
fonctions, ``récolte_un_rang`` et ``récolte_deux_rangs`` et
``avance_au_premier_rang``; les définitions exactes de ces fonctions
vont dépendre du monde sélectionné.

Une fois ces fonctions définies, la solution du problème devient
identique pour les deux mondes:

.. code:: jscode

    avance_au_premier_rang();
    répète(récolte_deux_rangs, 3);

Cela dit, vous pouvez choisir une approche différente de celle qui est
suggérée ci-dessus.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
