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
  [Route("attendance")]
  public class AttendanceController : ControllerBase
  {

    private readonly IAttendanceRepository _attendanceRepository;
    private readonly ISessionRepository _sessionRepository;
    private readonly IRoomRepository _roomRepository;
    private readonly ICourseRepository _courseRepository;
    public AttendanceController(
        IAttendanceRepository attendanceRepository,
        ISessionRepository sessionRepository,
        IRoomRepository roomRepository,
        ICourseRepository courseRepository
        )
    {
      _attendanceRepository = attendanceRepository;
      _sessionRepository = sessionRepository;
      _roomRepository = roomRepository;
      _courseRepository = courseRepository;
    }

    [Authorize(Role.User)]
    [HttpPost]
    [Route("checkin")]
    public async Task<ActionResult> Checkin(CreateAttendanceDto createAttendanceDto)
    {
      try
      {
        Lecture lecture = (Lecture)HttpContext.Items["Lecture"];

        var session = await _sessionRepository.Get(createAttendanceDto.SessionID);

        if (session == null)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Can't found session",
          });
        }

        if (session.LecID != lecture.Id)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Error",
          });
        }

        if (session.SessionStatus == 1 || session.SessionStatus == 2)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Bạn đã checkin hôm nay",
          });
        }

        var checkRoom = await _roomRepository.Get(session.RoomID);
        Console.WriteLine(session.RoomID);
        Console.WriteLine(createAttendanceDto.MACAddress);
        Console.WriteLine(createAttendanceDto.QRCode);
        if (checkRoom.MACAddress != createAttendanceDto.MACAddress
        || checkRoom.QRCode != createAttendanceDto.QRCode)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Room invalid",
          });
        }


        var attendance = new Attendance()
        {
          SessionID = createAttendanceDto.SessionID,
          CheckinTime = DateTime.Now,
          DateCreated = DateTime.Now
        };

        var updateSession = new Session()
        {
          Id = session.Id,
          SessionStatus = 1
        };
        await _attendanceRepository.Add(attendance);
        await _sessionRepository.Update(updateSession);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = attendance
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
    [HttpPost]
    [Route("checkout")]
    public async Task<ActionResult> Checkout(UpdateAttendanceDto updateAttendanceDto)
    {
      try
      {
        Lecture lecture = (Lecture)HttpContext.Items["Lecture"];

        var session = await _sessionRepository.Get(updateAttendanceDto.SessionID);

        if (session == null)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Can't found session",
          });
        }

        if (session.LecID != lecture.Id)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Error",
          });
        }

        var checkRoom = await _roomRepository.Get(session.RoomID);
        if (checkRoom.MACAddress != updateAttendanceDto.MACAddress
        || checkRoom.QRCode != updateAttendanceDto.QRCode)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Room invalid",
          });
        }

        var checkAttendance = await _attendanceRepository.GetBySession(session.Id);
        if (checkAttendance == null)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Error",
          });
        }


        var attendance = new Attendance()
        {
          Id = checkAttendance.Id,
          CheckoutTime = DateTime.Now,
          DateUpdated = DateTime.Now
        };

        var updateSession = new Session()
        {
          Id = session.Id,
          SessionStatus = 2
        };

        await _attendanceRepository.Update(attendance);
        await _sessionRepository.Update(updateSession);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = attendance
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

  }
}