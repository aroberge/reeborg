Virage à droite
================

Sélectionnez le monde **Vide**, sans robots.  Puis, définissez
ce qui suit::

    def tourne_a_droite(nom_du_robot):
        for _ in range(3):
            nom_du_robot.tourne_a_gauche()

Remarquez que, contrairement à ce que l'on faisait auparavant,
on a la variable ``nom_du_robot`` que l'on utilise comme argument
de la fonction ``tourne_a_droite``.

Voici comment utiliser cette fonction::

    Reeborg = RobotUsage()
    Erdna = RobotUsage(4, 3)  # crée un robot à un endroit différent!

    Reeborg.avance()
    tourne_a_droite(Reeborg)
    Erdna.tourne_a_gauche()
    tourne_a_droite(Erdna)

.. topic:: Faites-le!

   Définissez ``tourne_a_droite`` et utilisez cette fonction dans un programme,
   comme nous l'avons fait ci-dessus.

Cette approche fonctionne... mais c'est bizarre d'avoir à utiliser
une *fonction* pour faire des virages à droite et une *méthode*
pour faire des virages à gauche.  Il doit y avoir une meilleure façon ...

Une autre classe
----------------

``RobotUsage`` est un exemple de ce qu'on appelle une **classe** d'objets.
Une classe est une collection d'objets qui partagent des méthodes (fonctions)
ainsi que des attributs.  Ci-dessous, je vais vous montrer comment créer
une copie conforme d'une classe existante; après, on verra comment créer
une classe qui ne sera pas identique à une classe déjà existante.


.. topic:: Faites ceci!

   Pour créer une nouvelle classe d'objets, on utilise le mot-clé
   ``class`` comme ceci::

        class RobotUsageClone(RobotUsage):
            pass

        # comme précédemment, on définit une fonction pour
        # faire des virages à droite. Notez que l'indentation
        # de "def" est au même niveau que celle de "class"

        def tourne_a_droite(nom_du_robot):
            for _ in range(3):
                nom_du_robot.tourne_a_gauche()

        Reeborg = RobotUsageClone()
        Erdna = RobotUsageClone(4, 3)

        Reeborg.avance()
        tourne_a_droite(Reeborg)
        Erdna.tourne_a_gauche()
        tourne_a_droite(Erdna)


   Cette nouvelle classe d'objets fonctionne exactement de la même
   façon que la classe original ``RobotUsage``.  À noter que ``pass``
   est un mot-clé Python qui signifie "ne fait rien".  On l'utilise
   lorsqu'on veut créer un bloc de code pour respecter la syntaxe
   Python (l'indentation du bloc en particulier), mais qu'on n'a pas
   besoin que ce bloc comporte des instructions particulières.

Lorsque vous aurez reproduit l'exemple ci-dessus, ce sera le temps
de créer une nouvelle classe qui fait plus que la classe originale.

Une nouvelle classe
-------------------

Ce que j'aimerais faire, c'est de concevoir une nouvelle classe qui
a une **méthode** appelée ``tourne_a_droite`` au lieu d'avoir à créer
une fonction.  Tout ce que j'ai à faire est d'insérer la définition
de la fonction comme un bloc de code appartenant à la nouvelle
classe (on indique ceci par l'indentation), au lieu d'une
fonction séparée.

.. code-block:: py3

    class RobotRéparé(RobotUsage):
        def tourne_a_droite(nom_du_robot):
            for _ in range(3):
                nom_du_robot.tourne_a_gauche()


Et voici comment on peut utiliser cette nouvelle classe::

    reeborg = RobotRéparé()
    erdna = RobotRéparé(4, 3)

    reeborg.tourne_a_gauche()   # comme auparavant
    reeborg.tourne_a_droite()   # nouvelle méthode!

    erdna.tourne_a_droite()     # Ceci fonctionne aussi!

.. topic:: À votre tour!

   Reproduisez le programme ci-dessus, et assurez-vous que le
   tout fonctionne correctement.


Explication plus détaillée
--------------------------

.. todo::

    L'explication suivante repose sur un texte non encore écrit au
    sujet de l'utilisation de ``return`` pour les fonctions.

Nous avons vu comment on définissait et utilisait une fonction::

    def ma_fonction():           # définir
        ...

    résultat = ma_fonction()     # invoquer

In l'invoquant ainsi, on associe à la variable ``résultat`` soit la
valeur désignée par l'utilisation du mot-clé ``return`` ou la
valeur ``None`` si ``return`` n'est pas utilisé.

La définition d'une classe d'objet et son invocation suivent le même
patron::

    classe MaClasse():            # définition
        ...

    instance = MaClasse()         # invocation

Par défaut, l'invocation d'une classe "retourne" automatiquement un
objet sans avoir à utiliser le mot-clé ``return``.

Si on veut qu'une classe "hérite" les méthodes et attributs d'une
autre classe, il suffit d'ajouter celle-ci comme argument de la
nouvelle classe::


    classe Enfant(Parent):
        ...

Lorsqu'on invoque une méthode d'une instance donnée, Python substitue
automatiquement le nom de l'instance comme premier argument de la
méthode::


    instance = MaClasse()

    instance.ma_méthode(argument_2, argument 3, ...)

    # Si ma_méthode était une fonction, on aurait plutôt écrit
    # ma_méthode(instance, argument_2, argument3, ...)


Conventions importantes
-----------------------

.. important::

  Les programmeurs Python suivent deux conventions importantes lors
  de la définition des classes et des méthodes.  L'idée de ces conventions
  est d'être capable automatiquement de reconnaître la nature de certains
  objets.

Par convention, les noms de classes débutent par une lettre majuscule.
Si le nom d'une classe est constitué de plusieurs mots, chaque mot
débute par une lettre majuscule.  Ainsi, la classe à laquelle appartient
Reeborg est ``RobotUsage``.  Si on avait un nom de variable, on utiliserait
plutôt des lettres minuscules et on séparerait les mots par des
caractères de soulignement: ``robot_usage`` comme on l'a vu avec
``tourne_a_gauche``.

Une deuxième convention est que le premier argument d'une méthode
est désigné par le mot ``self``  (qu'on peut traduire par "soi-même")
au lieu du nom ``nom_du_robot`` que j'avais utilisé auparavant.
Ainsi, pour respecter cette convention, j'aurais dû écrire plus tôt::

    class RobotRéparé(RobotUsage):
        def tourne_a_droite(self):
            for _ in range(3):
                self.tourne_a_gauche()

Si vous regardez de très près, vous pourrez peut-être constater que
le mot ``self`` n'est pas écrit en noir mais plutôt en vert comme
la fonction ``range``: ceci est fait automatiquement par le logiciel
qui convertit mon texte en une page web, ce logiciel reconnaissant le
mot ``self`` comme étant un mot utilisé par convention en Python.
