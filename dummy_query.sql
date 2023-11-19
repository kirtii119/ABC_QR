CREATE DATABASE ABC;
CREATE TABLE users (
    name VARCHAR(255) NOT NULL,
    flag BOOLEAN,
    regno VARCHAR(20) UNIQUE
);
INSERT INTO users (name, flag, regno) VALUES ('John Doe', 0, 'ABC123');
INSERT INTO users (name, flag, regno) VALUES ('Jane Smith', 0, 'XYZ789');
INSERT INTO users (name, flag, regno) VALUES ('Alice Johnson', 0, 'DEF456');
INSERT INTO users (name, flag, regno) VALUES ('Manoj Agarwal', 0, 'GHI789');
INSERT INTO users (name, flag, regno) VALUES ('Bob Williams', 0, 'RHBVCVB');