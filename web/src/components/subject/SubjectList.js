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

const SubjectList = (props) => {

  const [popupCreate, setPopupCreate] = useState(false)
  const [roomList, setRoomList] = useState([])

  const [selectedSubject, setSelectedSubject] = useState(undefined)


  const [name, setName] = useState('')


  useEffect(() => {
    getTermListApi()
  }, [])

  useEffect(() => {
    if (popupCreate === false) {
      setName('')
      setSelectedSubject(undefined)
    }
  }, [popupCreate])

  const getTermListApi = async (input) => {
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
          let index = 1
          for (const item of result.data) {
            tmp.push([
              index,
              item.id,
              item.name,
              convertDateTime(item.dateCreated),
              convertDateTime(item.dateUpdated),
            ])
            ++index
          }
          setRoomList(tmp)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const addNewTermApi = async (input) => {
    let url = '/subject'
    return fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        "name": name,
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
          getTermListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const updateTermApi = async (input) => {
    let url = '/subject/' + selectedSubject[1]
    return fetch(API_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        "name": name,
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
          getTermListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const deleteTermApi = async (input) => {
    let url = '/subject/' + input
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
          getTermListApi()
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
          { id: 6, label: 'Created At' },
          { id: 7, label: 'Updated At' },
        ]}
        data={roomList}
        onEdit={(event, item) => {
          setSelectedSubject(item)
          setName(item[2])
          setPopupCreate(true)
        }}
        onDelete={(event, item) => {
          if (window.confirm('Bạn có chắc chắn muốn xoá phòng ' + item[2] + ' ?')) {
            deleteTermApi(item[1])
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
            label='Term Name'
          />
          <br />
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
                  if (selectedSubject !== undefined) {
                    updateTermApi()
                  } else {
                    addNewTermApi()
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

export default SubjectList