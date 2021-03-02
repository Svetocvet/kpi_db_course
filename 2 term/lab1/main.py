from scrapy import cmdline
from lxml import etree
import datetime

cmdline.execute("scrapy crawl ukr.net".split())
cmdline.execute("scrapy crawl repka".split())

#Task1
root = None
with open('results/ukr_net.xml', encoding="utf-8",  mode="r") as file:
    root = etree.parse(file)

#Task2
pagesCount = root.xpath('count(//page)')
textFragmentsCount = root.xpath('count(//fragment[@type="text"])')
print(f'{datetime.date.today()} Average number of text fragments per page {textFragmentsCount / pagesCount}')


dom = etree.parse('results/repka.xml')
xslt = etree.parse('repka.xslt')
transform = etree.XSLT(xslt)
new_dom = transform(dom)
with open('results/repka.html', 'wb') as f:
    f.write(etree.tostring(new_dom, pretty_print=True))
    
print("Finished")