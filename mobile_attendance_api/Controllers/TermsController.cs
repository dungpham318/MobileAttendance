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
  [Route("term")]
  public class TermsController : ControllerBase
  {
    private readonly ITermRepository _termRepository;

    public TermsController(ITermRepository termRepository)
    {
      _termRepository = termRepository;
    }

    [Authorize(Role.Admin)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Term>>> GetTerms()
    {
      try
      {
        var terms = await _termRepository.GetAll();
        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = terms
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
    public async Task<ActionResult<Term>> GetTerm(int id)
    {
      try
      {
        var term = await _termRepository.Get(id);
        if (term == null)
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
          data = term
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
    public async Task<ActionResult> CreateTerm(CreateTermDto createTermDto)
    {
      try
      {
        Term term = new()
        {
          Name = createTermDto.Name,
          DateCreated = DateTime.Now,
          DateUpdated = DateTime.Now,
        };

        await _termRepository.Add(term);

        return Ok(new
        {
          resultCode = 1,
          message = "Success",
          data = term
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
    public async Task<ActionResult> DeleteTerm(int id)
    {
      try
      {
        await _termRepository.Delete(id);
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
    public async Task<ActionResult> UpdateTerm(int id, UpdateTermDto updateTermDto)
    {
      try
      {
        Term term = new()
        {
          Id = id,
          Name = updateTermDto.Name,
          DateUpdated = DateTime.Now
        };

        await _termRepository.Update(term);
        var result = await _termRepository.Get(id);
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





