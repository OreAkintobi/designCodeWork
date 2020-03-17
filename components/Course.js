import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const getCourseWidth = screenWidth => {
  var cardWidth = screenWidth - 40;

  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }

  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
};

const Course = ({
  image,
  logo,
  subtitle,
  title,
  avatar,
  adaptLayout,
  caption,
  author
}) => {
  const [cardWidth, setCardWidth] = useState(getCourseWidth(screenWidth));

  useEffect(() => {
    Dimensions.addEventListener("change", adaptLayout);
  }, []);

  adaptLayout = dimensions => {
    setCardWidth(getCourseWidth(dimensions.window.width));
  };

  return (
    <Container style={{ width: cardWidth }}>
      <Cover>
        <Image source={image} />
        <Logo source={logo} resizeMode="contain" />
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </Cover>
      <Content>
        <Avatar source={avatar} />
        <Caption>{caption}</Caption>
        <Author>Taught by {author}</Author>
      </Content>
    </Container>
  );
};

export default Course;

const Container = styled.View`
  background: white;
  /* width: 335px; */
  height: 335px;
  border-radius: 14px;
  margin: 10px 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`;

const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  margin-left: 20px;
`;

const Content = styled.View`
  padding-left: 62px;
  height: 75px;
  justify-content: center;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 14px;
  font-weight: 500;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
