import { createBrowserRouter } from "react-router-dom";
import FormSubmit from "../page/formSubmit";
import FormUpdate from "../page/formUpdate";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <FormSubmit />,
  },
  {
    path: "/update",
    element: <FormUpdate />,
  },
]);

export default routes;
