
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { StoreInstance, StoreAttributes } from '../models/Store';

const storesRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<StoreInstance> = Parser.parseQuery<StoreInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<StoreInstance> = await models.Store.findAndCountAll(parsed);
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
                const store: StoreInstance | null = await models.Store.findByPk(id);
                if (!store) throw new NotFoundError('Store tidak ditemukan');
                const body: OkResponse = { data: store };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: StoreAttributes = req.body;
                const store: StoreInstance = await models.Store.create(attributes);
                const body: OkResponse = { data: store };

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
                const attributes: StoreAttributes = req.body;
                const store: StoreInstance | null = await models.Store.findByPk(id);
                if (!store) throw new NotFoundError('Store tidak ditemukan');
                const updatedStore: StoreInstance = await store.update(attributes);
                const body: OkResponse = { data: updatedStore };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const store: StoreInstance | null = await models.Store.findByPk(id);
                if (!store) throw new NotFoundError('Store tidak ditemukan');
                await store.destroy();
                const body: OkResponse = { data: store };

                res.json(body);
            },
        ),
    );

    return router;
};

export default storesRoutes;
    