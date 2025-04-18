export default {
    type: 'postgres',
    host: 'postgres_reading',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'reading_servicedb',
    entities: ['dist/**/*.entity.js'],
    logging: true,
    synchronize: true,
  };
  