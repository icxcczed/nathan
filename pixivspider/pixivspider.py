from selenium import webdriver
import time
import os
import subprocess
import base64
from lxml import etree
##  获取浏览器的数据，要先在自己的浏览器登陆一遍
## driver = webdriver.Chrome()
profile_dir = r"C:\Users\Administrator\AppData\Local\Google\Chrome\User Data"
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("user-data-dir="+os.path.abspath(profile_dir))
driver = webdriver.Chrome(chrome_options=chrome_options)  
##
thunder_path = 'D:\Thunder Network\Thunder\Program\Thunder.exe'
def Url2Thunder(url):
    url = 'AA' + url + 'ZZ'
    url = base64.b64encode(url.encode('ascii'))
    url = b'thunder://' + url
    thunder_url = url.decode()
    return thunder_url


def download_with_thunder(file_url):
    thunder_url = Url2Thunder(file_url)
    subprocess.call([thunder_path, thunder_url])

for i in range(1, 2): #用了一个笨方法打开作者的每一页
    driver.get("https://www.pixiv.net/member_illust.php?id=13895186&p=%d" % i)  #想要爬的画师的网址
    time.sleep(5)
    #print(driver.page_source)
    page = driver.page_source
    dom = etree.HTML(page)
    time.sleep(2)
    ids = dom.xpath('//img[contains(@src,"")]/@src')
    #print(ids)
    for id in ids:
        #print(id)
        if ('250x250' in id) == True:
             date_id = id.strip('https://i.pximg.net/c/250x250_80_a2/')
             date_id = date_id.strip('square1200.jpg')
             #print(date_id)
             img_url = 'https://i.pximg.net/img' + date_id + 'master1200.jpg'
             name = img_url.split('/')[-1]
             #print(img_url)
             download_with_thunder(img_url)  #使用迅雷下载  直接request.get的话会没有访问权限
        time.sleep(1)

