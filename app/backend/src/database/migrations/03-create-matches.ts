import { DataTypes, Model, QueryInterface } from 'sequelize'
import { IMatch } from '../../Interfaces/matches/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals'
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_id'
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals'
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_id'
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress'
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};