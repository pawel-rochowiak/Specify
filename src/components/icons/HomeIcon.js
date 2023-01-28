const HomeIcon = (props) => {
  const viewBox = parseFloat(props.unit) * 10;
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.unit}
      height={props.unit}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
    >
      <title>home</title>
      <path
        fill="#fff"
        d="M8 20h-5v-10h-3l10-10 10 10h-3v10h-5v-6h-4v6z"
      ></path>
    </svg>
  );
};

export default HomeIcon;
