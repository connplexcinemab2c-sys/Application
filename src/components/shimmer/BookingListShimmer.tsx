import React, {memo} from 'react';
import {View, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BookingListShimmer = () => {
  const list = [1, 2, 3];

  return (
    <SkeletonPlaceholder
      backgroundColor="#e0e0e0"
      highlightColor="#9F9F9F"
      children={
        <View>
          <ScrollView scrollEnabled={false}>
            <View>
              {list.map((item, index) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: 10,
                    marginHorizontal: 18,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <SkeletonPlaceholder.Item
                      width={100}
                      height={130}
                      borderRadius={5}
                      marginRight={12}
                    />
                    <View
                      style={{flexDirection: 'column', flex: 1, marginTop: 8}}>
                      <SkeletonPlaceholder.Item
                        width="80%"
                        height={18}
                        borderRadius={4}
                      />
                      <SkeletonPlaceholder.Item
                        width="50%"
                        height={14}
                        borderRadius={4}
                        marginTop={6}
                      />
                      <SkeletonPlaceholder.Item
                        width="70%"
                        height={14}
                        borderRadius={4}
                        marginTop={6}
                      />
                      <SkeletonPlaceholder.Item
                        width="70%"
                        height={14}
                        borderRadius={4}
                        marginTop={6}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      borderTopWidth: 1,
                      paddingTop: 12,
                      paddingBottom: 7,
                    }}>
                    <SkeletonPlaceholder.Item
                      width="50%"
                      height={16}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      width="20%"
                      height={16}
                      borderRadius={4}
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      }
    />
  );
};

export default memo(BookingListShimmer);
