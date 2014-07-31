
.. topic:: Faites ceci!

    Avant de poursuivre votre lecture, écrivez un programme qui fait
    en sorte que Reeborg dessine un carré tel qu'illustré sur
    cette image: |image0|


.. |image0| image:: ../../src/images/square.png

.. hint::

    Si vous ne savez pas comment, sélectionnez le monde **Seul** et
    relisez la section `Apprentissage guidé par des tâches <home.html>`_.
    Votre programme utilisera deux instructions (fonctions) et devrait
    avoir 8 lignes.

Reeborg va en Espagne
=====================

-  *Algo que declarar Señor ... Reeborg?*
-  ``Yo no hablo español .... Je ne parle pas espagnol.``
-  *Est-ce que vous avez quelque chose à déclarer?*
-  ``Peut-être que oui ...``

Reeborg est connu partout dans le monde et voyage souvent. Ça pourrait
être utile de lui enseigner des instructions dans d'autres langues.
On peut faire ceci facilement avec Python.


.. note::

   Aux lignes 1 et 2, on définit de nouveaux noms (synonymes) de fonctions;
   remarquez l'absence de parentheses.
   Aux lignes 4 et 5 on utilise ces nouveaux noms de fonctions; les anciens
   noms sont toujours compris par Reeborg tel qu'illustré à la sixième ligne.

.. code-block:: python
    :linenos:

    saute = avance
    gauche = tourne_a_gauche

    saute()
    gauche()
    avance()

.. topic:: Essayez!

    Choisissez votre propres synonymes pour ``avance`` et ``tourne_a_gauche``
    et utilisez-les pour que Reeborg dessine un carré.  Si votre ordinateur
    a des hauts-parleurs, vous pouvez ajouter l'instruction ``son(True)``
    au début de votre programme pour une petite surprise. a

Si vous le désirez, vous pouvez définir votre propre langage pour donner
des instructions à Reeborg.

Valid names
-----------

Pour l'instant, n'utilisez que des noms qui débutent par une lettre et
qui ne contiennent que des lettres, des chiffres ou le caractère de
soulignement "\_"; un nom ne peut **pas** contenir d'espaces - et c'est
pour cette raison que plusieurs personnes, dont les créateurs du monde
de Reeborg, utilisent le caractère de soulignement pour créer des noms
qui ont l'apparence d'un bout de phrase, tel que ``tourne_a_gauche``.

Bien que les caractères avec des accents soient reconnus par Python
(version 3, que nous utilisons), en général les programmeurs évitent
de les utiliser dans des noms de variables.  Ainsi, nous écrivons
``tourne_a_gauche`` au lieu de ``tourne_à_gauche``.


Mais vous aviez mentionné l'Espagne?
------------------------------------

Pour utiliser des instructions en espagnol plutôt qu'en français,
comme [e.g. writing ``avanzar()`` au lieu de ``avance()``],
écrivez la toute première ligne au tout début de votre programme::

    from spanish import *

Par la suite, si vous voulez voir tous les noms d'instructions
en espagnol, vous écrivez::

    print(usage)

exécutez le programme et cliquez sur le bouton **Journal** pour voir le résultat.
Les explications sont données en anglais ... avec les noms équivalents en anglais.

Si vous voulez voir la version anglaise, faites plutôt::

    from english import *

Encore une fois, si vous faites::

    print(usage)

les explications seront données en anglais.  Si vous voulez voir des explications
en français, faites plutôt::

    from french import *
    print(usage)

Ce genre d'instruction [``from module import *``] est quelque chose qui n'est pas
recommandé généralement.  J'expliquerai en détails pourquoi dans un futur tutoriel.
Pour l'instant, notez que, à chaque fois que j'utilise cette instruction avec
un nouveau module, le résultat de ``print(usage)`` est différent.

