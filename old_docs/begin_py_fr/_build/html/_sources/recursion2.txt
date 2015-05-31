Récursivité plus compliquée
===========================

Avant d'aborder un exemple un peu plus compliqué, revoyons l'exemple
précédent et écrivons-le à nouveau.

.. code:: py3

    def va_au_but():
        avance()
        if not au_but():
            va_au_but()

    # définition complétée; on y va!
    va_au_but()

Si vous vous rappelez, j'ai expliqué que lorsqu'on invoque une fonction,
ceci est équivalent à insérer sur place le corps de la fonction. Donc,
l'invocation::

    va_au_but()

est équivalente à::

    avance()
    if not au_but():
        va_au_but()

Supposons que la première fois qu'on exécute ces instructions,
``au_but()`` soit faux (``False``) et donc ``not au_but()`` soit vrai
(``True``) ... comme c'est le cas pour le monde **But 1**. Dans ce cas,
l'invocation ``va_au_but()`` est exécutée une deuxième fois et le code
ci-dessus est donc équivalent à::

    avance()
    va_au_but()

On peut à nouveau remplacer l'invocation ``va_au_but()`` par sa
définition::

    avance()
    avance()
    if not au_but():
        va_au_but()

et on pourrait, en théorie, continuer à faire éternellement des
remplacements de la fonction par sa définition **si la condition restait
toujours la même**.

Heureusement, ce n'est pas le cas pour le monde **But 1**. Dans ce cas,
après la deuxième invocation d'``avance()``, nous sommes ``au_but()`` et
``va_au_but()`` n'est pas invoqué une troisième fois. Le résultat est
donc équivalent à::

    avance()
    avance()

Assurez-vous de bien comprendre l'explication ci-dessus avant d'aller
plus loin.

Petit changement...
-------------------

Considérez le programme suivant::

    def va_au_but():
        avance()
        if not au_but():
            va_au_but()
        tourne_a_gauche()

    # définition complétée; on y va!
    va_au_but()

.. topic:: Réfléchissez!

    Essayez de prédire ce que Reeborg fera avant d'exécuter le programme.
    Une explication vous sera fournie à la prochaine leçon.
