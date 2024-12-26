import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import { WetCalc } from "../components/wet-calc/wetCalc";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/wet-calc",
      element: <WetCalc />,
    },
]);