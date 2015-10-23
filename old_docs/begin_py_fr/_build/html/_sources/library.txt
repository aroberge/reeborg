La bibliothèque
===============

Lorsque des programmeurs utilisent la même fonction dans plusieurs
programmes, plutôt que de la redéfinir dans chaque programme ils la
mettent dans un programme spécial qui s'appelle une **bibliothèque**
(*library* en anglais) et ils ont une façon spéciale d'assurer que tous
les programmes aient accès aux fonctions qui se trouve dans la
bibliothèque. À noter qu'on retrouve généralement plusieurs
bibliothèques et qu'un programme donnée peut utiliser une ou plusieurs
de ces bibliothèques.

Vous allez utiliser la fonction ``tourne_a_droite()`` **souvent!**
Plutôt que de la récrire à chaque fois (souvenez-vous de la règle numéro
3), vous allez plutôt la récrire **une fois** de plus mais, cette
fois-ci, vous allez cliquer sur l'onglet **biblio** et l'écrire à
cet endroit. Vous devriez également y écrire ``demi_tour()``.

.. |biblio| image:: ../../src/images/biblio.png

|biblio|


Lorsque vous voudrez utiliser les fonctions définies dans votre bibliothèque,
il vous suffira d'écrire ``from biblio import`` (suivi du nom des fonctions que
vous avez définies, séparés par des virgules) comme toute première ligne
de votre programme dans l'éditeur.


.. topic:: À votre tour!

  Après avoir défini les fonctions ``tourne_a_droite()`` et ``demi_tour()``
  dans votre bibliothèque, écrivez un court programme dans l'éditeur "Code Python"
  qui utilise ces fonctions.
  Assurez-vous d'utiliser ``from biblio import tourne_a_droite, demi_tour``
  dans votre programme.  Par exemple, vous pourriez essayer le programme
  suivant::

       from biblio import tourne_a_droite, demi_tour
       avance()
       demi_tour()
       avance()
       tourne_a_droite()
       avance()
       demi_tour()
       avance()
       tourne_a_gauche()  # de retour à la position de départ

À l'avenir, à toutes les fois que vous définissez une fonctions et que
vous l'utilisez dans plus d'un programme, c'est probablement une bonne
idée de l'ajouter à votre bibliothèque pour vous éviter des répétitions.

Reeborg peut comprendre l'anglais
---------------------------------

Il existe une bibliothèque spéciale dont l'utilisation permet à Reeborg
de comprendre l'anglais.  Par exemple, au lieu d'``avance`` et de
``tourne_a_gauche``, l'utilisation de la bibliothèque
``reeborg_en`` peut faire en sorte que les équivalents anglais
``move`` et ``turn_left`` soit utilisé comme suit::

    from reeborg_en import move, turn_left

    move()
    turn_left()

.. topic:: À votre tour!

    Écrivez un court programme qui utilise les fonctions de la bibliothèque
    anglaise.


.. admonition:: Pour les enseignants

    Lorsqu'on importe la bibliothèque ``reeborg_en``, l'aide disponible
    (accessible via "Menu additionel" -> "Aide") est mis à jour pour
    inclure toutes les instructions anglaises possiblement disponible.
    La seule restriction est que les arguments de fonctions,
    comme ``"jeton"`` dans ``prend("jeton")`` doivent toujours être
    écrits en français, même si on utilise la version anglaise
    ``take("jeton")``.    Pour utiliser une version totalement en anglais,
    on doit aller sur le site
    `Reeborg's World <http://reeborg.ca/world.html>`_

    Si vous voulez créer une autre version, par exemple une version en espagnol,
    svp contactez-moi.


