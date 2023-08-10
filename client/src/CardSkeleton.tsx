import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return Array(3)
    .fill(0)
    .map((_, index) => (
      <div className="card-skeleton" key={index}>
        <Skeleton className="card-skeleton-text" count={3} />
      </div>
    ));
};

export default CardSkeleton;
