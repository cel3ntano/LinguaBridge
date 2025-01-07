const TeacherFilters = () => {
  return (
    <div className="mb-8 flex gap-4">
      <select className="rounded-xl border border-text-primary/10 px-4 py-2">
        <option value="">Languages</option>
      </select>
      <select className="rounded-xl border border-text-primary/10 px-4 py-2">
        <option value="">Level of knowledge</option>
      </select>
      <select className="rounded-xl border border-text-primary/10 px-4 py-2">
        <option value="">Price</option>
      </select>
    </div>
  );
};

export default TeacherFilters;
