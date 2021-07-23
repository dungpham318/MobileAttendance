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
  [Route("session")]
  public class SessionController : ControllerBase
  {
    private readonly ISessionRepository _sessionRepository;
    private readonly IAttendanceRepository _attendanceRepository;
    private readonly IRoomRepository _roomRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly ILectureRepository _lectureRepository;

    public SessionController(
        ISessionRepository sessionRepository,
        IAttendanceRepository attendanceRepository,
        IRoomRepository roomRepository,
        ICourseRepository courseRepository,
        ILectureRepository lectureRepository
        )
    {
      _sessionRepository = sessionRepository;
      _attendanceRepository = attendanceRepository;
      _roomRepository = roomRepository;
      _courseRepository = courseRepository;
      _lectureRepository = lectureRepository;
    }

    [Authorize(Role.Admin)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Session>>> GetSessions()
    {
      try
      {
        var sessions = await _sessionRepository.GetAll();

        if (sessions.Count() > 0)
        {
          foreach (var item in sessions)
          {
            var checkAttendance = await _attendanceRepository.GetBySession(item.Id);
            item.Attendance = checkAttendance;
            var checkRoom = await _roomRepository.Get(item.RoomID);
            item.Room = checkRoom;
            var checkCourse = await _courseRepository.Get(item.CourseID);
            item.Course = checkCourse;
            var checkLecture = await _lectureRepository.Get(item.LecID);
            item.Lecture = checkLecture;
          }
        }

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = sessions
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

    [Authorize(Role.Admin)]
    [HttpGet("{id}")]
    public async Task<ActionResult<Session>> GetSession(int id)
    {
      try
      {
        var session = await _sessionRepository.Get(id);
        if (session == null)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Can't found id " + id,
          });
        }

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = session
        });
      }
      catch (System.Exception)
      {
        return NotFound(new
        {
          resultCode = -1,
          message = "Error",
        });
        throw;
      }

    }

    [Authorize(Role.Admin)]
    [HttpPost]
    public async Task<ActionResult> CreateSession(CreateSessionDto createSessionDto)
    {
      try
      {
        // var term = await _termRepository.Get(createSessionDto.TermID);
        // if (term == null)
        // {
        //   return NotFound(new
        //   {
        //     resultCode = -1,
        //     message = "Term not found!",
        //   });
        // }
        // var subject = await _termRepository.Get(createSessionDto.TermID);

        // if (subject == null)
        // {
        //   return NotFound(new
        //   {
        //     resultCode = -1,
        //     message = "Subject not found!",
        //   });
        // }


        Session session = new()
        {
          Name = createSessionDto.Name,
          Date = createSessionDto.Date,
          StartTime = createSessionDto.StartTime,
          EndTime = createSessionDto.EndTime,
          LecID = createSessionDto.LecID,
          CourseID = createSessionDto.CourseID,
          RoomID = createSessionDto.RoomID,
          SessionStatus = createSessionDto.SessionStatus,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now
        };

        await _sessionRepository.Add(session);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = session
        });
      }
      catch (System.Exception)
      {
        return NotFound(new
        {
          resultCode = -1,
          message = "Error",
        });
        throw;
      }
    }

    [Authorize(Role.Admin)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSession(int id)
    {
      try
      {
        await _sessionRepository.Delete(id);
        return Ok(new
        {
          resultCode = 1,
          message = "Success"
        });
      }
      catch (System.Exception)
      {
        return NotFound(new
        {
          resultCode = -1,
          message = "Error",
        });
        throw;
      }

    }

    [Authorize(Role.Admin)]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateSession(int id, UpdateSessionDto updateSessionDto)
    {
      try
      {
        // if (updateSessionDto.TermID != 0)
        // {
        //   var term = await _sessionRepository.Get(updateSessionDto.TermID);
        //   if (term == null)
        //   {
        //     return NotFound(new
        //     {
        //       resultCode = -1,
        //       message = "Term not found!",
        //     });
        //   }
        // }
        // if (updateSessionDto.TermID != 0)
        // {
        //   var term = await _termRepository.Get(updateSessionDto.TermID);
        //   if (term == null)
        //   {
        //     return NotFound(new
        //     {
        //       resultCode = -1,
        //       message = "Term not found!",
        //     });
        //   }
        // }


        Session session = new()
        {
          Id = id,
          Name = updateSessionDto.Name,
          Date = updateSessionDto.Date,
          StartTime = updateSessionDto.StartTime,
          EndTime = updateSessionDto.EndTime,
          LecID = updateSessionDto.LecID,
          CourseID = updateSessionDto.CourseID,
          RoomID = updateSessionDto.RoomID,
          SessionStatus = updateSessionDto.SessionStatus,
          DateUpdated = DateTime.Now
        };

        await _sessionRepository.Update(session);
        var result = await _sessionRepository.Get(id);
        if (result == null)
          return NotFound(new
          {
            resultCode = -1,
            message = "Error",
          });

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = result
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




    [Authorize(Role.Admin)]
    [HttpGet]
    [Route("get_session_by_date")]
    public async Task<ActionResult> GetSessionByUserDate(DateTime date)
    {
      try
      {

        Lecture lecture = (Lecture)HttpContext.Items["Lecture"];

        IEnumerable<Session> sessionList;
        if (date == default(DateTime))
        {
          DateTime now = DateTime.Now;
          TimeSpan ts = new TimeSpan(0, 0, 0);
          now = now.Date + ts;
          sessionList = await _sessionRepository.GetByUserDate(lecture.Id, now);
        }
        else
        {
          sessionList = await _sessionRepository.GetByUserDate(lecture.Id, date);
        }

        if (sessionList.Count() > 0)
        {
          foreach (var item in sessionList)
          {
            var checkAttendance = await _attendanceRepository.GetBySession(item.Id);
            item.Attendance = checkAttendance;
            var checkRoom = await _roomRepository.Get(item.RoomID);
            item.Room = checkRoom;
            var checkCourse = await _courseRepository.Get(item.CourseID);
            item.Course = checkCourse;
          }
        }

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = sessionList
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