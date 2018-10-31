const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  // 'postgres://qlmenolchdtxwh:f9845d14ee4046d82a920d975caa3191ada6e6f42ae5cbd84324d57ac72edba8@ec2-54-83-38-174.compute-1.amazonaws.com:5432/d3tm8nmet2ndj1',
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
