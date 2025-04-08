export default {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'qwerty',
    database: 'user_servicedb',
    entities: ['dist/**/*.entity.js'],
    logging: true,
    synchronize: true,
  };
  