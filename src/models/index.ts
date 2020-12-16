import Sequelize from 'sequelize';
import ModelFactoryInterface from './typings/ModelFactoryInterface';
import { UserFactory } from './User';
import { TokenFactory } from './Token';
import { ItemFactory } from './Item';
import { ItemPictureFactory } from './ItemPicture';
import { CategoryFactory } from './Category';
import { StoreFactory } from './Store';
import { ItemCommentFactory } from './ItemComment';
import { ItemCommentReplyFactory } from './ItemCommentReply';
import { TransactionFactory } from './Transaction';
import { CartFactory } from './Cart';
import { ItemReviewFactory } from './ItemReview';

const createModels: Function = (): ModelFactoryInterface => {
	const {
		DB_HOST,
		DB_DIALECT,
		DB_DATABASE = 'sirius',
		DB_USER = 'sirius',
		DB_PASS = 'sirius',
	}: NodeJS.ProcessEnv = process.env;
	const sequelize: Sequelize.Sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
		host: DB_HOST,
		dialect: DB_DIALECT,
		dialectOptions: {
			useUTC: true,
		},
		timezone: '+08:00',
		operatorsAliases: true,
		logging: process.env.SYSTEM_LOGGING === 'true' ? console.log : (msg: string) => {},
	});
	const db: ModelFactoryInterface = {
		sequelize,
		Sequelize,
		User: UserFactory(sequelize, Sequelize),
		Token: TokenFactory(sequelize, Sequelize),
		Item: ItemFactory(sequelize, Sequelize),
		ItemPicture: ItemPictureFactory(sequelize, Sequelize),
		Category: CategoryFactory(sequelize,Sequelize),
		Store: StoreFactory(sequelize, Sequelize),
		ItemComment: ItemCommentFactory(sequelize, Sequelize),
		ItemCommentReply: ItemCommentReplyFactory(sequelize, Sequelize),
		ItemReview: ItemReviewFactory(sequelize, Sequelize),
		Transaction: TransactionFactory(sequelize, Sequelize),
		Cart: CartFactory(sequelize, Sequelize),
	};

	Object.keys(db).forEach(
		(model: string): void => {
			if (db[model].associate) {
				db[model].associate(db);
			}
		},
	);

	return db;
};

export default createModels;
