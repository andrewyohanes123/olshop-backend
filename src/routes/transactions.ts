
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { TransactionInstance, TransactionAttributes } from '../models/Transaction';

const transactionsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<TransactionInstance> = Parser.parseQuery<TransactionInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<TransactionInstance> = await models.Transaction.findAndCountAll(parsed);
                const body: OkResponse = { data };

                res.json(body);
            },
        ),
    );

    router.get(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const transaction: TransactionInstance | null = await models.Transaction.findByPk(id);
                if (!transaction) throw new NotFoundError('Transaction tidak ditemukan');
                const body: OkResponse = { data: transaction };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: TransactionAttributes = req.body;
                const transaction: TransactionInstance = await models.Transaction.create(attributes);
                const body: OkResponse = { data: transaction };

                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const attributes: TransactionAttributes = req.body;
                const transaction: TransactionInstance | null = await models.Transaction.findByPk(id);
                if (!transaction) throw new NotFoundError('Transaction tidak ditemukan');
                const updatedTransaction: TransactionInstance = await transaction.update(attributes);
                const body: OkResponse = { data: updatedTransaction };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const transaction: TransactionInstance | null = await models.Transaction.findByPk(id);
                if (!transaction) throw new NotFoundError('Transaction tidak ditemukan');
                await transaction.destroy();
                const body: OkResponse = { data: transaction };

                res.json(body);
            },
        ),
    );

    return router;
};

export default transactionsRoutes;
    