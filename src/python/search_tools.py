from browser import window

class Deque:
    '''Double-ended queue implemented for teaching purpose - not for efficiency.

       Designed to hold n-tuples.

       Optional argument: no_colors  (set to False by default)
    '''

    def __init__(self, no_colors=False):
        self._deque = window.RUR.create_deque(no_colors)
        self.no_colors = no_colors

    def __repr__(self):
        return self._deque.toString()

    def __str__(self):
        return self._deque.toString()

    def append(self, node):
        '''Adds an node (n-tuple) at the end of the Deque instance'''
        self._deque.append(list(node))

    def get_last(self):
        '''Returns the last added node (n-tuple) and removes it from the Deque instance'''
        return tuple(self._deque.get_last())

    def get_first(self):
        '''Returns the first added node (n-tuple) and removes it from the Deque instance'''
        return tuple(self._deque.get_first())

    def is_empty(self):
        '''Returns True if there are no nodes remaining, false otherwise.'''
        return self._deque.is_empty()

    def mark_done(self, node):
        '''Sets the color of the specified node (n-tuple) to the "done" value'''
        self._deque.mark_done(list(node))
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
        self._deque.set_palette(palette)


def get_neighbours(node, ignore_walls=False, ordered=False, robot_body=None, track_turns=False):
    '''Used for search algorithm

       Args: node (n-tuple)

       Optional args:
           ignore_walls: default is False

           ordered: default is False

           robot_body: default is the default robot's body

    '''
    options = {'ordered': ordered,
               'ignore_walls': ignore_walls,
               'track_turns': track_turns}
    if robot_body is not None:
        options['robot_body'] = robot_body


    neighbours = window.RUR.get_neighbours(list(node), options)
    result = []
    for node in neighbours:
        result.append(tuple(node))
    return result