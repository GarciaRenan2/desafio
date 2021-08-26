const atividadeConverter = (row) => ({
  idAtividade: row.id_atividade,
	titulo: row.titulo,
	descAtividade: row.desc_atividade,
	idTipo: row.id_tipo,
	finalizada: row.finalizada,
	dtCriacao: new Date(row.dt_criacao),
  descTipo: row.desc_tipo,
});

class AtividadeDao {
  constructor(db) {
    this._db = db;
  }

  listAllActivitiesOpen() {
    return new Promise((resolve, reject) => {
      this._db.all(
          `
            SELECT  a.*, t.*
            FROM atividade as a
              JOIN tipo t ON t.id_tipo = a.id_tipo
              WHERE finalizada = 0
            ORDER BY a.dt_criacao DESC;
          `,
        (err, rows) => {
          const atividades = rows.map(atividadeConverter);
          console.log(atividades);
          if (err) {
            console.log(err);
            return reject("Can`t list activities");
          }
          console.log("Atividades retornados");
          console.log(atividades);
          resolve(atividades);
        }
      );
    });
  }

  listAllActivitiesFinalized() {
    return new Promise((resolve, reject) => {
      this._db.all(
          `
            SELECT  a.*, t.*
            FROM atividade as a
              JOIN tipo t ON t.id_tipo = a.id_tipo
              WHERE finalizada = 1
            ORDER BY a.dt_criacao DESC;
          `,
        (err, rows) => {
          const atividades = rows.map(atividadeConverter);
          console.log(atividades);
          if (err) {
            console.log(err);
            return reject("Can`t list activities");
          }
          console.log("Atividades retornados");
          console.log(atividades);
          resolve(atividades);
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) =>
      this._db.get(
          `
            SELECT  a.*, t.*
            FROM atividade as a
              join tipo t on t.id_tipo = a.id_tipo
            WHERE a.id_atividade = ?
            ORDER BY a.dt_criacao DESC;
          `,
        [id],
        (err, row) => {
          if (err) {
            console.log(err);
            return reject("Can`t find activity");
          }
          if (row) resolve(atividadeConverter(row));
          resolve(null);
        }
      )
    );
  }

  edit(atividade) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
          UPDATE atividade
            SET titulo = ?,
                desc_atividade = ?,
                id_tipo = ?,
                finalizada = ?
            where id_atividade = ?;
          `,
        [
          atividade.titulo,
          atividade.descAtividade,
          atividade.idTipo,
          atividade.finalizada,
          atividade.idAtividade,
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Can`t edit atividade");
          }
          resolve(atividade);
        }
      );
    });
  }

  add(atividade) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
          INSERT INTO atividade (
            titulo,
            desc_atividade,
            id_tipo,
            dt_criacao
          ) values (?, ?, ?, ?);
          `,
        [
          atividade.titulo,
          atividade.descricao,
          atividade.tipo,
          new Date(),
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Can`t add atividade");
          }
          resolve(atividade);
        }
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) =>
      this._db.run(
        `DELETE FROM atividade a
         join tipo t on t.id_tipo = a.id_tipo
         where id_atividade = ? and t.pode_excluir = 1`,
        [id],
        (err) => {
          if (err) {
            console.log(err);
            return reject("Can`t remove atividade");
          }
          resolve();
        }
      )
    );
  }
}

module.exports = AtividadeDao;
