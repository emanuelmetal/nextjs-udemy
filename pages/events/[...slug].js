import { useRouter } from 'next/router';
import useSWR from 'swr';

import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/results-title/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { useEffect, useState } from 'react';

const AllEventsButton = () => (
  <div className="center">
    <Button link="/events">Show all events</Button>
  </div>
);

export default function FilteredEventsPage() {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();
  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('https://nextjs-udemy-93382-default-rtdb.firebaseio.com/events.json', fetcher);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numMonth) || isNaN(numYear) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <AllEventsButton />
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the current filter!</p>
        </ErrorAlert>
        <AllEventsButton />
      </>
    );
  }

  const newDate = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={newDate} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];
//
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;
//
//   if (isNaN(numMonth) || isNaN(numYear) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//     return {
//       props: { hasError: true }
//     };
//   }
//
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth
//   });
//
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   };
// }
