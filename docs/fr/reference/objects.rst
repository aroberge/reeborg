Objets, images de fond, etc.
================================

En plus des murs, qui peuvent bloquer le chemin de Reeborg, plusieurs
différentes images peuvent être utilisés pour représenter des objets.


Objets de base
--------------

Reeborg peut manipuler différents objets.  Il peut prendre [``prend()``]
et déposer [``depose()``] les objets suivants dont, en particulier,
les **jetons**
|token| qui sont les objets préférés de Reeborg.
Les jetons sont un peu comme des pièces de monnaie sauf que la plupart
des gens les trouvent sans valeur; Reeborg n'est certainement pas d'accord.

Si plus d'un type d'objet est présent, Reeborg devra spécifier lequel par
le biais d'un argument fourni sous forme de chaîne de caractères, comme par exemple
``depose("jeton")``  ou ``prend('jeton')``  [les guillemets droits ou les apostrophes
peuvent être utilisés selon le choix, en autant qu'ils apparaissent en paires.]

En plus de jetons, Reeborg peut manipuler les objets suivants.
[Plusieurs des images ont été
modifiées d'images trouvées sur http://openclipart.com]


:pomme: |apple|
:banane: |banana|
:carotte: |carrot|
:marguerite: |daisy|
:pissenlit: |dandelion|  Les pissenlits sont souvent considérés comme étant
  indésirable et doivent être enlevés.
:feuille: |leaf|  Reeborg n'aime pas vraiment les feuilles. La présence de
  feuilles indique généralement que l'automne est arrivée et que Reeborg doit
  les ramasser plutôt que de s'amuser.  S'il a le choix, Reeborg préfère
  toujours s'amuser.
:orange: |orange|
:fraise: |strawberry|
:tulipe: |tulip|
:carré: |square|
:étoile: |star|
:triangle: |triangle|  Un triangle semblable ne peut exister que dans le
  monde de Reeborg.  Voici un gros plan de ce triangle.

|impossible-triangle|

Objets décoratifs
-----------------

Les objets ci-dessus peuvent également être dessinés comme des objets purement
décoratifs. Lorsque c'est le cas, Reeborg ne peut pas les manipuler, et ils
n'interfèrent pas avec la détermination du but à accomplir pour une tâche donnée.

Le nombre d'objets "normaux" se trouvant à un endroit est indiqué dans la case
où se trouve un ou des objets.  Pour les objets décoratifs, aucun nombre n'est
indiqué.


Tuiles de fond
----------------

:gazon: |grass| |pale_grass| Sans problème pour Reeborg.
:gravier: |gravel|  Sans problème pour Reeborg.
:eau: |water| Peut causer certains problèmes (rouille ... noyade) à Reeborg.
  Heureusement, celui-ci peut détecter la présence de l'eau en utilisant
  ``rien_devant()``.
:boue: |mud| Reeborg a tendance à s'embourber complètement dans la boue.
  Et il ne parvient pas à détecter la boue avant qu'il ne soit trop tard.
  Donc, à éviter complètement.
:mur de brique: |bricks|  Également à éviter; heureusement, Reeborg peut détecter
  la présence de tels murs en utilisant ``rien_devant()``.
:glace: |ice| Fait en sorte que Reeborg glisse et continue son mouvement
  tout droit. Ceci peut être problématique si un obstacle se trouve plus loin
  devant. Reeborg ne peut pas détecter la présence de glace avant qu'il ne
  soit trop tard.

|slip|

Image de fond
-------------

Il est possible de spécifier une seule image utilisée comme image de fond
pour l'ensemble du monde.  Ceci est fait en fournissant l'adresse (URL) où
on peut trouver le fichier de l'image.  En mode d'édition, l'image sera tracée
derrière la grille indiquant la position des murs.  En mode d'exécution, l'image
sera tracée par-dessus cette grille, mais derrière les vrais murs.

La taille de ces images de fond n'est aucunement modifiée (sauf pour les
mondes dessinés avec de petites cases).  Pour déterminer
la dimension de l'image, il suffit de compter le nombre de cases: chacune des
cases est un carré de 40 pixels de côté.


Objets spéciaux
---------------

Les objets spéciaux, comme les objets décoratifs, ne peuvent pas être
manipuler par Reeborg. Cependant, il peuvent avoir un effet sur
le comportement de Reeborg.


:pont: |bridge|  Permet à Reeborg de traverser un cours d'eau.
:clôtures:  |fence_right| - |fence_left| - |fence_double| - |fence_vertical|
  Peuvent être détectés par Reeborg. Si on demande à Reeborg de se déplacer
  au travers d'une clôture (en pensant peut-être qu'il sauterait par dessus),
  Reeborg échouera.  Veuillez noter que vous pouvez superposer différents types
  de clôtures pour créer un espace qui sera visuellement fermé.
:boîtes: |box| Les boîtes sont poussées par Reeborg ... en autant qu'aucun
  autre obstacle (mur, clôture, autre boîte, etc.) ne bloque le chemin.
  Une boîte poussée dans l'eau par Reeborg flottera, et deviendra un pont lui
  permettant de traverser un cours d'eau.  L'exemple ci-dessous (en anglais)
  illustre ceci.

|box-blocked|

Les buts
--------

Reeborg peut accomplir certains buts, comme atteindre une position finale,
ou laisser tomber certains objets à des endroits pré-déterminés.
Pour indiquer qu'un ou des objets doivent être déposés à un endroit donné,
des images en tons de gris sont utilisées.

|apple_goal| |banana_goal| |carrot_goal|
|daisy_goal| |dandelion_goal| |leaf_goal| |orange_goal|
|strawberry_goal| |tulip_goal| |square_goal| |star_goal|
|triangle_goal| |token_goal|

Finalement, pour indiquer que Reeborg doit terminer une tâche à un
endroit donné, l'une des images suivantes sera utilisée:

|green_home_tile| |house| |racing_flag|

.. |green_home_tile| image:: ../../../src/images/green_home_tile.png
.. |house| image:: ../../../src/images/house.png
.. |racing_flag| image:: ../../../src/images/racing_flag.png

.. |apple| image:: ../../../src/images/apple.png
.. |banana| image:: ../../../src/images/banana.png
.. |carrot| image:: ../../../src/images/carrot.png
.. |daisy| image:: ../../../src/images/daisy.png
.. |dandelion| image:: ../../../src/images/dandelion.png
.. |leaf| image:: ../../../src/images/leaf.png
.. |orange| image:: ../../../src/images/orange.png
.. |strawberry| image:: ../../../src/images/strawberry.png
.. |tulip| image:: ../../../src/images/tulip.png
.. |square| image:: ../../../src/images/square.png
.. |star| image:: ../../../src/images/star.png
.. |triangle| image:: ../../../src/images/triangle.png
.. |impossible-triangle| image:: ../../images/impossible-triangle.png
.. |token| image:: ../../../src/images/token.png

.. |grass| image:: ../../../src/images/grass.png
.. |pale_grass| image:: ../../../src/images/pale_grass.png
.. |gravel| image:: ../../../src/images/gravel.png
.. |ice| image:: ../../../src/images/ice.png
.. |water| image:: ../../../src/images/water.png
.. |mud| image:: ../../../src/images/mud.png
.. |bricks| image:: ../../../src/images/bricks.png
.. |slip| image:: ../../images/ice_slip.gif

.. |bridge| image:: ../../../src/images/bridge.png
.. |box| image:: ../../../src/images/box.png
.. |fence_right| image:: ../../../src/images/fence_right.png
.. |fence_left| image:: ../../../src/images/fence_left.png
.. |fence_double| image:: ../../../src/images/fence_double.png
.. |fence_vertical| image:: ../../../src/images/fence_vertical.png
.. |box-blocked| image:: ../../images/box_blocked.gif

.. |apple_goal| image:: ../../../src/images/apple_goal.png
.. |banana_goal| image:: ../../../src/images/banana_goal.png
.. |carrot_goal| image:: ../../../src/images/carrot_goal.png
.. |daisy_goal| image:: ../../../src/images/daisy_goal.png
.. |dandelion_goal| image:: ../../../src/images/dandelion_goal.png
.. |leaf_goal| image:: ../../../src/images/leaf_goal.png
.. |orange_goal| image:: ../../../src/images/orange_goal.png
.. |strawberry_goal| image:: ../../../src/images/strawberry_goal.png
.. |tulip_goal| image:: ../../../src/images/tulip_goal.png
.. |square_goal| image:: ../../../src/images/square_goal.png
.. |star_goal| image:: ../../../src/images/star_goal.png
.. |triangle_goal| image:: ../../../src/images/triangle_goal.png
.. |token_goal| image:: ../../../src/images/token_goal.png
