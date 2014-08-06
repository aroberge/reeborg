`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Autre livraison de journaux
===========================

Retournons à l'exemple de la livraison des journaux; nous allons
considérer le cas de la livraison à la gentille Ada Lovelace dans
Journal 1. Ci-dessous est la première solution que vous avez du trouver,
avec quelques commentaires rajoutés.

.. code:: jscode

    prend("étoile");

    // monte au premier
    tourne_à_gauche();
    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();
    avance();
    avance();

    // monte au deuxième
    tourne_à_gauche();
    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();
    avance();
    avance();

    // monte au troisième
    tourne_à_gauche();
    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();
    avance();
    avance();

    // prendre la monnaie
    prend("jeton");
    prend("jeton");
    prend("jeton");
    prend("jeton");
    prend("jeton");

    // déposer un journal
    dépose("étoile");

    // demi-tour
    tourne_à_gauche();
    tourne_à_gauche();

    // descend un étage
    avance();
    avance();
    tourne_à_gauche();
    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();

    // descend un étage
    avance();
    avance();
    tourne_à_gauche();
    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();

    // descend un étage
    avance();
    avance();
    tourne_à_gauche();
    avance();
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();

Cette solution est plutôt longue ... et il est facile de faire des
erreurs. On remarque cependant qu'il y a plusieurs répétitions, ce qui
suggère qu'on peut définir plusieurs fonctions. Nous avons déjà défini
``tourne_à_droite`` et ``demi_tour`` qui devrait être dans votre
bibliothèque. Utilisons-les et définissons d'autres fonctions.

.. code:: jscode

    function monte_un_étage() {
        tourne_à_gauche();
        avance();
        tourne_à_droite();
        avance();
        avance();
    }

    function monte_trois_étages() {
        monte_un_étage();
        monte_un_étage();
        monte_un_étage();
    }

    function descend_un_étage() {
        avance();
        avance();
        tourne_à_gauche();
        avance();
        tourne_à_droite();
    }

    function descend_trois_étages() {
        descend_un_étage();
        descend_un_étage();
        descend_un_étage();
    }

    function prend_argent() {
        prend("jeton");
        prend("jeton");
        prend("jeton");
        prend("jeton");
        prend("jeton");
    }

    // === Fin des définitions ===

    prend("étoile");
    monte_trois_étages();
    prend_argent();
    dépose("étoile");
    demi_tour();
    descend_trois_étages();

Chaque fonction de contient pas plus de 5 instructions; c'est très
facile de vérifier que chaque fonction est correctement définie
individuellement comparativement à ce que nous avions à faire auparavant
avec la longue liste de définitions. Une fois que l'on a défini les
fonctions requises, il est facile d'écrire un programme: 6 lignes
suffisent pour faire en sorte que Reeborg livre le journal et retourne
au rez-de-chaussée. Les définitions de fonctions permettent donc
d'éviter plein de répétitions, et facilitent la compréhension.

Vous devriez pouvoir facilement modifier le programme ci-dessus pour que
Reeborg puisse livrer le journal de Monsieur Babbage dans Journal 2.
**Allez-y!**

Plus tard, nous verrons comment on peut écrire un seul programme, plus
court que celui ci-dessus, qui permettra à Reeborg de livrer des
journaux à Madame Lovelace et à Monsieur Babbage.

Puisque des fonctions comme ``prend_argent()``, ``monte_trois_étages``,
etc., sont spécifiques à une tâche en particulier, ce n'est probablement
pas une bonne idée de les sauvegarder dans la bibliothèque (mais vous
pouvez le faire dans les **notes**).

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
