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
    }
]

export default routes;