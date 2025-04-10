import sqlite3
import os

# Connect to the database (or create it if it doesn't exist)

def create_users():
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
    print("Users database setup complete.")
    return "Database setup complete."

def create_gamescore():
    conn = sqlite3.connect("gamescore.db")
    cursor = conn.cursor()

    # Ensure scores are linked to users
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            score INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')

    conn.commit()
    
    # Check if the table was created successfully
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='scores'")
    if cursor.fetchone():
        print("Game scores table exists.")
    else:
        print("Failed to create game scores table!")
    
    # Check if there are any scores in the database
    cursor.execute("SELECT COUNT(*) FROM scores")
    count = cursor.fetchone()[0]
    print(f"Found {count} scores in the database.")
    
    conn.close()
    print("Game score database setup complete.")
    return "Database setup complete."

# Make sure the database files exist
if not os.path.exists('users.db'):
    print("Creating users.db...")
else:
    print("users.db already exists.")

if not os.path.exists('gamescore.db'):
    print("Creating gamescore.db...")
else:
    print("gamescore.db already exists.")

create_gamescore()
create_users()

# Add a function to check the contents of gamescore.db
def check_gamescore_db():
    try:
        conn = sqlite3.connect("gamescore.db")
        cursor = conn.cursor()
        
        # Check the structure of the scores table
        cursor.execute("PRAGMA table_info(scores)")
        columns = cursor.fetchall()
        print("Scores table structure:")
        for column in columns:
            print(f"  {column}")
        
        # Check the number of scores
        cursor.execute("SELECT COUNT(*) FROM scores")
        count = cursor.fetchone()[0]
        print(f"Total scores in database: {count}")
        
        # Get a sample of scores
        if count > 0:
            cursor.execute("SELECT * FROM scores LIMIT 5")
            scores = cursor.fetchall()
            print("Sample scores:")
            for score in scores:
                print(f"  {score}")
        
        conn.close()
    except Exception as e:
        print(f"Error checking gamescore.db: {e}")

print("\nChecking gamescore.db contents:")
check_gamescore_db()
