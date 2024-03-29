import classes from "./Arrows.module.css";

const EditIcon = (props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 32 32"
    >
      <title>check</title>
      <path
        fill="#fff"
        d="M12.42 28.678l-12.433-12.238 6.168-6.071 6.265 6.167 13.426-13.214 6.168 6.071-19.594 19.285zM3.372 16.441l9.048 8.905 16.208-15.953-2.782-2.739-13.426 13.214-6.265-6.167-2.782 2.739z"
      ></path>
    </svg>
  );
};

export default EditIcon;
