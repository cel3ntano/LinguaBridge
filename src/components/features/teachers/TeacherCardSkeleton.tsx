const TeacherCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl md:rounded-[24px] p-4 md:p-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex items-center md:block gap-4">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-background-skeleton" />
          <div className="md:hidden">
            <div className="h-6 w-32 bg-background-skeleton rounded-xl mb-2" />
            <div className="h-4 w-24 bg-background-skeleton rounded-xl" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-24 bg-background-skeleton rounded-xl" />
              <div className="h-7 w-48 bg-background-skeleton rounded-xl" />
            </div>
            <div className="w-8 h-8 bg-background-skeleton rounded-full" />
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:flex gap-3">
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
          </div>

          {/* Content */}
          <div className="mt-6 space-y-4">
            <div className="h-4 w-full bg-background-skeleton rounded-xl" />
            <div className="h-4 w-3/4 bg-background-skeleton rounded-xl" />
            <div className="h-4 w-5/6 bg-background-skeleton rounded-xl" />
          </div>

          {/* Price and buttons */}
          <div className="mt-6 flex flex-col md:flex-row items-center gap-4 md:justify-between">
            <div className="h-8 w-24 bg-background-skeleton rounded-xl" />
            <div className="flex gap-4 w-full md:w-auto">
              <div className="h-10 w-full md:w-32 bg-background-skeleton rounded-xl" />
              <div className="h-10 w-full md:w-32 bg-background-skeleton rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCardSkeleton;
