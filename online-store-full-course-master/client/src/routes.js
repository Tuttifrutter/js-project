import Admin from "./pages/Admin";
import {ADMIN_ROUTE, IMAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, GALLERY_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import ImagePage from "./pages/ImagePage";
import Gallery from "./pages/Gallery";

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
