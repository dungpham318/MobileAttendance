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
  [Route("lecture")]
  public class LecturesController : ControllerBase
  {
    private readonly ILectureRepository _lectureRepository;
    public LecturesController(ILectureRepository lectureRepository)
    {
      _lectureRepository = lectureRepository;
    }

    [AllowAnonymous]
    [Route("login")]
    [HttpPost]
    public async Task<ActionResult> Login(LoginDto loginDto)
    {
      try
      {
        Lecture lecture1 = new()
        {
          EmailToken = loginDto.EmailToken
        };

        var response = await _lectureRepository.Login(lecture1);

        if (response == null)
        {
          return Ok(new
          {
            resultCode = -1,
            message = "Error"
          });
        }
        else
        {
          return Ok(new
          {
            resultCode = 1,
            message = "Success",
            data = response
          });
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

    [Authorize(Role.Admin)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lecture>>> GetLectures()
    {
      try
      {
        var lectures = await _lectureRepository.GetAll();
        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = lectures
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
    [HttpGet("{id}")]
    public async Task<ActionResult<Lecture>> GetProduct(int id)
    {
      try
      {
        var lectures = await _lectureRepository.Get(id);
        if (lectures == null)
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
          data = lectures
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

    // [Authorize(Role.Admin)]
    [HttpPost]
    public async Task<ActionResult> CreateLecture(CreateLectureDto createLectureDto)
    {
      try
      {
        Lecture lecture = new()
        {
          Name = createLectureDto.Name,
          Email = createLectureDto.Email,
          EmailToken = createLectureDto.EmailToken,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now,
          Role = createLectureDto.Role,
        };

        await _lectureRepository.Add(lecture);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = lecture
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
    public async Task<ActionResult> DeleteLecture(int id)
    {
      try
      {
        await _lectureRepository.Delete(id);
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
    public async Task<ActionResult> UpdateLecture(int id, UpdateLectureDto updateLectureDto)
    {
      try
      {
        Lecture lecture = new()
        {
          Id = id,
          Name = updateLectureDto.Name,
          Email = updateLectureDto.Email,
          EmailToken = updateLectureDto.EmailToken,
          IsAdmin = updateLectureDto.IsAdmin,
          DateUpdated = DateTime.Now
        };

        await _lectureRepository.Update(lecture);
        var result = await _lectureRepository.Get(id);
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
  }
}