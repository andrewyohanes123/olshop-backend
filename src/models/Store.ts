import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface StoreAttributes {
	id?: number;
  name: string;
  address: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface StoreInstance extends Sequelize.Instance<StoreAttributes>, StoreAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const StoreFactory: Factory<StoreInstance, StoreAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<StoreInstance, StoreAttributes> => {
	const attributes: SequelizeAttributes<StoreAttributes> = {
		name: {
			type: DataTypes.STRING(191),
			allowNull: false,
    },
    address: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
	};
	const Store: Sequelize.Model<StoreInstance, StoreAttributes> = sequelize.define<
		StoreInstance,
		StoreAttributes
	>('store', attributes, { underscored: true });

	Store.associate = (models: ModelFactoryInterface): void => {
		Store.hasMany(models.Item, { onDelete: 'cascade' });
	};

	return Store;
};
