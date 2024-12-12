interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="bg-red-900/50 text-red-200 p-3 rounded">
      {error}
    </div>
  );
}
