export default function Error({
  message = "Įvyko klaida.",
}: {
  message: string
}) {
  return (
    <div className="flex gap-2 rounded-lg border border-red-700 bg-red-700 bg-opacity-10 p-4 text-red-700 backdrop-blur-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      {message}
    </div>
  )
}
