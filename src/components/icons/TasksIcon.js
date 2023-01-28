const TasksIcon = (props) => {
  const viewBox = parseFloat(props.unit) * 10;
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.unit}
      height={props.unit}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
    >
      <title>tasks</title>
      <path
        fill="#fff"
        d="M7.030 2.6c0.215-1.465 1.462-2.577 2.97-2.577s2.755 1.112 2.968 2.561l0.002 0.016 2.030 0.4v1h1c1.105 0 2 0.895 2 2v0 12c0 1.105-0.895 2-2 2v0h-12c-1.105 0-2-0.895-2-2v0-12c0-1.1 0.9-2 2-2h1v-1l2.030-0.4zM5 6h-1v12h12v-12h-1v1h-10v-1zM10 4c0.552 0 1-0.448 1-1s-0.448-1-1-1v0c-0.552 0-1 0.448-1 1s0.448 1 1 1v0z"
      ></path>
    </svg>
  );
};

export default TasksIcon;
