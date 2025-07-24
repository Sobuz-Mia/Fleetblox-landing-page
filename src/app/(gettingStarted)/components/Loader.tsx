interface Props {
  size?: number;
  viewBox?: number;
}
const Loader = ({ size = 48, viewBox = 48 }: Props) => {
  return (
    <div className="flex flex-col justify-between items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        xmlSpace="preserve"
        version="1.1"
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        className="animate-spin-slow"
      >
        <image
          width={size}
          height={size}
          xlinkHref="data:image/png;base64,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"
        />
      </svg>
    </div>
  );
};

export default Loader;
