import Link from 'next/link';

export default function StudyButton() {
  return (
    <Link
      className="mt-4 bg-green-300 px-4 py-1 rounded hover:bg-green-500"
      href="/card-deck"
    >
      🤓 Study
    </Link>
  );
}
