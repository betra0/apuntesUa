from database.db import MySQLConnectionManager
from utils.logger import Logger
#from models.entities.user import User
#from models.entities.user_session import UserSession

class ModelSession():

    db = MySQLConnectionManager() 

    
    
    @classmethod
    def createSession(cls, session):
         conexion = cls.db.create_connection()
         cursor = conexion.cursor()
         try:
             sql = """INSERT INTO user_sessions 
             (refresh_token, user_id, user_agent, ip_address, expires_at) 
             VALUES (%s, %s, %s, %s, %s)"""
             cursor.execute(sql, (
                                  session.refresh_token, 
                                  session.user_id,
                                  session.user_agent, 
                                  session.ip_address, 
                                  session.expires_at))
             conexion.commit()
             return True
         except Exception as e:
             conexion.rollback()
             Logger.add_to_log('error', e)
             raise
         
         finally:
             cls.db.close_connection(conexion)