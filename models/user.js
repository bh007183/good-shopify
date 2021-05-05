module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = function (models){
      User.hasMany(models.Image)
  }
  return User
};
