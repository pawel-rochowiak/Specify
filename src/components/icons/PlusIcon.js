const PlusIcon = (props) => {
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
      <title>add</title>
      <path d="M11 9h4v2h-4v4h-2v-4h-4v-2h4v-4h2v4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0zM10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8v0c-4.418 0-8 3.582-8 8s3.582 8 8 8v0z"></path>
    </svg>
  );
};

export default PlusIcon;
