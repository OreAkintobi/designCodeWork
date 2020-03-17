import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    name: state.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
};

const Avatar = ({ updateName }) => {
  const [photo, setPhoto] = useState(
    "https://uinames.com/api/photos/male/4.jpg"
  );

  useEffect(() => {
    fetch("https://uinames.com/api/?ext&region=nigeria", {
      headers: new Headers({})
    }).then(response =>
      response.json().then(response => {
        setPhoto(response.photo);
        updateName(response.name);
      })
    );
  }, []);

  return <Image source={{ uri: photo }} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 26px;
`;
