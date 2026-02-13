import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

import Inicio from "./components/Inicio";
import ListadoPlataformas from "./components/ListadoPlataformas";
import ListadoCardsPlataformas from "./components/ListadoCardsPlataformas";
import AltaPlataforma from "./components/AltaPlataforma";
import EditarPlataforma from "./components/EditarPlataforma";
import AltaCurso from "./components/AltaCursos";
import ListadoCursos from "./components/ListadoCursos";
import ListadoCardCursos from "./components/ListadoCardsCursos";
import EditarCurso from "./components/EditarCurso";
import ListadoCursosDataGrid from "./components/ListadoCursosDataGrid";
import Informes from "./pages/Informes";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import ListadoPlataformaDataGrid from "./components/ListadoPlataformaDataGrid";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      // Todo esto se ve en el Outlet
      { index: true, Component: Inicio }, // Esto se ve en la ruta padre
      {
        path: "/plataformas",
        element: <ListadoPlataformas/>,
      },
      {
        path: "/plataformas/cards",
        element: <ListadoCardsPlataformas/>,
      },
      {
        path: "/plataformas/datagrid",
        element: <ListadoPlataformaDataGrid/>,
      },
      {
        path: "/plataformas/new",
        element: <AltaPlataforma />,
      },
      {
        path: "/plataformas/edit/:id",
        element: <EditarPlataforma />,
      },
      {
        path: "/cursos",
        element: <ListadoCursos/>
      },
      {
        path: "/cursos/cards",
        element: <ListadoCardCursos/>
      },
      {
        path: "/cursos/datagrid",
        element: <ListadoCursosDataGrid/>
      },
      {
        path: "/cursos/new",
        element: <AltaCurso/>,
      },
      {
        path: "/cursos/edit/:id",
        element: <EditarCurso/>
      },
      {
        path: "/informes",
        element: <Informes/>
      }
    ],
  },
]);

function App() {  
  return (
    <>
      <RouterProvider router={router}/>
      <Footer/>
    </>
    
  )
}


export default App
