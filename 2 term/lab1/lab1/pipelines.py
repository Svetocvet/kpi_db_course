from lxml import etree


class UkrNetPipeline:
    def open_spider(self, spider):
        self.root = etree.Element('data')

    def close_spider(self, spider):
        with open('results/ukr_net.xml', 'wb') as f:
            etree.ElementTree(self.root).write(f, pretty_print=True, encoding="UTF-8")

    def process_item(self, item, spider):
        page = etree.SubElement(self.root, 'page', url=item['url'])
        for txt in item['fragment_text']:
            etree.SubElement(page, 'fragment', type='text').text = txt
        for img in item['fragment_img']:
            etree.SubElement(page, 'fragment', type='image').text = img
        return item


class RepkaPipeline:
    def open_spider(self, spider):
        self.root = etree.Element('products')

    def close_spider(self, spider):
        with open('results/repka.xml', 'wb') as f:
            etree.ElementTree(self.root).write(f, pretty_print=True, encoding="UTF-8")

    def process_item(self, item, spider):
        descr_titles = item['description_titles']
        descr_info = item['description_info']
        prod = etree.SubElement(self.root, 'product')
        etree.SubElement(prod, 'name', type='text').text = item['name']
        etree.SubElement(prod, 'url', type='url').text = item['url']
        etree.SubElement(prod, 'price', type='number').text = item['price']
        etree.SubElement(prod, 'image', type='url').text = item['image']
        description = etree.SubElement(prod, 'description', type='text')
        for i in range(len(descr_titles)):
            etree.SubElement(description, 'title', type='text').text = descr_titles[i]
            etree.SubElement(description, 'info', type='text').text = descr_info[i]
        return item
