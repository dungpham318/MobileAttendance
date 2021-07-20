import React, { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native'
import FormItem from './FormItem'
import size from '../../../res/size'
class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentDidMount() {
    this.onChangeValue()
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data
      })
    }
  }

  checkError = () => {
    const { data } = this.props;
    let isError = false;
    for (let item of data) {
      if (this.refs[`item_${item.id}`]) {

        // check required
        if (item.isRequired) {
          if (item.value === '') {
            this.refs[`item_${item.id}`].error('Vui lòng nhập đầy đủ thông tin ' + item.label.toLowerCase())
            isError = true
          }
        }

        // check range
        if (item?.value && item?.minValue && item?.maxValue) {
          let tmpValue = item?.value.split('.').join('')
          let tmpMax = item?.maxValue.split('.').join('')
          let tmpMin = item?.minValue.split('.').join('')
          if (tmpValue < tmpMin || tmpValue > tmpMax) {
            this.refs[`item_${item.id}`].error(item.label + ' phải trong khoảng từ ' + item?.minValue + ' đến ' + item?.maxValue)
            isError = true
          }
        }

        //checkLength
        if (item?.value && item?.minLength && item?.maxLength) {
          let length = item?.value.length
          if (length < item.minLength || length > item.maxLength) {
            this.refs[`item_${item.id}`].error(item.label + ' không hợp lệ')
            isError = true
          }
        }
      }


    }
    return isError;
  }

  reset = () => {
    for (let item of data) {
      if (this.refs[`item_${item.id}`]) {
        this.refs[`item_${item.id}`].error('')
      }
    }
  }

  onChangeValue = (index) => {
    for (let item of this.state.data) {
      if (item.parentID !== undefined) {
        if (this.state.data[index].value !== '') {
          item.editable = true
        } else {
          item.editable = false
        }
        if (this.props.data[index].value !== '') {
          item.editable = true
        } else {
          item.editable = false
        }
      }
    }
    this.setState({
      data: this.state.data
    }, () => {
      this.props.onChangeValue()
    })
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'transparent'
      }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={
            Platform.OS === "ios"
              ? ((size.s340 * 1.07) / 896) * Dimensions.get("window").height
              : size.s340
          }
        >
          <ScrollView style={{
            flex: 1,
            paddingHorizontal: size.s30,
          }}
            showsVerticalScrollIndicator={false}
          >

            {
              this.state.data.map((item, index) => {
                return <FormItem
                  data={item}
                  key={index}
                  ref={`item_${item.id}`}
                  onChangeValue={() => {
                    this.onChangeValue(index)
                  }}
                />
              })
            }

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

}

Form.defaultProps = {
  onChangeValue: () => {

  }
}

export default Form