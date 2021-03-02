import scrapy
from scrapy.selector import Selector
import html5lib
from lab1.items import RepkaItem


class UkrNetSpider(scrapy.Spider):
    name = "repka"
    custom_settings = {
        'ITEM_PIPELINES': {
            'lab1.pipelines.RepkaPipeline': 300,
        }
    }
    allowed_domains = ["repka.ua"]
    start_urls = [
        "https://repka.ua/products/operativnaja-pamjat/",
        "https://repka.ua/products/televizory/",
        "https://repka.ua/products/noutbuki/",

    ]
    selectors = {
        'product-name': ".//div[@class='product-item-name']//a/text()",
        'product': "//li[@class='item product product-item']",
        'product-url': ".//div[@class='product-item-name']//a/@href",
        'product-price': ".//span[@class='price']/text()",
        'product-image': ".//img/@data-src",
        'product-description-info': ".//div[@class='product-item-inner']//li/text()",
        'product-description-title': ".//div[@class='product-item-inner']//li/span/text()"
    }

    @staticmethod
    def is_str_empty(s):
        return len(s.replace(" ", "")) > 0

    def parse(self, response):
        correct_html = html5lib.serialize(html5lib.parse(response.body))
        selector = Selector(text=correct_html)
        products = selector.xpath(self.selectors['product'])[:20]
        for prod in products:
            item = RepkaItem()
            name = prod.xpath(self.selectors['product-name']).extract()[0]
            url = prod.xpath(self.selectors['product-url']).extract()[0]
            price = prod.xpath(self.selectors['product-price']).extract()[0]
            image = prod.xpath(self.selectors['product-image']).extract()[0]
            descr_titles = prod.xpath(
                self.selectors["product-description-title"]).extract()
            descr_info = prod.xpath(
                self.selectors["product-description-info"]).extract()
            descr_info = list(filter(self.is_str_empty, descr_info))
            item['name'] = name
            item['url'] = url
            item['price'] = price
            item['image'] = image
            item['description_titles'] = descr_titles
            item['description_info'] = descr_info
            yield item
