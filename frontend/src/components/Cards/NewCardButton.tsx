import Link from 'next/link';

export default function NewCardButton() {
  return (
    <Link
      className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      href="/cards/new"
    >
      New Card
    </Link>
  );
}
