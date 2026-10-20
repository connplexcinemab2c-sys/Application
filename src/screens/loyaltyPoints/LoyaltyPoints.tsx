import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Container, Header} from '../../components';
import {color} from '../../theme';
import loyaltyPointsController from './loyaltyPoints.controller';
import {rewards} from './loyaltyPoints.const';
import RewardsCard from '../../components/cards/rewardsCard/RewardsCard';
import style from './loyaltyPoints.style';

const LoyaltyPoints: React.FC = () => {
  const {fill} = loyaltyPointsController();
  return (
    <Container
      containerStyle={style.mainContainer}
      scrollContentContainerStyle={style.scrollView}>
      <View style={style.overflow}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 1, 0.1]}
          colors={['#181510', '#282013']}
          style={style.container}>
          <Header
            title="Snacks"
            titleContainerStyle={style.titleContainer}
            containerStyle={style.header}
            withBackground={false}
            backIcon
          />
          <View style={style.progressContainer}>
            <AnimatedCircularProgress
              size={238}
              width={30}
              fill={fill}
              tintColor={color.white}
              backgroundColor={color.textsColor}
              rotation={-90}
              lineCap="round"
              arcSweepAngle={180}>
              {fill => (
                <View style={style.progressContainer}>
                  <Text allowFontScaling={false} style={style.percentText}>
                    {fill}
                  </Text>
                  <Text allowFontScaling={false} style={style.outOfPoints}>
                    Out of 300 points
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <Text allowFontScaling={false} style={style.rewardText}>
              250 points to next reward
            </Text>
          </View>
          <View style={style.rewardBtnCon}>
            <Button
              title="MY REWARDS"
              containerStyle={style.button}
              titleStyle={style.btnText}
              onPress={() => {}}
            />
            <Button
              title="REDEEM REWARD"
              containerStyle={style.redeemButton}
              gradient={[color.transparent, color.transparent]}
              titleStyle={style.btnText}
              onPress={() => {}}
            />
          </View>
        </LinearGradient>
      </View>
      <FlatList
        data={rewards}
        renderItem={({item, index}) => {
          return <RewardsCard item={item} index={index} />;
        }}
        contentContainerStyle={style.flatlist}
        keyExtractor={(item, index) => `${index}`}
      />
    </Container>
  );
};

export default LoyaltyPoints;
