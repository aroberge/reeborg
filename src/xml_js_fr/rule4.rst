`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Règle numéro 4
==============

Dans les leçons précédentes, nous avons composé un programme qui permet
à Reeborg d'accomplir plusieurs tâches de complexité variable. Le but de
ce programme était de permettre à Reeborg de faire le tour de son monde.
Bien que le programme soit relativement court, et que sa structure
devrait être claire, son but ne serait pas nécessairement clair pour
quelqu'un qui le lirait pour une première fois. Une façon d'expliquer le
but de ce programme serait peut-être de rajouter des commentaires comme
ce qui suit.

.. code:: jscode

    // On note le point de départ en déposant un jeton
    dépose("jeton");

    // On trouve une direction où un mur ne bloque pas le chemin
    while ( !rien_devant() ) {
        tourne_à_gauche();
    }
    avance();

    /* On sait qu'on a fait le tour du monde lorsqu'on revient
       au point de départ, là où on a déposé un jeton.
     */

    while ( !jeton_ici() ){
        if (rien_à_droite()){  // on garde la droite
            tourne_à_droite();
            avance();
        } else if (rien_devant()){ // on avance ... suivant le mur
            avance();
        } else {
            tourne_à_gauche();  // ... on suit le mur
        }
    }

Bien que ceci clarifie notre intention instruction par instruction, ça
ne nous aide pas vraiment à comprendre l'algorithme (ou la méthode
générale) utilisé pour résoudre ce problème. Une autre façon d'expliquer
ce que ce programme fait est de prendre un peu de recul et de constater
que le programme a deux parties:

#. On indique le point de départ et on amorce le trajet
#. on suit le mur à droite jusqu'à ce qu'on revienne au point de départ

Écrivons donc le programme pour que ces deux parties soient plus en
évidence et changeons les commentaires.

.. code:: jscode

    /* Ce programme indique à Reeborg comment faire le tour de son
       monde dans le sens anti-horaire, en suivant le mur jusqu'à
       ce qu'il revienne à son point de départ.
     */

    function marque_point_départ_et_avance() {
        dépose("jeton");
        while ( !rien_devant() ) {
            tourne_à_gauche();
        }
        avance();
    }

    function suis_le_mur_à_droite() {
        if (rien_à_droite()){
            tourne_à_droite();
            avance();
        } else if (rien_devant()){
            avance();
        } else {
            tourne_à_gauche();
        }
    }

    var trouve_point_départ = jeton_ici;

    /* fin des définitions ci-dessus;
       l'exécution suit */

    marque_point_départ_et_avance();

    while ( !trouve_point_départ() ){
        suis_le_mur_à_droite();
    }

N'est-ce pas beaucoup plus clair comme ceci?

**N.B.: Il serait peut-être utile de faire une copie de la fonction
``suis_le_mur_à_droite()`` dans votre bibliothèque.**

Conclusion
----------

Nous avons commencé par un simple problème (faire le tour d'un monde
rectangulaire), et, en changeant la solution un tout petit peu à chaque
fois (ce qu'on appelle faire des *améliorations progressives*), nous
avons put adapter le programme pour qu'il puisse résoudre des problèmes
de plus en plus complexes. Après chaque petit changement, nous pouvions
vérifier que la solution était toujours valable pour chaque monde résolu
précédemment tout en étant capable de résoudre des mondes plus
complexes. Nous avons également choisi des noms descriptifs pour les
parties de l'algorithme ce qui a rendu le programme plus facile à lire
et à comprendre. Ceci est une stratégie que vous devriez adopter dans la
conception de vos programmes:

**Règle numéro 4**
    Étapes à suivre pour écrire un programme:

Les deux derniers points sont essentiellement les même que la Règle
numéro 2.

Avant de passer à la prochaine leçon, assurez-vous d'avoir le programme
que nous venons de compléter prêt à être exécuté.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
