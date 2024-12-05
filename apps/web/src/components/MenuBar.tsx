export function MenuBar() {
  return (
    <div className="h-8 bg-[#252526] text-gray-300 flex items-center px-4 border-b border-[#2d2d2d]">
      <button className="hover:text-white">File</button>
      <button className="ml-4 hover:text-white">Edit</button>
      <button className="ml-4 hover:text-white">View</button>
    </div>
  );
}
