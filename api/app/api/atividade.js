const { AtividadeDao } = require("../infra");

const api = {};

api.findById = async (req, res) => {
  const { atividadeId } = req.params;
  console.log("####################################");
  console.log(`Finding atividade for ID ${atividadeId}`);
  const atividade = await new AtividadeDao(req.db).findById(atividadeId);
  if (atividade) {
    console.log(atividade);
    res.json(atividade);
  } else {
    res.status(404).json({ message: "Atividade não existe." });
  }
};

api.listAllActivitiesOpen = async (req, res) => {
  console.log("####################################");
  console.log(`Listing atividades`);
  const atividades = await new AtividadeDao(req.db).listAllActivitiesOpen();
  if (atividades) {
    res.json(atividades);
  } else {
    res.status(404).json({ message: "Lista de atividades não encontrada" });
  }
};

api.listAllActivitiesFinalized = async (req, res) => {
  console.log("####################################");
  console.log(`Listing atividades`);
  const atividades = await new AtividadeDao(
    req.db
  ).listAllActivitiesFinalized();
  if (atividades) {
    res.json(atividades);
  } else {
    res.status(404).json({ message: "Lista de atividades não encontrada" });
  }
};

api.edit = async (req, res) => {
  const { atividade } = req.body;

  console.log("####################################");
  console.log("Received JSON data", atividade);

  const id = await new AtividadeDao(req.db).edit(atividade);
  res.json(id);
};

api.add = async (req, res) => {
  const { atividade } = req.body;

  console.log("####################################");
  console.log("Received JSON data", atividade);

  const id = await new AtividadeDao(req.db).add(atividade);
  res.json(id);
};

api.remove = async (req, res) => {
  const { atividadeId } = req.params;
  const dao = new AtividadeDao(req.db);
  const atividade = await dao.findById(atividadeId);
  if (!atividade) {
    const message = "Atividade não existe";
    console.log(message);
    return res.status(404).json({ message });
  }else{
    await dao.remove(atividadeId);
    console.log(`Activity ${atividadeId} deleted!`);
    res.status(200).end();
  }
};

module.exports = api;
