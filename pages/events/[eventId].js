import { useRouter } from 'next/router';
import { getEventById } from '../../data/dummy-data';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/ErrorAlert';

export default function EventDetails() {
  const { eventId } = useRouter().query;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <h1>No event found!</h1>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
