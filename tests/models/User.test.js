const Model = require('../../models');


beforeEach(() => { Model.myUser.truncate(); });
describe('User.generate()', () => {
  it('should enter new username and age', async () => {
    await (Model.myUser.generate('dummy', 21));
    Model.myUser.count().then((countEntered) => {
      console.log(`Inserted ${countEntered} entry`);
      expect(countEntered).toEqual(1);
    }).catch((errorObj) => {
      console.log(errorObj.message);
    });
  });
});

describe('displayAll()', () => {
  it('should display all entries', async () => {
    await (Model.myUser.generate('dummy1'));
    await (Model.myUser.generate('dummy2'));
    Model.myUser.displayAll().then((entriesStored) => {
      Model.myUser.count().then((countTable) => {
        console.log(`Displayed ${countTable} entries`);
        expect(countTable).toEqual(entriesStored.length);
      }).catch((errorObj) => {
        console.log(errorObj.message);
      });
    });
  });
  it('should display required columns that satisfy condition', async () => {
    await (Model.myUser.generate('dummy1'));
    await (Model.myUser.generate('dummy2'));
    Model.myUser.displayAll({ attributes: ['id', 'name'], where: { name: 'dummy1' } }).then((selected) => {
      console.log(`Displayed ${selected.length} entries`);
      expect(selected.length).toEqual(1);
    }).catch((errorObj) => {
      console.log(errorObj.message);
    });
  });
});

describe('remove()', () => {
  it('should delete entries that satisfy condition', async () => {
    await (Model.myUser.generate('dummy1'));
    await (Model.myUser.generate('dummy2'));
    Model.myUser.remove({ where: { name: 'dummy1' } }).then((countDeleted) => {
      console.log(`Deleted ${countDeleted} entries`);
      expect(countDeleted).toEqual(1);
    }).catch((errorObj) => {
      console.log(errorObj.message);
    });
  });
});

describe('Inserting 2 entries with same name', () => {
  it('should throw error since name has unique constraint', async () => {
    try {
      await (Model.myUser.generate('dummy1'));
      await (Model.myUser.generate('dummy1'));
    } catch (errorObj) {
      console.log(errorObj.message);
      expect(errorObj.message).toEqual('Validation error');
    }
  });
});
afterAll(() => {
  Model.myUser.sequelize.close();
});
