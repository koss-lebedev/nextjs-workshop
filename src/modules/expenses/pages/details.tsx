type Props = {
  params: {
    id: string;
  };
};

const ExpenseDetails = ({ params }: Props) => {
  return (
    <dl>
      <dt className="font-bold">Name</dt>
      <dd className="mb-2"></dd>
      <dt className="font-bold">Cost</dt>
      <dd className="mb-2">$</dd>
      <dt className="font-bold">Category</dt>
      <dd className="mb-2"></dd>
    </dl>
  );
};

export { ExpenseDetails };
