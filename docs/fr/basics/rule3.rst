Règle numéro 3
==============

.. index:: Règle numéro 3

Après avoir aidé Reeborg à accomplir ses tâches, vous devez être prêt
pour apprendre et comprendre la troisième règle de programmation:

.. important::

  **Règle numéro 3**
      Lorsque vous écrivez des programmes informatiques, ne vous répétez
      pas.
      Je répète: `ne vous répétez
      pas! <http://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas>`__

Être gauche trois fois peut nous rendre (a)droit
------------------------------------------------

Puisque vous avez écrit plusieurs programmes, vous devez avoir réalisé
que lorsqu'on demande à Reeborg de tourner trois fois vers la gauche
ceci revient à la même chose que si on lui demandait de tourner une
seule fois à droite. Mais c'est fastidieux d'écrire trois fois
``tourne_a_gauche()`` alors qu'un simple ``tourne_a_droite()``
suffirait si Reeborg n'était pas défectueux. C'est le temps de remédier
à ceci.



Définir des fonctions
---------------------

.. index:: ! def

Ce que nous avons appelé *instructions* jusqu'ici étaient en fait des
**fonctions** python. Donc ``tourne_a_gauche()`` est une fonction,
tout comme ``avance()``.
Pour définir des fonctions en Python, on procède de la façon
suivante::

    def nom_bien_choisi():
        # des lignes de code
        # indentées au même niveau

.. note::

   Lorsqu'on défini une fonction, on fait suivre son nom de
   parenthèses ``()``; dans ce cas-ci cependant, la présence
   de parenthèses n'indique **pas** qu'on exécute la fonction.



``def`` est notre premier **mot-clé** Python; les mot-clés sont
des noms réservés dans un langage de programmation et qui possède un
sens bien particulier à ce langage. Notez que le mot-clé ``function`` a
une couleur différente du reste du texte dans la définition de la
fonction ``nom_bien_choisi`` ci-dessus; tous les mot-clés Python
seront de la même couleur lorsqu'ils apparaissent dans un programme
informatique, ou une partie de programme informatique sur ce site. Notez
également les deux points ``:`` qui précèdent ce qu'on appelle un *bloc
de code* et constitue le *corps* de la fonction. Lorsqu'on programme
en Python, on doit *indenter* de tels blocs de code ce qui, pour les humains,
les rend plus facile à identifier.

Nous sommes prêts à définir notre toute première fonction Python::

    def tourne_a_droite ():
        tourne_a_gauche()
        tourne_a_gauche()
        tourne_a_gauche()

C'est tout! Plus besoin d'écrire ``tourne_a_gauche()`` trois fois de
suite à chaque fois que vous voulez que Reeborg tourne à droite!

.. topic:: À votre tour!

    Définissez-vous même la fonction ``tourne_a_droite`` dans un
    programme et utilisez-la. Si vous êtes à cours d'inspiration quant au
    programme à écrire pour la tester, faites-en sorte que Reeborg suive un
    parcours en forme de carré, en alternant ``tourne_a_droite()`` et
    ``avance()`` à quatre reprises.

Comment penser à ``def``
-------------------------------

.. note::

   Veuillez noter que ceci ne tient pas compte de la "portée" des variables qui
   est quelque chose que nous verrons plus tard.

Vous venez tout juste d'apprendre comment définir des fonctions en
Python. Au cas où ce ne serait pas très clair pour vous, voici une façon
de comprendre les fonctions qui pourra possiblement vous aider à comprendre
d'autres constructions de Python comportant des blocs de code.

Supposons que vous ayez le programme suivant:

.. code-block:: python
   :emphasize-lines: 7

    def tourne_a_droite():  # le début du bloc de code suit
        tourne_a_gauche()
        tourne_a_gauche()
        tourne_a_gauche()   # fin du bloc de code

    avance()
    tourne_a_droite()
    avance()

Ceci est équivalent à ce qui suit:

.. code-block:: python
   :emphasize-lines: 8, 9, 10

    def tourne_a_droite():
        tourne_a_gauche()
        tourne_a_gauche()
        tourne_a_gauche()

    avance()
    # début du bloc de code de tourne_a_droite()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()
    # fin du bloc de code
    avance()

En d'autres mots, ``def`` définit un nom que l'on peut utiliser
comme synonyme pour représenter un bloc de code; à chaque fois que l'on
voit le synonyme être *invoqué* [c'est-à-dire que le nom apparaît suivi
de parenthèses ``()``], on peut penser à ceci comme étant équivalent à
insérer à la place du synonyme le bloc de code constituant le corps de
la fonction tel quel à cet endroit.


.. topic:: À votre tour!

   Pouvez-vous simplifier votre programme de livraison de journaux et utiliser
   la fonction ``tourne_a_droite()`` qui est plus facile à lire et à comprendre que
   trois instructions ``tourne_a_gauche()`` de suite?
   Lorsque vous aurez fait ceci, essayer de trouver d'autres façons de simplifier
   votre programme en définissant d'autres fonctions.
