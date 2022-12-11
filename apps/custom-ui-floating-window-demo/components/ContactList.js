import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { startOutgoingCall } from "../shared/socket";
import Footer from "./Footer";

export default function ContactList(context) {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Get the contacts and list them
    fetch("/api/getContacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      });
  }, [router]);

  return (
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar navbar-light bg-mildgreen">
          <div class="container-fluid">
            <span class="navbar-brand"> 🟢 Hello, {context.user.name} </span>
          </div>
        </nav>
        <p> Search and Tap on a contact name to dial </p>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            🔍
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Type the name of the contact"
          />
        </div>
        <ol class="contact-list list-group">
          {/* List the contacts based on the API response */}
          {contacts.map((d) => (
            <li
              key={d.contactId}
              onClick={() => startOutgoingCall(context, d.contactId)}
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <div class="ms-2 me-auto">
                  <div class="fw-bold"> {d.contactName} </div>
                  {d.contactNumber}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div class="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}
