import React, { Component } from 'react'
import {
  View
} from 'react-native'
import size from '../../../res/size'
import TextField from '../TextField'
// import Select from './formItem/Select'
// import DatePickerCustom from '../DatePickerCustom'

export default class FormItem extends Component {

  constructor(props) {
    super(props);
    this.item = React.createRef()
  }

  componentDidUpdate() {
  }

  error = (error) => {
    this.item.current.setError(error)
    // console.log(this.item.current.setError())
  }

  render() {
    let view
    let { data } = this.props
    switch (this.props.data.type) {
      case 'TEXT_INPUT':
        view = <TextField
          ref={this.item}
          {...data}
          onChangeText={(text) => {
            this.props.data.value = text
            this.props.onChangeValue()
          }}
        />
        break;
      // case 'FROM_DATE_TO_DATE':
      //   view = <Select
      //     ref={this.item}
      //     {...data}
      //   />
      //   break;
      // case 'SELECT':
      //   view = <Select
      //     ref={this.item}
      //     {...data}
      //     onChooseItem={(value) => {
      //       console.log(value)
      //       this.props.data.value = value
      //       this.props.onChangeValue()
      //     }}
      //   />
      //   break;
      default:
        break;
    }
    return (
      <View style={{
        paddingVertical: size.s30,
      }}>
        {view}
      </View>
    )
  }


}