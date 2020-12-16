import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface TransactionAttributes {
	id?: number;
  invoice_number: string;
  quantity: number;
  item_id?: number;
  user_id?: number;
  status: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface TransactionInstance extends Sequelize.Instance<TransactionAttributes>, TransactionAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const TransactionFactory: Factory<TransactionInstance, TransactionAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<TransactionInstance, TransactionAttributes> => {
	const attributes: SequelizeAttributes<TransactionAttributes> = {
		invoice_number: {
			type: DataTypes.STRING(191),
			allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(['Sedang Diproses', 'Sedang Dikirim', 'Selesai Dikirim', 'Selesai']),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 1
    }
	};
	const Transaction: Sequelize.Model<TransactionInstance, TransactionAttributes> = sequelize.define<
		TransactionInstance,
		TransactionAttributes
	>('transaction', attributes, { underscored: true });

	Transaction.associate = (models: ModelFactoryInterface): void => {
		Transaction.belongsTo(models.Item, { onDelete: 'cascade' });
		Transaction.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return Transaction;
};
