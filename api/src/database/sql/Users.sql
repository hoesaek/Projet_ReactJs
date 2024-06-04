create table IF NOT EXISTS Users (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50)
);
INSERT OR IGNORE into Users (id, first_name, last_name, email) values (1, 'fravoit', 'Xerbiul', 'Xervv@hc360.com');
INSERT OR IGNORE into Users(id, first_name, last_name, email) values (2, 'Carle', 'Seder', 'Serdde@wiley.com');
INSERT OR IGNORE into Users (id, first_name, last_name, email) values (3, 'leo', 'Raftuh', 'RAflo@digg.com');
INSERT OR IGNORE into Users (id, first_name, last_name, email) values (4, 'Abdooul', 'Chulou', 'Douul@g.co');
INSERT OR IGNORE into Users (id, first_name, last_name, email) values (5, 'Mateo', 'Louvier', 'Louteo@nbcnews.com');
