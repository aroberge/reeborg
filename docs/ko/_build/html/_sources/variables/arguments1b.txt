Argument par défaut
===================

Vous savez que, lorsqu'il n'y a qu'un seul type d'objets dans un monde
donné, il n'est pas nécessaire de spécifier le type d'objet pour les
fonctions ``prend()`` et ``depose()``.  Ceci est un exemple de
comportement par défaut d'une fonction.  Dans le cas de ces deux fonctions
spécifiques au Monde de Reeborg, le code requis pour avoir un tel
comportement par défaut dépend d'une façon assez compliquée de l'état
particulier du monde.  Pour les cas plus habituels, Python offre une
façon standard de spécifier un comportement par défaut.

Par exemple, supposons que nous voulions définir une fonction ``tourne()``
qui fera en sorte que Reeborg fasse un simple virage à gauche si aucun
argument n'est spécifié, mais peut faire plusieurs virages si on spécifie un
argument, comme par exemple ``tourne(3)``.  On peut définir une telle
fonction de la façon suivante::

    def tourne(nombre=1):
        for _ in range(nombre):
            tourne_a_gauche()

.. topic:: Vérifiez ceci!

    Écrivez un programme qui utilise une telle définition.  Vérifiez que
    l'invocation  ``tourne()`` donne le même résultat que
    ``tourne(1)`` ainsi que ``tourne(n=1)``.

Pour les plus avancés
---------------------

Il y a deux types d'arguments pour les fonctions:
les arguments **positionnels** qui n'ont pas de valeur attribuée par défaut,
et les arguments par **mots-clés** qui ont une valeur attribuée par défaut.

Les arguments positionnels doivent apparaître en premier et sont requis
lors de l'invocation d'une fonction.   Les arguments par mots-clés
ne sont pas nécessairement requis lors de l'invocation d'une fonction.

Une fois les arguments positionnels déterminés dans une invocation de fonction,
les autres arguments, s'ils sont fournis simplement par une valeur sans
spécifier de mot-clé, seront également déterminé sur une base positionnelle.
Si on spécifie les mots-clés, on peut alors les invoquer dans n'importe quel
ordre.

Voici quelques exemples::

    def ma_fonction(pos_1, pos_2, mot_1='a', mot_2=3, mot_3='bonjour'):
       # bloc de code ici

    # invocations:

    ma_fonction(2)   # erreur de syntaxe: 2 arguments positionnels requis

    ma_fonction(2, 3)
    # pos_1 aura la valeur 2; pos_2 aura la valeur 3;
    # les arguments mots-clés auront leur valeur par défaut

    ma_fonction(2, 3, 4)
    # pos_1 aura la valeur 2; pos_2 aura la valeur 3;
    # mot_1 aura la valeur 4;
    # les autres arguments mots-clés auront leur valeur par défaut

    ma_fonction(2, 3, mot_2=4)
    # pos_1 aura la valeur 2; pos_2 aura la valeur 3;
    # mot_2 aura la valeur 4;
    # les autres arguments mots-clés auront leur valeur par défaut


    ma_fonction(2, 3, mot_2=4, mot_1=5)
    # pos_1 aura la valeur 2; pos_2 aura la valeur 3;
    # mot_1 aura la valeur 5; mot_2 aura la valeur 4;
    # mot_3 aura sa valeur par défaut ('bonjour')

Pour les programmeurs très avancés
----------------------------------

Il est possible de spécifier la présence d'arguments mots-clés
sans spécifier de valeur par défaut en utilisant le symbole ``*``
comme argument précédent les arguments mots-clés **dans la définition
de la fonction**.

.. code-block:: py3

    def ma_fonction(*, a):
        print(a)

    ma_fonction(a=3)     # va imprimer 3
    ma_fonction(3)       # va générer une erreur