import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, FormControl, Button, NavItem, Container,Stack, Row} from 'react-bootstrap';
 

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div >
      <Button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </Button>
      <Button style={showWhenVisible} onClick={toggleVisibility}>
        Close
      </Button>
      <div style={showWhenVisible}>{props.children}</div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
