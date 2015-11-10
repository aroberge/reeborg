Apprentissage guidé par des tâches
==================================

.. figure:: ../../../src/images/select_but.png
   :align: left

Dans le but de vous aider à apprendre à programmer en Python, je
vais vous donner une série de tâches que Reeborg doit accomplir. Reeborg
lui-même vous laissera savoir si les tâches en question ont été
accomplies.

Choisissez le monde **But 1**. Le carré en bas à gauche est
la maison de Reeborg.
Le monde de Reeborg est un simple échiquier.
Dans **But 1**, Reeborg part du
troisième carré sur la rangée du bas. Ce carré a les coordonnées
cartésiennes ``x=3`` et ``y=1``.

.. topic:: Essayez ceci!

    Avec le monde **But 1** sélectionnez, écrivez un programme avec
    une seule instruction ``avance()``, exécutez-le et portez attention
    au message de Reeborg.  Puis, modifiez ce programme pour que Reeborg
    puisse aller à sa maison.


.. topic:: Deux autres petits essais!

    Sélectionez **But 2**.  Notez que Reeborg est à un endroit différent et
    qu'il vous fait face.   Exécutez exactement le même programme et observez
    le résultat.

    Ensuite, sélectionnez **But 3**. Qu'arrive-t-il si vous exécutez votre programme?

.. index:: tourne_a_gauche()

Tourner à gauche
----------------

Le tout dernier exemple que vous avez essayé, si vous avez suivi
les instructions, ne fonctionnait pas puisque Reeborg n'avait pas
terminé dans sa maison.
Ceci peut être réalisé en ajoutant les deux instructions suivantes::

    tourne_a_gauche()
    avance()

.. topic:: Essayez ceci!

    Assurez-vous que Reeborg puisse compléter sa tâche dans le monde **But 3**.

.. topic:: Essayez une autre chose!

    Qu'arrive-t-il si, au lieu de ``tourne_a_gauche()``, vous ajoutez plutôt une
    autre instruction ``avance()``?

.. important::

    J'ai choisi de définir la fonction ``tourne_a_gauche()`` sans
    accent grave sur le "a"  (donc au lieu de ``tourne_à_gauche()``).
    Plusieurs langage de programmation (dont les premières versions du
    langage Python) ne permettent pas d'écrire des noms de fonctions
    avec des lettres comportant des accents.  Donc, les programmeurs
    se sont habitués à seulement utiliser des lettres sans accents,
    ce qui leur permettait  en plus de collaborer
    avec des programmeurs d'autres pays.
    Par exemple, imaginez que vous collaborez avec un programmeur
    polonais qui utiliserait le nom de fonction ``ćęń``: il
    ne serait pas facile pour vous d'écrire un programme utilisant
    une telle fonction parce que votre clavier n'a pas les accents
    requis.

    Vous verrez également plus tard que j'utilise le nom
    ``depose`` au lieu de ``dépose`` pour cette même raison.

Un autre point de vue
---------------------

.. |image0| image:: ../../../src/images/robot_e.png
.. |image1| image:: ../../../src/images/rover_e.png

Vous avez probablement remarqué que le robot Reeborg est vu de son
côté, comme sur cette image |image0|, alors que son monde est vu d'au-dessus ....
ce qui peut être mélangeant lorsque vous demandez à Reeborg de tourner à
gauche.  Vous pouvez changer les images de Reeborg en cliquant sur l'image
appropriée au-dessus de son monde, du côté droit.
Par exemple, lorsque Reeborg fait face à l'est,
comme dans l'image ci-dessus vue de côté, en utilisant une autre série
d'images, Reeborg peut apparaître de la façon suivante, comme s'il était
vu d'au-dessus:

|image1|
