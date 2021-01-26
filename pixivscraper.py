import re
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

headers = {
    'user-agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
    'referer':'https://www.pixiv.net/ranking.php?mode=daily&content=illust',
}
#保存路径
path = 'I:/'
repeat =1

def getSinglePic(url):
    global repeat
    response = requests.get(url, headers=headers,verify=False)
    # 提取图片名称
    name = re.search('"illustTitle":"(.+?)"', response.text)
    name = name.group(1)
    if re.search('[\\\ \/ \* \? \" \: \< \> \|]', name) != None:
        name = re.sub('[\\\ \/ \* \? \" \: \< \> \|]', str(repeat), name)
        repeat += 1
    # 提取图片原图地址
    picture = re.search('"original":"(.+?)"},"tags"', response.text)
    pic = requests.get(picture.group(1), headers=headers,verify=False)
    f = open(path + '%s.%s' % (name, picture.group(1)[-3:]), 'wb')
    f.write(pic.content)
    f.close()


def getAllPicUrl():
    count = 1
    for n in range(1, 10 + 1):
        url = 'https://www.pixiv.net/ranking.php?mode=daily&content=illust&p=%d&format=json' % n
        response = requests.get(url, headers=headers,verify=False)
        illust_id = re.findall('"illust_id":(\d+?),', response.text)
        picUrl = ['https://www.pixiv.net/artworks/' + i for i in illust_id]
        for url in picUrl:
            print('正在下载第 %d 张图片' % count, end='   ')
            getSinglePic(url)
            print('下载成功', end='\n')
            count += 1
    return None

getAllPicUrl()

