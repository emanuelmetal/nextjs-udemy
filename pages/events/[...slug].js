import { useRouter } from 'next/router';
export default function FilteredEventsPage() {
  const params = useRouter();
  console.log(params);
  return <h1>The filtered</h1>;
}
