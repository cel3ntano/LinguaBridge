const TeacherCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-background-skeleton" />

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              {/* Languages */}
              <div className="h-6 w-24 bg-background-skeleton rounded-xl" />
              {/* Name */}
              <div className="h-7 w-48 bg-background-skeleton rounded-xl" />
            </div>
            {/* Heart button */}
            <div className="w-8 h-8 bg-background-skeleton rounded-full" />
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-4">
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
            <div className="h-5 w-24 bg-background-skeleton rounded-xl" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-4">
        {/* Text lines */}
        <div className="h-4 w-full bg-background-skeleton rounded-xl" />
        <div className="h-4 w-3/4 bg-background-skeleton rounded-xl" />
        <div className="h-4 w-5/6 bg-background-skeleton rounded-xl" />
      </div>

      {/* Price and buttons */}
      <div className="mt-6 flex items-center justify-between">
        <div className="h-8 w-24 bg-background-skeleton rounded-xl" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-background-skeleton rounded-xl" />
          <div className="h-10 w-32 bg-background-skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default TeacherCardSkeleton;
