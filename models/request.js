//Schema
module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define("Request", {
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dates: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return Request;
};
