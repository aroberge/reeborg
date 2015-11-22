Apprenez Python avec Reeborg!
=============================

C'est facile d'apprendre Python avec Reeborg.  Tout ce que vous avez
à faire dest de lire ce tutoriel et de faire tous les exemples
en utilisant le `Monde de Reeborg <http://reeborg.ca/monde.html>`_.
Je vous suggère d'avoir le tutoriel et le monde de Reeborg ouverts
en même temps, soit dans des fenêtres ou des onglets séparés.

Avant de débuter le tutoriel proprement dit, faites en sorte que
Reeborg fasse son tout premier pas en exécutant un programme dans le
`Monde de Reeborg <http://reeborg.ca/monde.html>`_.

Si vous n'êtes pas certain de la marche à suivre, cliquez sur
l'**indice** ci-dessous.

.. hint::

    Allez au `Monde de Reeborg <http://reeborg.ca/monde.html>`_,
    et cliquez sur le bouton "exécution"
    (petit triangle blanc sur fond bleu)
    et observez Reeborg faire son premier pas.
    Vous pouvez aussi visionnez
    `cette courte vidéo en anglais <http://youtu.be/yTdw97KNgGM>`_
    pour voir de quoi cela a l'air.  Vous voudrez probablement voir la
    vidéo en mode plein écran avec la qualité HD.

Vous désirez apprendre la programmation?
----------------------------------------

.. figure:: ../images/student.jpg
   :figwidth: 40%
   :align: right

   Élève utilisant le Monde de Reeborg en Californie (États-Unis)

   *Photo courtoisie de A. Castano.*

**Le Monde de Reeborg a été conçu pour vous!**

En créant le Monde de Reeborg, mon but était d'offrir un environnement
convivial pour apprendre les concepts de la programmation informatique.
Bien qu'il soit possible d'utiliser Javascript comme langage de programmation
dans le Monde de Reeborg, je me concentre sur Python, un langage mieux conçu
que Javascript, aussi bien pour les débutants que pour les
programmeurs plus avancés.

Ce tutoriel est écrit en premier pour vous.  Cela dit, j'ai inclus
des informations pour les enseignants ainsi que pour d'autres types
d'utilisateurs du Monde de Reeborg. Vous pouvez ignorer ces informations
supplémentaires sans craintes: les sections écrites pour vous devraient
contenir toute les informations dont vous devriez avoir besoin
pour votre apprentissage.

Ce document est divisé en neuf parties majeures.

.. toctree::
   :maxdepth: 1

   A. Tutoriel de base <basics/index>
   B. Récursitivité <recursion/index>
   C. Les variables <variables/index>
   D. La programmation orientée objet <oop/index>
   E. Fonctions d'ordre supérieur <functional/index>
   F. Exercices supplémentaires <exercises/index>
   G. Référence du Monde de Reeborg <reference/index>
   H. Python: un bref survol <python/index>
   I. Contribuez!  <contribute/index>
   help

Si vous cliquez sur un des liens ci-dessus, vous serez redirigé vers
une page qui incluera une table des matières plus détaillée pour la
partie en question.


.. admonition:: Pour les enseignants

    .. figure:: ../images/rurple_book.png

       *Deux livres (rouge pour les enseignants, bleu pour les élèves)
       produit par Samsung Korea et basé sur RUR-PLE, le programme traditionnel
       précurseur du Monde de Reeborg.*


    Le Monde de Reeborg a été grandement inspiré par le
    `Robot Karel`_ inventé par Richard Pattis.
    Trois langages de programmation (Python, Javascript et CoffeeScript)
    peuvent être utilisés pour contrôler le robot.
    Cependant, ce tutoriel est basé sur Python qui est mon langage favori
    et que plusieurs considèrent comme un langage idéal pour enseigner
    les concepts de la programmation à des débutants.

    .. _Robot Karel: http://www.amazon.ca/Karel-Robot-Gentle-Introduction-Programming/dp/0471089281/ref=sr_1_6?s=books&ie=UTF8&qid=1440177128&sr=1-6

    L'approche que j'ai choisie d'utiliser est d'éviter aussi longtemps
    que possible d'utiliser des variables ainsi que des fonctions avec
    des arguments.  Cette approche reflète l'approche utilisée par
    Pattis avec le Karel original pour lequel les variables n'existaient pas.
    Cette approche est utilisée dans les deux premières parties, soit
    le **Tutoriel de base**, et la **Récursivité**.

    Le Monde de Reeborg a été créé avec le but de simplifier autant
    que possible l'idée originale de Pattis tout en permettant de
    démontrer des concepts de programmation avancés.  Ceci veut dire
    qu'au lieu du "programme le plus simple":

    .. code-block:: java

        public class BonjourMonde {
            public static void main(String[] args) {
                System.out.println("Bonjour monde!");
            }
        }

    présenté dans certains cours soit-disant destinés aux débutants,
    le programme valide le plus simple dans le Monde de Reeborg est::

        avance()

    Une seule instruction: qu'est-ce qui pourrait être plus simple
    que cela pour enseigner à des débutants?

    Cependant, vous n'êtes pas limités à n'utiliser que de simple
    fonctions.  Par exemple, si vous désirez utiliser une approche
    de Programmation Orientée Objet, vous pouvez écrire un programme
    comme le suivant::

        reeborg = RobotUsage()
        reeborg.avance()

    Ou encore, si vous voulez enseigner un concept comme l'utilisation
    de fonctions ou classes définies dans un bibliothèque standard,
    vous pouvez débuter par un exemple utilisant une bibliothèque
    avec des fonctions définies par les apprenants::

        from biblio import tourne_a_droite
        tourne_a_droite()

    L'idée de base de mon approche est de faire en sorte que
    l'apprenant n'ait à apprendre de nouveaux concepts qu'un seul
    à la fois, avec une progression simple.

    Cependant, dans ce tutoriel, je vais au-delà de ce qui était possible
    avec le Karel de Pattis et j'essaie de couvrir autant de concepts
    que possibles en programmation Python.   Au-delà des concepts de base
    de la programmation, ce tutoriel offre ainsi un matériel d'enrichissement
    complémentaire à celui d'une approche plus traditionnelle, et permet
    de bien visualiser ce qui se passe dans un programme donné dans un
    contexte qui leur est familier.

    **Apprentissage guidé par les tâches**

    Le Monde de Reeborg a été conçu pour un *apprentissage guidé par les
    tâches*: les apprenants doivent écrire des programmes permettant à Reeborg
    d'accomplir la tâche qui est décrite.  Lorsqu'un programme est terminé,
    une comparaison est faite de façon automatique entre ce qui est attendu
    de l'état du monde et ce qui est observé; par la suite, une rétroaction
    est fournie immédiatement à l'apprenant.

    Les tâches peuvent exiger à Reeborg de déplacer des objets, de construire
    des murs ou d'aller à un endroit donné.  Dans le Monde de Reeborg,
    les objets sont en couleurs; si un objet doit être déplacé à un endroit donné,
    cet endroit est indiqué par une image en ton de gris du même objet.

    .. image:: ../images/simple_task.gif

    Si vous avez des exercices additionnels
    (en particulier, des tâches pour Reeborg) que
    vous trouvez utiles pour vos étudiants, j'apprécierais beaucoup si
    vous pouviez les partager pour que je puisse améliorer ce tutoriel.

    **Gratuit et libre**

    L'utilisation du Monde de Reeborg est **gratuite** et vous êtes libre
    de copier le site (et de le mettre sur un serveur local);
    aucune inscription n'est requise de la part des utilisateurs.