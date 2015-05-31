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

Avant les récoltes
------------------

Sélectionnez le monde **Récolte 4** qui représente l'état du jardin peu de
temps après les semences. Certaines graines de carottes ont bien germé,
d'autres ont germé trop rapprochées les unes des autres, alors que
certaines n'ont pas germées du tout. Aidez Reeborg à enlever les
carottes en excès et à semer à nouveau lorsque c'est requis de telle
sorte qu'il n'y ait qu'une seule carotte par endroit. Dans ce monde, les
carottes sont représentées par des jetons, ce qui suggère d'adopter le
vocabulaire suivant::


    carotte_ici = jeton_ici
    sème_carotte = dépose
    enlève_carotte = prend

    def une_seule_carotte():
      ...

.. topic:: Faites-le!

    Écrivez un programme tel que décrit ci-dessus.

Prêt pour la récolte
--------------------

L'aménagement des semences s'est bien passé, et c'est le temps des
récoltes. Sélectionnez le monde **Récolte 1** ou **Récolte 2** et faites en
sorte que Reeborg ramasse tous les jetons qui représentent des plantes à
récolter.

On peut voir que le monde **Récolte 1** a des rangs horizontaux (ou
verticaux) de la même longueur alors que le monde **Récolte 2** peut être
perçu comme ayant des rangs diagonaux de la même longueur.

Une approche possible aux problèmes des récoltes est de définir trois
fonctions, ``récolte_un_rang`` et ``récolte_deux_rangs`` et
``avance_au_premier_rang``; les définitions exactes de ces fonctions
vont dépendre du monde sélectionné.

Une fois ces fonctions définies, la solution du problème devient
identique pour les deux mondes::

    avance_au_premier_rang()
    repete(récolte_deux_rangs, 3)

Cela dit, vous pouvez choisir une approche différente de celle qui est
suggérée ci-dessus.

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
    sélectionner est **Tempête 1**.

Au tour de l'amie de Reeborg
----------------------------

Erdna, l'amie de Reeborg, vit dans une plus grande maison illustrée dans
**Tempête 2**. Erdna jouait avec Reeborg lorsque la pluie s'est mise à
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

Après la tempête
----------------

Le vent a soufflé violemment la nuit dernière. Il y a des déchets
partout autour de la maison de Reeborg. Ses parents lui demandent de
nettoyer le trottoir qui mène à la rue **Tempête 3**, ainsi que l'allée
**Tempête 4**.

.. topic:: À votre tour!

    Reeborg doit ramasser tous les déchets (représentés par des jetons), et
    les mettre dans la poubelle en s'assurant de fermer le couvercle à
    l'aide de l'instruction ``construit_un_mur()``.

Encore du travail!
------------------

Les parents de Reeborg sont tellement content de son travail de
nettoyage qu'ils lui demande de ramasser tous les déchets qui se sont
retrouvés dans la cour, tel qu'illustré dans **Tempête 5**.

.. topic:: À votre tour!

    Votre véritable défi est de terminer avec un seul programme qui permet à
    Reeborg de faire le nettoyage requis dans les trois mondes différents.

Trouver le centre
-----------------

Examinez les mondes **Centrer 1** à **Centrer 3**. En commençant avec le cas le
plus simple, faites des améliorations progressives et écrivez un
programme faisant en sorte que Reeborg dépose un jeton au centre
géométrique de la pièce rectangulaire dans laquelle il se trouve, peu
importe le monde choisis

.. hint::

    Reeborg a deux jetons. Ça pourrait être
    utile pour lui de **déposer** des jetons en premier à l'extrémité d'une ligne.
    Puis, en ramassant un jeton à un bout de la ligne et en le déposant dans la case à côté,
    puis en faisans la même chose à l'autre bout de la ligne, Reeborg
    devrait pouvoir trouver le centre s'il répète ceci suffisamment de fois. Lorsque vous savez faire ceci en une
    dimension (le long d'une ligne horizontale), vous pouvez utiliser cet
    endroit comme début d'une ligne verticale où vous pouvez répéter cet
    algorithme.

