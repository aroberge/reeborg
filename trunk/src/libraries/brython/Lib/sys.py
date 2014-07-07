# hack to return special attributes
from _sys import *
from javascript import JSObject

has_local_storage=__BRYTHON__.has_local_storage
has_json=__BRYTHON__.has_json

argv = ['__main__']

base_exec_prefix = __BRYTHON__.brython_path

base_prefix = __BRYTHON__.brython_path

builtin_module_names=__BRYTHON__.builtin_module_names

byteorder='little'

def exc_info():
    exc = __BRYTHON__.exception_stack[-1]
    return (exc.__class__,exc,exc.traceback)
    
exec_prefix = __BRYTHON__.brython_path

executable = __BRYTHON__.brython_path+'/brython.js'

def exit(i=None):
    raise SystemExit('')

class flag_class:
  def __init__(self):
      self.debug=0
      self.inspect=0
      self.interactive=0
      self.optimize=0
      self.dont_write_bytecode=0
      self.no_user_site=0
      self.no_site=0
      self.ignore_environment=0
      self.verbose=0
      self.bytes_warning=0
      self.quiet=0
      self.hash_randomization=1

flags=flag_class()

def getfilesystemencoding(*args,**kw):
    """getfilesystemencoding() -> string    
    Return the encoding used to convert Unicode filenames in
    operating system filenames."""
    return 'utf-8'
    
maxsize=2147483647

maxunicode=1114111

path = __BRYTHON__.path

path_hooks = list(JSObject(__BRYTHON__.path_hooks))

platform="brython"

prefix = __BRYTHON__.brython_path

version = '.'.join(str(x) for x in __BRYTHON__.version_info[:3])
#todo, put in a 'real' date, etc
version += " (default, Feb 29 2013, 00:00:00) \n[Javascript 1.5]"
hexversion = 0x03000000   # python 3.0

class __version_info(object):
    def __init__(self, version_info):
        self.version_info = version_info
        self.major = version_info[0]
        self.minor = version_info[1]
        self.micro = version_info[2]
        self.releaselevel = version_info[3]
        self.serial = version_info[4]

    def __getitem__(self, index):
        if isinstance(self.version_info[index], list):
           return tuple(self.version_info[index])
        return self.version_info[index]

    def hexversion(self):
        try:
          return '0%d0%d0%d' % (self.major, self.minor, self.micro)
        finally:  #probably some invalid char in minor (rc, etc)
          return '0%d0000' % (self.major)

    def __str__(self):
        _s="sys.version(major=%d, minor=%d, micro=%d, releaselevel='%s', serial=%d)"
        return _s % (self.major, self.minor, self.micro, 
                     self.releaselevel, self.serial)
        #return str(self.version_info)

#eventually this needs to be the real python version such as 3.0, 3.1, etc
version_info=__version_info(__BRYTHON__.version_info)

class _implementation:
  def __init__(self):
      self.name='brython'
      self.version = __version_info(__BRYTHON__.implementation)
      self.hexversion = self.version.hexversion()
      self.cache_tag=None

  def __repr__(self):
      return "namespace(name='%s' version=%s hexversion='%s')" % (self.name, self.version, self.hexversion)

  def __str__(self):
      return "namespace(name='%s' version=%s hexversion='%s')" % (self.name, self.version, self.hexversion)

implementation=_implementation()

class _hash_info:
  def __init__(self):
      self.width=32, 
      self.modulus=2147483647
      self.inf=314159 
      self.nan=0
      self.imag=1000003
      self.algorithm='siphash24' 
      self.hash_bits=64 
      self.seed_bits=128 
      cutoff=0

  def __repr(self):
      #fix me
      return "sys.hash_info(width=32, modulus=2147483647, inf=314159, nan=0, imag=1000003, algorithm='siphash24', hash_bits=64, seed_bits=128, cutoff=0)"

hash_info=_hash_info()

warnoptions=[]

def getfilesystemencoding():
    return 'utf-8'

#delete objects not in python sys module namespace
del JSObject
del _implementation
