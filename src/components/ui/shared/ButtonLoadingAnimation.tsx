const LoadingButtonAnimation = ({ bg = false }: { bg?: boolean }) => (
  <div className="button-loader py-2 px-4 ">
    <div className={bg ? "dot2" : "dot"} />
    <div className={bg ? "dot2" : "dot"} />
    <div className={bg ? "dot2" : "dot"} />
  </div>
);

export default LoadingButtonAnimation;
