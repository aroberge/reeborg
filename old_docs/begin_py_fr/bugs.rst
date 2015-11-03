Fichus bogues!
==============

Personne n'aime avoir à discuter au sujet des bogues en informatique.
Mais, malheureusement, vous devez en savoir davantage à leur sujet et,
surtout, apprendre comment vous en débarrasser.

Cette leçon est un peu plus longue que les précédentes, mais je vous
encourage à lire le tout au moins une fois.


Qu'est-ce qu'un bogue?
----------------------

L'origine du mot bogue, adapté de l'anglais **bug** qui signifie
**insecte**, est souvent attribué à un incident où un papillon de nuit a
été trouvé à l'intérieur de l'ordinateur Mark II de l'Université
Harvard. Cet insecte avait été trouvé par les membres d'une équipe menée
par l'illustre informaticienne, mathématicienne et jeune officier naval
Grace Murray Hopper, qui inventa par la suite le concept de compilateur
de langages informatiques. Madame Grace Hopper, Ph.D., a également
atteint le titre d’amiral (*Rear Admiral*) dans la marine américaine.

Ce papillon a été préservé, collé dans le journal de bord de Madame
Hopper, tel qu'illustré ci-dessous. Fait intéressant, on note une
mention qui dit "First actual case of bug being found." qu'on pourrait
traduire par *Premier cas actuel d'un bogue/insecte trouvé.*

|image0|

Image adaptée de l'archive publique `U.S. Naval Historical Center
<http://www.history.navy.mil/photos/pers-us/uspers-h/g-hoppr.htm>`__

En fait, la première utilisation du mot anglais bug dans un contexte
technologique est attribuée à l'inventeur Thomas Edison. Selon le
dictionnaire Oxford, le texte suivant aurait été publié le 11 mars 1889
dans le journal Pall Mall Gazette:

    Mr. Edison, I was informed, had been up the two previous nights
    discovering 'a bug' in his phonograph - an expression for solving a
    difficulty, and implying that some imaginary insect has secreted
    itself inside and is causing all the trouble.

Donc, il semblerait que le bogue original, bien qu'il ait fait référence
à un insecte, en aurait été un *imaginaire*...

Malheureusement, les bogues, bien qu'ils ne soient pas des insectes, ne
sont pas imaginaires.

Composer avec les bogues
------------------------

Dans le jargon informatique, un bogue est une erreur qui fait qu'un
programme se comporte d'une façon inattendue. Si vous écrivez des
programmes informatiques, tôt ou tard vous allez rencontrer des bogues.
Les bons programmeurs cherchent à éliminer les bogues aussitôt que leur
programme se comportent d'une manière inattendue.

Les programmeurs incompétents disent que les bogues dans leurs
programmes n'en sont pas, mais qu'il s'agit plutôt de *particularité* ou
de *trait intéressant du caractère* de leur programme. **Vous** allez
devenir de bons programmeurs, contrairement aux créateurs de Reeborg
dont le programme est rempli de bogues.

.. figure:: ../images/reeborg_costume.jpg
   :figwidth: 40%
   :align: right

   Reeborg, grandeur nature (New Jersey, États-Unis)

   *Photo courtoisie de A. Judkis.*

#. Reeborg a une fuite d'huile. De telle fuite sont dommageables pour
   l'environnement et pas très pratique pour Reeborg qui doit refaire le
   plein de façon périodique, lorsqu'il n'est pas occupé à accomplir les
   tâches que vous lui confiez. Les créateurs de Reeborg prétendent
   qu'en fait il s'agit d'une caractéristique utile puisque ceci vous
   permet de suivre Reeborg à la trace, comme tout bon programmeur doit
   pouvoir faire dans ses programmes. Vous apprendrez plus tard à
   réparer cette fuite. Et je vous montrerai une façon moins dommageable
   pour l'environnement afin de suivre ce que fait Reeborg; des
   techniques plus avancées utilisant des logiciels connus sous le nom
   de **débogueurs** vont au-delà de ce qui est couvert dans ces leçons.
#. Le mécanisme de direction de Reeborg n'est pas utilisé correctement
   par le logiciel de Reeborg, ce qui fait que ce dernier ne peut que
   tourner vers la gauche. Les créateurs de Reeborg, une fois de plus,
   prétendent qu'il s'agit là d'une caractéristique utile puisque ceci
   vous permet d'apprendre le concept de **fonctions**. Reeborg n'est
   pas d'accord. Vous apprendrez sous peu comment accommoder tant bien
   que mal cette limitation de Reeborg et trouver une façon détournée
   pour lui permettre de faire des virages à droite. Beaucoup plus tard,
   vous apprendrez à véritablement réparer Reeborg pour lui permettre de
   tourner à droite aussi aisément qu'il peut déjà tourner à gauche.
#. Reeborg possède une boussole lui permettant de déterminer dans quelle
   direction il va. Malheureusement, une fois de plus, le logiciel de
   Reeborg a un bogue qui fait en sorte que Reeborg peut seulement dire
   s'il se dirige vers le nord ... ou non. Vous apprendrez d'abord à
   composer avec ce bogue pour trouver une façon détournée de permettre
   à Reeborg de s'orienter correctement. Plus tard, vous apprendrez à
   corriger le logiciel de Reeborg correctement.
#. Reeborg peut voir s'il y a un mur qui bloque son passage devant lui,
   et peut tourner la tête pour voir s'il y a un mur à sa droite.
   Malheureusement une *limitation* de son programme (ce qui est une
   expression malhonnête que les manufacturiers utilisent pour éviter de
   dire que leurs programmes ont des bogues) empêche Reeborg de
   déterminer correctement si un mur se trouve immédiatement à sa
   gauche.

Pour déterminer la cause d'un bogue, il est parfois utile d'interrompre
le flot normal d'un programme. À cette fin, vous pouvez utiliser un ou
plusieurs des trucs suivants:

#. Vous pouvez *pauser* un programme en voie d'exécution simplement en
   cliquant sur le bouton **pause**. Ceci est semblable
   à ce qu'on appelle un *point d'arrêt* ("breakpoint") dans un
   programme.
#. Plutôt que de cliquer sur le bouton de pause, vous pouvez insérer
   l'instruction ``pause()`` à n'importe quel point du programme, ce
   qui aura exactement le même effet.
#. Vous pouvez exécuter un programme *une instruction à la fois* en
   cliquant sur le bouton *une commande*.
   Si vous faites ceci, vous remarquerez peut-être que les instructions
   sont surlignées avant d'être exécutées.  Dans des cas très rares,
   il peut arriver que le surlignage puisse causer des problèmes pour
   l'exécution de certains programmes; vous pouvez désactiver le
   surlignage en cliquant sur un bouton en haut du code.
#. Vous pouvez changer la vitesse d’exécution (le temps entre deux
   instructions) à n'importe quel point à l'intérieur d'un programme;
   j'expliquerai comment faire ceci plus tard.
#. Vous pouvez demander à Reeborg d'écrire certaines notes à n'importe
   quel point à l'intérieur d'un programme; je vous montrerai également
   comment faire ceci plus tard.
#. Finalement, vous pouvez arrêter complètement l'exécution d'un
   programme en cliquant le bouton **stop**;
   malheureusement, ceci ne fonctionnera pas toujours si vous avez ce
   qu'on appelle une boucle infinie hors du contrôle de Reeborg. Dans le
   pire des cas, vous pouvez simplement recharger la page web et
   redémarrer à zéro.

.. |image0| image:: ../../src/images/first_bug.jpg
