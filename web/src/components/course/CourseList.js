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
import { convertDateTime } from '../../functions/convertTime'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '../custom/Button'
import TextField from '../custom/TextField';
import { API_URL } from '../../config/setting'
import Select from '../custom/Select';

const CourseList = (props) => {

  const [popupCreate, setPopupCreate] = useState(false)
  const [courseList, setCourseList] = useState([])
  const [courseDefaultList, setCourseDefaultList] = useState([])

  const [name, setName] = useState('')

  const [termList, setTermList] = useState([])
  const [subjectList, setSubjectList] = useState([])


  const [selectedTerm, setSelectedTerm] = useState(undefined)
  const [selectedSubject, setSelectedSubject] = useState(undefined)
  const [selectedCourse, setSelectedCourse] = useState(undefined)



  useEffect(() => {
    getCourseListApi()
    getTermListApi()
    getSubjectListApi()
  }, [])

  useEffect(() => {
    if (popupCreate === false) {
      setName('')
      // setTermId('')
      // setSubjectId('')
      setSelectedTerm(undefined)
      setSelectedSubject(undefined)
      setSelectedCourse(undefined)
    }
  }, [popupCreate])

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
          let tmp = []
          let index = 1
          for (const item of result.data) {
            tmp.push([
              index,
              item.id,
              item.name,
              item?.term?.name,
              item?.subject?.name,
              convertDateTime(item.dateCreated),
              convertDateTime(item.dateUpdated),
            ])
            ++index
          }
          setCourseList(tmp)
          setCourseDefaultList(result.data)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const addNewCourseApi = async (input) => {
    let url = '/course'
    console.log(selectedTerm)
    console.log(selectedSubject)
    return fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        "name": name,
        "termID": selectedTerm.id,
        "subID": selectedSubject.id
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
          getCourseListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const updateCourseApi = async (input) => {
    let url = '/course/' + selectedCourse[1]
    return fetch(API_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        "name": name,
        "termID": selectedTerm.id,
        "subID": selectedSubject.id
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
          getCourseListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const deleteCourseApi = async (input) => {
    let url = '/course/' + input
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
          getCourseListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const getTermListApi = async (input) => {
    let url = '/term'
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
            tmp.push({
              id: item.id,
              label: item.name,
            })
          }
          console.log(tmp)
          setTermList(tmp)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const getSubjectListApi = async (input) => {
    let url = '/subject'
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
          for (const item of result.data) {
            tmp.push({
              id: item.id,
              label: item.name
            })
          }
          setSubjectList(tmp)
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
          { id: 3, label: 'Term' },
          { id: 3, label: 'Subject' },
          { id: 6, label: 'Created At' },
          { id: 7, label: 'Updated At' },
        ]}
        data={courseList}
        onEdit={(event, item) => {
          setSelectedCourse(item)
          setName(item[2])
          setPopupCreate(true)
          let courseIndex = courseDefaultList.findIndex(ele => ele.id === item[1])
          let course = courseDefaultList[courseIndex]
          course.term.label = course?.term?.name
          course.subject.label = course?.subject?.name
          // item.term.label = item.term.name
          // item.subject.label = item.subject.name
          console.log(course.term)
          console.log(course.subject)
          setSelectedTerm(course.term)
          setSelectedSubject(course.subject)
        }}
        onDelete={(event, item) => {
          if (window.confirm('Bạn có chắc chắn muốn xoá course ' + item[2] + ' ?')) {
            deleteCourseApi(item[1])
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
            label='Select Term'
            itemList={termList}
            onSelectItem={(item) => {
              setSelectedTerm(item)
            }}
            defaultValue={selectedTerm}
          />
          <br />

          <Select
            label='Select Subject'
            itemList={subjectList}
            onSelectItem={(item) => {
              setSelectedSubject(item)
            }}
            defaultValue={selectedSubject}
          />
          {/* <div className='flex flex-row items-center mt-5'>
            <span className='text-left font-text text-sm font-bold w-32 pr-6'>Is Admin</span>
            <Switch
              checked={isAdmin}
              onChange={(event) => {
                setIsAdmin(event.target.checked)
              }} />
          </div> */}

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
                if (name !== '') {
                  if (selectedCourse !== undefined) {
                    updateCourseApi()
                  } else {
                    addNewCourseApi()
                  }
                } else {
                  alert('Please input room name')
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