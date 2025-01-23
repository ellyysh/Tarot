import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sqlite3
import random
from flask import Flask, render_template, request, redirect, url_for
from database import init_db

app = Flask(__name__)
@app.route('/shur')
def shur():
    return render_template('shur.html')
@app.route('/game')
def game():
    return render_template('game.html')
    
@app.route('/pay')
def pay():
    return render_template('pay.html')
@app.route('/index')
def index():
    return render_template('index.html')
@app.route('/rasklad')
def rasklad():
    return render_template('rasklad.html')
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
@app.route('/about')
def about():
    return render_template('about.html')
# Инициализация базы данных
init_db()

def send_email(to_email, subject, body):
    # Настройки SMTP для Gmail
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465  
    smtp_username = 'veryberry.khv@gmail.com'  # Ваш email
    smtp_password = '777897m77'  # Ваш пароль (или приложение)

    # Создание сообщения
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = to_email
    msg['Subject'] = subject

    # Добавление тела письма
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Отправка email
        server = smtplib.SMTP_SSL(smtp_server, smtp_port)  # Используйте SSL
        server.login(smtp_username, smtp_password)  # Вход в систему
        server.send_message(msg)  # Отправка сообщения
        server.quit()
        print(f'Email sent to {to_email}')
    except Exception as e:
        print(f'Failed to send email to {to_email}: {e}')

def save_review(name, email, review, rating, subscribe):
    # Подключаемся к текущей базе данных, указанной в конфигурации Flask
    db_path = app.config.get('DATABASE', 'reviews.db')
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # Если отзыв пустой, заменяем его на случайный из списка
    if not review.strip():
        random_reviews = [
            "Прекрасный сайт!",
            "Очень понятный и удобный интерфейс!",
            "Мне даже еще и заплатили за расклад!",
            "Спасибо вам за спасенную судьбу",
            "Профессионалы своего дела",
            "Лучший сервис",
            "Невероятно! Очень доволен",
            "Еще не раз воспользуюсь услугой",
            "ВЕЛИКОЛЕПНО",
            "Расклад действительно сбылся, спасибо вам"
        ]
        review = random.choice(random_reviews)

    # Сохраняем отзыв
    c.execute('INSERT INTO reviews (name, email, review, rating) VALUES (?, ?, ?, ?)',
              (name, email, review, rating))

    # Если пользователь согласен на рассылку, сохраняем его данные
    if subscribe:
        c.execute('INSERT INTO subscribers (name, email) VALUES (?, ?)', (name, email))

        # После сохранения подписчика отправляем Email
        email_subject = "Thank you for your review!"
        email_body = f"Здравствуйте {name},\n\nСпасибо за ваш отзыв:\n\n{review}\n\nМы рады, что вам понравилось!"
        send_email(email, email_subject, email_body)

    conn.commit()
    conn.close()

def get_reviews():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()

    # Получение всех отзывов
    c.execute('SELECT name, review, rating FROM reviews')
    reviews = c.fetchall()

    conn.close()
    return reviews

@app.route('/', methods=['GET', 'POST'])
def review_form():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        review = request.form['review']
        rating = request.form.get('rating')
        subscribe = request.form.get('subscribe') is not None

        save_review(name, email, review, rating, subscribe)

        return redirect(url_for('review_form'))

    reviews = get_reviews()  # Получение всех отзывов для отображения
    return render_template('index.html', reviews=reviews)

if __name__ == '__main__':
    app.run(debug=True)
