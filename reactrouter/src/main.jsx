import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
//Setting '<Root>' as the root route's 'element':
//Configure the loader on the route (Loading Data):
//Import and set the action on the route (Creating contacts):
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
//Setting the '<ErrorPage>' as the 'errorElement' on the root route:
import ErrorPage from "./error-page";
//Import the contact component and create a new route:
//configure the loader on the route:
import Contact, {loader as contactLoader,} from "./routes/contact";

//Add the new edit route (Updating data):
//Wire the action up to the route (Updating Contacts with FormData):
import EditContact, {action as editAction,} from "./routes/edit";

//Browser router is a tool that helps you navigate between different pages on a website. It keeps track of the current URL and updates the page content accordingly.
const router = createBrowserRouter([ //'router' has an array of route configuration objects.
  {
    //first route -> 'root route' -> the rest of the routers will render inside of it. It will serve as the root layout of the UI.
    path: "/", //path for the route, which is the root path. 
    element: <Root />, // specifies the component to render for the route, which is the 'Root' component. 
    errorElement: <ErrorPage />, // specifies the component to render if an error occurs while loading or rendering the route.
    loader: rootLoader, // called before the Root component is rendered -> ensures that the necessary data is available when the component is first displayed.
    action: rootAction, // used to perform actions such as fetching data or updating the application state. 
    //We want the contact component to render INSIDE of the '<Root>' layout. This is done by making the contact route a child of the root route.
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {//We want the updating data to be rendered in the root route's outlet, so we made it a sibling to the existing child route.
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader, //Here we are being lazy by reusing 'contactLoader' -> there is no reason to attempt to share loaders among routes, they usually have their own. 
        action: editAction,
      }
    ], 
  },
]);

/*
The code snippet bellow is typically used to bootstrap a React app that uses the React Router Library. 
    It creates the root element, enables strict mode, and provides routing information to the application. 


ReactDOM.createRoot() -> creates a React root element, which is the top-level element in a React app. It is the entry point for rendering React components into the DOM (Document Object Model).
    It takes a DOM element as its argument. 
    In this case, the DOM element is the div element with the ID 'root'. The root element is where the React app. will be rendered. 

.render(<React.StrictMode>...</React.StrictMode>) -> renders a React component into the DOM.
    The component being rendered is 'React.StrictMode'.
        It is a special component -> helps identify and catch potential problems in React apps. -> it runs checks on the components that are being rendered. 

*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* 
    The line of code above renders a 'RouterProvider' component, which is part of the React Router Library -> it is responsible for providing routing information to the React app.
    The 'router' prop is required for the component. 
        It should be set to the router object that is being used in the application. 
            The router object is responsible for managing the navigation between different pages in the app. 
    */}
  </React.StrictMode>
);
