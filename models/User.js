

module.exports = (sequelize, DataTypes) => {
  const myUser = sequelize.define('myUser', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  }, {});
  myUser.generate = (name, age = null) => myUser.create({ name, age });
  myUser.displayAll = async (attributesWhere = { attributes: myUser.attributes, where: {} }) => {
    const storeEntries = [];
    await myUser.findAll(attributesWhere).then((entries) => {
      entries.forEach((entry) => {
        console.log(entry.dataValues);
        storeEntries.push(entry.dataValues);
      });
    });
    return Promise.resolve(storeEntries);
  };
  myUser.remove = async (whereObj = { where: {} }) => {
    let countDeletedToReturn;
    await myUser.destroy(whereObj).then((countDeletedFromTable) => {
      countDeletedToReturn = countDeletedFromTable;
    });
    return Promise.resolve(countDeletedToReturn);
  };
  return myUser;
};
