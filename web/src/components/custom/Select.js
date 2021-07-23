import React, { useEffect, useState } from 'react'
import ic_arrow_down from '../../assets/images/ic_arrow_down.svg'
import Popper from "popper.js"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

const Select = (props) => {

  const {
    label,
    placeholder,
    itemList,
    selected,
    showText
  } = props

  const [selectedItem, setSelectedItem] = useState(props.defaultValue)


  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };


  const onSelectItem = (e, item) => {
    e.preventDefault()
    setSelectedItem(item)
    props.onSelectItem(item)
  }

  useEffect(() => {
    if (!selected) return
    setSelectedItem(selected)
    // props.onSelectItem(selected)
  }, [selected])

  useEffect(() => {
    setSelectedItem(props.defaultValue)
    // props.onSelectItem(selected)
  }, [props.defaultValue])


  return (
    <div className='flex flex-row items-center items-center'>
      {
        label !== undefined &&
        <span className='text-left font-text text-sm font-bold pr-6 w-32'>{label}</span>
      }
      {
        props.type === 'date' &&
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            ampm={false}
            // disableToolbar
            variant="inline"
            // format="yyyy/MM/dd HH:mm"
            // margin="normal"
            // label="Ngày bắt đầu"
            value={selectedItem}
            onChange={(date) => {
              setSelectedItem(new Date(date))
              props.onSelectItem(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      }
      {
        props.type === 'time' &&
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            // disableToolbar
            variant="inline"
            // format="yyyy/MM/dd HH:mm"
            // margin="normal"
            // label="Ngày bắt đầu"
            value={selectedItem}
            onChange={(date) => {
              setSelectedItem(new Date(date))
              props.onSelectItem(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      }
      {
        props.type === 'default' &&
        <div className='flex flex-auto'>
          <button
            ref={btnDropdownRef}
            className={
              "flex flex-auto flex-row items-center focus:outline-none " +
              "border border-inputBorder hover:border-inputFocus focus:border-inputFocus " +
              "font-text text-text " +
              "py-1 mx-10 px-2 rounded-lg text-base " +
              "focus:shadow focus:ring-1 ring-inputFocus " +
              (props.className)
            }
            onClick={() => {
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
            onBlur={() => {
              closeDropdownPopover()
            }}
          >
            <span className={'flex flex-auto ' + (selectedItem !== undefined ? + 'text-text' : 'text-gray')} placeholder=''>
              {showText ? showText : (selectedItem !== undefined ? selectedItem.label : placeholder)}
            </span>

            <img
              src={ic_arrow_down}
            />

            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-white " +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 w-96 " +
                "max-h-80 overflow-y-scroll "
              }
            >
              {
                itemList.map((item, index) => {
                  return (
                    <a
                      key={index}
                      className={
                        "text-sm py-3 px-4 font-normal block whitespace-no-wrap bg-transparent hover:bg-gray-300 text-gray-800 " +
                        "w-auto "
                      }
                      onClick={(e) => {
                        onSelectItem(e, item)
                      }}
                    >
                      {item.label}
                    </a>
                  )
                })
              }

            </div>

          </button>
        </div>

      }

    </div>

  )
}

Select.defaultProps = {
  onSelectItem: () => {

  },
  defaultValue: undefined,
  type: 'default'
}

export default Select