"""Ce module contient les fonctions, classes et exceptions qui peuvent être
utilisées dans un programme Python pour le Monde de Reeborg.
"""

# Important: Multiline docstrings should have their text start
# on the second line. This results in nicer formatting when
# using help().

# When generating documentation using sphinx, these modules are both
# unavailable and not needed
try:
    from browser import window
    RUR = window.RUR
except ImportError:
    from collections import defaultdict
    window = defaultdict(str)
    print("\n --> Skipping importing from browser for sphinx.\n")

# All functions from Javascript used below should have names of the form
# RUR._xyz_ and be defined in commands.js; functions and methods should appear
# in the same order as they appear in the English version.


def au_but():  #py:at_goal
    """
    Indique si Reeborg a atteint la position demandée.

    Returns:
        True si Reeborg a atteint son but, False autrement.
    """
    return RUR._at_goal_()


def construit_un_mur():  #py:build_wall
    """Indique à Reeborg de construire un mur devant sa position."""
    RUR._build_wall_()


def transporte(obj=None):  #py:carries_object
    """
    Indique si Reeborg transporte un ou des objets.

    Args:
        obj: paramètre optionnel qui est le nom d'un objet sous forme de
            chaîne de caractères.

    Returns:
        Si aucun argument n'est spécifié et que Reeborg transporte des
        objets, un dict décrivant les objets transportés et leur nombre est
        retourné.
        Si un objet est spécifié comme argument et que Reeborg transporte
        au moins un objet de ce type, le nombre de ces objets est retourné.
        Si Reeborg ne transporte aucun objet,
        ou si un objet spécifié comme paramètre n'est pas présent,
        le résultat est zéro.

    Exemples possibles:

        >>> transporte()
        {"jeton": 2, "pomme": 1}
        >>> transporte("jeton")
        2
        >>> transporte("fraise")
        0
    """
    if obj is not None:
        return RUR._carries_object_(obj)
    else:
        ans = RUR._carries_object_()
        if ans:
            return dict(ans)
        else:
            return 0


def efface_print():  #py:clear_print
    """Efface le texte précédemment écrit avec des fonctions print()."""
    RUR._clear_print_()


def couleur_ici():  #py:color_here
    '''Retourne la valeur de la couleur trouvée à la position de Reeborg.'''
    return RUR._color_here_()


def robot_par_defaut():  #py:default_robot
    """Retourne un robot recréé pour correspondre au robot par défaut."""
    class Robot(RobotUsage):
        def __init__(self):
            self.body = RUR._default_robot_body_()
    return Robot()


def robot_spécifique(numero_de_serie):  #py:default_robot
    """
    Ceci n'est pas une fonction que vous devriez avoir à utiliser.

    Si un robot avec le numéro de série spécifié existe, cette fonction
    retourne un robot recréé pour correspondre à ce robot;
    sinon, la valeur None est retournée."""
    r = RUR.get_robot_body_by_id(numero_de_serie)
    if r is None:
        return r
    class Robot(RobotUsage):
        def __init__(self):
            self.body = r
    return Robot()
robot_specifique = robot_spécifique

def termine():  #py:done
    """
    Termine l'exécution d'un programme.

    Si cette fonction est invoqué en mode REPL, une vérification du ou
    des buts de ce monde est faite.
    """
    RUR._done_()


def rien_devant():  #py:front_is_clear
    """
    Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
    bloque le chemin.

    Returns:
       True si le chemin est non bloqué, False autrement."""
    return RUR._front_is_clear_()


def est_face_au_nord():  #py:is_facing_north
    """Indique si Reeborg fait face au nord (haut de l'écran) ou non."""
    return RUR._is_facing_north_()

def avance():  #py:move
    """Avance d'une case"""
    RUR._move_()


def nouvelles_images_de_robot(images):  #py:new_robot_images
    """
    Surtout destiné aux créateurs de mondes, ceci permet de remplacer
    les images utilisées pour le robot par d'autres images.

    Au lieu d'utiliser cette fonction Python, il est préférable d'utiliser
    RUR.new_robot_images dans l'éditeur Onload de façon à s'assurer d'avoir
    les images requises le plus rapidement possible.

        Args:
            images: un "dict" Python
            images[modèle]: Le nom du modèle de robot; si aucun nom n'est
              spécifié, le mot anglais "anonymous" sera utilisé.

            images["est"]  Un lien (url) pour la source de l'image à utiliser
            pour un robot dans l'orientation est (vers la droite de l'écran).
            Si cette valeur n'est pas spécifiée, l'image "classique" sera
            utilisée par défaut.  On peut utiliser l'argument anglais
            ("east" plutôt que "est") et obtenir le même résultat.

            images["nord"] ou images["north"]  Similaire à images["est"]

            images["ouest"] ou images["west"]  Similaire à images["est"]

            images["sud"] ou images["south"]   Similaire à images["est"]
    """
    if "est" in images:
        images["east"] = images["est"]
    if "ouest" in images:
        images["west"] = images["ouest"]
    if "nord" in images:
        images["north"] = images["nord"]
    if "sud" in images:
        images["south"] = images["sud"]
    RUR._new_robot_images_(images)


def pas_de_surlignement():  #py:no_highlight
    """
    Empêche le surlignement de lignes de code d'être effectué.
    """
    RUR._no_highlight_()


def objet_ici(obj=None):  #py:object_here
    """
    Indique si un ou des types d'objets se trouvent à la position du robot.

    Args:
        obj: paramètre optionnel qui est le nom d'un objet sous forme de
            chaîne de caractères.

    Returns:
        une liste d'objets retrouvés.  Si aucun objet n'est présent
        ou si un objet spécifié comme paramètre n'est pas présent,
        le résultat est une liste vide.

    N.B.: en Javascript, si aucun objet n'est trouvé, la valeur retournée
    est 'false'

    Exemples possibles:

        >>> objet_ici()
        ["jeton", "pomme"]
        >>> objet_ici("jeton")
        ["jeton"]
        >>> objet_ici("fraise")
        []
    """
    if obj is not None:
        ans = RUR._object_here_(obj)
    else:
        ans = RUR._object_here_()

    if ans:
        return list(ans)
    else:
        return []


def position_ici():
    '''
    Retourne un tuple (x, y) donnant les coordonnées du robot.

    La fonction correspondante en mode JavaScript retourne un "array"
    avec les valeurs [x, y].
    '''
    body = RUR._default_robot_body_()
    return (body.x, body.y)


def position_devant():
    '''
    Retourne un tuple (x, y) donnant les coordonnées de la position
    immédiatement devant le robot si la position est à l'intérieur
    des limites du monde, autrement un tuple nul est retourné.

    La fonction correspondante en mode JavaScript retourne un "array"
    avec les valeurs [x, y] ou "undefined" si la position n'est pas à
    l'intérieur des limites du monde.
    '''
    body = RUR._default_robot_body_()
    pos = RUR.get_position_in_front(body)
    if RUR.is_valid_position(pos["x"], pos["y"]):
        return (pos["x"], pos["y"])
    else:
        return tuple()


def colorie(couleur):  #py:paint_square
    """Colorie la case où se trouve Reeborg avec la couleur spécifiée"""
    RUR._paint_square_(couleur)


def pause(ms=None):  #py:pause
    """
    Pause l'éxecution du programme à l'écran.

    Si un argument (temps, en millisecondes) est fourni, l'exécution
    redémarre automatiquement après que ce temps ait été écoulé.
    """
    if ms is None:
        RUR._pause_()
    else:
        RUR._pause_(ms)


def print_html(html, replace=False):  #py:print_html
    """
    Surtout destiné aux créateurs de monde, la fonction print_html() est
    semblable à print() sauf qu'elle accepte du texte html.

    Args:
        html: le contenu (en format html) qui sera affich/.
        replace: si égal à True, l'ancien contenu sera remplacé par le nouveau;
            sinon, le nouveau contenu remplacera l'ancien.
    """
    RUR._print_html_(html, replace)


def depose(obj=None):  #py:put
    """
    Dépose un objet.

    Args:
        string: le nom de l'objet (optionel).
        Si Reeborg transporte plus d'un type d'objet,
        on doit spécifier lequel sinon ceci causera une exception.
    """
    if obj is None:
        RUR._put_()
    else:
        RUR._put_(obj)
dépose = depose


def lance(obj=None):
    """
    Reeborg lance un objet vers la case devant lui.

    Args:
        string: le nom de l'objet (optionel).
        Si Reeborg transporte plus d'un type d'objet,
        on doit spécifier lequel sinon ceci causera une exception.
    """
    if obj is None:
        RUR._toss_()
    else:
        RUR._toss_(obj)


def enregistrement(boolean):  #py:recording
    """
    Arrête ou redémarre les enregistrement d'actions de Reeborg.

    Args:
        bool: True si on veut avoir des enregistrement, False autrement

    Returns:
        La valeur de l'état d'enregistrement avant le changement.
    """
    return RUR._recording_(boolean)


def plus_de_robots():  #py:remove_robots
    """Élimine tous les robots existants"""
    RUR._remove_robots_()


def rien_a_droite():  #py:right_is_clear
    """
    Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
    se trouve à la droite immédiate de Reeborg.

    Returns:
       True si un obstacle est à la droite, False autrement."""
    return RUR._right_is_clear_()
rien_à_droite = rien_a_droite


def max_nb_instructions(nb):  #py:set_max_nb_steps
    """
    Surtout destiné aux créateurs de mondes,
    ceci permet de changer le nombre maximal d'instructions
    exécutées par un robot.
    """
    RUR._set_max_nb_steps_(nb)


def couleur_de_trace(couleur):  #py:set_trace_color
    """
    Change la couleur de trace du robot.

       Args:
            couleur: quatre formats sont possibles soit les noms de
                     couleur du web (en anglais), les formats rgb et rgba,
                     et la notation hexadécimale.

       Exemples possibles::

            >>> couleur_de_trace("red")  # nom de couleur en anglais
            >>> couleur_de_trace("rgb(125, 0, 0)")
            >>> couleur_de_trace("rgba(125, 0, 0, 0.5)")
            >>> couleur_de_trace("#FF00FF")
    """
    RUR._set_trace_color_(couleur)


def style_de_trace(style="normal"):  #py:set_trace_style
    """
    Change le style de trace du robot.

        Args:
            style: "épais" ou "epais" (sans accent) pour une trace
                   plus visible, "invisible" pour une trace invisible(!),
                   "normal" ou ne pas spécifier d'argument pour avoir
                   le style normal.

                   Le choix "invisible" est équivalent à
                   couleur_de_trace("rgba(0, 0, 0, 0)") c'est-à-dire
                   une couleur complètement transparente.

                   La trace plus épaisse est centrée et ne permet pas
                   de voir qu'un virage à droite est constitué de trois
                   virages à gauche, ni de distinguer les aller-retours.
    """
    if style in ["épais", "epais"]:
        style = "thick"
    elif style == "normal":
        style = "default"
    elif style == "invisible":
        pass  # leave as is
    else:
        raise ReeborgError("Valeur de style inconnue pour style_de_trace().")
    RUR._set_trace_style_(style)


def son(boolean):  #py:sound
    """Active ou désactive les effets sonores."""
    RUR._sound_(boolean)


def prend(obj=None):  #py:take
    """
    Prend un objet.

    Args:
        string: le nom de l'objet (optionel).
        Si plus d'un type d'objet se trouve à l'endroit où
        Reeborg est, on doit spécifier lequel sinon ceci causera une exception.

    """
    if obj is None:
        RUR._take_()
    else:
        RUR._take_(obj)


def pense(ms):  #py:think
    """
    Fixe un délai entre les actions de Reeborg à l'écran.

    Retourne la valeur précédente de ce délai.
    """
    return RUR._think_(ms)


def tourne_a_gauche():  #py:turn_left
    """Reeborg tourne à sa gauche."""
    RUR._turn_left_()
tourne_à_gauche = tourne_a_gauche


def mur_devant():  #py:wall_in_front
    """
    Indique si un mur bloque le chemin.

    Returns:
       True si un mur est devant, False autrement."""
    return RUR._wall_in_front_()


def mur_a_droite():  #py:wall_on_right
    """
    Indique si un mur se trouve immédiatement à la droite de Reeborg.

    Returns:
       True si un mur est à la droite, False autrement."""
    return RUR._wall_on_right_()
mur_à_droite = mur_a_droite


def MenuPersonnalise(contenu):  #py:MakeCustomMenu
    """
    À l'intention des éducateurs.  Permet de créer des menus de monde
    personalisés.  Voir la documentation pour plus de détails."""
    RUR._MakeCustomMenu_(contenu)
MenuPersonnalisé = MenuPersonnalise
MakeCustomMenu = MenuPersonnalise  # so that we can load menu files in any language


def Monde(url, nom=None):  #py:World
    """
    Permet de sélectioner un monde donné à l'intérieur d'un programme.
    Si le monde présentement utilisé est différent, le résultat de
    l'exécution de cette instruction fera en sorte que le monde spécifié
    par le paramètre `url` sera choisi sans que le reste du programme
    ne soit déjà exécuté. Si le monde spécifié est déjà le monde
    choisi, la fonction `Monde(...)` est ignorée et le reste
    du programme est exécuté.

    Le monde spécifié sera ajouté au sélecteur s'il n'est pas
    déjà présent.

       Args:
            url: deux choix possibles, soit un nom apparaissant dans le
                 sélecteur de monde, ou un lien à un document accessible
                 via Internet.
            nom: paramètre optionnel; si ce paramètre est choisi, le nom
                       apparaissant dans le sélecteur sera nom.

       Exemples:

           >>> Monde("But 1")  # monde inclus par défaut
           >>> Monde("http://reeborg.ca/mon_monde")   # exemple fictif
           # le nom http://reeborg.ca/mon_monde sera ajouté au sélecteur
           >>> Monde("http://reeborg.ca/mon_monde", "Bonjour")
           # le nom Bonjour sera ajouté au sélecteur pour indiquer ce monde.
    """
    if nom is None:
        RUR._World_(url)
    else:
        RUR._World_(url, nom)


class RobotUsage(object):  #py:UR
    '''Reeborg en version Programmation Orientée Objet'''
    def __init__(self, x=1, y=1, orientation='est', jeton=None, **kwargs):  #py:UR.__init__
        """
        Créé un robot usagé.

           Args:
               x: coordonnée horizontale; un entier supérieur ou égal à 1
               y: coordonnée vertical; un entier supérieur ou égal à 1
               orientation: une des valeurs suivantes: "nord", "sud",
                            est", "ouest", ou "random"
               jeton: nombre initial de jetons à donner au robot;
                      un entier positif, ou la chaîne "infinite" pour un
                      nombre infini.

               autres: tout autre argument (objet=nombre) va être considéré
                       comme étant un nombre d'objet devant être donné au
                       robot.
        """
        if jeton is None:
            robot = RUR.robot.create_robot(x, y, orientation)
        else:
            robot = RUR.robot.create_robot(x, y, orientation, jeton)
        for key in kwargs:
            if key not in {'x', 'y', 'orientation', 'jeton'}:
                RUR.give_object_to_robot(key, kwargs[key], robot)
        self.body = robot
        RUR.add_robot(self.body)

    def __str__(self):  #py:UR.__str__
        location = "({}, {})".format(self.body.x, self.body.y)

        if self.body._orientation == RUR.EAST:
            facing = "fait face à l'est"
        elif self.body._orientation == RUR.WEST:
            facing = "fait face à l'ouest"
        elif self.body._orientation == RUR.NORTH:
            facing = "fait face au nord"
        elif self.body._orientation == RUR.SOUTH:
            facing = "fait face au sud"

        carries = ''
        for obj in self.body.objects:
            if self.body.objects[obj] == 'inf':
                carries += "\ntransporte un nombre infini de %s" % obj
            else:
                carries += '\ntransporte %s %s' % (self.body.objects[obj], obj)
        if not carries:
            carries = "ne transporte pas d'objet"

        return "RobotUsage situé en {} {} {}.".format(location, facing, carries)  # NOQA

    def au_but(self):  #py:UR.at_goal
        """
        Indique si Reeborg a atteint la position demandée.

        Returns:
            True si Reeborg a atteint son but.
        """
        return RUR._UR.at_goal_(self.body)

    def construit_un_mur(self):  #py:UR.build_wall
        """Indique à Reeborg de construire un mur devant sa position."""
        RUR._UR.build_wall_(self.body)

    def transporte(self, obj=None):  #py:UR.carries_object
        """
        Indique si Reeborg transporte un ou des objets.

        Args:
            obj: paramètre optionnel qui est le nom d'un objet sous forme de
                chaîne de caractères.

        Returns:
            Si aucun argument n'est spécifié et que Reeborg transporte des
            objets, un dict décrivant les objets transportés et leur nombre est
            retourné.
            Si un objet est spécifié comme argument et que Reeborg transporte
            au moins un objet de ce type, le nombre de ces objets est retourné.
            Si Reeborg ne transporte aucun objet,
            ou si un objet spécifié comme paramètre n'est pas présent,
            le résultat est zéro.

        Exemples possibles:

            >>> reeborg = RobotUsage()
            >>> reeborg.transporte()
            {"jeton": 2}
            >>> reeborg.transporte("jeton")
            2
            >>> reeborg.transporte("fraise")
            0
        """
        if obj is not None:
            return RUR._UR.carries_object_(self.body, obj)
        else:
            ans = RUR._UR.carries_object_(self.body)
            if ans:
                return dict(ans)
            else:
                return 0

    def couleur_ici(self):  #py:color_here
        '''Retourne la valeur de la couleur trouvée à la position de Reeborg.'''
        return RUR._UR.color_here_(self.body)

    def rien_devant(self):  #py:UR.front_is_clear
        """
        Indique si un obstacle (mur, clôture, eau, mur de brique, ) bloque
        le chemin.

        Returns:
           True si le chemin est non bloqué, False autrement."""
        return RUR._UR.front_is_clear_(self.body)

    def est_face_au_nord(self):  #py:UR.is_facing_north
        """Indique si Reeborg fait face au nord (haut de l'écran) ou non."""
        return RUR._UR.is_facing_north_(self.body)

    def avance(self):  #py:UR.move
        """avance d'une case"""
        RUR._UR.move_(self.body)

    def objet_ici(self, obj=None):  #py:UR.object_here
        """
        Indique si un ou des types d'objets se trouvent à la position du robot.

        Args:
            obj: paramètre optionnel qui est le nom d'un objet sous forme de
                chaîne de caractères.

        Returns:
            une liste d'objets retrouvés.  Si aucun objet n'est présent
            ou si un objet spécifié comme paramètre n'est pas présent,
            le résultat est une liste vide.

        N.B.: en Javascript, si aucun objet n'est trouvé, la valeur retournée
        est 'false'


        Exemples possibles:

            >>> reeborg = RobotUsage()
            >>> reeborg.objet_ici()
            ["jeton", "pomme"]
            >>> reeborg.objet_ici("jeton")
            ["jeton"]
            >>> reeborg.objet_ici("fraise")
            []
        """
        if obj is not None:
            ans = RUR._UR.object_here_(self.body, obj)
        else:
            ans = RUR._UR.object_here_(self.body)
        if ans:
            return list(ans)
        else:
            return []

    def colorie(self, couleur):  #py:paint_square
        """Colorie la case où se trouve Reeborg avec la couleur spécifiée"""
        RUR._UR.paint_square_(couleur, self.body)


    def position_ici(self):
        '''
        Retourne un tuple (x, y) donnant les coordonnées du robot.

        La fonction correspondante en mode JavaScript retourne un "array"
        avec les valeurs [x, y].
        '''
        return (self.body.x, self.body.y)


    def position_devant(self):
        '''
        Retourne un tuple (x, y) donnant les coordonnées de la position
        immédiatement devant le robot si la position est à l'intérieur
        des limites du monde, autrement le tuple nul est retourné.

        La fonction correspondante en mode JavaScript retourne un "array"
        avec les valeurs [x, y] ou "undefined" si la position n'est pas à
        l'intérieur des limites du monde.
        '''
        pos = RUR.get_position_in_front(self.body)
        if RUR.is_valid_position(pos["x"], pos["y"]):
            return (pos["x"], pos["y"])
        else:
            return tuple()


    def depose(self, obj=None):  #py:UR.put
        """
        Dépose un objet.

        Args:
            string: le nom de l'objet (optionel).
            Si Reeborg transporte plus d'un type d'objet,
            on doit spécifier lequel sinon ceci causera une exception."""
        if obj is None:
            RUR._UR.put_(self.body)
        else:
            RUR._UR.put_(self.body, obj)
    dépose = depose


    def lance(self, obj=None):
        """
        Reeborg lance un objet vers la case devant lui.

        Args:
            string: le nom de l'objet (optionel).
            Si Reeborg transporte plus d'un type d'objet,
            on doit spécifier lequel sinon ceci causera une exception."""
        if obj is None:
            RUR._UR.toss_(self.body)
        else:
            RUR._UR.toss_(self.body, obj)


    def rien_a_droite(self):  #py:UR.right_is_clear
        """
        Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
        se trouve à la droite immédiate de Reeborg.

        Returns:
           True si un obstacle est à la droite, False autrement."""
        return RUR._UR.right_is_clear_(self.body)
    rien_à_droite = rien_a_droite


    def modele(self, modele):  #py:UR.set_model
        """
        Permet de choisir le modèle du robot.
        """
        RUR._UR.set_model_(self.body, modele)
    modèle = modele


    def couleur_de_trace(self, couleur):  #py:UR.set_trace_color
        """
        Change la couleur de trace du robot.

           Args:
                couleur: quatre formats sont possibles soit les noms de
                         couleur du web (en anglais), les formats rgb et rgba,
                         et la notation hexadécimale.

           Exemples possibles::

                >>> reeborg = RobotUsage()
                >>> reeborg.couleur_de_trace("red")  # nom anglais de couleur
                >>> reeborg.couleur_de_trace("rgb(125, 0, 0)")
                >>> reeborg.couleur_de_trace("rgba(125, 0, 0, 0.5)")
                >>> reeborg.couleur_de_trace("#FF00FF")
        """
        RUR._UR.set_trace_color_(self.body, couleur)

    def style_de_trace(self, style):  #py:UR.set_trace_style
        """
        Change le style de trace du robot.

           Args:
                style: "épais" ou "epais" (sans accent) pour une trace
                       plus visible, "invisible" pour une trace invisible(!),
                       "normal" ou ne pas spécifier d'argument pour avoir
                       le style normal.

                       La trace plus épaisse est centrée et ne permet pas
                       de voir qu'un virage à droite est constitué de trois
                       virages à gauche, ni de distinguer les aller-retours.
        """
        if style in ["épais", "epais"]:
            style = "thick"
        elif style == "invisible":
            pass
        elif style == "normal":
            style = "default"
        else:
            raise ReeborgError("Valeur de style inconnue pour style_de_trace().")  # NOQA
        RUR._UR.set_trace_style_(self.body, style)

    def prend(self, obj=None):  #py:UR.take
        """
        Prend un objet.

        Args:
            string: le nom de l'objet (optionel).
            Si plus d'un type d'objet se trouve à l'endroit où
            Reeborg est, on doit spécifier lequel sinon ceci causera une
            exception.
        """
        if obj is None:
            RUR._UR.take_(self.body)
        else:
            RUR._UR.take_(self.body, obj)

    def tourne_a_gauche(self):  #py:UR.turn_left
        """Fait en sorte que Reeborg tourne à sa gauche."""
        RUR._UR.turn_left_(self.body)
    tourne_à_gauche = tourne_a_gauche


    def mur_devant(self):  #py:UR.wall_in_front
        """
        Indique si un mur bloque le chemin.

        Returns:
           True si un mur est devant, False autrement."""
        return RUR._UR.wall_in_front_(self.body)

    def mur_a_droite(self):  #py:UR.wall_on_right
        """
        Indique si un mur se trouve immédiatement à la droite de Reeborg.

        Returns:
           True si un mur est à la droite, False autrement."""
        return RUR._UR.wall_on_right_(self.body)
    mur_à_droite = mur_a_droite

RobotUsagé = RobotUsage

#py:python_specific

def observer(expr):  #py:add_watch
    """
    Ajoute une expression Python valide (donnée comme une chaîne)
    à la liste des variables à observer.
    """
    RUR.add_watch(expr)


class ReeborgOK(Exception):  #py:RE
    """
    Exception spécifique au monde de Reeborg; utilisée pour indiquer
    qu'un programme s'est terminé de façon satisfaisante.

        Args:
            message
    """

    def __init__(self, message):  #py:RE.__init__
        self.reeborg_success = message
        self.message = message
        super().__init__(message)

    def __str__(self):  #py:RE.__str__
        return self.reeborg_success
try:
    window['ReeborgOK_fr'] = ReeborgOK
    window['ReeborgOk_fr'] = ReeborgOK # preventing an annoying typo
except:
    pass
ReeborgOk = ReeborgOK  # preventing an annoying typo


class ReeborgError(Exception):  #py:RE
    """
    Exception spécifique au monde de Reeborg.

       Exemples possible::

            def termine():  #py:
                message = "Vous ne devez pas utiliser termine()."
                raise ReeborgError(message)

            #---- ou ------

            try:
                avance()
            except ReeborgError:   # ignore le mur qui bloquait le chemin
                tourne_a_gauche()
    """

    def __init__(self, message):  #py:RE.__init__
        self.reeborg_failure = message
        self.message = message
        super().__init__(message)

    def __str__(self):  #py:RE.__str__
        return self.reeborg_failure
try:
    window['ReeborgError_fr'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):  #py:WCE
    """
    Exception spécifique au monde de Reeborg.

    A lieu lorsque Reeborg frappe un mur.
    """
    pass
try:
    window['WallCollisionError_fr'] = WallCollisionError
except:
    pass

class MissingObjectError(ReeborgError):
    """
    Exception spécifique au monde de Reeborg.

    Peut avoir lieu lorsque Reeborg essaie de prendre ou déposer un objet.
    """
    pass
try:
    window['MissingObjectError_fr'] = MissingObjectError
except:
    pass


class InfoSatellite():  #py:SI

    @property
    def carte_du_monde(self):  #py:SI.world_map
        """
        Retourne un dict qui contient l'information au
        sujet du monde.
        """
        import json
        return json.loads(RUR._world_map())

    def imprime_carte(self):  #py:SI.print_world_map
        """Imprime une copie formattée de la carte"""
        print(RUR._world_map())
