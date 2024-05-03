import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

/*===========================================*/
/*===========================================*/
/*===========================================*/

function App() {

  const { isDarkMode } = useSelector((state) => state.theme);

  /*===========================================*/

  // if [isDarkMode] true add [dark-mode] to body,otherwise remove it
  useEffect(() => {

    if (isDarkMode) {

      document.body.classList.add('dark-mode');

    } else {

      document.body.classList.remove('dark-mode');

    }

  }, [isDarkMode]);

  /*===========================================*/

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App; 