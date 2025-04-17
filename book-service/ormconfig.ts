export default {
    type: 'postgres',
    host: 'postgres_book',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'bookdb',
    entities: ['dist/**/*.entity.js'],
    logging: true,
    synchronize: true,
  };
  