const SuppliersIcon = (props) => {
  const viewBox = parseFloat(props.unit) * 10;
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.unit}
      height={props.unit}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
    >
      <title>suppliers</title>
      <path
        fill="#fff"
        d="M9 12h-8v6c0 1.105 0.895 2 2 2v0h14c1.105 0 2-0.895 2-2v0-6h-8v2h-2v-2zM9 11h-9v-6c0-1.1 0.9-2 2-2h4v-1c0-1.105 0.895-2 2-2v0h4c1.105 0 2 0.895 2 2v0 1h4c1.105 0 2 0.895 2 2v0 6h-9v-2h-2v2zM12 3v-1h-4v1h4z"
      ></path>
    </svg>
  );
};

export default SuppliersIcon;
