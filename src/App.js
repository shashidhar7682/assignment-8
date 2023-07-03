import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout';
import Home from './components/Home'
import UserProfile from './components/UserProfile/UserProfile'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Community from './components/Community'
import Support from './components/Support'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import LawSuit from './components/LawSuit'
import Rules from './components/Rules'
import ErrorPage from './components/ErrorPage/ErrorPage';


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/community",
          element:<Community/>,
          children:[
            {
              path:"lawsuit",
              element:<LawSuit/>
            },
            {
              path:"rules",
              element:<Rules/>
            }
          ]
        },
        {
          path:"/signin",
          element:<Signin/>
        },
        {
          path:"/user-profile",
          element:<UserProfile/>,
          children:[
            {
              path:"products",
              element:<Products/>
            },
            {
              path:"cart",
              element:<Cart/>
            } 
          ]
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/support",
          element:<Support/>
        },
        {
          path:"/aboutus",
          element:<AboutUs/>
        },
        {
          path:"/contactus",
          element:<ContactUs/>
        },
        {
          path:"*",
          element:<ErrorPage/>
        }             
      ]
    }
  ])
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
