import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ItemReviewAttributes {
	id?: number;
  content: string;
  item_id?: number;
  transaction_id?: number;
  rating: number;
  user_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ItemReviewInstance extends Sequelize.Instance<ItemReviewAttributes>, ItemReviewAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ItemReviewFactory: Factory<ItemReviewInstance, ItemReviewAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ItemReviewInstance, ItemReviewAttributes> => {
	const attributes: SequelizeAttributes<ItemReviewAttributes> = {
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
	};
	const ItemReview: Sequelize.Model<ItemReviewInstance, ItemReviewAttributes> = sequelize.define<
		ItemReviewInstance,
		ItemReviewAttributes
	>('item_review', attributes, { underscored: true });

	ItemReview.associate = (models: ModelFactoryInterface): void => {
		ItemReview.belongsTo(models.Item, { onDelete: 'cascade' });
		ItemReview.belongsTo(models.Transaction, { onDelete: 'cascade' });
		ItemReview.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return ItemReview;
};
