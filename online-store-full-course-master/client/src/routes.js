import Admin from "./pages/Admin";
import {ADMIN_ROUTE, IMAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, GALLERY_ROUTE, USERPAGE_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import UserPage from "./pages/UserPage";
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
    {
        path: USERPAGE_ROUTE + '/:id',
        Component: UserPage
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
