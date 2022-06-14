export default function EventsPage() {
  return (
    <>
      <h1>This is the events list</h1>
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => (
          <li>Event number {element}</li>
        ))}
      </ul>
    </>
  );
}
