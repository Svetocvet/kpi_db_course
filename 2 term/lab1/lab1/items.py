# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class UkrNetPage(scrapy.Item):
    url = scrapy.Field()
    fragment_img = scrapy.Field()
    fragment_text = scrapy.Field()


class RepkaItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    url = scrapy.Field()
    description_titles = scrapy.Field()
    description_info = scrapy.Field()
    image = scrapy.Field()

