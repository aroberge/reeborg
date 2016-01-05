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

        tiles = RUR.control.solid_objects_in_front(robot);
        if (tiles) {
            for (tilename in tiles) {
                if (RUR.solid_objects[tilename] !== undefined &&
                    RUR.solid_objects[tilename].detectable &&
                    RUR.solid_objects[tilename].fatal) {
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
        RUR.control.__turn_right(robot, true);
        result = RUR.control.front_is_clear(robot, true);
        RUR.control.turn_left(robot, true);
        return result;
    }

Tenant compte du fait qu'en Javascript on a besoin de déclarer les
variables locales, ce qui n'est pas requis en Python, voici comment
on pourrait écrire une fonction équivalente en Python::

    def function(robot):
        RUR.control.__turn_right(robot, True)
        result = RUR.control.front_is_clear(robot, True)
        RUR.control.turn_left(robot, True)
        return result

avec la traduction française correspondante::

    def fonction(robot):
        RUR.control.__tourne_a_droite(robot, True)
        résultat = RUR.control.rien_devant(robot, True)
        RUR.control.tourne_a_gauche(robot, True)
        return résultat

Comme on peut le voir, le créateur de Reeborg a inclus le prototype
d'une fonction permettant à Reeborg de tourner directement à droite:
``RUR.control.__turn_right``.  Il a utilisé la convention Python d'utiliser
un nom qui débute avec deux caractères de soulignement pour dénoter un
objet "privé", qui n'est pas à l'intention des programmeurs externes
comme nous.

Voici un résumé de l'effet de la fonction:

#. Reeborg tourne à sa droite.
#. Reeborg utilise ``front_is_clear()`` pour déterminer s'il y a un obstacle
   devant lui.  En réutilisant une fonction bien testée (sans bogues!), on
   respecte la règle numéro 3: **Ne vous répétez pas**.
#. Reeborg retourne à son orientation de départ.

Notez l'utilisation du second argument ``true`` dans les diverses méthodes.
Si on examine le code **Javascript**, en faisant par exemple::

    voir_source(RUR.control.__turn_right)

on observe le résultat suivant:

.. code-block:: javascript
   :emphasize-lines: 8

    function (robot, no_frame){
        "use strict";
        robot._prev_orientation = (robot.orientation+2)%4; // fix so that oil trace looks right
        robot._prev_x = robot.x;
        robot._prev_y = robot.y;
        robot.orientation += 3;
        robot.orientation %= 4;
        if (no_frame) return;
        RUR.rec.record_frame("debug", "RUR.control.__turn_right");
    }

Donc, si le deuxième argument de la fonction, ``no_frame``, est "vrai", alors
la fonction "retourne" avant que l'enregistrement ne se fasse: on ne voit donc
pas son effet à l'écran.  *Il est très malin ce programmeur...*


.. topic:: À votre tour!

   Modifiez votre méthode ``tourne_a_droite`` de la classe
   pour qu'elle accepte un argument avec la valeur ``False`` par défaut.
   Par exemple, vous pourriez commencer avec::

       def tourne_a_droite(self, no_frame=False):

   Ensuite, assurez-vous que si on attribute la valeur ``True`` à
   ``no_frame`` lorsque la méthode est invoquée, aucun enregistrement n'aura lieu.


   Ensuite, en vous inspirant de la logique de la méthode Javascript
   ``rien_a_droite`` ci-dessus, ajouter une méthode ``rien_a_gauche``
   à votre classe ``RobotRéparé``.   Vous voudrez probalement ajouter l'argument
   ``True`` à chaque fois que vous invoquerez un virage à l'intérieur de
   la méthode ``rien_a_gauche``.

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
