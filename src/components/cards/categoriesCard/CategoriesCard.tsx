import {Text, Pressable, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './categoriesCard.style';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../../theme';
import imageIndex from '../../../assets/imageIndex';
import constant from '../../../services/config/constant';
import {CategoriesCardProps} from './categoriesCardProps';
import SvgIndex from '../../../assets/svgIndex';

const CategoriesCard = ({
  index,
  item,
  onPress,
  selected,
}: CategoriesCardProps) => {
  const isAllCategory = item?._id === 'all';

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(item)}
      style={styles.container}>
      {isAllCategory ? (
        <LinearGradient
          style={styles.allimage}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          colors={color.categorySelected}>
          <SvgIndex.FourSquare />
        </LinearGradient>
      ) : (
        <Image
          style={styles.iconImage}
          source={
            item?.image
              ? {uri: `${constant.ecomImageUrl}${item?.image}`}
              : imageIndex.boxMenu
          }
        />
      )}

      <Text style={styles.name} numberOfLines={1} allowFontScaling={false}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
