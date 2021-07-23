import React, { useEffect, useState } from 'react';
import { Switch, Dialog } from '@material-ui/core';
import Title from '../custom/Title'
import Card from '../custom/Card'
import usePrevious from '../../functions/usePrevious';
import PieChart from '../custom/chart/PieChart';
import BarChart from '../custom/chart/BarChart';
import LineChart from '../custom/chart/LineChart';
import {
  FilePlus,
  XCircle,
  Save
} from 'react-feather';
import Table from '../custom/Table';
import { convertDate, convertDateTime, convertTime } from '../../functions/convertTime'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '../custom/Button'
import TextField from '../custom/TextField';
import { API_URL } from '../../config/setting'
import Select from '../custom/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

const CourseList = (props) => {

  const [popupCreate, setPopupCreate] = useState(false)
  const [courseDefaultList, setCourseDefaultList] = useState([])

  const [name, setName] = useState('')

  const [termList, setTermList] = useState([])
  const [subjectList, setSubjectList] = useState([])


  const [sessionList, setSessionList] = useState([])

  const [lectureList, setLectureList] = useState([])
  const [selectedLecture, setSelectedLecture] = useState(undefined)

  const [courseList, setCourseList] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(undefined)

  const [roomList, setRoomList] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(undefined)

  const [selectedTerm, setSelectedTerm] = useState(undefined)
  const [selectedSubject, setSelectedSubject] = useState(undefined)

  const [selectedSession, setSelectedSession] = useState(undefined)


  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  useEffect(() => {
    getSessionListApi()
    getUserListApi()
    getCourseListApi()
    getRoomListApi()
  }, [])

  useEffect(() => {
    if (popupCreate === false) {
      setName('')
      setSelectedLecture(undefined)
      setSelectedCourse(undefined)
      setSelectedSession(undefined)
    }
  }, [popupCreate])

  const getSessionListApi = async (input) => {
    let url = '/session'
    return fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          let tmp = []
          let index = 1
          for (const item of result.data) {
            tmp.push([
              index,
              item.id,
              item.name,
              convertDate(item.date),
              convertTime(item.startTime),
              convertTime(item.endTime),
              item?.lecture?.email,
              item?.course?.name,
              item?.room?.name,
              (item?.attendance !== null && item?.attendance !== undefined) ? convertTime(item?.attendance.checkinTime) : '',
              (item?.attendance !== null && item?.attendance !== undefined) ? convertTime(item?.attendance.checkoutTime) : '',
            ])
            ++index
          }
          setSessionList(tmp)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const addNewSessionApi = async (input) => {
    console.log(date)
    let url = '/session'
    return fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        "name": name,
        "date": new Date(date),
        "startTime": new Date(startTime),
        "endTime": new Date(endTime),
        "lecID": selectedLecture.id,
        "courseID": selectedCourse.id,
        "roomID": selectedRoom.id,
        "sessionStatus": 0
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          alert(result.message)
          setPopupCreate(false)
          getSessionListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const updateSessionApi = async (input) => {
    let url = '/session/' + selectedSession[1]
    return fetch(API_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        "name": name,
        "date": new Date(date),
        "startTime": new Date(startTime),
        "endTime": new Date(endTime),
        "lecID": selectedLecture.id,
        "courseID": selectedCourse.id,
        "roomID": selectedRoom.id,
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          alert(result.message)
          setPopupCreate(false)
          getSessionListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const deleteSessionApi = async (input) => {
    let url = '/session/' + input
    return fetch(API_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          alert(result.message)
          setPopupCreate(false)
          getSessionListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }


  const getUserListApi = async (input) => {
    let url = '/lecture'
    return fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          for (const item of result.data) {
            item.label = item.email
          }
          setLectureList(result.data)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const getCourseListApi = async (input) => {
    let url = '/course'
    return fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          for (const item of result.data) {
            item.label = item.name
          }
          setCourseList(result.data)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const getRoomListApi = async (input) => {
    let url = '/room'
    return fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },

    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.resultCode === -1) {
          alert(result.message)
        } else {
          for (const item of result.data) {
            item.label = item.name
          }
          setRoomList(result.data)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }


  return (
    <div className='bg-secondary min-h-screen min-w-full'>

      <div className='mx-6 py-6'>
        <Button
          // icon={<FilePlus size={18} />}
          label='Add'
          className='bg-primary'
          onClick={() => {
            setPopupCreate(true)
          }}
        />

      </div>

      <Table
        editable
        pagination={false}
        label={[
          { id: 1, label: '#' },
          { id: 2, label: 'ID' },
          { id: 3, label: 'Name' },
          { id: 4, label: 'Date' },
          { id: 5, label: 'startTime' },
          { id: 6, label: 'endTime' },
          { id: 7, label: 'Lecture' },
          { id: 8, label: 'Course' },
          { id: 9, label: 'Room' },
          { id: 10, label: 'Checkin' },
          { id: 11, label: 'Checkout' },

        ]}
        data={sessionList}
        onEdit={(event, item) => {
          setSelectedSession(item)
          setName(item[2])
          setPopupCreate(true)
          // let courseIndex = courseDefaultList.findIndex(ele => ele.id === item[1])
          // let course = courseDefaultList[courseIndex]
          // course.term.label = course?.term?.name
          // course.subject.label = course?.subject?.name
          // // item.term.label = item.term.name
          // // item.subject.label = item.subject.name
          // setSelectedTerm(course.term)
          // setSelectedSubject(course.subject)

        }}
        onDelete={(event, item) => {
          if (window.confirm('Bạn có chắc chắn muốn xoá course ' + item[2] + ' ?')) {
            deleteSessionApi(item[1])
          }
          else {
          }
        }}
      />

      <Dialog
        fullWidth={true}
        style={{
          textAlign: 'center',
        }}
        onClose={() => {
          setPopupCreate(false)
        }}
        open={popupCreate}>
        <div className=' flex flex-col px-6 w-full my-5'>
          <TextField
            value={name}
            onChange={(value) => setName(value)}
            label='Course Name'
          />
          <br />
          <Select
            label='Select Lecture'
            itemList={lectureList}
            onSelectItem={(item) => {
              setSelectedLecture(item)
            }}
            defaultValue={selectedLecture}
          />
          <br />

          <Select
            label='Select Course'
            itemList={courseList}
            onSelectItem={(item) => {
              setSelectedCourse(item)
            }}
            defaultValue={selectedCourse}
          />
          <br />
          <Select
            label='Select Room'
            itemList={roomList}
            onSelectItem={(item) => {
              setSelectedRoom(item)
            }}
            defaultValue={selectedRoom}
          />
          <br />
          <Select
            label='Date'
            type='date'
            onSelectItem={(item) => {
              console.log(item)
              setDate(item)
            }}
            defaultValue={date}
          />
          <br />
          <Select
            label='Start Time'
            type='time'
            onSelectItem={(item) => {
              setStartTime(item)
            }}
            defaultValue={startTime}
          />
          <br />
          <Select
            label='End Time'
            type='time'
            onSelectItem={(item) => {
              setEndTime(item)
            }}
            defaultValue={endTime}
          />


          <div className='flex flex-row items-center self-end mt-5'>

            <Button
              icon={<XCircle size={18} />}
              label='Cancel'
              className='bg-gray mr-3'
              onClick={() => {
                setPopupCreate(false)
              }}
            />

            <Button
              icon={<Save size={18} />}
              label='Save'
              className='bg-red-400 '
              onClick={() => {

                if (selectedSession !== undefined) {
                  updateSessionApi()
                } else {
                  addNewSessionApi()
                }

              }}
            />

          </div>

        </div>


      </Dialog>

    </div>
  )

}

export default CourseList