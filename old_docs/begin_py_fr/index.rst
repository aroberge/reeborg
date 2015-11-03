.. topic:: Préambule

  Comme vous le verrez dans ce document, je présente certaines règles à suivre
  pour que vos programmes soient mieux conçus.
  Une de ces règles est la suivante:

  .. important::
    **Règle numéro 3**

        Lorsque vous écrivez des programmes informatiques, ne vous répétez
        pas.
        Je répète: `ne vous répétez
        pas! <http://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas>`__

  J'ai décidé de suivre cette règle en préparant ce document.
  Plutôt que d'écrire un tutoriel destiné uniquement aux apprenants, et
  un autre document destinés aux enseignants, et encore un autre destiné
  aux développeurs, etc., j'ai choisi de tout mettre dans un seul document
  (en version française et anglaise).  Ainsi, lorsque je fais des
  changements, je n'ai qu'un seul document à mettre à jour dans les deux
  langues plutôt que 3 ou 4 comme j'avais auparavant.

.. warning::

      Ce document est en révision majeure, avec certaines sections disponibles
      uniquement en version anglaise.

Apprenez Python avec Reeborg!
=============================

C'est facile d'apprendre Python avec Reeborg.  Tout ce que vous avez
à faire dest de lire ce tutoriel et de faire tous les exemples
en utilisant `Le monde de Reeborg <http://reeborg.ca/monde.html>`_.
Je vous suggère d'avoir le tutoriel et le monde de Reeborg ouverts
en même temps, soit dans des fenêtres ou des onglets séparés.

Avant de débuter le tutoriel proprement dit, faites en sorte que
Reeborg fasse son tout premier pas en exécutant un programme dans
le monde de Reeborg.

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

Information pour les apprenants
-------------------------------

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

.. admonition:: Pour les enseignants, tuteurs, développeurs, etc.

    Vous trouverez des notes, généralement au bas des pages,
    expliquant certains détails au sujet de l'approche choisie
    pour la présentation de différents sujets.  Par exemple,
    il y a une de ces notes tout au bas de cette page



Table des matières:

.. toctree::
   :maxdepth: 2
   :numbered:

   move
   home
   bugs
   tokens1
   rule2
   summary1
   challenges1
   newspaper1
   rule3
   turn_around
   library
   reading
   newspaper2
   repeat
   summary2
   if
   at_goal
   else
   hurdles3
   not
   summary3
   while
   refine1
   refine2
   refine3
   refine4
   rule4
   surprises
   challenges2
   recursion
   recursion2
   recursion3
   recursion4
   summary4
   variables
   diary
   return
   newspaper3
   listes
   string_index
   for
   arguments1a
   arguments1b
   slice
   increment
   while_num
   harvest3
   better_repeat
   oop
   methods
   dir
   turn_right
   arguments2
   turn_right2
   javascript
   modulo
   facing_south
   left_is_clear
   leak
   testing
   conclusion
   future_ideas

.. admonition:: Pour les enseignants


    .. figure:: ../images/reeborg_judkis.jpg
       :figwidth: 35%
       :align: right

       Cette figurine de Reeborg a été faite par un étudiant du New Jersey
       (États-Unis) qui a appris la programmation Python à l'aide de
       RUR-PLE, un précurseur du Monde de Reeborg.

       *Photo courtoisie de A. Judkis.*

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

    Cependant, dans ce tutoriel, je vais au-delà de ce qui était possible
    avec le Karel de Pattis et j'essaie de couvrir autant de concepts
    que possibles en programmation Python.   Au-delà des concepts de base
    de la programmation, ce tutoriel offre ainsi un matériel d'enrichissement
    complémentaire à celui d'une approche plus traditionnelle, et permet
    de bien visualiser ce qui se passe dans un programme donné dans un
    contexte qui leur est familier.

    L'utilisation du Monde de Reeborg est **gratuite** et vous êtes libre
    de copier le site (et de le mettre sur un serveur local);
    aucune inscription n'est requise de la part des utilisateurs.

    **Apprentissage guidé par les tâches**

    Le Monde de Reeborg a été conçu pour un *apprentissage guidé par les
    tâches*: les apprenants doivent écrire des programmes permettant à Reeborg
    d'accomplir la tâche qui est décrite.

    Les tâches peuvent exiger à Reeborg de déplacer des objets, de construire
    des murs ou d'aller à un endroit donné.  Dans le Monde de Reeborg,
    les objets sont en couleurs; si un objet doit être déplacé à un endroit donné,
    cet endroit est indiqué par une image en ton de gris du même objet.

    .. image:: ../images/simple_task.gif

    Si vous avez des exercices additionnels
    (en particulier, des tâches pour Reeborg) que
    vous trouvez utiles pour vos étudiants, j'apprécierais beaucoup si
    vous pouviez les partager pour que je puisse améliorer ce tutoriel.
