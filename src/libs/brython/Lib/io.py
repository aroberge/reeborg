import builtins

open = builtins.open

# for seek()
SEEK_SET = 0
SEEK_CUR = 1
SEEK_END = 2

class StringIO:

    def __init__(self,initial_value='',newline=None):
        self.value = initial_value
        self.newline = newline
        self._pos = len(initial_value)
    
    def write(self,data):
        self.value += data
    
    def read(self,nb=-1):
        if nb!=-1:
            res = self.value[self._pos:self._pos+nb]
            self._pos = min(self._pos+nb,len(self.value)-1)
        else:
            res = self.value[self._pos:]
            self._pos = len(self.value)-1
        return res

TextIOWrapper = StringIO

class RawIOBase:

    def read(self,n=-1):
        pass
    def readall(self):
        pass
    def readinto(self,b):
        pass
    def write(self,b):
        pass

BufferedReader = RawIOBase
