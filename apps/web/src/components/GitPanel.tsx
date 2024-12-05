"use client";

interface Commit {
  hash: string;
  message: string;
  author: string;
  date: Date;
  branch: string;
}

export function GitPanel() {
  // Mock data for demonstration
  const currentBranch = "main";
  const commits: Commit[] = [
    {
      hash: "a1b2c3d",
      message: "Add AI chat functionality",
      author: "Dev",
      date: new Date(2024, 0, 15, 14, 30),
      branch: "main"
    },
    {
      hash: "e4f5g6h",
      message: "Update editor settings",
      author: "Dev",
      date: new Date(2024, 0, 15, 14, 0),
      branch: "main"
    },
    {
      hash: "i7j8k9l",
      message: "Initial commit",
      author: "Dev",
      date: new Date(2024, 0, 15, 13, 30),
      branch: "main"
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full w-full text-white">
      <div className="p-2 border-b border-[#2d2d2d]">
        <div className="text-sm font-medium mb-1">SOURCE CONTROL</div>
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 2v1h6V2H5zm0 11h6v-1H5v1zM2 7.5l1.5-1.5L5 7.5 3.5 9 2 7.5zm12 0L12.5 9 11 7.5l1.5-1.5L14 7.5z"/>
            <path d="M7.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          </svg>
          <span>{currentBranch}</span>
        </div>
      </div>
      <div className="p-2">
        <div className="space-y-4">
          {commits.map((commit, index) => (
            <div key={commit.hash} className="relative">
              {/* Vertical line connecting commits */}
              {index < commits.length - 1 && (
                <div className="absolute left-[7px] top-[24px] w-[2px] h-[calc(100%+8px)] bg-blue-500" />
              )}
              
              <div className="flex items-start gap-3">
                {/* Commit node */}
                <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 relative z-10" />
                
                {/* Commit details */}
                <div className="flex-1">
                  <div className="text-sm font-medium truncate">{commit.message}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>{commit.hash.substring(0, 7)}</span>
                    <span>•</span>
                    <span>{formatDate(commit.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
