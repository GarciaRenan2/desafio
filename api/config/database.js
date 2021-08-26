const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const TIPO_SCHEMA =
`
CREATE TABLE IF NOT EXISTS tipo (
    id_tipo INTEGER NOT NULL UNIQUE PRIMARY KEY,
    desc_tipo VARCHAR(50) NOT NULL,
    pode_excluir BOOLEAN NOT NULL DEFAULT 1
);
`;

const INSERT_DEFAULT_TIPO =
`
INSERT INTO tipo (
  desc_tipo,
  pode_excluir
) VALUES ('Desenvolvimento', 1), ('Atendimento', 1), ('Manutenção', 1), ('Manutenção Urgente', 0);
`;

const ATIVIDADE_SCHEMA = `
CREATE TABLE IF NOT EXISTS atividade (
    id_atividade INTEGER NOT NULL UNIQUE PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    desc_atividade TEXT NOT NULL,
    id_tipo INTEGER NOT NULL,
    finalizada BOOLEAN NOT NULL DEFAULT 0,
    dt_criacao TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY(id_tipo) REFERENCES tipo(id_tipo) ON DELETE CASCADE
);
`;

const INSERT_DEFAULT_ATIVIDADE =
`
INSERT INTO atividade (
  titulo,
  desc_atividade,
  id_tipo,
  finalizada,
  dt_criacao
) VALUES ('Atividade 1', 'Atividade Desenvolvimento', 1, 0, date('now')),
      ('Atividade 2', 'Atividade Atendimento', 2, 1, date('now')),
      ('Atividade 3', 'Atividade Manutenção', 3, 0, date('now')),
      ('Atividade 4 ', 'Atividade Manutenção Urgente', 4, 0, date('now'));
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(TIPO_SCHEMA);
    db.run(INSERT_DEFAULT_TIPO);
    db.run(ATIVIDADE_SCHEMA);
    db.run(INSERT_DEFAULT_ATIVIDADE);
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;
