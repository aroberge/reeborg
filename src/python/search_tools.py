'''search_tools: collection of useful tools for demonstrating search algorithms.

See: https://aroberge.gitbooks.io/reeborg-s-world-advanced-world-creation/content/searching/search.html

'''
from browser import window

class Deque:
    '''Double-ended queue implemented for teaching purpose - not for efficiency.

       Designed to hold n-tuples.

       Optional argument: no_colors  (set to False by default)
    '''

    def __init__(self, no_colors=False):
        self.deque = window.RUR.create_deque(no_colors)
        self.no_colors = no_colors

    def __repr__(self):
        return self.deque.toString()

    def __str__(self):
        return self.deque.toString()

    def append(self, node):
        '''Adds an node (n-tuple) at the end of the Deque instance'''
        self.deque.append(list(node))

    def get_last(self):
        '''Returns the last added node (n-tuple) and removes it from the Deque instance'''
        return tuple(self.deque.get_last())

    def get_first(self):
        '''Returns the first added node (n-tuple) and removes it from the Deque instance'''
        return tuple(self.deque.get_first())

    def is_empty(self):
        '''Returns True if there are no nodes remaining, false otherwise.'''
        return self.deque.is_empty()

    def mark_done(self, node):
        '''Sets the color of the specified node (n-tuple) to the "done" value'''
        self.deque.mark_done(list(node))
        if not self.no_colors:
            window.RUR.record_frame()

    def set_palette(self, palette):
        '''
        Specifies the color palette to use. Any existing color can be
        over-riden by passing a palette 'dict'. The defaults are

            {'current': 'rgba(0, 255, 127, 0.5)',
             'on_frontier': 'rgba(135, 206, 235, 0.5)',
             'done': 'rgba(211, 211, 211, 0.5)'
            }
        '''
        self.deque.set_palette(palette)

################################
class PriorityQueue:
    '''Priority queue implemented for teaching purpose - not for efficiency.

       Designed to hold 2-tuple: (node, cost).

       Optional argument: no_colors  (set to False by default)
    '''

    def __init__(self, no_colors=False):
        self.priority_queue = window.RUR.create_priority_queue(no_colors)
        self.no_colors = no_colors

    def __repr__(self):
        return self.priority_queue.toString()

    def __str__(self):
        return self.priority_queue.toString()

    def add(self, node, cost):
        '''Adds an item at the end of the PriorityQueue instance'''
        self.priority_queue.add(list(node), cost)

    def get_best(self):
        '''Returns the lowest cost node and removes it from the PriorityQueue instance'''
        return tuple(self.priority_queue.get_best())

    def is_empty(self):
        '''Returns True if there are no items remaining, false otherwise.'''
        return self.priority_queue.is_empty()

    def mark_done(self, node):
        '''Sets the color of the specified node (n-tuple) to the "done" value'''
        self.priority_queue.mark_done(node)
        if not self.no_colors:
            window.RUR.record_frame()

    def set_palette(self, palette):
        '''
        Specifies the color palette to use. Any existing color can be
        over-riden by passing a palette 'dict'. The defaults are

            {'current': 'rgba(0, 255, 127, 0.5)',
             'on_frontier': 'rgba(135, 206, 235, 0.5)',
             'done': 'rgba(211, 211, 211, 0.5)'
            }
        '''
        self.priority_queue.set_palette(palette)


################################


class Graph:
    '''Representing Reeborg's World as a graph.

       Optional argument:

            robot_body: if unspecified and a robot is present in the world
                when an instance of Graph is created, the corresponding
                robot_body will be used as the default.

            ordered: used by neighbours

            ignore_walls: used by neighbours

            turn_left: used by neighbours
    '''

    def __init__(self, robot_body=None, ordered=False, ignore_walls=False,
                       turn_left=False):
        options = {
            "robot_body": robot_body,
            "ordered": ordered,
            "ignore_walls": ignore_walls,
            "turn_left": turn_left
        }
        self.graph = window.RUR.create_graph(options)

    def neighbours(self, node):
        '''Used for search algorithm

        Args: node (n-tuple)

        '''
        _neighbours = self.graph.neighbours(list(node))
        result = []
        for node in _neighbours:
            result.append(tuple(node))
        return result

    def cost(self, current, neighbour):
        return self.graph.cost(current, neighbour);


def find_goal_bfs(start, goal, graph, no_colors=False):
    '''Finds a goal from a starting position using a breadth-first algorithm.

       Arguments:

            start: the starting node for a graph; it is a 2-tuple (x, y) or
                   3-tuple (x, y, orientation)

            goal: the end node for a graph; it is a 2-tuple or 3-tuple;
                  however, only the first two items (x, y) are used.

            graph: a Graph instance representing the world.

            no_colors: default False; indicate if colors must be used to show
                the progression of the algorithm.

        Returns:
            came_from, current

            came_from is a dict containing the path.

            current is the last node explored when the goal was reached.
            '''
    frontier = Deque(no_colors=no_colors)
    frontier.append(start)
    came_from = {start: None}

    while not frontier.is_empty():
        current = frontier.get_first()
        for neighbour in graph.neighbours(current):
            if neighbour not in came_from:
                frontier.append(neighbour)
                came_from[neighbour] = current
                if (neighbour[0], neighbour[1]) == (goal[0], goal[1]):
                    return came_from, neighbour
        frontier.mark_done(current)


def reconstruct_path(came_from, start, current):
    '''Reconstruct a path.  The path is all the nodes, to go from start to
       goal, excluding start itself.

       Arguments:

          came_from: a dict containing the path information

          start: the starting node

          current: the current end node

       Returns:

          path: a list containing the nodes
    '''
    path = []
    while current != start:
        path.append(current)
        current = came_from[current]

    path.reverse()
    return path


def manhattan_distance(a, b):
    '''Calculates the manhattan distance between two nodes. The first two
       items in a node are assumed to be the x and y coordinates.
    '''
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def facing(robot):
    '''returns the direction ("east", "north", "west" or "south") in
       which the robot is facing
    '''
    RUR = window.RUR
    directions = [(RUR.EAST, "east"),
                  (RUR.NORTH, "north"),
                  (RUR.WEST, "west"),
                  (RUR.SOUTH, "south")]
    for D, d in directions:
        if robot.body._orientation == D:
            return d
