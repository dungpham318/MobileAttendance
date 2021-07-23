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

const UserList = (props) => {

  const prevGetUserList = usePrevious(props.loadingGetUserList)

  const [popupCreate, setPopupCreate] = useState(false)
  const [userList, setUserList] = useState([])
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState(undefined)

  useEffect(() => {
    getUserListApi()
  }, [])

  useEffect(() => {
    if (popupCreate === false) {
      setEmail('')
      setSelectedLecture(undefined)
      setIsAdmin(false)
    }
  }, [popupCreate])

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
          let tmp = []
          let index = 1
          for (const item of result.data) {
            tmp.push([
              index,
              item.id,
              item.name,
              item.email,
              item.role,
              convertDateTime(item.dateCreated),
              convertDateTime(item.dateUpdated),
            ])
            ++index
          }
          setUserList(tmp)
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const addNewUserApi = async (input) => {
    let url = '/lecture'
    return fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: email,
        "name": "",
        "emailToken": "",
        "googleId": "",
        "icon": "",
        "role": isAdmin ? 'Admin' : 'User'
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
          getUserListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const updateUserApi = async (input) => {
    let url = '/lecture/' + selectedLecture[1]
    return fetch(API_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: email,
        "role": isAdmin ? 'Admin' : 'User'
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
          getUserListApi()
        }
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const deleteUserApi = async (input) => {
    let url = '/lecture/' + input
    return fetch(API_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: email,
        "role": isAdmin ? 'Admin' : 'User'
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
          getUserListApi()
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
          { id: 4, label: 'Email' },
          { id: 5, label: 'Role' },
          { id: 6, label: 'Created At' },
          { id: 7, label: 'Updated At' },
        ]}
        data={userList}
        onEdit={(event, item) => {
          setSelectedLecture(item)
          setEmail(item[3])
          setIsAdmin(item[4])
          setPopupCreate(true)
        }}
        onDelete={(event, item) => {
          if (window.confirm('Bạn có chắc chắn muốn xoá user ' + item[3] + ' ?')) {
            deleteUserApi(item[1])
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
            value={email}
            onChange={(value) => setEmail(value)}
            label='Email'
          />
          <div className='flex flex-row items-center mt-5'>
            <span className='text-left font-text text-sm font-bold w-32 pr-6'>Is Admin</span>
            <Switch
              checked={isAdmin}
              onChange={(event) => {
                setIsAdmin(event.target.checked)
              }} />
          </div>

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
                if (email !== '') {
                  if (selectedLecture !== undefined) {
                    updateUserApi()
                  } else {
                    addNewUserApi()
                  }
                } else {
                  alert('Please input email')
                }
              }}
            />

          </div>

        </div>


      </Dialog>

    </div>
  )

}

export default UserList