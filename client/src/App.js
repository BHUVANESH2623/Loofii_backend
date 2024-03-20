import './app.scss';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from './componants/navbar/Navbar';
import { Home } from './componants/home/Home';
import { Login } from './componants/login/Login';
import { Register } from './componants/register/Register';
import { Footer } from './componants/footer/Footer';
import { Diary } from './componants/diary/Diary';
import { Notes } from './componants/notes/Notes';
import { Todo } from './componants/todo/Todo';
import { Challenge } from './componants/challenge/Challenge';
import { Challen } from './componants/challen/Challen';
import {Schedule} from './componants/schedule/Schedule';


function App() {
  const Layout=()=>{
    return(
      <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }
  const AuthLayout=()=>{
    return(
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/diary',
          element:<Diary/>
        },
        {
          path:'/diary/:id',
          element:<Notes/>
        },
        {
          path:'/todo',
          element:<Todo/>
        },
        {
          path:'/challenge',
          element:<Challenge/>
        },
        {
          path:'/challenge/:id',
          element:<Challen/>
        },
        {
          path:'/schedule',
          element:<Schedule/>
        }
      ]
    },
    {
      path:'/',
      element:<AuthLayout/>,
      children:[
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element:<Register/>
        }
      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
