export default function CharacterCardSkeleton() {
  return (
    <div className="card skeleton-card">
      <div className="card-image skeleton-block" />
      <div className="card-body">
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line skeleton-line-short" />
      </div>
    </div>
  );
}
