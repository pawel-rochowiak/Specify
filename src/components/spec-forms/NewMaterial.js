import classes from "./NewMaterial.module.css";

const NewMaterial = (props) => {
  return (
    <tr className={classes.info_materials}>
      <td className={classes.code}>
        <input type="number" />
      </td>
      <td className={classes.item}>
        <input type="text" />
      </td>
      <td className={classes.description}>
        <input type="text" />
      </td>
      <td className={classes.supplier}>
        <input type="text" />
      </td>
      <td className={classes.date}>
        <input type="date" />
      </td>
      <td className={classes.picture}>
        <input type="file" id="img" name="img" accept="image/*" />
      </td>
    </tr>
  );
};

export default NewMaterial;
