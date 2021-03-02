import scrapy
from scrapy.selector import Selector
import html5lib
from lab1.items import UkrNetPage


class UkrNetSpider(scrapy.Spider):
    name = "ukr.net"
    custom_settings = {
        'ITEM_PIPELINES': {
            'lab1.pipelines.UkrNetPipeline': 300,
        }
    }
    allowed_domains = ["ukr.net"]
    start_urls = ["https://ukr.net"]

    @staticmethod
    def is_str_empty(s):
        return len(s) > 0

    def parse(self, response):
        correct_html = html5lib.serialize(html5lib.parse(response.body))
        selector = Selector(text=correct_html)
        page = UkrNetPage()
        links = selector.xpath("//a/@href").extract()
        images = selector.xpath("//img/@src").extract()
        corrected_images = []
        for img in images:
            correct_img = img
            if img.startswith('//'):
                correct_img = img.split('//')[1]
            corrected_images.append(correct_img)
        text = filter(self.is_str_empty, map(lambda s: s.strip(),
                                             [text.extract() for text in
                                              response.xpath("//*[not(self::script)]/text()")]))
        page['url'] = response.request.url
        page['fragment_img'] = corrected_images
        page['fragment_text'] = text
        ukr_net_url = "www.ukr.net"
        wrong_start = "www."
        new_links_list = []
        for link in links:
            if ukr_net_url in link:
                correct_url = link
                if link.startswith("//"):
                    correct_url = link.split('//')[1]
                if correct_url.startswith(wrong_start):
                    correct_url = "https://" + correct_url
                new_links_list.append(correct_url)
        yield page
        links = new_links_list[:20]
        for link in links:
            yield response.follow(link, callback=self.parse)
