'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 * */
		await queryInterface.bulkInsert("users", [{
			"id": "129c9d36-4115-4f3a-82bc-c46bb86f0797",
			"name": "samir user",
			"email": "user@gmail.com",
			"password": "JW63ls7B\/1WTCmK05hGt\/X6IwTSbxLq",
			"salt": "$2b$10$\/.ymDVG9VEVIHxbimt1A9u",
			"role": "user",
			"isVerified": true,
			"updatedBy": null,
			"createdAt": "2022-02-04T18:45:33.610Z",
			"updatedAt": "2022-02-04T18:49:31.565Z"
		}, {
			"id": "c456389a-6043-428f-8158-3300b472f961",
			"name": "samir admin",
			"email": "admin@gmail.com",
			"password": "Wc07kBseE\/RPtXdgSAmFMGJbtgIMXxq",
			"salt": "$2b$10$7utLDOMLWPHrKloTJ8S\/1u",
			"role": "admin",
			"isVerified": true,
			"updatedBy": null,
			"createdAt": "2022-02-04T18:50:33.681Z",
			"updatedAt": "2022-02-04T18:50:54.158Z"
		}]);
	},
	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		*/
		await queryInterface.bulkDelete('users', null, {});
	}
};
