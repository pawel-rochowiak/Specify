import { useHistory } from "react-router-dom";

function Button(props) {
  let history = useHistory();

  function handleClick() {
    history.push(`/${props.path}`);
  }

  return (
    <button type="button" onClick={handleClick}>
      {props.text}
    </button>
  );
}

export default Button;
