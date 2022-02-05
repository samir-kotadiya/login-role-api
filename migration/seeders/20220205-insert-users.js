'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 * */
		await queryInterface.bulkInsert(
			"resources", [
			{
				"id": "95f7a094-68a3-4c34-b793-370a85d957c4",
				"type": "public"
			},
			{
				"id": "6f275bfc-a3aa-42e8-b5a2-a78056deab43",
				"type": "public"
			},
			{
				"id": "5f455865-7ff0-4da5-908c-7beb3dae688e",
				"type": "private"
			},
			{
				"id": "b8296249-fcc2-479c-8750-98a228021bfe",
				"type": "admin"
			},
			{
				"id": "0bc94d99-db2c-4beb-9c41-669fef36d89c",
				"type": "admin"
			},
			{
				"id": "7bbfc297-e325-4007-899d-9ec01ca5f707",
				"type": "admin"
			}
		]);
	},
	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		*/
		await queryInterface.bulkDelete('resources', null, {});
	}
};
