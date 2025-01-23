import unittest
import sqlite3
from app import app

class FlaskAppTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Инициализация приложения и создание временной базы данных."""
        app.config['TESTING'] = True
        app.config['DATABASE'] = 'test_reviews.db'
        cls.client = app.test_client()

        # Создаем тестовую базу данных
        with sqlite3.connect(app.config['DATABASE']) as conn:
            c = conn.cursor()
            c.execute('''CREATE TABLE reviews (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            email TEXT,
                            review TEXT,
                            rating INTEGER
                        )''')
            c.execute('''CREATE TABLE subscribers (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            email TEXT
                        )''')

    @classmethod
    def tearDownClass(cls):
        """Удаляем тестовую базу данных."""
        import os
        os.remove(app.config['DATABASE'])

    def setUp(self):
        """Очистка базы данных перед каждым тестом."""
        with sqlite3.connect(app.config['DATABASE']) as conn:
            c = conn.cursor()
            # Удаляем все записи из таблиц
            c.execute('DELETE FROM reviews')
            c.execute('DELETE FROM subscribers')
            # Сбрасываем автоинкремент
            c.execute('DELETE FROM sqlite_sequence WHERE name="reviews"')
            c.execute('DELETE FROM sqlite_sequence WHERE name="subscribers"')
            conn.commit()

    def test_routes(self):
        """Тестирование всех маршрутов."""
        routes = ['/shur', '/game', '/pay', '/index', '/rasklad', '/about']
        for route in routes:
            response = self.client.get(route)
            self.assertEqual(response.status_code, 200)

    def test_404_error(self):
        """Тестирование обработки ошибки 404."""
        response = self.client.get('/nonexistent')
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'404', response.data)

    def test_review_form_get(self):
        """Тестирование GET-запроса к форме отзывов."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Отзывы'.encode('utf-8'), response.data)

    def test_review_form_post(self):
        """Тестирование POST-запроса для добавления отзыва."""
        response = self.client.post('/', data={
            'name': 'Test User',
            'email': 'test@example.com',
            'review': 'Great service!',
            'rating': '5',
            'subscribe': 'on'
        }, follow_redirects=True)

        self.assertEqual(response.status_code, 200)

        # Проверяем, что отзыв добавлен в базу данных
        with sqlite3.connect(app.config['DATABASE']) as conn:
            c = conn.cursor()
            c.execute('SELECT name, rating FROM reviews WHERE email = ?', ('test@example.com',))
            review = c.fetchone()
            self.assertIsNotNone(review)
            self.assertEqual(review[0], 'Test User')
            self.assertEqual(review[1], 5)

        # Проверяем, что пользователь добавлен в подписчики
        with sqlite3.connect(app.config['DATABASE']) as conn:
            c = conn.cursor()
            c.execute('SELECT name, email FROM subscribers WHERE email = ?', ('test@example.com',))
            subscriber = c.fetchone()
            self.assertIsNotNone(subscriber)
            self.assertEqual(subscriber[0], 'Test User')

if __name__ == '__main__':
    unittest.main()
