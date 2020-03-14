const { Pool } = require('pg');
exports.pool = new Pool({
    user: 'neeraj',
    host: 'localhost',
    database: 'neeraj',
    password: 'neeraj12',
    port: 5432,
    max: 2
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000
});