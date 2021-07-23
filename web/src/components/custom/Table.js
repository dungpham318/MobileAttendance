import React, { useState, useEffect } from 'react'
import Card from './Card'
import {
  ArrowRight,
  ArrowLeft,
  Edit,
  Trash
} from 'react-feather';
import Select from '@material-ui/core/Select';

const Table = (props) => {

  const {
    label,
    data,
  } = props

  return (
    <Card>
      <table className="table-auto w-full my-3">
        <thead>
          <tr className='bg-primary0.5'>
            {
              label.map((item, index) => {
                return (
                  <th key={index} className='border border-inputBorder py-3'>{item.label}</th>
                )
              })
            }
            {
              props.editable &&
              <th className='border border-inputBorder py-3'>Action</th>
            }
            {
              props.viewDetail &&
              <th className='border border-inputBorder py-3'>Xem chi tiết</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index} className={
                  (index % 2 !== 0) && 'bg-primary0.05'
                }>
                  {
                    item.map((ele, index1) => {
                      return <td key={index1} className='border border-inputBorder py-3'>{ele}</td>
                    })
                  }
                  {
                    props.editable &&
                    <td className='flex flex-row border border-inputBorder px-3 py-3 items-center justify-center'>
                      <button
                        className='px-3'
                        onClick={(event) => {
                          props.onEdit(event, item)
                        }}>
                        <Edit color={'#333'} />
                      </button>
                      <button
                        className='px-3'
                        className='px-3'
                        onClick={(event) => {
                          props.onDelete(event, item)
                        }}
                      >
                        <Trash color={'#e3342f'} />
                      </button>
                    </td>
                  }
                  {
                    props.viewDetail &&
                    <td className='border border-inputBorder py-3'>
                      <button
                        className='px-3'
                        onClick={(event) => {
                          props.onClickViewDetail(event, item)
                        }}>
                        <span className='text-primary'>Xem chi tiết</span>
                      </button>

                    </td>
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        props.pagination &&
        <div className='mt-3 flex flex-row justify-end'>

          <div className='flex flex-row justify-center items-center'>

            <select
              onChange={(event) => {
                props.onChangePageSize(event.target.value)
              }}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={undefined}>All</option>
            </select>

            <button className='flex w-10 h-10 py-3 justify-center items-center mx-4'
              onClick={() => {
                if (props.page !== 0) {
                  props.onChangePage(props.page - 1)
                }
              }} >
              <div className='flex w-4 h-4 justify-center items-center'>
                <ArrowLeft />
              </div>
            </button>

            {props.page + 1}

            <button className='flex w-10 h-10 py-3 justify-center items-center mx-4'
              onClick={() => {
                props.onChangePage(props.page + 1)
              }} >
              <div className='flex w-4 h-4 justify-center items-center'>
                <ArrowRight />
              </div>
            </button>

          </div>

        </div>

      }

    </Card>
  )

}

Table.defaultProps = {
  label: [],
  data: [],
  pagination: true
}

export default Table