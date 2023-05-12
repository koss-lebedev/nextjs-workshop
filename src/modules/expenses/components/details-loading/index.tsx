const Placeholder = () => {
  return <div className="w-24 h-3 bg-gray-200 rounded-lg mt-2 animate-pulse" />;
};

const DetailsLoading = () => {
  return (
    <dl>
      <dt className="font-bold">Name</dt>
      <dd className="mb-2">
        <Placeholder />
      </dd>
      <dt className="font-bold">Cost</dt>
      <dd className="mb-2">
        <Placeholder />
      </dd>
      <dt className="font-bold">Category</dt>
      <dd className="mb-2">
        <Placeholder />
      </dd>
    </dl>
  );
};

export { DetailsLoading };
