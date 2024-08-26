import { lazy } from "react";
import endPoints from "./endPoints";

const routes = [
    {
        path: endPoints.home,
        component: lazy(() => import('../container/Home/Home')),
        exact: true
    },
    {
        path: endPoints.snakeGame,
        component: lazy(() => import('../container/SnakeGame/SnakeGame')),
        exact: true
    },
    {
        path: endPoints.starRating,
        component: lazy(() => import('../container/StarRating/StarRating')),
        exact: true
    },
    {
        path: endPoints.typeHead,
        component: lazy(() => import('../container/TypeHead/TypeHead')),
        exact: true
    },
    {
        path: endPoints.virtualScrolling,
        component: lazy(() => import('../container/VirtualScrolling/VirtualScrolling')),
        exact: true
    },
    {
        path: endPoints.tosat,
        component: lazy(() => import('../../src/container/Toast/Toast')),
        exact: true
    }
]

export default routes;