const MinusIcon = (props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      fill={!props.fill ? "#fff" : props.fill}
      onClick={props.onClick}
      viewBox="0 0 20 20"
    >
      <title>delete</title>
      <path
        fill="#fff"
        d="M10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0zM10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8v0c-4.418 0-8 3.582-8 8s3.582 8 8 8v0zM15 9v2h-10v-2h10z"
      ></path>
    </svg>
  );
};

export default MinusIcon;
