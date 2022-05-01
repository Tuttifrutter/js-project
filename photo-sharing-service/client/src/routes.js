import Admin from "./pages/Admin";
import {ADMIN_ROUTE, IMAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, GALLERY_ROUTE, USERPAGE_ROUTE, FAVOURITE_ROUTE, NOTIFIC_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import UserPage from "./pages/UserPage";
import ImagePage from "./pages/ImagePage";
import Gallery from "./pages/Gallery";
import Favourite from "./pages/Favourite";
import NotificationPage from "./pages/NotificationPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: GALLERY_ROUTE,
        Component: Gallery
    },
    {
        path: IMAGE_ROUTE + '/:id',
        Component: ImagePage
    },
    {
        path: USERPAGE_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: FAVOURITE_ROUTE,
        Component: Favourite
    },
    {
        path: NOTIFIC_ROUTE,
        Component: NotificationPage
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]
