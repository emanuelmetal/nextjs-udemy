import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signin up ...',
      nessage: 'Registering for newsletter',
      status: 'pending'
    });
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something whent wrong');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success ...',
          nessage: 'Successfully registered for newsletter',
          status: 'success'
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error ...',
          nessage: error.nessage || 'Something whent wrong!',
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            ref={emailInputRef}
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
