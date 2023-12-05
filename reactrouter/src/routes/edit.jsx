//Updating Data

//Copy/paste code:
//Add an action to the edit module (Updating Contacts with FormData):
import { Form, useLoaderData, redirect, } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action ({ request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    /** Observation for the line above (Mutation discussion)
     * Each field in the form is accessible with 'formData.get(name)' -> e.g.: you could access the first name like: 'const firstName = formData.get("first");'
     * Since we have a handful of form fields, we use 'Object.fromEntries' to collect them all into an object, which is exactly what the 'updateContact' function wants. 
     * Aside from 'action', none of the APIs we're discurring are provided by React Router. 'request', 'request.formData', 'Object.fromEntries' are all provided by the web platform.
     */
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
    /** (Mutation Discussion)
     * Loaders and actions can both return a 'Response' (makes sense, since they received a 'Request'!)
     * The redirect helper just makes it easier to return a response that tells the app to change locations. 
     */
}

export default function EditContact() {
  const { contact } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}