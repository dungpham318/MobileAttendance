export const LOGIN = () => {
  return [
    {
      id: 1,
      type: "TEXT_INPUT",
      label: "Số CMT/CCCD",
      value: "",
    },
    {
      id: 2,
      type: "TEXT_INPUT",
      label: "Mật khẩu",
      value: "",
    },
  ];
};

export const REGISTER = () => {
  return [
    {
      id: 1,
      type: "TEXT_INPUT",
      label: "Số CMT/CCCD",
      value: "",
      isRequired: true,
      // minLength: 9,
      // maxLength: 12
    },
    {
      id: 2,
      type: "TEXT_INPUT",
      label: "Số điện thoại",
      value: "",
      isRequired: true,
      minLength: 10,
      maxLength: 10,
    },
    // {
    //   id: 3,
    //   type: "TEXT_INPUT",
    //   label: "Số hợp đồng",
    //   value: "",
    //   isRequired: true,
    // },
  ];
};

export const REGISTER_INFORMATION = () => {
  return [
    {
      id: 1,
      type: "TEXT_INPUT",
      label: "Số CMT/CCCD",
      value: "",
      isRequired: true,
      minLength: 9,
      maxLength: 12,
      editable: false,
    },
    {
      id: 2,
      type: "TEXT_INPUT",
      label: "Số điện thoại",
      value: "",
      isRequired: true,
      minLength: 10,
      maxLength: 10,
      editable: false,
    },
    {
      id: 3,
      type: "TEXT_INPUT",
      label: "Số hợp đồng",
      value: "",
      isRequired: true,
      editable: false,
    },
    {
      id: 4,
      type: "TEXT_INPUT",
      label: "Họ và tên",
      value: "",
      isRequired: true,
      editable: false,
    },
    {
      id: 5,
      type: "TEXT_INPUT",
      label: "Địa chỉ",
      value: "",
      isRequired: true,
      editable: false,
      multiline: true
    },
    {
      id: 6,
      type: "TEXT_INPUT",
      label: "Ngày sinh",
      value: "",
      isRequired: true,
      editable: false,
    },
  ];
};

export const FORGET_PASSWORD = () => {
  return [
    {
      id: 1,
      type: "TEXT_INPUT",
      label: "Số CMT/CCCD",
      value: "",
      isRequired: true,
    },
    {
      id: 2,
      type: "TEXT_INPUT",
      label: "Số điện thoại",
      value: "",
      isRequired: true,
      minLength: 10,
      maxLength: 10,
    },
    // {
    //   id: 3,
    //   type: "TEXT_INPUT",
    //   label: "Số hợp đồng",
    //   value: "",
    //   isRequired: true,
    //   value: '0000143094efMrPfdAv5QroJcql'
    // },
  ];
};