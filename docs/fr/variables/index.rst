Les variables
==============

Au tout début de ce tutoriel, nous avions écrit ce qui suit:

.. epigraph::

    ``avance()`` est un exemple d'une **fonction**.
    Une fonction a un nom; dans ce cas-ci, c'est ``avance``.
    Pour être valide, les noms doivent débuter soit par une lettre ou par le
    caractère de soulignement "_",
    et peuvent contenir des lettres, des chiffres ou le caractère
    de soulignement.
    Le nom de le fonction peut être suivi par des parenthèses ``()``.
    La présence des parenthèses indique à Reeborg (Python) que la fonction doit être *exécutée*.

Les fonctions sont un exemple de ce qu'on appelle des **objets** en programmation.
On peut associer un, ou plusieurs noms à un objet.  On appelle **variable**
le nom qu'on associe à un objet.  En programmation Python, on utilise
le signe d'égalité ``=`` pour associer un nom (variable)
à un objet de la façon suivante::

    variable = objet

Par exemple, si vous trouvez que ``tourne_a_gauche()`` est trop long
à écrire, vous pouvez définir une nouvelle variable comme suit::

    gauche = tourne_a_gauche    # pas de parenthèses !
    gauche()                    # on l'utilise

.. topic:: À votre tour!

    Utilisez un nouveau nom (variable) pour au moins une fonction dans
    un programme et utilisez le nouveau nom à la place de l'ancien.
    **Est-ce que vous pouvez utilisez deux noms différents pour un
    même objet dans un programme?**

.. toctree::
   :maxdepth: 2
   :numbered:

   variables
   diary
   return
   newspaper3
   listes
   string_index
   for
   arguments1a
   arguments1b
   slice
   increment
   while_num
   harvest3
   better_repeat
