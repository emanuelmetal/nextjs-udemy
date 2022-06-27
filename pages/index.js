import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList';

export default function HomePage({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  };
}
