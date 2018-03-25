'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE DOMAIN nonempty_text AS text
      CONSTRAINT non_empty CHECK (length(VALUE) > 0);

      CREATE TABLE features (
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        updated_at timestamp without time zone DEFAULT now() NOT NULL,
        name nonempty_text NOT NULL,
        img_url nonempty_text NOT NULL
      );
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TABLE features;
      DROP DOMIAN nonempty_text;
    `)
  },
}
