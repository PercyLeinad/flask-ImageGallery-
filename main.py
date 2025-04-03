import os
import re

IMAGE_DIR = os.path.join(os.path.dirname(__file__), 'static', 'images')

vals = os.listdir(IMAGE_DIR)

def sorter(dir):
    num = re.search('\d*',dir).group()
    return int(num)




print(sorted(vals,key=sorter))

