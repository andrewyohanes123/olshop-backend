
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { CartInstance, CartAttributes } from '../models/Cart';

const cartsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { q }: {q: string } = req.query as any;
                const parsed: sequelize.FindOptions<CartInstance> = Parser.parseQuery<CartInstance>(
                    q,
                    models,
                );
                const data: PaginatedResult<CartInstance> = await models.Cart.findAndCountAll(parsed);
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
                const cart: CartInstance | null = await models.Cart.findByPk(id);
                if (!cart) throw new NotFoundError('Cart tidak ditemukan');
                const body: OkResponse = { data: cart };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: CartAttributes = req.body;
                const cart: CartInstance = await models.Cart.create(attributes);
                const body: OkResponse = { data: cart };

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
                const attributes: CartAttributes = req.body;
                const cart: CartInstance | null = await models.Cart.findByPk(id);
                if (!cart) throw new NotFoundError('Cart tidak ditemukan');
                const updatedCart: CartInstance = await cart.update(attributes);
                const body: OkResponse = { data: updatedCart };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const cart: CartInstance | null = await models.Cart.findByPk(id);
                if (!cart) throw new NotFoundError('Cart tidak ditemukan');
                await cart.destroy();
                const body: OkResponse = { data: cart };

                res.json(body);
            },
        ),
    );

    return router;
};

export default cartsRoutes;
