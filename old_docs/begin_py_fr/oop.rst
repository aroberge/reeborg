Introduction à la POO en Python avec Reeborg
============================================


.. important::

   Traduction française à terminer ...

Comme vous le savez, Reeborg est en bien mauvais état.
Il peut seulement tourner vers sa gauche; sa boussole est brisée,
elle lui permet seulement de déterminer s'il fait face au nord ou non.
Reeborg ne peut pas tourner sa tête vers sa gauche; il ne peut donc
pas détecter s'il y a un mur à sa gauche sans tourner entièrement
son corps.
Finalement, il a une fuite d'huile ce qui est très mauvais
pour l'environnement.

Utilisant la **Programmation Orientée Objet** (POO), vous allez
apprendre à réparer Reeborg et à lui donner des capacités
additionnelles.


.. note::

   **Pour les experts !**

   Si vous connaissez déjà la programmation Python et vous utilisez
   le monde de Reeborg simplement pour vous amuser à utiliser ce que vous
   connaissez déjà, il peut arriver (très rarement je l'espère)
   que vous écriviez du code complètement
   valide mais dont le résultat ne soit pas conforme à vos attentes.
   La raison pour ceci est que le Monde de Reeborg a été écrit principalement
   en Javascript, avec une simple interface pour Python utilisant Brython.
   Le résultat est que certains objets, méthodes ou attributs Javascript
   ne sont pas disponibles directement.  De plus, les animations sont
   faites en clonant l'état du monde et en le sauvegardant dans le
   format JSON; si vous tentez de créer vos propres classes utilisant
   des objets déjà présents, il pourrait arriver que vous créiez des
   références circulaires qui vont résulter en des exceptions.

   En utilisant Brython, j'aurais pu écrire le logiciel entièrement en Python
   ... mais ceci n'aurait pas permis (du moins pas facilement) de pouvoir
   utiliser le site pour programmer Reeborg en utilisant
   Javascript ou CoffeeScript au lieu de Python, ce qui est possible
   présentement.


La notation "pointée"
=====================

Nous allons apprendre un style de programmation moderne
appelé la Programmation Orientée Objet [POO].
Mais avant d'écrire des programmes orientés-objet,
nous devons tout d'abord apprendre à lire et à comprendre
la notation utilisée.


Une vie de chien?
------------------

Milou est un chien.
Pendant une journée typique, il fait diverses actions:
il mange, il court, il dort, etc.   Voici comment
un programmeur utilisant la POO pourrait écrire ceci::


    Milou = Chien()
    Milou.mange()
    Milou.court()
    Milou.dort()

De plus, Milou a diverses qualités ou attributs.
Ces attributs sont des variables, comme nous avons vu auparavant,
sauf qu'elles "appartiennent" à Milou.
Par exemple, Milou est petit et son poil est noir.
Un programmeur pourrait décrire ceci comme suit::

    Milou.taille = "petit"
    Milou.couleur_de_poil = "noir"

Dans le langage de la programmation orientée objet, nous avons ce qui suit:

-  ``Chien`` est un exemple d'une **classe** d'objets.
-  ``Milou`` est une **instance** (objet) de la classe Chien.
-  ``mange(), court()`` et ``dort()`` sont des **méthodes** de la classe Chien;
   les **méthodes** sont essentiellement la même chose que les **fonctions**
   que nous avons vu précédemment: la seule différence est qu'elles
   "appartiennent" à une classe ou une instance de la classe donnée.
-  ``taille`` et ``couleur_de_poil`` sont des attributs d'une instance donnée;
   les attributs peuvent prendre n'importe quelle valeur qu'une variable "normale"
   pourrait prendre.
-  La relation entre un attribut ou une méthode et l'objet auquel il ou elle
   appartient est indiqué par un point écrit entre les deux.

Les objets peuvent avoir d'autres objets qui leur "appartiennent",
chacun avec ses propres méthodes ou attributs::

    Milou.queue.remue()
    Milou.queue.type = "fournie";
    Milou.patte_avant_gauche.bouge()
    Milou.tête.bouche.dents.canine.est_douloureuse()

Voyons maintenant comment Reeborg utilise la notation pointée.

Un robot usagé est baptisé
--------------------------

Jusqu'à maintenant, nous avons écrit des programmes sans utiliser
la notation pointée.  C'est le temps d'apprendre à le faire,
en commençant avec un exemple simple.

En premier, sélectionnez le monde **Vide** qui n'a aucun robot présent.

J'ai mentionné à plusieurs reprises que Reeborg était un robot usagé ...
Nous allons donc créer notre première instance d'un ``RobotUsage``
(sans accent aigu sur le e) et lui donner un nom familier!
Ensuite, nous allons lui demander de faire un pas vers l'avant.

.. topic:: À votre tour !

   Créez un robot et faites-le avancer d'un pas en utilisant le programme
   suivant::

      reeborg = RobotUsage()
      reeborg.avance()

   Lorsque vous aurez terminé, essayez d'écrire un programme plus complexe,
   en utilisant d'autres instructions.

.. important::

   Vous avez probablement remarqué que j'ai écrit le nom ``reeborg`` tout en
   lettres minuscules.  Lorsqu'on écrit des programmes en utilisant Python
   (ainsi que plusieurs autres langages informatiques), on utilise souvent
   la convention de donner des noms tout en lettres minuscules aux
   *instances* des classes d'objets, et de réserver les noms débutant avec
   une majuscule pour les classes elles-mêmes.  Donc ici, j'ai la classe
   d'objets ``RobotUsage`` et le nom d'une instance ``reeborg``.

   **Cependant** ... je ne suivrai pas toujours cette convention dans ce
   tutoriel; je suis trop habitué à écrire Reeborg avec un R majuscule.


Plusieurs robots
----------------

.. topic:: Essayez ceci!

   Sélectionnez le monde **Vide**, donc sans robots.  Puis exécutez le
   code suivant::

       reeborg = RobotUsage()
       reeborg.avance()
       erdna = RobotUsage()
       erdna.tourne_a_gauche()
       erdna.avance()
       reeborg.avance()

   Vous pouvez ajouter d'autres robots si vous le désirez!

Pour les programmeurs expérimentés
-----------------------------------

En plus de la notation pointée, il y a une autre façon d'obtenir la valeur
d'un attribut ou d'une méthode qui appartient à un objet en Python.
Supposons que j'ai la classe ``Chien`` comprenant ceci::

    milou = Chien()
    milou.taille = "petit"
    milou.court()   # action possible

Avec Python, la fonction ``getattr``  (de l'anglais *get attribute*)
permet de faire ce qui suit::

    la_taille = getattr(milou, "taille")   # donne "petit" pour la_taille
    action = getattr(milou, "court")
    action()     # équivalent de milou.court()

``getattr`` peut être très utile dans certains contextes, mais probablement
pas pour les tâches possibles du Monde de Reeborg.
