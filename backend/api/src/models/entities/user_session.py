from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
import uuid

class UserSession:
    def __init__(self, 
                 refresh_token='', 
                 user_id='', 
                 user_agent='', 
                 ip_address='', 
                 created_at=None, 
                 expires_at=None):
        
        self.refresh_token = refresh_token
        self.user_id = user_id
        self.user_agent = user_agent
        self.ip_address = ip_address
        self.created_at = created_at
        self.expires_at = expires_at
    
    def getdict(self):
        return {
            'refresh_token': self.refresh_token,
            'user_id': self.user_id,
            'user_agent': self.user_agent,
            'ip_address': self.ip_address,
            'created_at': self.created_at,
            'expires_at': self.expires_at
        }
    @classmethod
    def generateToken(self):
        return str(uuid.uuid4())
    



