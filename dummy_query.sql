CREATE DATABASE ABC;
CREATE TABLE ABC.users (
    name VARCHAR(255) NOT NULL,
    flag BOOLEAN,
    regno VARCHAR(20) UNIQUE
);
INSERT INTO ABC.users (name, flag, regno) VALUES ('John Doe', 0, 'ABC123');
INSERT INTO ABC.users (name, flag, regno) VALUES ('Jane Smith', 0, 'XYZ789');
INSERT INTO ABC.users (name, flag, regno) VALUES ('Alice Johnson', 0, 'DEF456');
INSERT INTO ABC.users (name, flag, regno) VALUES ('', 1, 'GHI789');
INSERT INTO ABC.users (name, flag, regno) VALUES ('Bob Williams', 0, 'RHBVCVB');