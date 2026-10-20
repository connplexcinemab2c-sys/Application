import {useEffect, useLayoutEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import Log from '../../utility/log';
import {SnacksListProps, SnacksProps} from './snacksList.interface';

const snacksController = ({
  details,
  onCancel,
  onSnacks,
  timer,
}: SnacksListProps): SnacksProps => {
  const [search, setSearch] = useState<string>();
  const [staticSnackList, setStaticSnackList] = useState<any[]>([]);
  const [snackListData, setSnacksListData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addSpinner, setAddSpinner] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState<string>('All');

  useEffect(() => {
    getFoodAndBeverages();
  }, []);

  useLayoutEffect(() => {
    const quantityLimit = staticSnackList
      .map(item => item.quantity)
      .reduce((acc, current) => acc + current, 0);
    setCount(quantityLimit);
  }, [snackListData]);

  const getFoodAndBeverages = async () => {
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(
        `${constant.getFoodAndBeverages}${details?.id}`,
      );
      const list = data?.data?.map((item: any) => ({
        id: item?.itemId,
        image: item?.poster,
        name: item?.itemDescription,
        price: item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
        quantity: 0,
        type: item?.type,
        itemDescription: item?.itemDescription,
        itemMasterItemCode: item?.itemMasterItemCode,
        itemPrice: item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
        _id: item?._id,
        orderAdded: 0,
        ...item,
      }));

      setSnacksListData(list);
      setStaticSnackList(list);
      setLoading(false);
      Log('food and beverages', data);
    } catch (error: any) {
      setLoading(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log('food and beverages error', error?.response?.data);
    }
  };

  const onAddToCart = async () => {
    /* API call for adding food and beverages */
    try {
      const list = staticSnackList
        .filter(item => item.quantity > 0)
        .map(item => ({
          ...item,
          itemId: item.id,
          name: item.name,
          quantity: item.quantity,
          orderAdded: item.quantity,
          price: item.price * item.quantity,
          id: item?.itemId,
          image: item?.poster,
          type: item?.type,
          itemDescription: item?.itemDescription,
          itemMasterItemCode: item?.itemMasterItemCode,
          itemPrice:
            item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
          _id: item?._id,
        }));

      const snackOrderString = `|${list?.length}|${list
        ?.map(item => `${item.itemId}|${item.quantity}|-1|`)
        ?.join('')}`;
      const formData = new URLSearchParams();
      if (details?.cinemaName) {
        formData.append('cinemaId', details?.cinemaName);
      }
      if (details?.transactionId) {
        formData.append('strTransId', details?.transactionId);
      }
      if (snackOrderString) {
        formData.append('strItemsOrder', snackOrderString);
      }
      if (list?.length) {
        formData.append('itemData', JSON.stringify(list));
      }

      // const encryptedData = crypt('testText123', formData?.toString());
      if (list?.length) {
        setAddSpinner(true);
        const {data} = await axiosInstance.post(
          constant.addConcession,
          formData?.toString(),
        );
        setAddSpinner(false);
        onCancel();

        onSnacks(staticSnackList.filter(item => item.quantity > 0));
      } else {
        Snackbar.show({text: 'Please select at least one item'});
      }
    } catch (error: any) {
      setAddSpinner(false);
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  const onSearchFilterSnacks = (value: string) => {
    let filterData = staticSnackList.filter(item => {
      let search = [item?.name];
      let regex = search.toString().toLowerCase();
      return regex.includes(value.toLowerCase());
    });
    setSearch(value);
    setSnacksListData(filterData);
  };

  const onClear = (): void => {
    setSearch('');
    Keyboard.dismiss();
    setSnacksListData(staticSnackList);
  };

  const handleAdd = (id: string): void => {
    if (count < 10) {
      const list = staticSnackList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            id: item?.id,
            image: item?.image,
            name: item?.name,
            price: item?.price,
            quantity: 1,
            orderAdded: 1,
            type: item?.type,
            itemDescription: item?.itemDescription,
            itemMasterItemCode: item?.itemMasterItemCode,
            itemPrice:
              item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
            _id: item?._id,
          };
        } else {
          return item;
        }
      });

      const temp = [...list];
      if (activeIndex != 'All') {
        const filteredData = temp.filter(val => val.type == activeIndex);

        setSnacksListData(filteredData);
      } else {
        setSnacksListData(temp);
      }
      setStaticSnackList(temp);
    } else {
      setModal(true);
    }
  };

  const handleIncrease = (id: string): void => {
    if (count < 10) {
      const list = staticSnackList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            id: item?.id,
            image: item?.image,
            name: item?.name,
            price: item?.price,
            quantity:
              item?.quantity !== 10 ? item?.quantity + 1 : item?.quantity,
            orderAdded:
              item?.quantity !== 10 ? item?.quantity + 1 : item?.quantity,
            type: item?.type,
            itemDescription: item?.itemDescription,
            itemMasterItemCode: item?.itemMasterItemCode,
            itemPrice:
              item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
            _id: item?._id,
          };
        } else {
          return item;
        }
      });

      const temp = [...list];
      if (activeIndex != 'All') {
        const filteredData = temp.filter(val => val.type == activeIndex);
        setSnacksListData(filteredData);
      } else {
        setSnacksListData(temp);
      }
      setStaticSnackList(temp);
    } else {
      setModal(true);
    }
  };

  const handleDecrease = (id: string): void => {
    const list = staticSnackList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          id: item?.id,
          image: item?.image,
          name: item?.name,
          price: item?.price,
          orderAdded:
            item?.quantity !== 0 ? item?.quantity - 1 : item?.quantity,
          quantity: item?.quantity !== 0 ? item?.quantity - 1 : item?.quantity,
          type: item?.type,
          itemDescription: item?.itemDescription,
          itemMasterItemCode: item?.itemMasterItemCode,
          itemPrice:
            item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
          _id: item?._id,
        };
      } else {
        return item;
      }
    });

    const temp = [...list];
    if (activeIndex != 'All') {
      const filteredData = temp.filter(val => val.type == activeIndex);
      setSnacksListData(filteredData);
    } else {
      setSnacksListData(temp);
    }
    setStaticSnackList(temp);
  };

  const onClickTab = (item: any) => {
    setActiveIndex(item?.label);
    if (item?.label != 'All') {
      const filteredData = staticSnackList.filter(
        val => val.type == item?.label,
      );
      setSnacksListData(filteredData);
    } else {
      setSnacksListData(staticSnackList);
    }
  };

  return {
    search,
    snackListData,
    onClear,
    onSearchFilterSnacks,
    loading,
    handleAdd,
    handleIncrease,
    handleDecrease,
    onAddToCart,
    addSpinner,
    modal,
    setModal,
    activeIndex,
    onClickTab,
    timer,
  };
};

export default snacksController;
