from browser import window

class Container:
    '''Generic container created for teaching purpose - not for efficiency'''

    def __init__(self, no_colors=False):
        self._list = window.RUR.create_container(no_colors)
        self.no_colors = no_colors

    def __repr__(self):
        return self._list.toString()

    def __str__(self):
        return self._list.toString()

    def __getitem__(self, i):
        pass

    def append(self, item):
        '''Adds an item at the end of the container'''
        self._list.append([item[0], item[1]])

    def get_last(self):
        '''Returns the last added item and removes it from the container'''
        return tuple(self._list.get_last())

    def get_first(self):
        '''Returns the first added item and removes it from the container'''
        return tuple(self._list.get_first())

    def is_empty(self):
        return self._list.is_empty()

    def mark_done(self, item):
        self._list.mark_done([item[0], item[1]])
        if not self.no_colors:
            window.RUR.record_frame()


def get_neighbours(cell):
    '''Used for search algorithm'''
    neighbours = window.RUR.get_neighbours([cell[0], cell[1]])
    result = []
    for cell in neighbours:
        result.append(tuple(cell))
    return result