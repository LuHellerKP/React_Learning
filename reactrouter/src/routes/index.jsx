/** Index Routes
 * When a route has children, and you're at the parent route's path, the '<Outlet>' has nothing to render because no children match.
 * Index routes can be thought of as the default child route to fill in that space.
 */

export default function Index() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out <a href="http://reactrouter.com">the docs at reactrouter.com</a>
      .
    </p>
  );
}
