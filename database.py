import sqlite3

def init_db():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()

    # Таблица для отзывов
    c.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT,
            review TEXT NOT NULL,
            rating INTEGER NOT NULL
        )
    ''')

    # Таблица для пользователей, подписавшихся на рассылку
    c.execute('''
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

init_db()