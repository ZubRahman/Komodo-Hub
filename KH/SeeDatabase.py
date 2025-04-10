import sqlite3

#DB_FILE = "users.db"

def fetch_users():
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        
        if users:
            print("Users in the database:")
            for user in users:
                print(user)
        else:
            print("No users found.")

#fetch_users()
DB_FILE = "users.db"
fetch_users()