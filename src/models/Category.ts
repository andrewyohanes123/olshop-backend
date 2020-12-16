import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface CategoryAttributes {
	id?: number;
	name: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const CategoryFactory: Factory<CategoryInstance, CategoryAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<CategoryInstance, CategoryAttributes> => {
	const attributes: SequelizeAttributes<CategoryAttributes> = {
		name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		}
	};
	const Category: Sequelize.Model<CategoryInstance, CategoryAttributes> = sequelize.define<
		CategoryInstance,
		CategoryAttributes
	>('category', attributes, { underscored: true });

	Category.associate = (models: ModelFactoryInterface): void => {
		Category.hasMany(models.Item, { onDelete: 'cascade' });
	};

	return Category;
};
