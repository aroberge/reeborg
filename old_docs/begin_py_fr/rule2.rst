Règle numéro 2
==============

J'ai déjà mentionné la première règle pour apprendre la programmation
informatique: vous devez écrire des programmes (et les tester) et non
simplement lire au sujet de la programmation. C'est maintenant le temps
de partager avec vous la deuxième règle, qui est possiblement le secret
le mieux gardé en informatique.

.. important::

    **Règle numéro 2**

        Écrivez vos programmes pour qu'il soit facile à lire et à comprendre
        par des **humains**.

C'est vrai, écrivez vos programmes informatiques pour que d'autres
personnes, tout comme vous, les trouvent facile à lire et à comprendre
par elles-mêmes. Il est vrai que les langages informatiques sont conçus
pour vous permettre de donner des instructions aux ordinateurs. Ces
langages sont beaucoup plus simples que les langues humaines et sont
également utilisés pour partager des idées entre programmeurs.

Commentaires
------------

Un des outils que vous pouvez utiliser pour écrire des programmes qui
peuvent être plus facilement compris par les humains sont les
*commentaires*.

Les commentaires sont des notes écrites par un programmeur qui sont
ignorées par l'ordinateur; leur seul but est d'être partagé avec
d'autres humains.

Lorsqu'on utilise Python, on peut écrire des commentaires de
deux façons:

-  En imbriquant un texte arbitraire entre deux triplets d'apostrophes
   ou de guillemets, c'est-à-dire ``""" ... """`` ou ``''' ... '''``.
-  En précédent une partie d'une ligne de texte par ``#``.

Pour illustrer l'utilisation de commentaire, je vais tout d'abord écrire
un programme sans utiliser de commentaires, puis le modifier pour
inclure des commentaires et le rendre plus facile à lire par les
humains. De plus, la même
erreur sera présente dans les deux versions. Vous devez déterminer dans
laquelle de ces deux versions il est plus facile de détecter l'erreur.

.. code:: py3

    avance()
    avance()
    tourne_a_gauche()
    depose()
    avance()
    avance()
    tourne_a_gauche()
    depose()
    avance()
    tourne_a_gauche()
    depose()
    avance()
    avance()
    tourne_a_gauche()
    depose()

Comparez donc la version ci-dessus avec une version identique (du point
de vue de Reeborg) à laquelle on a ajouté des commentaires pour les
humains; vous pourrez facilement identifier les commentaires car ils
sont automatiquement présentés d'une autre couleur à l'écran.

.. code:: py3

    ''' Ceci est un simple programme
    où Reeborg dessine un carré, déposant un jeton à
    chaque coin.'''

    avance()  # Chaque instruction est sur une seule ligne
    avance()
    tourne_a_gauche() # Reeborg sait seulement tourner à gauche
    depose()

    # On répète les instructions ci-dessus trois fois de plus
    # pour compléter le carré.
    avance()
    avance()
    tourne_a_gauche()
    depose()

    avance()
    tourne_à_gauche()
    depose()

    avance()
    avance()
    tourne_a_gauche()
    depose()


Les commentaires ajoutés au programme ci-dessus ne sont pas
particulièrement géniaux ... mais au moins l'un d'entre eux devrait vous
permettre de trouver l'erreur dans le programme. Vous penserez peut-être
que j'ai triché; cela dit, comment pouvez-vous connaître le but d'un
programme s'il n'est indiqué nulle part? L'addition de commentaires est
parfois essentielle pour comprendre le but d'un programme et devient
ainsi très utile pour détecter des erreurs.

Notez qu'en plus d'ajouter des commentaires, j'ai inséré quelques lignes
sans code pour séparer les "blocs logiques" et mieux voir le patron
suivi. Ceci permet également d'identifier l'erreur plus facilement.

Alors, quelle version est la plus facile à lire et à comprendre?...


.. admonition:: Pour les enseignants

    Si vous avez déjà expliqué l'utilisation d'arguments de fonctions,
    il serait probablement préférable de modifier l'exemple commenté ci-dessus,
    pour remplacer::

        depose()

    par::

        depose('jeton')

    sur la base du principe que ceci devient moins plus clair pour quelqu'un
    qui lit le programme.
