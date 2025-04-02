import sqlite3

# Connect to the database (or create it if it doesn't exist)
conn = sqlite3.connect('users.db')

# Create a cursor object
cursor = conn.cursor()

# Create the users table
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT NOT NULL
)
''')

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database setup complete.")
