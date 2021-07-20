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
  [Route("subject")]
  public class SubjectController : ControllerBase
  {
    private readonly ISubjectRepository _subjectRepository;

    public SubjectController(ISubjectRepository subjectRepository)
    {
      _subjectRepository = subjectRepository;
    }

    [Authorize(Role.Admin)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Subject>>> GetTerms()
    {
      try
      {
        var subjects = await _subjectRepository.GetAll();
        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = subjects
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
    public async Task<ActionResult<Subject>> GetSubject(int id)
    {
      try
      {
        var subject = await _subjectRepository.Get(id);
        if (subject == null)
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
          data = subject
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
    public async Task<ActionResult> CreateSubject(CreateSubjectDto createSubjectDto)
    {
      try
      {
        Subject subject = new()
        {
          Name = createSubjectDto.Name,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now,
        };

        await _subjectRepository.Add(subject);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = subject
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
    public async Task<ActionResult> DeleteSubject(int id)
    {
      try
      {
        await _subjectRepository.Delete(id);
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
    public async Task<ActionResult> UpdateSubject(int id, UpdateSubjectDto updateSubjectDto)
    {
      try
      {
        Subject subject = new()
        {
          Id = id,
          Name = updateSubjectDto.Name,
          DateUpdated = DateTime.Now
        };

        await _subjectRepository.Update(subject);
        var result = await _subjectRepository.Get(id);
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