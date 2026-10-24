import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {skeletons.map((_, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-800" />
              <div className="w-12 h-4 rounded-full bg-slate-800" />
            </div>
            <div className="w-20 h-7 rounded-lg bg-slate-800" />
            <div className="w-32 h-3 rounded bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-slate-800 rounded-lg" />
        <div className="space-y-3">
          {skeletons.map((_, i) => (
            <div key={i} className="h-12 w-full bg-slate-800/60 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return <div className="h-24 bg-slate-900/60 border border-slate-800 rounded-2xl animate-pulse" />;
};

export default LoadingSkeleton;
