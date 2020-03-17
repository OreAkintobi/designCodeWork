import React from "react";
import styled from "styled-components";

const CoursesScreen = ({ navigation }) => {
  return (
    <Container>
      <Text>Courses Screen</Text>
      <Button
        title="Close"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Container>
  );
};

export default CoursesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Button = styled.Button``;
