Autre livraison de journal
===========================

Retournons à l'exemple de la livraison des journaux à Monsieur
Pattis et le monde
**Journal 0**. Ci-dessous est la première solution que vous avez du trouver,
avec quelques commentaires rajoutés.


.. code-block:: python
    :linenos:

    prend()  # le journal

    # monter au premier
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()
    avance()
    avance()

    # monter au deuxième
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()
    avance()
    avance()

    # monter au troisième
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()
    avance()
    avance()

    depose()  # le journal

    # demi-tour
    tourne_a_gauche()
    tourne_a_gauche()

    # descendre un étage
    avance()
    avance()
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()

    # descendre un autre étage
    avance()
    avance()
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()

    # descendre un autre étage
    avance()
    avance()
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    tourne_a_gauche()
    tourne_a_gauche()

Cette solution est plutôt longue ... et il est facile de faire des
erreurs. On remarque cependant qu'il y a plusieurs répétitions, ce qui
suggère qu'on peut définir plusieurs fonctions. Nous avons déjà défini
``tourne_a_droite`` et ``demi_tour`` qui devrait être dans votre
bibliothèque. Utilisons-les et définissons d'autres fonctions.

.. code-block:: python
    :linenos:

    from biblio import tourne_a_droite, demi_tour

    def monter_un_etage():
        tourne_a_gauche()
        avance()
        tourne_a_droite()
        avance()
        avance()

    def monter_trois_etages():
        monter_un_etage()
        monter_un_etage()
        monter_un_etage()

    def descendre_un_etage():
        avance()
        avance()
        tourne_a_gauche()
        avance()
        tourne_a_droite()

    def descendre_trois_etages():
        descendre_un_etage()
        descendre_un_etage()
        descendre_un_etage()

    # === Fin des définitions ===

    prend()  # le journal
    monter_trois_etages()
    prendre_la_monnaie()
    depose()  # le journal
    demi_tour()
    descendre_trois_etages()

Chaque fonction de contient pas plus de 5 instructions; c'est très
facile de vérifier que chaque fonction est correctement définie
individuellement comparativement à ce que nous avions à faire auparavant
avec la longue liste de définitions. Une fois que l'on a défini les
fonctions requises, il est facile d'écrire un programme: 6 lignes
suffisent pour faire en sorte que Reeborg livre le journal et retourne
au rez-de-chaussée. Les définitions de fonctions permettent donc
d'éviter plein de répétitions, et facilitent la compréhension.


.. topic:: Allez-y!

    Écrivez le programme ci-dessus et assurez-vous qu'il fonctionne.
    Lorsque ce sera fait, vous serez prêt à apprendre un autre truc
    qui permettra de le simplifier encore davantage.


Puisque des fonctions comme ``monter_un_etage``, ``monter_trois_etages``,
etc., sont spécifiques à une tâche en particulier, ce n'est probablement
pas une bonne idée de les sauvegarder dans la bibliothèque.
