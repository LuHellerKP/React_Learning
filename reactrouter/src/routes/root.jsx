//Rendering an '<Outlet>':
//Changing the sidebar '<a href>' to '<Link to>' -> Client side routing:
/**
 * Before this change, when we clicked the links in the sidebar, the browser did a full document request for the next URL instead of using React Router.
 * Client side routing allows our app to update the URL without requesting another document from the server. Instead, the app can immediately render new UI (made happen with Link).
 */
//Access and render the data:
/**Creating Contacts
 * We'll create new contacts by exporting an 'action' in our root route, wiring it up to the route config and changing our '<form>' to a React Router '<form>'.
 */
//Create the action and change '<form>' to a React Router '<form>':
//Redirect to the new redord's edit page (Redirecting new records to the edit page):
//Use 'NavLink' in the sidebar (Active Link Styling):
//'useNavigation' to add global pending UI (Global Pending UI):
import {
  Outlet,
  NavLink,
  Link,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
//Loading Data
/**
 * React Router has data conventions to get data into your route components easily.
 * There are two APIs we'll be using to load data: 'loader' and 'useLoaderData'.
 * First we'll create and export a loader function in the root module. Then we'll hook it up to the route. Finally, we'll access and render the data.
 */
import { getContacts, createContact } from "../contacts"; //The 'getContact' function is responsible for retrieving a specific contact from a local storage based on its ID.

export async function action() {
  //asynchronus function that creates a new contact and returns the created contact object.
  const contact = await createContact(); // calls a function named 'createContact' snf sddigns the returned contact object to the contact variable.
  //'await' keyword is used to pause the execution of the code until the 'createContact' function resolves with a promise.
  return redirect(`/contacts/${contact.id}/edit`); //redirect the user to the "/contacts/:contactId/edit" route -> the ':contactId' parameter is dynamically filled with the ID of the newly created contact.
  //now the action function is responsible for creating a new contact and then redirecting the user to the edit page for that contact.
  //return { contact }; //Returns an object containing the created contact object. The object is encoled in {} to create an object literal.
} //Basically -> this function is responsible for creating a new contact and returning the created contact object.
//It uses the 'await' keyword to handle asynchronus operations and enrures that the code waits for the contact creation process to complete before returning the contact object.
export async function loader() {
  //'loader' function is responsible for fetching all contacts from local storage and returning them as a data object.
  const contacts = await getContacts(); //Fetching contacts -> asynchronusly calls the 'getContacts' function, which retrieves all contacts from local storage.
  return { contacts }; //Returning data objects -> returns an object with the key contacts and the value as the retrieved contacts array.
}

//creating the root layout component:
export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation(); // 'useNavigation' returns the current navigation state: it can be '"idle" | "submitting" | "loading"'

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        {/* 'nav':
          Renders a list of contaxts or a message indicating no contacts are available. 
          Conditional rendering statement that checks if the 'contacts' array has any elements.
              If it does -> renders a '<ul>' element with a list of '<li>' elements, each representing a contact. 
              If the 'contacts' array is empty -> renders a '<p>' element with a message saying "No contacts."
        */}
        <nav>
          {/* Breakdown of the code inside Nav: 
          'contacts.length ?' -> checks if the 'contacts' array has any elements. If it is greater than zero, then evaluates to true. Otherwise false. 
              If true:
                  - Create an unordered list element. 
                  - contacts.map((contact)=>...) -> iterates over the contacts array, creating a '<li>' element for each contact object. 
                      - <li key={contact.id}> -> creates a list item. The 'key' prop is set to the contact.id to ensure efficient re-rendering. 
                      - <Link to={`contacts/${contact.id}`}> -> creates a link to the contact's details page. The 'to' prop is set to the route template 'contacts/:id', where ':id' is replaced with the contact.id.
                          - {contact.first || contact.last ? (<>{contact.first}{contact.last}</>) : (<i>No Name</i>)} -> this checks if either contact.first or contact.last is not empty.
                                                                                                                           If so, it displays the contact's name. Otherwisem it displays "No Name".
                          - {" "} -> This adds a space after the contact's name. 
                          - {contact.favorite && <span>★</span>} -> checks if the contact.favorite property is true. if so, it displays a star icon. 
              If false:
                  - Creates a paragraph element and display the message "No Contacts."
          */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/*Active Link Styling 
                      We are passing a function to 'className'.
                      When the user is at the URL in the 'NavLink', then 'isActive' will be true. When it's about to be active (the data is still loading) then 'isPending' will be true.
                      This allows us to easily indicate where the user is, as well as provide immediate feedback on links that have been clicked but we're still wating for data to load. 
                  */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""} //The CSS will add a fade after a short delay. You could do anything you want though, like show a spinner or loading bar across the top.
      >
        {/* The outlet is used to tell the root route WHERE we want it to render its child routes */}
        <Outlet />
      </div>
    </>
  );
}
