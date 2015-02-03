var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pingpong'
    },
    port: 3000,
    db: 'mongodb://localhost/pingpong-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'pingpong'
    },
    port: 3000,
    db: 'mongodb://localhost/pingpong-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'pingpong'
    },
    port: 3000,
    db: 'mongodb://localhost/pingpong-production'
    
  }
};

module.exports = config[env];
