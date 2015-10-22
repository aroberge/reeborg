Revue de quelques missions
==========================

C'est le temps de revoir certaines des missions que nous avions vu
beaucoup plus tôt.

En utilisant ``while``, ``if``, ``else``, etc., vous êtes maintenant en
mesure d'écrire des programmes qui permettront à Reeborg d'accomplir les
tâches qui lui sont confiées. Cependant, gardez ce qui suit en tête:

#. Souvenez-vous de la règle numéro 2 et assurez-vous de choisir des
   noms descriptifs pour les problèmes à résoudre.
#. Suivez les principes décrits dans la règle numéro 4: commencez par
   résoudre des problèmes simples en premier, puis améliorez votre
   solution pour être en mesure de résoudre plus d'un problème.
#. Souvenez-vous de la règle numéro 3: évitez autant que possible les
   répétitions de code.

Finalement, n'oubliez pas la règle numéro 1 ... et assurez-vous cette
fois-ci de résoudre **tous** les tâches décrites dans les leçons
suivantes.

.. important::

    Assurez-vous de sauvegarder vos diverses solutions; vous
    voudrez peut-être les revoir plus tard.

Prêt pour la récolte
--------------------

L'aménagement des semences s'est bien passé, et c'est le temps des
récoltes. Sélectionnez le monde **Récolte 1** ou **Récolte 2** et faites en
sorte que Reeborg ramasse toutes les carottes; vous devriez être
en mesure de faire ceci à l'aide d'un seul programme pour les deux mondes.

Avant les récoltes
------------------

Sélectionnez le monde **Récolte 3** qui représente l'état du jardin peu de
temps après les semences. Certaines graines de carottes ont bien germé,
d'autres ont germé trop rapprochées les unes des autres, alors que
certaines n'ont pas germées du tout. Aidez Reeborg à enlever les
carottes en excès et à semer à nouveau lorsque c'est requis de telle
sorte qu'il n'y ait qu'une seule carotte par endroit.

.. topic:: Faites-le!

    Écrivez un programme tel que décrit ci-dessus.


Le mauvais temps
----------------

C'était une belle journée ensoleillée. Reeborg jouait dehors avec son
amie. Soudainement, la pluie se mit à tomber et Reeborg se rappela que
les fenêtres de sa maison étaient toutes ouvertes. Reeborg alla donc
chez lui pour fermer les fenêtres mais arrêta au seuil de la porte,
indécis quant à la meilleure façon de procéder.

.. topic:: À votre tour!

    Utilisez la commande ``construit_un_mur()`` et aidez Reeborg à fermer
    les fenêtres de sa maison. Lorsque Reeborg aura terminé, il sera au
    seuil de la porte, regardant la pluie tomber et attendra patiemment
    qu'elle arrête pour qu'il puisse retourner jouer dehors. Le monde à
    sélectionner est **Pluie 1**.

Au tour de l'amie de Reeborg
----------------------------

Erdna, l'amie de Reeborg, vit dans une plus grande maison illustrée dans
**Pluie 2**. Erdna jouait avec Reeborg lorsque la pluie s'est mise à
tomber.

.. topic:: À votre tour!

    Aidez Erdna à fermer les fenêtres de sa maison.   Le véritable défi est d'avoir
    à la fin un seul programme qui fonctionne dans les deux cas.

.. hint::

    Pour déterminer s'il y a une fenêtre à
    côté de l'endroit où se trouve un robot, on peut avoir à faire avance le
    robot d'un pas de plus, de noter le résultat, puis de reculer d'un pas
    et déterminer ce qu'il faut faire basé sur le résultat qui avait été
    noté.

Après la pluie
----------------

Le vent a soufflé violemment la nuit dernière. Il y a des déchets
partout autour de la maison de Reeborg. Ses parents lui demandent de
nettoyer le trottoir qui mène à la rue **Tempête 1**, ainsi que l'allée
**Tempête 2**.

.. topic:: À votre tour!

    Reeborg doit ramasser toutes les feuilles, et
    les mettre dans la poubelle en s'assurant de fermer le couvercle à
    l'aide de l'instruction ``construit_un_mur()``.  Il peut vérifier
    s'il transporte des objets (des feuilles mortes ici) en utilisant
    la condition ``transporte()`` soit dans un énoncé ``if`` ou dans
    un énoncé ``while``.

Encore du travail!
------------------

Les parents de Reeborg sont tellement content de son travail de
nettoyage qu'ils lui demande de ramasser tous les déchets qui se sont
retrouvés dans la cour, tel qu'illustré dans **Tempête 3**.

.. topic:: À votre tour!

    Votre véritable défi est de terminer avec un seul programme qui permet à
    Reeborg de faire le nettoyage requis dans les trois mondes différents.

Trouver le centre
-----------------

Examinez les mondes **Centrer 1** à **Centrer 3**. En commençant avec le cas le
plus simple, faites des améliorations progressives et écrivez un
programme faisant en sorte que Reeborg dépose un jeton au centre
géométrique de la pièce rectangulaire dans laquelle il se trouve, peu
importe le monde choisi.  À noter que ceci est un exercice
un peu plus difficile.

.. hint::

    Reeborg a deux jetons. Ça pourrait être
    utile pour lui de **déposer** des jetons en premier à l'extrémité d'une ligne.
    Puis, en ramassant un jeton à un bout de la ligne et en le déposant dans la case à côté,
    puis en faisans la même chose à l'autre bout de la ligne, Reeborg
    devrait pouvoir trouver le centre s'il répète ceci suffisamment de fois.
    Lorsque vous savez faire ceci en une
    dimension (le long d'une ligne horizontale), vous pouvez utiliser cet
    endroit comme début d'une ligne verticale où vous pouvez répéter cet
    algorithme.

