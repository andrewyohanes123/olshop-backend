
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ItemReviewInstance, ItemReviewAttributes } from '../models/ItemReview';

const itemreviewsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ItemReviewInstance> = Parser.parseQuery<ItemReviewInstance>(
                    (req.query as any).q,
                    models,
                );
                const data: PaginatedResult<ItemReviewInstance> = await models.ItemReview.findAndCountAll(parsed);
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
                const itemreview: ItemReviewInstance | null = await models.ItemReview.findByPk(id);
                if (!itemreview) throw new NotFoundError('ItemReview tidak ditemukan');
                const body: OkResponse = { data: itemreview };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ItemReviewAttributes = req.body;
                const itemreview: ItemReviewInstance = await models.ItemReview.create(attributes);
                const body: OkResponse = { data: itemreview };

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
                const attributes: ItemReviewAttributes = req.body;
                const itemreview: ItemReviewInstance | null = await models.ItemReview.findByPk(id);
                if (!itemreview) throw new NotFoundError('ItemReview tidak ditemukan');
                const updatedItemReview: ItemReviewInstance = await itemreview.update(attributes);
                const body: OkResponse = { data: updatedItemReview };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const itemreview: ItemReviewInstance | null = await models.ItemReview.findByPk(id);
                if (!itemreview) throw new NotFoundError('ItemReview tidak ditemukan');
                await itemreview.destroy();
                const body: OkResponse = { data: itemreview };

                res.json(body);
            },
        ),
    );

    return router;
};

export default itemreviewsRoutes;
    