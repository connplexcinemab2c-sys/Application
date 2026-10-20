import React, {memo, useState} from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';
import {color} from '../../../theme';
import constant from '../../../services/config/constant';
import image from '../../../assets/imageIndex';
import {ReviewCardProps} from './reviewCard.interface';
import svg from '../../../assets/svgIndex';
import style from './reviewCard.style';

const ReviewCard: React.FC<ReviewCardProps> = ({
  item,
  isModal,
  index,
  dataLength,
}) => {
  const [readMore, setReadMore] = useState<boolean>(false);

  const onReadMore = (): void => {
    setReadMore(!readMore);
  };
  return (
    <View
      style={{
        borderBottomWidth: isModal
          ? 0.5
          : dataLength - 1 !== index && !isModal
          ? 0.3
          : undefined,
        borderBottomColor: isModal
          ? color.lightGray
          : dataLength - 1 !== index && !isModal
          ? color.reviewBorder
          : undefined,
        paddingBottom: !isModal ? 8 : 4,
        marginBottom: isModal
          ? 10
          : !isModal && dataLength - 1 !== index
          ? 13
          : 0,
      }}
      key={index}>
      <View style={style.profileContainer}>
        <Image
          source={
            item?.userId?.profile
              ? {uri: `${constant.imageURL}${item?.userId?.profile}`}
              : image.userProfile
          }
          style={style.profile}
        />
        <View style={style.userContainer}>
          <Text
            allowFontScaling={false}
            style={[
              style.username,
              {color: isModal ? color.black : color.white},
            ]}>
            {item?.userId?.firstName && item?.userId?.lastName
              ? `${item?.userId?.firstName} ${item?.userId?.lastName}`
              : 'Guest User'}
          </Text>
          <View style={style.starContainer}>
            <svg.Star />
            <Text
              allowFontScaling={false}
              style={[
                style.ratings,
                {color: isModal ? color.black : color.white},
              ]}>
              {item.movieRate}/5
            </Text>
          </View>
        </View>
        <Text
          allowFontScaling={false}
          style={[style.date, {color: isModal ? color.black : color.white}]}>
          {moment(item?.createdAt)?.utc()?.format('MMM D, YYYY')}
        </Text>
      </View>
      <Text
        allowFontScaling={false}
        style={[style.review, {color: isModal ? color.black : color.white}]}
        onPress={onReadMore}>
        {item?.movieReview?.length > 110 && !readMore
          ? item?.movieReview?.trimEnd()?.slice(0, 110)
          : item?.movieReview?.trimEnd()}
        {item?.movieReview?.length > 110 && (
          <Text allowFontScaling={false} style={style.more}>
            {readMore ? ' Read less' : '...Read more'}
          </Text>
        )}
      </Text>
    </View>
  );
};

export default memo(ReviewCard);
