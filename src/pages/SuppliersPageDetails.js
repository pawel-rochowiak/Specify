import classes from "./ProjectPageDetails.module.css";
import PlusIcon from "../components/icons/PlusIcon";
import LibraryItem from "../components/LibraryItem";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const SuppliersPageDetails = (props) => {
  function findSupplier(el) {
    return el.name === props.name;
  }

  const stateSuppliers = useSelector((state) => state.suppliers);

  const correctSupplier = stateSuppliers.find(findSupplier);

  const supplierCollections = !correctSupplier.matCollections
    ? []
    : correctSupplier.matCollections;

  const noCollectionsInfo =
    !supplierCollections || supplierCollections?.length === 0 ? (
      <div className={classes.info_message}>
        No collection has been added. Please press
        <span className={classes.highlight}>"Create item"</span> button to
        create new collection
      </div>
    ) : (
      ""
    );

  return (
    <Fragment>
      <div className={classes.mainContent}>
        <div className={classes.tasks}>
          <div className={classes.name}>{props.name}</div>
          <div className={classes.taskList}>
            <div className={classes.details}>
              <h3>Supplier details</h3>
              <div className={classes.details_title}>
                <div>
                  <h4>Adress</h4>
                </div>
                <div>
                  <h4>Contact person</h4>
                </div>
              </div>
              <div className={classes.detail_container}>
                <div className={classes.detail_data}>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Country:</span>
                    {correctSupplier.adress.country}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>City:</span>
                    {correctSupplier.adress.city}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Street:</span>
                    {correctSupplier.adress.street}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Number:</span>
                    {correctSupplier.adress.number}
                  </div>
                </div>
                <div className={classes.detail_data}>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>
                      Contact person:
                    </span>
                    {correctSupplier.contactPerson.fullName}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Email:</span>
                    {correctSupplier.contactPerson.email}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Tel:</span>
                    {correctSupplier.contactPerson.tel}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.material_collections}>
            <h3>material collections</h3>
            <div className={classes.collections_container}>
              {noCollectionsInfo}
              {supplierCollections?.map((el) => (
                <Fragment>
                  <div className={classes.collection}>
                    <h4>{el.name}</h4>
                  </div>
                  {el.materials.map((el, index) => (
                    <LibraryItem
                      key={index + 1}
                      number={index + 1}
                      name={el.name}
                      collection={el.collection}
                      supplier={el.supplier}
                      certificate={el.certificates}
                      info={el.info}
                      imageUrl={el.imageUrl}
                      link={el.link}
                      dataset={index}
                      edit={props.createItem}
                      supEdit={true}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
            <div
              className={`${classes.item} ${classes.action}`}
              onClick={props.createItem}
            >
              Create Item
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SuppliersPageDetails;
