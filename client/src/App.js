import Home from "./pages/home/Home";
import Expense from "./pages/expense/Expense";
import Income from "./pages/income/Income";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleExpense from "./pages/singleExpense/SingleExpense";
import SingleIncome from "./pages/singleIncome/SingleIncome";
import { UserProvider } from "./context/UserContext";

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/expense',
    element:<Expense/>
  },
  {
    path:'/expense/:id',
    element:<SingleExpense/>
  },
  {
    path:'/income',
    element:<Income/>
  },
  {
    path:'/income/:id',
    element:<SingleIncome/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
])

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
