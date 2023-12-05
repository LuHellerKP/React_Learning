//Handling Not Found Errors
/*
It's good to know how the app will respond to errors early in the project.
Anytime your app throws an error while rendering, loading data, or performing data mutations, React Router will catch it and render an error screen. 
*/

//Create an error page component:
import { useRouteError } from "react-router-dom"; //useRouteError is a hook that provides access to any error that has been thrown during navigation or rendering. 

export default function ErrorPage() {
  const error = useRouteError(); //The hook is used to capture the error object which contains information about the error, such as the error message and status code. 
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        {/* We are using '||' to ensure that a message is displayed even if both 'statusText' and 'message' are undefined. */}
      </p>
    </div>
  );
}
