using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mobile_attendance_api.Dtos;
using mobile_attendance_api.Models;
using mobile_attendance_api.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Diagnostics;
using System.Linq;

namespace mobile_attendance_api.Controllers
{
  [ApiController]
  [Route("device")]
  public class DeviceController : ControllerBase
  {
    private readonly IDeviceRepository _deviceRepository;
    public DeviceController(IDeviceRepository deviceRepository)
    {
      _deviceRepository = deviceRepository;
    }

    [Authorize(Role.User)]
    [HttpPost]
    [Route("register_new_device")]
    public async Task<ActionResult> RegisterNewDevice(CreateDeviceDto createDeviceDto)
    {
      try
      {

        Lecture lecture = (Lecture)HttpContext.Items["Lecture"];


        var newDevice = new Device()
        {
          LecID = lecture.Id,
          Code = createDeviceDto.Code,
          Token = createDeviceDto.Token,
          OS = createDeviceDto.OS,
          Status = createDeviceDto.Status,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now,
        };
        var existDevice = await _deviceRepository.GetByUser(lecture.Id);

        if (existDevice == null)
        {
          await _deviceRepository.Add(newDevice);
        }
        else
        {
          existDevice.Status = false;
          await _deviceRepository.Update(existDevice);
          await _deviceRepository.Add(newDevice);
        }
        // await _deviceRepository.Ip

        // var newDevice = await 
        // var device = await _deviceRepository.Add();
        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = newDevice
        });
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return NotFound(new
        {
          resultCode = -1,
          message = "Error",
        });
        throw;
      }

    }


    [Authorize(Role.User)]
    [HttpGet]
    [Route("check_device")]
    public async Task<ActionResult> CheckDevice(string deviceCode)
    {
      try
      {

        // checkType = 0 new device
        // checkType = -1 exist by order user
        // checkType = 1 exist by current user
        // checktype = 2 change device
        Lecture lecture = (Lecture)HttpContext.Items["Lecture"];


        // var existDevice = await _deviceRepository.GetByUser(lecture.Id);
        var existDevice = await _deviceRepository.GetByDeviceCode(deviceCode);
        if (existDevice != null)
        {
          if (existDevice.LecID == lecture.Id)
          {
            return Ok(new
            {
              resultCode = -1,
              message = "Success",
              data = existDevice,
              checkType = 1
            });
          }
          else
          {
            return Ok(new
            {
              resultCode = -1,
              message = "This device is registered by order user!",
              data = existDevice,
              checkType = -1
            });
          }
        }
        else
        {
          var existDeviceByUser = await _deviceRepository.GetByUser(lecture.Id);
          if (existDeviceByUser == null)
          {
            return Ok(new
            {
              resultCode = -1,
              message = "Register new device",
              checkType = 0
            });
          }
          else
          {
            return Ok(new
            {
              resultCode = -1,
              message = "Change device",
              checkType = 2
            });
          }
        }
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return NotFound(new
        {
          resultCode = -1,
          message = "Error",
        });
        throw;
      }

    }

  }
}