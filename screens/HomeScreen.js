import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
}

class HomeScreen extends React.Component {
  state = {
    cards: [],
    courses: [],
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("dark-content", true);
      StatusBar.setHidden(true);
    }

    fetch("https://next.json-generator.com/api/json/get/VkIGrEVBu")
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        return responseJson;
      })
      .then(cards => {
        this.setState({ cards: cards });
        // console.log(cards);
      })
      .catch(error => {
        console.error(error);
      });

    fetch("https://next.json-generator.com/api/json/get/4yHewBVSd")
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        return responseJson;
      })
      .then(courses => {
        this.setState({ courses: courses });
        // console.log(courses);
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome back,</Title>
                <Name>{this.props.name}</Name>
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, top: 5 }}
                >
                  <Ionicons
                    name="ios-notifications"
                    size={30}
                    color="#546bfb"
                  />
                </TouchableOpacity>
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 40
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>Continue Learning</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.cards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.navigate("Section", {
                        section: card
                      });
                    }}
                  >
                    <Card
                      title={card.title}
                      image={{ uri: card.image }}
                      caption={card.caption}
                      logo={{ uri: card.logo }}
                      subtitle={card.subtitle}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Subtitle>Popular Courses</Subtitle>
              <CourseContainer>
                {this.state.courses.map((course, index) => (
                  <Course
                    key={index}
                    image={{ uri: course.image }}
                    title={course.title}
                    subtitle={course.subtitle}
                    logo={{ uri: course.logo }}
                    author={course.author}
                    avatar={{ uri: course.avatar }}
                    caption={course.caption}
                  />
                ))}
              </CourseContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const CourseContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-left: 80px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  }
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Complete Studio Tutorial",
    image: require("../assets/background12.jpg"),
    subtitle: "Studio",
    caption: "2 of 12 sections",
    logo: require("../assets/logo-studio.png")
  },
  {
    title: "Beginners Guide to Redux",
    image: require("../assets/background13.jpg"),
    subtitle: "X-Code",
    caption: "3 of 12 sections",
    logo: require("../assets/logo-xcode.png")
  },
  {
    title: "Vue for Beginners",
    image: require("../assets/background14.jpg"),
    subtitle: "Vue",
    caption: "4 of 12 sections",
    logo: require("../assets/logo-vue.png")
  }
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 Section",
    image: require("../assets/background16.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ore Akintobi",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype"
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 Section",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ore Akintobi",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype"
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 Section",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ore Akintobi",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype"
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 Section",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ore Akintobi",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype"
  }
];
