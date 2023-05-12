import { Button } from "@/components/button";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorState = ({ error, reset }: Props) => {
  return (
    <div>
      <h1 className="mb-4">Error caught: {error.message}</h1>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
};

export { ErrorState };
