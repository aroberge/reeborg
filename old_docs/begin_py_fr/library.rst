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
fois-ci, vous allez cliquer sur l'onglet **Biblio.** et l'écrire à
cet endroit. Vous devriez également y écrire ``demi_tour()``.

Lorsque vous voudrez utiliser les fonctions définies dans votre bibliothèque,
il vous suffira d'écrire ``from biblio import`` (suivi du nom des fonctions que
vous avez définies, séparés par des virgules) comme toute première ligne
de votre programme dans l'éditeur.


.. topic:: À votre tour!

  Après avoir défini les fonctions ``tourne_a_droite()`` et ``demi_tour()``
  dans votre bibliothèque, écrivez un court programme dans l'éditeur "Code Python"
  qui utilise ces fonctions.  Assurez-vous d'utiliser ``from biblio import tourne_a_droite, demi_tour``
  dans votre programme.


.. hint::

   Si vous avez défini les fonctions requises dans votre bibliothèque, un
   exemple d'un tel programme est le suivant::

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



Exercice de lecture
-------------------

Vous rappelez-vous de ce qui suit?

.. important::

    **Règle numéro 2**

        Écrivez vos programmes pour qu'il soit facile à lire et à comprendre
        par des **humains**.

Pouvez-vous déterminez ce que fait le programme suivant, simplement
en le lisant et sans l'exécuter?

.. code-block:: py3

    def a():
        tourne_a_gauche()
        tourne_a_gauche()

    def b():
        tourne_a_gauche()
        a()

    def c():
        avance()
        avance()

    def d():
        c()
        b()

    def e():
        d()
        d()
        d()
        d()

    tourne_a_gauche()
    e()
    b()

Pas vraiment facile, n'est-ce pas?

.. topic:: Vérifiez!

    Lorsque vous serez convaincu de savoir ce que fait le programme ci-dessus,
    vérifiez votre compréhension en l'exécutant.


Cet exercice devrait vous aider à mieux comprendre pourquoi il est utile
d'écrire des programmes en utilisant des fonctions avec des noms
bien choisis.

