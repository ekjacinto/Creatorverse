import "./App.css";
import { RouterProvider, Outlet } from "react-router";
import { Helmet } from "react-helmet-async";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import { createBrowserRouter } from "react-router";
import Navigation from "./components/Navigation";

// Layout component using Outlet
function Layout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ShowCreators />,
      },
      {
        path: "add",
        element: <AddCreator />,
      },
      {
        path: "edit/:id",
        element: <EditCreator />,
      },
      {
        path: "creator/:id",
        element: <ViewCreator />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Helmet>
        <title>CreatorVerse - Discover Amazing Creators</title>
        <meta
          name="description"
          content="Explore and discover amazing content creators from around the world"
        />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
