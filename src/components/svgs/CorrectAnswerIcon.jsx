const CorrectAnswerIcon = () => (
  <svg width={41} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={5}
      width={38}
      height={30}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m3.389 20 4.167-4.167 8.333 8.334L32.556 7.5l4.166 4.167L15.89 32.5 3.389 20Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#a)">
      <path d="M.056 0h40v40h-40V0Z" fill="#fff" />
    </g>
  </svg>
);

export default CorrectAnswerIcon;
