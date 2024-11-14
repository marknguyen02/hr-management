from app.core.database import get_connection
from app.models.login_request import LoginRequest

def get_all_accounts():
    conn = get_connection()
    accounts = []
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT username, password FROM users")
        result = cursor.fetchall()
        for row in result:
            accounts.append(LoginRequest(username=row[0], password=row[1]))
        cursor.close()
        conn.close()
    return accounts


def get_account_by_username(username: str):
    conn = get_connection()
    user = None
    if conn:
        cursor = conn.cursor()
        cursor.execute('SELECT username, password FROM users WHERE username = %s', (username,))
        result = cursor.fetchone()
        
        if result:
            user = LoginRequest(username=result[0], password=result[1])
        
        cursor.close()
        conn.close()
    
    return user