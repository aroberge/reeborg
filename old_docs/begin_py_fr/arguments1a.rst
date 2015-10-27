Argument de fonction
====================

Nous avons vu que, lorsqu'il y a plus d'une sorte d'objets dans
le monde de Reeborg, il faut parfois spécifier lequel on veut
prendre ou déposer en utilisant un argument de fonction, comme par exemple::

    prend("jeton")
    depose("étoile")

Définir une fonction qui requiert un argument est une chose très simple
à faire: il suffit d'ajouter l'argument entre les parenthèses de la
fonction.   Par exemple, supposons que nous voulions définir une fonction
qui fait en sorte que Reeborg tourne un certain nombre de fois vers
sa gauche en spécifiant un nombre.  Par exemple, ``tourne(1)`` correspondrait
à une simple instruction ``tourne_a_gauche()``, alors que ``tourne(3)``
correspondrait à trois virages à gauche, et donc équivaut à un virage à droite.
Voici comment on peut faire ceci::

    def tourne(nombre):
        for _ in range(nombre):
            tourne_a_gauche()

.. topic:: À votre tour!

    Définissez une fonction ``tourne`` et vérifiez que le tout fonctionne
    correctement!

Plusieurs arguments
-------------------

Vous vous souvenez sûrement du fait que la fonction ``print`` accepte
plus d'un argument.  Si vous voulez définir une fonction qui accepte
plus d'un argument, il suffit d'inclure les arguments désirés, séparés
par des virgules, dans la définition de la fonction::

   def ma_function(argument_1, argument_2, ...):
      # bloc de code

Par exemple, vous savez que dans le Monde de Reeborg, on peut répéter
une certaine fonction un certain nombre de fois de la façon suivante::

    for _ in range(3):
        tourne_a_gauche()

    # ou

    for _ in range(4):
        avance()

Supposons que nous voulions définir une fonction équivalente à ceci,
c'est-à-dire qui fait en sorte qu'une  autre fonction (premier argument)
soit répétée un certain nombre de fois (deuxième argument)::

    répète(tourne_a_gauche, 3)

On peut faire ceci de la façon suivante::

    def répète(fonction, nombre):
        for _ in range(nombre):
            fonction()             # fonction invoquée par ()

.. topic:: À votre tour!

    Définissez une fonction ``répète`` et utilisez-la dans un programme.
