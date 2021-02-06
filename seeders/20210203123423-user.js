'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newData = [];
    const rawData = fs.readFileSync('masterdata/users.json');
    const userData = JSON.parse(rawData);
    userData.map(user => {
      const seedData = {
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      newData.push(seedData)
    })

    await queryInterface.bulkInsert('Users', newData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, { 
      truncate:true,
      restartIdentity:true 
    });
  }
};
