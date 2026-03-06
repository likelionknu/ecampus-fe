function SkeletonCell({ className = "" }: { className?: string }) {
  return <div className={`bg-ec-loading rounded-sm ${className}`} />;
}

export default SkeletonCell;
