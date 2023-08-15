const User = require('../models/model.users');
const Repair = require('../models/models.repairs');

const initModels = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModels;
