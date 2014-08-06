`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Reeborg va en Espagne
=====================

-  *Algo que declarar Señor ... Reeborg?*
-  ``Yo no hablo español .... Je ne parle pas espagnol.``
-  *Est-ce que vous avez quelque chose à déclarer?*
-  ``Peut-être que oui ...``

Reeborg est connu partout dans le monde et voyage souvent. Ça pourrait
être utile de lui enseigner des instructions dans d'autres langues. En
Javascript, on peut faire ceci à l'aide du mot-clé ``var``. J'aime
penser à ``var`` comme signifiant qu'on crée une ``var``\ iation de la
langue utilisée. Cela dit, dans le monde informatique, on dit que ceci
correspond à **déclarer** une ``var``\ iable.

On peut déclarer une variable de deux façons.

.. code:: jscode

    var avanzar;      // déclarer un nouveau mot
    avanzar = avance;   // définir l'équivalence
    var girar_a_la_izquierda = tourne_à_gauche;  // deux étapes à la fois

    // Notez l'absence de parenthèses ci-dessus.

    // On peut utiliser les nouvelles fonctions
    // avec les vieilles

    avanzar();
    girar_a_la_izquierda();
    avance();    //  fonctionne toujours
    }

Essayez par vous-mêmes!
-----------------------

Si vous le désirez, vous pouvez définir votre propre langage pour donner
des instructions à Reeborg ( et le sauvegarder dans la bibliothèque?).

Pour l'instant, n'utilisez que des noms qui débutent par une lettre et
qui ne contiennent que des lettres, des chiffres ou le caractère de
soulignement "\_"; un nom ne peut **pas** contenir d'espaces - et c'est
pour cette raison que plusieurs personnes, dont les créateurs du monde
de Reeborg, utilisent le caractère de soulignement pour créer des noms
qui ont l'apparence d'un bout de phrase, tel que ``tourne_à_gauche``.

Pour les utilisateurs plus avancés
----------------------------------

Si vous avez appris à programmer en Javascript ailleurs, vous avez vu
que le mot-clé ``var`` n'est habituellement pas requis pour déclarer une
variable. Le monde de Reeborg utilise ce qui est appelé le mode
**strict** de Javascript qui a l'avantage d'exiger de l'utilisateur une
façon d'écrire les programmes les rendant plus fiables. Il existe une
façon de désactiver le mode strict dans le monde de Reeborg, comme nous
le verrons plus tard.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
