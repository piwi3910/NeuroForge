interface PathDisplayProps {
  path: string;
}

export function PathDisplay({ path }: PathDisplayProps) {
  return (
    <div className="text-sm text-gray-400">
      Current Path: {path}
    </div>
  );
}
