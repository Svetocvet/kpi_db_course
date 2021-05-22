import pandas as pd
import re
from db import db
import random
import faker
from filter import filter as vacancy_row_filter
from datetime import datetime, date

fake = faker.Faker()
fake.add_provider(faker.providers.date_time)

REQUIRED_FIELDS = ['city', 'skills', 'experience', 'language', 'position', 'education', 'salary', 'company_size',
                   'publication_date']


def convert_2011_salary(row):
    if row['Валюта'] == 'h':
        return row['salary'] / 8
    else:
        return row['salary']


LIST_SKILLS_PER_SPECIALITY = {
    'Дизайнер': ['Photoshop', 'Adobe XD', 'MacOS', 'HTML', 'CSS', 'Gimp', 'Maketing', 'Zepelin'],
    'C#/.NET': ['ASP.NET', '.NET', 'Angular', 'Entities Framework', 'OOP'],
    'C++': ['Qt', 'IoT', 'Highload'],
    'Gamedev': ['Unreal', 'Unity', 'Sound design', 'Gamedesign', 'Multiplayer', 'PhysicX', 'DirectX', 'OpenGL',
                'Vulcan'],
    "HTML/CSS/JavaScript": ['ES 5', 'ES 6', 'ES 7', 'tensorflow', 'React', 'Vue', 'Angular', 'Vuex', 'Redux', 'CSS',
                            'HTML', 'Stylus',
                            'Typescript', 'fullstack'
                                          'SCSS', 'SASS', 'Google Maps API', 'Web sockets', 'OAuth', 'OAuth2', 'JWT',
                            'DOM',
                            ],
    'Java': ['Spring', 'Hibernate', 'SOLID', 'Swing', 'JavaFX'],
    'Mobile': ['Kotlin', 'Java', 'Swift', 'UX', 'Maps API', 'push notifications', 'React Native', 'Objective C'],
    'Objective C': ['iPad', 'iPhone', 'iWatch', 'Apple TV'],
    'Oracle': ['SQL'],
    'PHP': ['MySQL', 'CSS', 'HTML', 'SASS', 'Less', 'Stylus', 'SCSS'],
    'Project manager': ['English', 'German', 'French', 'Scrum', 'Agile', 'Kanban'],
    'Python': ['Django', 'pandas', 'Mongo', 'OpenCV', 'tensorflow', 'Flask', 'Deep leaning', 'Machine leaning', 'numpy',
               'scrapy', 'Data science'],
    'QA/Testing': ['Manual', 'Automatic', 'mocha + chai', 'pyTest', 'jUnit', 'selenium'],
    'Ruby/Rails': []
}
BASE_SKILLS = ['OOP', 'KISS', 'SOLID', 'Patterns', 'MySQL', 'PostgreSQL', 'Git', 'Kafka', 'RabbitMQ', 'CI', 'CD',
               'Docker', 'WebRTC', 'gRPC', 'Stateless', 'AWS', 'Azure',
               'Highload', 'Gitlab CI', 'Jenkins', 'WebSockets']


def get_skills(row):
    speciality = row['language']
    l = BASE_SKILLS
    if speciality in LIST_SKILLS_PER_SPECIALITY:
        l = l + LIST_SKILLS_PER_SPECIALITY[speciality]
    return list(set(random.choices(l, k=random.randint(1, 5))))


def load_data(file, rename_maps, year, map_lambdas={}):
    print('load %s' % file)
    df = pd.read_csv(file)
    df = df.rename(index=str, columns=rename_maps)
    df['company_size'] = df.apply(lambda row: int(re.findall(r'\d+', row['company_size'])[-1]) or 100, axis=1)
    df['experience'] = df.apply(lambda row: float(re.findall(r'[\d.]+', row['experience'])[-1]) or 1, axis=1)
    df['skills'] = df.apply(get_skills, axis=1)
    for key, cb in map_lambdas.items():
        df[key] = df.apply(cb, axis=1)
    df['publication_date'] = df.apply(
        lambda row: datetime.combine(
            fake.date_between(start_date=date(year, 1, 1), end_date=date(year, 12, 31)),
            datetime.min.time()), axis=1)
    df = df[REQUIRED_FIELDS]
    df = df[df.apply(vacancy_row_filter, axis=1)]
    db.insert_many(df.to_dict('records'))


if __name__ == '__main__':
    db.drop()
    load_data(file='./csv-initial-data/2011_may_clean.csv',
              rename_maps={
                  'Город': 'city',
                  'Опыт.работы.на.текущем.месте': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              map_lambdas={'salary': convert_2011_salary},
              year=2011
              )
    load_data(file='./csv-initial-data/2012_may_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2012
              )
    load_data(file='./csv-initial-data/2013_may_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2013
              )
    load_data(file='./csv-initial-data/2014_may_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2014
              )
    load_data(file='./csv-initial-data/2015_may_raw.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий опыт работы': 'experience',
                  'Должность': 'position',
                  'Зарплата в месяц': 'salary',
                  'Язык программирования': 'language',
                  'Размер компании': 'company_size',
                  'Образование': 'education'
              },
              year=2015
              )
    load_data(file='./csv-initial-data/2016_may_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2016
              )
    load_data(file='./csv-initial-data/2017_dec_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2017
              )
    load_data(file='./csv-initial-data/2018_jun_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2018
              )
    load_data(file='./csv-initial-data/2019_dec_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2019
              )
    load_data(file='./csv-initial-data/2020_june_final.csv',
              rename_maps={
                  'Город': 'city',
                  'Общий.опыт.работы': 'experience',
                  'Должность': 'position',
                  'Язык.программирования': 'language',
                  'Размер.компании': 'company_size',
                  'Образование': 'education'
              },
              year=2020
              )
