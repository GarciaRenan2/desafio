const { atividadeAPI } = require("../api"),
  { wrapAsync } = require("../infra");

module.exports = (app) => {

  //lista todos as atividade abertas
  app.route("/atividades").get(wrapAsync(atividadeAPI.listAllActivitiesOpen));

  //lista todos as atividade
  app.route("/atividades/finalizadas").get(wrapAsync(atividadeAPI.listAllActivitiesFinalized));

  // retorna a atividade
  app.route("/atividade/:atividadeId").get(wrapAsync(atividadeAPI.findById))
      .put(wrapAsync(atividadeAPI.edit))
      .delete(wrapAsync(atividadeAPI.remove));

  // adicionar
  app.route("/adicionar").post(wrapAsync(atividadeAPI.add))

};
