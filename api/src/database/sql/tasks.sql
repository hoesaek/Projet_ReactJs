create table IF NOT EXISTS tasks (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	task_name VARCHAR(50),
	description VARCHAR(500),
	user INT,
	status VARCHAR(30),
	isArchived Boolean
);
INSERT OR IGNORE into tasks (id, task_name, description, user, status, isArchived) values (1, 'tache de test', 'cette tache est la premiere tache a tester', 1,'IN_PROGRESS',false);
INSERT OR IGNORE into tasks (id, task_name, description, user, status, isArchived) values (2, 'tache de test 2', 'cette tache est la premiere tache a tester', 1,'IN_PROGRESS',false);
INSERT OR IGNORE into tasks (id, task_name, description, user, status, isArchived) values (3, 'tache de test 3', 'cette tache est la premiere tache a tester', 4,'TERMINATED',true);
INSERT OR IGNORE into tasks (id, task_name, description, user, status, isArchived) values (4, 'tache de test 4', 'cette tache est la premiere tache a tester', null,'WAIT',false);
