'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', [
        {
          title: "Sherlock Holmes",
          body: "Sherlock Holmes breaking the case with Watson",
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Dr Je",
          body: "Dr Je Dancing",
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Frank Sinatra",
          body: "Frank Sinatra Singing",
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, { 
      truncate:true,
      restartIdentity:true 
    });
  }
};
