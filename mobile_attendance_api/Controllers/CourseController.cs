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
  [Route("course")]
  public class CourseController : ControllerBase
  {
    private readonly ICourseRepository _courseRepository;
    private readonly ISubjectRepository _subjectRepository;
    private readonly ITermRepository _termRepository;
    public CourseController(
        ICourseRepository courseRepository,
        ISubjectRepository subjectRepository,
        ITermRepository termRepository
    )
    {
      _courseRepository = courseRepository;
      _subjectRepository = subjectRepository;
      _termRepository = termRepository;
    }


    [Authorize(Role.Admin)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
    {
      try
      {
        var courses = await _courseRepository.GetAll();
        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = courses
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
    public async Task<ActionResult<Course>> GetCourse(int id)
    {
      try
      {
        var course = await _courseRepository.Get(id);
        if (course == null)
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
          data = course
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
    public async Task<ActionResult> CreateCourse(CreateCourseDto createCourseDto)
    {
      try
      {
        var term = await _termRepository.Get(createCourseDto.TermID);
        if (term == null)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Term not found!",
          });
        }
        var subject = await _termRepository.Get(createCourseDto.TermID);

        if (subject == null)
        {
          return NotFound(new
          {
            resultCode = -1,
            message = "Subject not found!",
          });
        }


        Course course = new()
        {
          Name = createCourseDto.Name,
          SubID = createCourseDto.SubID,
          TermID = createCourseDto.TermID,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now,
        };

        await _courseRepository.Add(course);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = course
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
    public async Task<ActionResult> DeleteCourse(int id)
    {
      try
      {
        await _courseRepository.Delete(id);
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
    public async Task<ActionResult> UpdateCourse(int id, UpdateCourseDto updateCourseDto)
    {
      try
      {
        if (updateCourseDto.TermID != 0)
        {
          var term = await _termRepository.Get(updateCourseDto.TermID);
          if (term == null)
          {
            return NotFound(new
            {
              resultCode = -1,
              message = "Term not found!",
            });
          }
        }
        if (updateCourseDto.TermID != 0)
        {
          var term = await _termRepository.Get(updateCourseDto.TermID);
          if (term == null)
          {
            return NotFound(new
            {
              resultCode = -1,
              message = "Term not found!",
            });
          }
        }


        Course course = new()
        {
          Id = id,
          Name = updateCourseDto.Name,
          SubID = updateCourseDto.SubID,
          TermID = updateCourseDto.TermID,
          DateUpdated = DateTime.Now
        };

        await _courseRepository.Update(course);
        var result = await _courseRepository.Get(id);
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