import React, { useEffect } from "react";
import styled from "styled-components";
import { StatusBar, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const SectionScreen = ({ route, navigation: { goBack } }) => {
  const { section } = route.params;

  return (
    <Container>
      <StatusBar hidden />
      <Cover>
        <Image source={{ uri: section.image }} />
        <Wrapper>
          <Logo source={{ uri: section.logo }} />
          <Subtitle>{section.subtitle}</Subtitle>
        </Wrapper>
        <Title>{section.title}</Title>
        <Caption>{section.caption}</Caption>
      </Cover>
      <TouchableOpacity
        style={{ position: "absolute", top: 20, right: 20 }}
        onPress={() => goBack()}
      >
        <CloseView>
          <Ionicons
            name="ios-close"
            size={36}
            color="#4775f2"
            style={{ marginTop: -2 }}
          />
        </CloseView>
      </TouchableOpacity>
      <Content>
        <WebView
          source={{ html: htmlContent + htmlStyles }}
          scalesPageToFit={false}
          scrollEnabled={false}
          onNavigationStateChange={event => {
            console.log(event);

            if (event.url != "about:blank") {
              Linking.openURL(event.url);
            }
          }}
        />
      </Content>
    </Container>
  );
};

export default SectionScreen;

const htmlContent = `
<h2>This is a title</h2>
<p>This <strong>is</strong> my <a href="https://github.com/oreakintobi">Github link</a></p>
<img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
`;

const htmlStyles = `
<style>
* {
  font-family: -apple-system, Roboto;
  margin:0;
  font-size: 30px;
  padding: 0;
}

img {
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
`;

const Content = styled.View`
  height: 100%;
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40;
  left: 20;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;
