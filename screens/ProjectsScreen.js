import React from "react";
import styled from "styled-components";

class ProjectsScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>Projects Screen</Text>
        <Button
          title="Close"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Button = styled.Button``;
