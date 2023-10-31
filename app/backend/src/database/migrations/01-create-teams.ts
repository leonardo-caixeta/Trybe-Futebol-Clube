import { DataTypes, Model, QueryInterface } from 'sequelize'
import { ITeams } from '../../Interfaces/teams/ITeams'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeams>>('teams', {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};