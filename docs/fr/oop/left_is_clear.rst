Rien à gauche?
====================

Comme vous le savez, Reeborg peut voir s'il y a un obstacle
qui bloque son chemin avec ``rien_devant()``; il peut également
déterminer s'il y a un obstacle à sa droite avec ``rien_a_droite()``.
Malheureusement, il ne peut pas détecter des obstacles à sa gauche.
Vous allez corriger ceci.


Exploration du code
-------------------

.. important::

    Assurez-vous de sélectionner Javascript comme langue de programmation.

Explorons le code en exécutant ce qui suit::

    voir_source(rien_devant)

Le résultat que je vois est le suivant:

.. code-block:: javascript

    function () {
      return RUR.control.front_is_clear(RUR.current_world.robots[0]);
    }

.. note::

    On peut traduire ``front_is_clear`` par ``rien_devant``, et
    ``right_is_clear`` par ``rien_a_droite``.


avec un résultat semblable pour ``voir_source(rien_a_droite)``.  Poursuivons
notre exploration en exécutant ce qui suit::

    voir_source(RUR.control.front_is_clear)

Le résultat que j'obtiens, et qui est très différent de celui que
j'avais obtenu lorsque je préparais la première version de ce tutoriel,
est le suivant:

.. code-block:: javascript

    function (robot){
        var tile, tiles, tilename;
        if( RUR.control.wall_in_front(robot)) {
            return false;
        }
        tile = RUR.control.tile_in_front(robot);
        if (tile) {
            if (tile.detectable && tile.fatal){
                    if (tile == RUR.tiles.water) {
                        if (!RUR.control._bridge_present(robot)){
                            return false;
                        }
                    } else {
                        return false;
                    }
            }
        }

        tiles = RUR.control.top_tiles_in_front(robot);
        if (tiles) {
            for (tilename in tiles) {
                if (RUR.top_tiles[tilename] !== undefined &&
                    RUR.top_tiles[tilename].detectable &&
                    RUR.top_tiles[tilename].fatal) {
                    return false
                }
            }
        }

        return true;
    }

Bon, tout cela est très compliqué ... essayons plutôt ce qui suit::

    voir_source(RUR.control.right_is_clear)


Ah, ceci semble beaucoup plus simple!  Voici le résultat que je vois:

.. code-block:: javascript

    function (robot){
        var result;
        RUR._recording_(false);
        RUR.control.__turn_right(robot);
        result = RUR.control.front_is_clear(robot);
        RUR.control.turn_left(robot);
        RUR._recording_(true);
        return result;
    }

Tenant compte du fait qu'en Javascript on a besoin de déclarer les
variables locales, ce qui n'est pas requis en Python, voici comment
on **pourrait** écrire une fonction équivalente en Python::

    def function(robot):
        RUR._recording_(False)
        RUR.control.__turn_right(robot)
        result = RUR.control.front_is_clear(robot)
        RUR.control.turn_left(robot)
        RUR._recording_(True)
        return result

et voici la traduction française correspondante::

    def fonction(robot):
        RUR._enregistrement_(False)
        RUR.control.__tourne_a_droite(robot)
        résultat = RUR.control.rien_devant(robot)
        RUR.control.tourne_a_gauche(robot)
        RUR._enregistrement_(True)
        return résultat;

Comme on peut le voir, le créateur de Reeborg a inclus le prototype
d'une fonction permettant à Reeborg de tourner directement à droite:
``RUR.control.__turn_right``.  Il a utilisé la convention Python d'utiliser
un nom qui débute avec deux caractères de soulignement pour dénoter un
objet "privé", qui n'est pas à l'intention des programmeurs externes
comme nous.

Voici un résumé de l'effet de la fonction:

#. On arrête un enregistrement
#. Reeborg tourne à sa droite.
#. Reeborg utilise ``RUR.control.front_is_clear()``, l'équivalent de
   ``rien_devant``, pour déterminer s'il y a un obstacle
   devant lui.  En réutilisant une fonction bien testée (sans bogues!), on
   respecte la règle numéro 3: **Ne vous répétez pas**.
#. Reeborg retourne à son orientation de départ.
#. On reprend l'enregistrement
#. La valeur du résultat est retournée.

L'arrêt temporaire de l'enregistrement fait en sorte qu'on ne voit
jamais à l'écran les mouvements de Reeborg lorsqu'il tourne tout d'abord à sa
droite avant de retourner à son orientation de départ.
*Il est très malin ce programmeur...*

.. important::

    Assurez-vous de sélectionner Python comme langue de programmation pour
    ce qui suit.


.. topic:: À votre tour!

   Ensuite, en vous inspirant de la logique de la méthode Javascript
   ``rien_a_droite`` ci-dessus, ajouter une méthode ``rien_a_gauche``
   à votre classe ``RobotRéparé``.   Au lieu d'utiliser la méthode Javascript
   ``RUR._recording_()`` pour arrêter ou reprendre l'enregistrement,
   vous devriez utiliser la fonction Python ``enregistrement()`` dont
   je vous ai caché l'existence jusqu'ici.

   **Je suggère que vous placiez votre classe ``RobotRéparé`` dans votre
   bibliothèque.**

   Finalement vous pouvez tester votre méthode avec le monde **Vide**
   et le code ci-dessous::

      from biblio import RobotRéparé

      reeborg = RobotRéparé()

      while reeborg.rien_a_gauche():
          reeborg.tourne_a_gauche()

   Si vous avez bien fait le tout correctement, Reeborg devrait faire
   un seul virage à gauche avant que le programme ne termine.
