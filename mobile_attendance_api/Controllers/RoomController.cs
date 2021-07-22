using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mobile_attendance_api.Dtos;
using mobile_attendance_api.Models;
using mobile_attendance_api.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Diagnostics;

namespace mobile_attendance_api.Controllers
{
  [ApiController]
  [Route("room")]
  public class RoomController : ControllerBase
  {
    private readonly IRoomRepository _roomRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly ISubjectRepository _subjectRepository;
    private readonly ITermRepository _termRepository;
    public RoomController(
        IRoomRepository roomRepository,
        ICourseRepository courseRepository,
        ISubjectRepository subjectRepository,
        ITermRepository termRepository
    )
    {
      _roomRepository = roomRepository;
      _courseRepository = courseRepository;
      _subjectRepository = subjectRepository;
      _termRepository = termRepository;
    }


    [Authorize(Role.Admin)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
    {
      try
      {
        var rooms = await _roomRepository.GetAll();
        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = rooms
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
    public async Task<ActionResult<Course>> GetRoom(int id)
    {
      try
      {
        var room = await _roomRepository.Get(id);
        if (room == null)
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
          data = room
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
    public async Task<ActionResult> CreateRoom(CreateRoomDto createRoomDto)
    {
      try
      {
        // var term = await _termRepository.Get(createRoomDto.TermID);
        // if (term == null)
        // {
        //   return NotFound(new
        //   {
        //     resultCode = -1,
        //     message = "Term not found!",
        //   });
        // }
        // var subject = await _termRepository.Get(createCourseDto.TermID);

        // if (subject == null)
        // {
        //   return NotFound(new
        //   {
        //     resultCode = -1,
        //     message = "Subject not found!",
        //   });
        // }


        Room room = new()
        {
          Name = createRoomDto.Name,
          MACAddress = createRoomDto.MACAddress,
          QRCode = createRoomDto.QRCode,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now,
        };

        await _roomRepository.Add(room);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = room
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
    public async Task<ActionResult> DeleteRoom(int id)
    {
      try
      {
        await _roomRepository.Delete(id);
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
    public async Task<ActionResult> UpdateRoom(int id, UpdateRoomDto updateRoomDto)
    {
      try
      {
        // if (updateCourseDto.TermID != 0)
        // {
        //   var term = await _termRepository.Get(updateCourseDto.TermID);
        //   if (term == null)
        //   {
        //     return NotFound(new
        //     {
        //       resultCode = -1,
        //       message = "Term not found!",
        //     });
        //   }
        // }
        // if (updateCourseDto.TermID != 0)
        // {
        //   var term = await _termRepository.Get(updateCourseDto.TermID);
        //   if (term == null)
        //   {
        //     return NotFound(new
        //     {
        //       resultCode = -1,
        //       message = "Term not found!",
        //     });
        //   }
        // }


        Room room = new()
        {
          Id = id,
          Name = updateRoomDto.Name,
          MACAddress = updateRoomDto.MACAddress,
          DateUpdated = DateTime.Now,
        };

        await _roomRepository.Update(room);
        var result = await _roomRepository.Get(id);
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
  }


}