
#Borrar las tablas en ese orden antes de crarlas denuevo 
# Drop es para borrar 
DROP TABLE IF EXISTS `user_sessions`;
DROP TABLE IF EXISTS `users`;



CREATE TABLE users (
    
    id VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,   -- Correo electrónico del usuario
    full_name VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_picture TEXT,  
    is_admin INT(1) NOT NULL DEFAULT 0,
    google_refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active INT(1) NOT NULL DEFAULT 1, -- 1 para activo, 0 para inactivo
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE user_sessions (
    refresh_token VARCHAR(36) NOT NULL UNIQUE,  -- Usando UUID como refresh token
    user_id VARCHAR(30) NOT NULL,               -- Foreign key referencing the users table
    user_agent VARCHAR(255),                    -- User agent information ( for tracking devices/browsers)
    ip_address VARCHAR(45),                     -- IP address of the session ( useful for security)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Token creation date
    expires_at TIMESTAMP,                       -- Expiration date of the refresh token
    PRIMARY KEY (refresh_token),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- Reference to the users table
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
