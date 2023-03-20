import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  const spinnerClass = !props.className
    ? `${classes.spinner}`
    : `${props.className}`;
  console.log(spinnerClass);
  return <div className={spinnerClass}></div>;
};

export default LoadingSpinner;
