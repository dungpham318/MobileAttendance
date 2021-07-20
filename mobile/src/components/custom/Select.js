import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import size from '../../res/size'
import font from '../../res/font'
import image from '../../res/image';

// import SearchBar from './SearchBar';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let color = {
  backgroundColor: '#ffffff',
  secondaryBackground: '#F4F4F4',
  normal: '#0D1927',
  popupBackground: '#00000036',
  border: '#E8E8E8',
  placeholder: '#BFBFBF',
  labelFocus: '#8C8C8C',
  error: '#F5222D',
  text: '#262626',
  green: '#2EB553',
  selected: '#ECEDEE',
  red: '#FF4D4F',
  white: '#ffffff',
  yellow: '#FFA940',
  lineBorder: '#E8E8E8',
  keyboardAppearance: 'light',
  modal: '#fff',
  iconCancel: '#ffffff',
  statusBar: 'dark-content',
  backgroundPostIt: '#F5F5F5',
  itemBackgroundPostIt: '#ffffff',
  alert: '#fff',
  ic_datePicker: '#262626',
  borderAlert: 'rgba(0,0,80,0.5)',
  backgroundDatePickerIOS: '#ffffff',
  backgroundDatePickerIOSS: '#fff',
  txtColorDateIOS: '#3E62CC',
  borderColor: '#e8e8e8',
  datePickerColor: '#8c8c8c',
};
const Select = forwardRef((props, ref) => {
  let [showSelect, setShowSelect] = useState(false);
  let [selectedItem, setSelectedItem] = useState(
    props.defaultValue !== undefined ? props.defaultValue :
      undefined,
  );
  const [items, setItems] = useState(props.listItem)
  const { listItem } = props;
  let _animatedShowSelect = useRef(new Animated.Value(0)).current;
  const time = props.time;
  let [error, setError] = useState('');

  useImperativeHandle(ref, () => ({
    setError: (content) => {
      setError(content);
    },
    clearError: (key) => {
      setError('');
    },
    info: () => { },
    open: () => {
      setShowSelect(true);
    },
    close: (callback) => {
      handleClose(() => {
        if (callback !== undefined) {
          callback();
        }
      });
    },
  }));

  useEffect(() => {
    if (props.value === '') {
      setSelectedItem(undefined);
    } else if (
      props.value !== undefined &&
      props.multiple &&
      props.value.length === 0
    ) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.defaultValue === undefined) {
      setSelectedItem(props.defaultValue);
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (showSelect) {
      Animated.timing(_animatedShowSelect, {
        toValue: 1,
        duration: time,
        useNativeDriver: false,
      }).start();
    } else {
    }
  }, [showSelect]);

  useEffect(() => {
    setItems(props.listItem)
  }, [props.listItem])

  handleOpen = async () => {
    // await setShowSelect(true)
    // Animated.timing(_animatedShowSelect, {
    //   toValue: 1,
    //   duration: time,
    //   useNativeDriver: false
    // }).start()
  };

  const handleClose = (callback) => {
    Animated.timing(_animatedShowSelect, {
      toValue: 0,
      duration: time,
      useNativeDriver: false,
    }).start();
    setTimeout(async () => {
      setShowSelect(false);

      if (callback === undefined && props.isRequired && selectedItem === undefined) {
        setError('Vui lòng chọn ' + props.label.toLowerCase())
      }

      if (callback !== undefined) {
        await callback();
      }
    }, time);
  };

  const renderItem = ({ item, index }) => {
    let isSelected = false;
    if (selectedItem !== undefined) {
      if (!props.multiple) {
        if (item.id === selectedItem.id) {
          isSelected = true;
        }
      } else {
        let tmp = selectedItem.findIndex((ele) => ele.id === item.id);
        if (tmp !== -1) {
          isSelected = true;
        }
      }
    }

    return (
      <TouchableOpacity
        disabled={props.disabled}
        style={{
          borderBottomWidth: 0.8,
          width: width,
          paddingHorizontal: 16,
          marginHorizontal: 10,
          alignItem: 'center',
          justifyContent: 'space-between',
          borderColor: color.border,
          flexDirection: 'row',
          backgroundColor: isSelected ? color.selected : color.backgroundColor,
        }}
        onPress={async () => {
          if (props.disabledSelectItem) {
          } else {
            setError('');
            if (!props.multiple) {
              if (props.requiredSubmit) {
                for (let item of items) {
                  item.isSelected = false;
                }
                item.isSelected = true;
                setSelectedItem(item);
                props.onChooseItem(item);
              } else {
                handleClose(() => {
                  for (let item of items) {
                    item.isSelected = false;
                  }
                  item.isSelected = true;
                  setSelectedItem(item);
                  props.onChooseItem(item);
                });
              }
            } else {
              if (isSelected) {
                item.isSelected = false;
                let tmp = [];
                for (let ele of selectedItem) {
                  tmp.push(ele);
                }
                let index = tmp.findIndex((ele) => ele.id === item.id);
                tmp.splice(index, 1);
                if (tmp.length === 0) {
                  tmp = undefined;
                }
                setSelectedItem(tmp);
                props.onChooseItem(tmp);
              } else {
                item.isSelected = true;
                if (selectedItem === undefined) {
                  let tmp = [];
                  tmp.push(item);
                  setSelectedItem(tmp);
                  props.onChooseItem(tmp);
                } else {
                  let tmp = [];
                  for (let ele of selectedItem) {
                    tmp.push(ele);
                  }
                  tmp.push(item);
                  setSelectedItem(tmp);
                  props.onChooseItem(tmp);
                }
              }
            }
          }
        }}>
        {props.itemView !== undefined ? (
          props.itemView(item, isSelected)
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: props.size,
                paddingVertical: size.s40,
                color: isSelected ? color.normal : color.text,
                paddingRight: props.size,
                fontWeight: isSelected ? 'bold' : 'normal',
                fontFamily: font.regular
              }}>
              {item.label !== undefined ? item.label : item}
            </Text>
          </View>
        )}

        {isSelected && (
          <Image
            resizeMode="contain"
            style={{
              width: props.size * 1.4,
              height: '100%',
              tintColor: '#000000'
            }}
          />
        )}
        {/* <View
          style={{
            backgroundColor: color.normal,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.2,
            width: '100%',
            height: '100%'
          }}
        /> */}
      </TouchableOpacity>
    );
  };

  let borderColor = color.border;
  if (showSelect) {
    borderColor = color.normal;
  }
  if (error !== '') {
    borderColor = color.error;
  }

  let label = '';
  if (selectedItem !== undefined && selectedItem !== null) {
    if (!props.multiple) {
      label = selectedItem.label;
    } else {
      if (selectedItem.length === 0) {
        label = '';
      } else {
        for (const item of selectedItem) {
          if (label === '') {
            label = item.label;
          } else {
            label = label + ' | ' + item.label;
          }
        }
      }
    }
  } else {
    label = '';
  }
  return (
    <View
      style={[
        styles.container,
        props.style,
        {

        },
      ]}>
      {/* {props.label && <Label size={props.size} label={props.label} isRequired={props.isRequired} />} */}
      {props.selectView === undefined ? (
        <TouchableOpacity
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            minHeight: props.size * 3.5,
            backgroundColor: !props.editable
              ? '#F5F5F5'
              : color.backgroundColor,
          }}
          onPress={async () => {
            if (props.editable) {
              setError('');
              await setShowSelect(true);
            }
          }}>
          <View>
            {selectedItem !== undefined && (
              <Text
                style={{
                  color: color.labelFocus,
                  fontSize: props.size * 0.75,
                  top: props.size * 0.25,
                  left: 16,
                  lineHeight:
                    Platform.OS === 'ios' ? props.size * 1.25 : props.size,
                }}>
                {
                  props.isRequired ?
                    props.label + " (bắt buộc)" :
                    props.label
                }
              </Text>
            )}

            <Text
              style={{
                // paddingTop: selectedItem === undefined ? props.size : (props.size * 0.7),
                // paddingBottom: selectedItem === undefined ? props.size : (props.size * 0.7 - 5),
                // paddingRight: props.size + 32,
                // paddingLeft: 16,
                // fontSize: props.size,
                // color: selectedItem === undefined ? color.placeholder : color.text,
                // fontSize: props.size
                fontFamily: font.regular,
                paddingVertical: selectedItem === undefined ? props.size : 0,
                paddingTop:
                  selectedItem === undefined ? props.size : props.size * 0.5,
                lineHeight: props.size * 1.25,
                fontSize: props.size,
                borderColor: color.border,
                paddingLeft: 16,
                paddingRight: props.isRequired
                  ? props.size * 2
                  : props.size + 32,
                flex: 1,
                color:
                  selectedItem === undefined ? color.placeholder : color.text,
              }}
              numberOfLines={1}>
              {selectedItem !== undefined ? label : props.label}
              {props.isRequired && selectedItem === undefined && (
                " (bắt buộc)"
              )}
            </Text>
          </View>

          {/* <Image
            style={{
              resizeMode: 'contain',
              height:
                props.type !== 'date' && props.type !== 'time'
                  ? props.size
                  : props.size * 1.6,
              alignSelf: 'center',
              right: props.type !== 'date' && props.type !== 'time' ? 16 : 0,
              position: 'absolute',
              tintColor:
                props.type !== 'date' && props.type !== 'time'
                  ? color.placeholder
                  : color.text,
            }}
            source={
              props.type === 'date'
                ? image.ic_calendar
                : props.type === 'time'
                  ? image.ic_clock
                  : image.ic_down
            }
          /> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingVertical: size.s30,
          flexDirection: 'row'
        }}
          onPress={async () => {
            if (props.editable) {
              setError('');
              await setShowSelect(true);
            }
          }}>
          <Text style={{
            fontFamily: font.medium,
            color: '#ffffff',
            fontSize: size.s30,
            paddingHorizontal: size.s10
          }}>{selectedItem !== undefined ? label : props.label}</Text>
          <Image
            source={image.ic_dropdown}
            style={{
              width: size.s35,
              height: size.s35,
            }}
          />
        </TouchableOpacity>
      )}
      {error !== '' && <ErrorView error={error} />}
      <Modal
        animationType="none"
        transparent={true}
        statusBarTranslucent
        visible={showSelect}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.isSearch && props.onSearching('');
            handleClose();
          }}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: color.popupBackground,
                // backgroundColor: 'red',
                flex: 1,
                width: '100%',
                justifyContent: 'flex-end',
                alignItem: 'center',
              }}>
              <TouchableWithoutFeedback>
                <Animated.View
                  disabled={true}
                  style={{
                    transform: [
                      {
                        translateY: _animatedShowSelect.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1000, 0],
                        }),
                      },
                    ],
                    width: '100%',
                    backgroundColor: color.backgroundColor,
                    alignSelf: 'center',
                    borderRadius: 15,
                    maxHeight: height * 0.9,
                    height: props.height,
                    minHeight:
                      props.type === 'date' || props.type === 'time'
                        ? height * 0.2
                        : height * 0.5,

                    // height:
                    //   props.type === 'date' || props.type === 'time'
                    //     ? null
                    //     : '50%',
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      width: width,
                      justifyContent: 'center',
                      borderColor: color.border,
                      flexDirection: 'row',
                      backgroundColor:
                        props.type === 'date' || props.type === 'time'
                          ? color.backgroundDatePickerIOS
                          : '',
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: props.size * 1.1,
                          paddingVertical: size.s30,
                          alignSelf: 'center',
                          color: color.text,
                          fontWeight: 'bold',
                          color: color.text,
                          fontFamily: font.regular,
                        }}>
                        {props.label} { }
                        {props.multiple &&
                          selectedItem !== undefined &&
                          '(' + selectedItem.length + ')'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        position: 'absolute',
                        left: size.s30,
                        height: '100%',
                      }}
                      onPress={() => {
                        props.isSearch && props.onSearching('');
                        handleClose();
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: size.s50,
                          height: size.s50,
                        }}
                        source={image.ic_close}
                      />
                    </TouchableOpacity>

                    {/* {(props.multiple ||
                      props.type === 'date' ||
                      props.type === 'time' ||
                      props.requiredSubmit) && (
                        <TouchableOpacity
                          style={{
                            // alignSelf: 'center',

                            right: 16,
                            position: 'absolute',
                            height: '100%',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            props.isSearch && props.onSearching('');
                            if (props.requiredSubmit) {
                              props.onPressConfirm(selectedItem);
                            } else if (
                              selectedItem === undefined &&
                              (props.type === 'date' || props.type === 'time')
                            ) {
                              if (props.type === 'date') {
                                let newDate = new Date();
                                let day = newDate.getDate();
                                let month = newDate.getMonth() + 1;
                                let year = newDate.getFullYear();
                                if (day < 10) {
                                  day = '0' + day;
                                }
                                if (month < 10) {
                                  month = '0' + month;
                                }
                                if (year < 10) {
                                  year = '0' + year;
                                }
                                setSelectedItem({
                                  id: 1,
                                  label: `${year}-${month}-${day}`,
                                  value: newDate,
                                });
                                handleClose(() => {
                                  props.onChooseItem({
                                    id: 1,
                                    label: `${year}-${month}-${day}`,
                                    value: newDate,
                                  });
                                });
                              } else {
                                let newDate = new Date();
                                let hour = newDate.getHours();
                                let minute = newDate.getMinutes();
                                if (hour < 10) {
                                  hour = '0' + hour;
                                }
                                if (minute < 10) {
                                  minute = '0' + minute;
                                }
                                setSelectedItem({
                                  id: 1,
                                  label: `${hour}:${minute}`,
                                  value: newDate,
                                });
                                handleClose(() => {
                                  props.onChooseItem({
                                    id: 1,
                                    label: `${hour}:${minute}`,
                                    value: newDate,
                                  });
                                });
                              }
                            } else {
                              handleClose(() => {
                                props.onChooseItem(selectedItem);
                              });
                            }
                          }}>
                          <Text
                            style={{
                              color: color.txtColorDateIOS,
                            }}>
                            Done
                        </Text>
                        </TouchableOpacity>
                      )} */}
                  </View>

                  {props.isSearch && (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: size.s15,
                      }}>
                      <SearchBar
                        placeholder="Search"
                        onChangeText={(text) => {
                          props.onSearching(text);
                        }}
                        style={{
                          marginHorizontal: size.s30,
                        }}
                      />
                    </View>
                  )}

                  {/* {props.type === 'normal' && ( */}
                  {
                    (items && items.length > 0) ?
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        keyExtractor={(item, index) => {
                          index.toString();
                        }}
                        renderItem={(item, index) => {
                          return renderItem(item, index)
                        }}
                        style={{
                          width: '100%',
                          alignSelf: 'center',
                          backgroundColor: '#ffffff',
                          maxHeight: height * 0.9,
                          height: props.height,
                        }}
                        contentContainerStyle={{
                          alignItems: 'center',
                        }}
                        legacyImplementation={true}
                        windowSize={30}
                        removeClippedSubviews={true}
                        disableIntervalMomentum={true}
                        onRefresh={() => props.onRefresh()}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => {
                          props.loadMore();
                        }}
                        windowSize={30}
                        removeClippedSubviews={true}
                        refreshing={props.refreshing}
                      /> :
                      <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        backgroundColor: '#ffffff',
                        maxHeight: height * 0.9,
                        height: props.height,
                        justifyContent: 'center',
                        flex: 1
                      }}>

                        <Text
                          style={{
                            fontSize: props.size,
                            paddingHorizontal: size.s30,
                            alignSelf: 'center',
                            color: color.labelFocus,
                            fontFamily: font.regular,
                          }}>
                          Không có {props?.label.toLowerCase()} nào!
                      </Text>

                      </View>

                  }

                  {/* )} */}

                  {/* {props.type === 'date' && (
                    <DatePicker
                      //  order ={"D/M/YYY"}
                      mode="date"
                      isVN={true}
                      style={{
                        height: size.s200 * 2,
                        width: undefined,
                        backgroundColor: color.backgroundDatePickerIOSS,
                      }}
                      minimumDate={new Date('2000-01-01')}
                      maximumDate={new Date('2050-12-31')}
                      onDateChange={(date) => {
                        let newDate = new Date(date);
                        let day = newDate.getDate();
                        let month = newDate.getMonth() + 1;
                        let year = newDate.getFullYear();
                        if (day < 10) {
                          day = '0' + day;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }
                        if (year < 10) {
                          year = '0' + year;
                        }
                        props.onChooseItem({
                          id: 1,
                          label: `${year}-${month}-${day}`,
                          value: newDate,
                        });
                        setSelectedItem({
                          id: 1,
                          label: `${year}-${month}-${day}`,
                          value: newDate,
                        });
                      }}
                    />
                  )} */}
                  {/* {props.type === 'time' && (
                    <DatePicker
                      //  order ={"D/M/YYY"}
                      mode="time"
                      isVN={true}
                      style={{
                        height: size.s200 * 2,
                        width: undefined,
                      }}
                      onDateChange={(date) => {
                        let newDate = new Date(date);
                        let hour = newDate.getHours();
                        let minute = newDate.getMinutes();
                        let sec = newDate.getSeconds();
                        if (hour < 10) {
                          hour = '0' + hour;
                        }
                        if (minute < 10) {
                          minute = '0' + minute;
                        }
                        if (sec < 10) {
                          sec = '0' + sec;
                        }
                        setSelectedItem({
                          id: 1,
                          label: `${hour}:${minute}:${sec}`,
                          value: newDate,
                        });
                        props.onChooseItem({
                          id: 1,
                          label: `${hour}:${minute}:${sec}`,
                          value: newDate,
                        });
                      }}
                    />
                  )} */}

                  {/* <InfinityScroll
                    data={[
                      { key: '1' },
                      { key: '2' },
                      { key: '3' },
                      { key: '4' },
                      { key: '5' },
                      { key: '6' },
                      { key: '7' },
                      { key: '8' },
                      { key: '9' },
                      { key: '10' },
                      { key: '11' },
                      { key: '12' },
                    ]}
                    renderItem={({ item }) =>
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                      }}><Text style={{
                        fontSize: size.s50
                      }}>{item.key}</Text>
                      </View>}
                  /> */}
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
});

Select.defaultProps = {
  placeholder: 'Select an item',
  type: 'normal',
  size: size.s30,
  time: 400,
  onChooseItem: () => { },
  label: '',
  isRequired: false,
  listItem: [],
  multiple: false,
  refreshing: false,
  loadMore: () => { },
  onRefresh: () => { },
  onSearching: () => { },
  CloseAction: () => { },
  editable: true
};

export default Select;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
  },
  icon: {},
});

