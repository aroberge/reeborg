from browser import window

class Deque:
    '''Double-ended queue implemented for teaching purpose - not for efficiency.

       Designed to hold 2-tuples.

       Optional argument: no_colors  (set to False by default)
    '''

    def __init__(self, no_colors=False):
        self._list = window.RUR.create_deque(no_colors)
        self.no_colors = no_colors

    def __repr__(self):
        return self._list.toString()

    def __str__(self):
        return self._list.toString()

    def append(self, item):
        '''Adds an item (2-tuple) at the end of the Deque instance'''
        self._list.append([item[0], item[1]])

    def get_last(self):
        '''Returns the last added item (2-tuple) and removes it from the Deque instance'''
        return tuple(self._list.get_last())

    def get_first(self):
        '''Returns the first added item (2-tuple) and removes it from the Deque instance'''
        return tuple(self._list.get_first())

    def is_empty(self):
        return self._list.is_empty()

    def mark_done(self, item):
        '''Sets the color of the specified item (2-tuple) to the "done" value'''
        self._list.mark_done([item[0], item[1]])
        if not self.no_colors:
            window.RUR.record_frame()

    def set_palette(self, palette):
        '''specifies the color palette to use. Any existing color can be
           over-riden by passing a palette 'dict'. The defaults are

           palette = {'current': 'rgba(0, 255, 127, 0.5)',
                      'on_frontier': 'rgba(135, 206, 235, 0.5)',
                      'done': 'rgba(211, 211, 211, 0.5)'
                      }
        '''


def get_neighbours(node, ignore_walls=False, ordered=False, robot_body=None):
    '''Used for search algorithm

       Args: node (2-tuple)

       Optional args:
           ignore_walls: default is False

           ordered: default is False

           robot_body: default is the default robot's body

    '''
    options = {'ordered': ordered, 'ignore_walls': ignore_walls}
    if robot_body is not None:
        options['robot_body'] = robot_body

    neighbours = window.RUR.get_neighbours([node[0], node[1]], options)
    result = []
    for node in neighbours:
        result.append(tuple(node))
    return result