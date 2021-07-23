import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table.string('description', 200).nullable();
    table.float('value').notNullable();
    table.integer('quantity').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  })
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Order');
}
