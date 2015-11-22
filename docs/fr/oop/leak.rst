Réparation de la fuite
======================

Comme vous le savez, Reeborg a une fuite d'huile.
C'est le temps de la réparer.
Retournons à Python comme langage de programmation, et explorons
ce qui peut bien causer cette fuite d'huile.
Pour ce faire, exécutez le programme que vous avez vu
précédemment.

.. code-block:: py3

    reeborg = RobotUsage()
    for attr in dir(reeborg.body):
        print(attr)

Vous devriez voir quelque chose qui ressemble à ceci, sans
les commenataires que j'ai rajoutés::

    _is_leaky          # "a une fuite"
    _prev_orientation  # prev == previous,
                       # signifiant précédent
    _prev_x
    _prev_y
    objects            # objets
    orientation
    x
    y

Donc, on voit une variable "privée" (indiquée comme telle par le
programmeur qui lui a donné un nom débutant par un caractère de soulignement)
appelée ``_is_leaky``.  Vérifions sa valeur:

.. code-block:: py3

    reeborg = RobotUsage()
    print(reeborg.body._is_leaky)

Et le résultat devrait être ``True``.  Ceci suggère que si
on lui attribuait plutôt la valeur ``False``, on éliminerait
peut-être la fuite.  Faisons donc un test rapide.

.. topic:: Vérifiez!

    Exécutez le code suivant::

        pas_de_surlignement()
        Monde("Vide")
        reeborg = RobotUsage()

        reeborg.body._is_leaky = False
        reeborg.avance()
        reeborg.body._is_leaky = True
        reeborg.avance()
        reeborg.body._is_leaky = False
        reeborg.avance()
        reeborg.body._is_leaky = True
        reeborg.avance()

    Si vous aviez déjà choisi le monde **Vide**, vous devrez possiblement
    exécuter le code à deux reprises pour voir l'effet correctement en s'assurant
    que le surlignement a été désactivé **avant** l'exécution du programme.

Ce petit test devrait avoir servi à confirmer notre hypothèse.
(**Rappel:** il est possible que le code du site ait changé depuis que
j'ai écrit ce tutoriel; vous devriez donc vérifier si ça fonctionne
toujours.)  Donc, tout ce que nous devons faire pour réparer la fuite est
de changer l'attribut ``_is_leaky`` à la valeur ``False`` immédiatement
après avoir créé un nouveau robot::

    reeborg = RobotUsage()
    reeborg.body._is_leaky = False

Un seul petit problème: ceci n'est pas très élégant car on débute toujours
avec un robot ayant une fuite, qu'il faut par la suite réparer.
Ce serait tellement mieux si on pouvait faire la réparation avant et qu'on
ne crée que des robots sans fuites.


Nous présentons ``__init__``
-----------------------------

.. note::

    Python utilise certaines méthodes spéciales (parfois désignées sous
    le nom de "magiques") dont le nom débute avec **deux** caractères
    de soulignement et se termine également avec **deux** caractères de soulignement.

Python a une méthode spéciale nommée ``__init__`` qui est exécutée lorsqu'une
instance est créée.  Quittons brièvement le monde des robots pour
explorer l'effet de cette méthode.

.. topic:: Allez-y!

    Exécutez le programme suivant::

        class MaClasse(object):
            def __init__(self):
                self.x = 1

        mon_objet = MaClasse()
        print(mon_objet.x)

Ceci devrait vous donner une idée sur la façon de réparer la fuite.
Je parie que vous pensez à quelque chose comme ce qui suit.

.. topic:: Réparons!

    Est-ce que le programme suivant répare la fuite?

    .. code-block:: py3

        class RobotRéparé(RobotUsage):
            def __init__(self):
                self.body._is_leaky = False

        r = RobotRéparé()
        r.avance()

Plus de détails au sujet de ``__init__``
----------------------------------------

Comme vous l'avez vu en exécutant le programme ci-dessus
(ce que vous avez fait, *n'est-ce pas?*), ça n'a pas
fonctionné du tout et, en fait, une erreur a même été notée.
Ceci indique qu'on a du oublier quelque chose au sujet de la méthode
``__init__`` que nous allons explorer davantage, encore une
fois en oubliant temporairement au sujet des robots.

.. topic:: Essayez-ceci!

    Exécutez le programme suivant une première fois::

        class MaClasse(object):
            def __init__(self, x):
                self.x = x

        mon_objet = MaClasse(1)
        print(mon_objet.x)

        # mon_autre_objet = MaClasse()
        # print(mon_autre_objet.x)

    Puis, changez les deux dernières lignes pour qu'elles ne soient
    plus des commentaires, mais des lignes de code indentées correctement,
    et exécutez le programme à nouveau.


Positional arguments
~~~~~~~~~~~~~~~~~~~~

What we have used in the above code is known as a *positional argument*.
To understand the name better, try the following example

.. topic:: Try this!

    .. code-block:: py3

        def my_function(x, y, z):
            print(x, y, z)
            print(z, x, y)

        my_function(1, 2, 3)

        class MyClass(object):
            def __init__(self, x, y):
                self.x = x
                self.y = y

        my_object = MyClass(4, 5)
        print(my_object.x)
        print(my_object.y)

Positional arguments are required.  If we want an optional argument,
we use a *named* argument, which is an argument that is given
an optional value.

.. important::

   Positional argument must be listed first, followed by named arguments.
   When calling a function or method, if the argument name is not given,
   its value is determined by the position at which it occurs.


.. topic:: Try this!

    Run the following code::

        def test(a, b, c=3, d=4):
            print(a, b, c, d)

        test(1, 2)
        test(1, 2, 5, 6)
        test(1, 2, d=7)
        test(1, 2, d=8, c=9)  # different order of named arguments

Derived classes
~~~~~~~~~~~~~~~

It is time to go back to classes.

.. topic:: Try this!

    Try to guess the result before you run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def print_me(self):
                print(self.x, self.y)

        class MyOtherClass(MyClass):
            pass

        class YetAnotherClass(MyClass):
            def __init__(self, x=1):
                self.x = x
                self.y = False

        a = MyClass()
        a.print_me()

        b = MyClass(2)
        b.print_me()

        c = MyOtherClass(3)
        c.print_me()

        d = YetAnotherClass()
        d.print_me()

This approach **suggests** that, all we need to do when we want to change
the initialisation of derived classes is to **recopy** all of the
content of the parent's ``__init__`` method and change what we
need to change.  However, remember **Rule #3**:

.. important::

    **Rule # 3**
        When writing computer programs, do not repeat yourself.
        I repeat: **do not repeat yourself!**

Python has a special function that can help us avoiding repetition;
it is called ``super`` and can be used as shown in the following
example that you must try.

.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def print_me(self):
                print(self.x, self.y)


        class YetAnotherClass(MyClass):
            def __init__(self, my_x=4):
                super().__init__(x=my_x)
                self.print_me()   # x and y from parent
                self.y = False

        d = YetAnotherClass()
        d.print_me()

In the above example, I used a variable ``my_x`` for the derived class; this is
not right but it was to help you understand the proper way of writing
the code as it has the weird assignement: ``x=x`` in the list of arguments.

.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def print_me(self):
                print(self.x, self.y)


        class YetAnotherClass(MyClass):
            def __init__(self, x=1):
                super().__init__(x=x)
                self.print_me()   # x and y from parent
                self.y = False

        d = YetAnotherClass()
        d.print_me()

We are now ready to go back to fix Reeborg's leak.  However,
before we do so, I should mention another special Python method:
``__str__``.

As you saw in the above code, we found it useful to write a special
method to print all the relevant information about our instances.
Python has a standardized way to do this using ``__str__``.
In this special method, programmers create a **string** of characters
that is used when printing information they deem to be useful
about a given instance of a class.


.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def __str__(self):
                return str(self.x) + " " + str(self.y)

        a = MyClass()
        print(a)

    Note that we made use of the special function ``str`` which converts
    its argument into a string of caracters.

Finally fixing the leak
-----------------------

We are finally ready to fix the oil leak.  We know that we
want to change the value of a single attribute (``_is_leaky``)
while keeping everything else the same.
This is how we can do it.

.. topic:: Try this!

    Fix the leak as follows in the world **Empty**::

        class RepairedRobot(UsedRobot):
            def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
                super().__init__(x=x, y=y, orientation=orientation, tokens=tokens)
                self.body._is_leaky = leaky

        fixed = RepairedRobot(3, 3)
        leaky = RepairedRobot(5, 5, leaky=True)

        fixed.move()
        leaky.move()


Note that, rather than simply fixing the leak once and for all, we chose to
add another named argument to give us the option to have a leaky robot.
This can be useful when writing programs: we activate the leak while
debugging the program, and turn it off when everything is working correctly.

