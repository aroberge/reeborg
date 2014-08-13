`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Le journal de Reeborg
=====================

Cliquez sur le bouton **Monde** au haut de l'écran pour cacher le monde
de Reeborg. Cliquez également sur le bouton **Journal** pour voir le
journal de Reeborg, là où notre robot favori écrit.

Exécutez le programme suivant

.. code:: jscode

    écrit(42);

Vous devriez voir que Reeborg écrit la réponse à la question ultime au
sujet de la Vie, de l'Univers et du Reste [du moins selon le livre *Le
guide du voyageur galactique*] dans son journal.

Écrire des textes
-----------------

Dans le jargon de la programmation, un *caractère* est n'importe quelle
lettre, chiffre ou symbole qui peut être imprimé, et une *chaîne de
caractères*, ou plus simplement une *chaîne*, est n'importe quelle
combinaison de caractères pouvant être imprimés. Par exemple, exécutez
les instructions suivantes:

.. code:: jscode

    écrit("Bonjour monde!");
    écrit('Bonjour encore.');

Notez que les guillemets **anglais** qui encadrent la *chaîne* doivent
être semblables, soient doubles, ", ou simples, ", doivent être les
mêmes; à noter que ce ne sont **pas** des guillemets français « ». Si
vous voulez inclure un guillemet dans une chaîne, vous pouvez soit
utiliser des guillemets d'un type différent pour encadrer la chaîne, ou
les précéder du *caractère d'échappement* ``\``.

.. code:: jscode

    écrit("Ajourd'hui.");
    écrit('Aujourd\'hui.');

On peut combiner les chaînes en utilisant le symbole d'addition ``+``

.. code:: jscode

    écrit("Au revoir! " + "Et merci pour tout.");

Vous pouvez également débuter une nouvelle ligne en utilisant la
*séquence d'échappement* ``\n``

.. code:: jscode

    écrit("Merci. \nEssayez encore");

Reeborg connaît les maths
-------------------------

Exécutez le programme suivant et observez le résultat dans le journal de
Reeborg.

.. code:: jscode

    écrit( 2 + 3 );  // addition
    écrit( 2 * 3 );  // multiplication
    écrit( 3 - 2 );  // soustraction
    écrit( 6 / 2 );  // division
    écrit( 1 + 3 * 2 ); // multiplication avant addition
    écrit( (1 + 3) * 2 );  // Les parenthèses indiquent l'ordre des opérations 

Utilisation des variables
-------------------------

Nous avons déjà vu le mot-clé ``var``. Utilisons-le à nouveau dans un
contexte mathématique.

.. code:: jscode

    var longueur, largeur, aire;
    longueur = 4;
    largeur = 6;
    aire = longueur * largeur;  // aire d'un rectangle
    écrit(aire);  // imprimera 24

Essayez!

Avis
----

Combiner des chaînes et des nombres peut donner des résultats
inattendus:

.. code:: jscode

    écrit("2" + 2);

**Important**: le *caractère* "2" n'est pas le même que le *chiffre* 2.

Finalement, notez que les espaces autour des opérateurs comme ``+``,
sont ignorés par Javascript; cependant, ils peuvent faciliter la lecture
(et la compréhension) pour les humains.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
