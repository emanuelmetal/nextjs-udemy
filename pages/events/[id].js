import { useRouter } from 'next/router';

export default function EventDetails() {
  const { id } = useRouter().query;
  return <h1>this is the event with id: {id}</h1>;
}
