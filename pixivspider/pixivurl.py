#https://blog.csdn.net/qq_42951560/article/details/109410214?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
headers={'referer':'https://www.pixiv.net'}

url='https://i.pximg.net/img-master/img/2020/10/29/00/21/14/85300778_p1_master1200.jpg'
myfile = requests.get(url,headers=headers,verify=False)
open('G:/wallpaper/85300778p1.jpg','wb').write(myfile.content)
