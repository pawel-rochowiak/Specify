import classes from "../components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <span>Online specification tool for FF&E professionals.</span>
      <span>
        Created by
        <a
          href="https://www.linkedin.com/in/paweł-rochowiak-847373104"
          target="_blank"
        >
          Paweł Rochowiak.
        </a>
      </span>
      <span>All rights reserved.</span>
    </footer>
  );
};

export default Footer;
