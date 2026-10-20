import React, {memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const TimeDetailShimmer = (props: any) => {
  const list = [1, 2, 3];
  const timeList = [1, 2, 3];

  return (
    <ScrollView scrollEnabled={false}>
      <SkeletonPlaceholder
        backgroundColor="#e0e0e0"
        highlightColor="#9F9F9F"
        children={
          <View>
            {props?.screen == 'moviePerCinema' && (
              <SkeletonPlaceholder.Item
                width="40%"
                height={18}
                borderRadius={4}
                marginBottom={15}
                marginTop={5}
              />
            )}
            {timeList.map((_, index) => (
              <View style={style.parent}>
                <SkeletonPlaceholder.Item
                  width="80%"
                  height={20}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={props?.screen == 'theatreSeats' ? '70%' : '60%'}
                  height={props?.screen == 'theatreSeats' ? 18 : 14}
                  borderRadius={4}
                  marginTop={props?.screen == 'theatreSeats' ? 8 : 6}
                />
                <View style={style.container}>
                  {list.map((_, index) => (
                    <SkeletonPlaceholder.Item
                      key={index}
                      width="28%"
                      height={30}
                      borderRadius={20}
                      marginRight={8}
                      marginTop={10}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        }></SkeletonPlaceholder>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  parent: {
    borderWidth: 1,
    borderColor: '#D39D2F',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
});

export default memo(TimeDetailShimmer);
