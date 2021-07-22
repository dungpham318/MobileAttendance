using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using mobile_attendance_api.Data;
using mobile_attendance_api.Models;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using mobile_attendance_api.Helper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Windows;
using Newtonsoft.Json;
using System.Linq;

namespace mobile_attendance_api.Repositories
{
  public class SessionRepository : ISessionRepository
  {
    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;


    public SessionRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }

    public async Task Add(Session session)
    {
      _context.Sessions.Add(session);
      await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
      var itemToRemove = await _context.Sessions.FindAsync(id);
      if (itemToRemove == null)
        throw new NullReferenceException();

      _context.Sessions.Remove(itemToRemove);
      await _context.SaveChangesAsync();
    }

    public async Task<Session> Get(int id)
    {
      return await _context.Sessions.FindAsync(id);
    }

    public async Task<IEnumerable<Session>> GetAll()
    {
      return await _context.Sessions.ToListAsync();
    }

    public async Task Update(Session session)
    {
      var itemToUpdate = await _context.Sessions.FindAsync(session.Id);
      if (itemToUpdate == null)
        throw new NullReferenceException();

      if (session.Name != null)
      {
        itemToUpdate.Name = session.Name;
      }
      else
      {
        itemToUpdate.Name = itemToUpdate.Name;
      }

      if (session.Date != default(DateTime))
      {
        itemToUpdate.Date = session.Date;
      }
      else
      {
        itemToUpdate.Date = itemToUpdate.Date;
      }

      if (session.StartTime != default(DateTime))
      {
        itemToUpdate.StartTime = session.StartTime;
      }
      else
      {
        itemToUpdate.StartTime = itemToUpdate.StartTime;
      }

      if (session.EndTime != default(DateTime))
      {
        itemToUpdate.EndTime = session.EndTime;
      }
      else
      {
        itemToUpdate.EndTime = itemToUpdate.EndTime;
      }

      if (session.LecID != 0)
      {
        itemToUpdate.LecID = session.LecID;
      }
      else
      {
        itemToUpdate.LecID = itemToUpdate.LecID;
      }

      if (session.CourseID != 0)
      {
        itemToUpdate.CourseID = session.CourseID;
      }
      else
      {
        itemToUpdate.CourseID = itemToUpdate.CourseID;
      }

      if (session.RoomID != 0)
      {
        itemToUpdate.RoomID = session.RoomID;
      }
      else
      {
        itemToUpdate.RoomID = itemToUpdate.RoomID;
      }


      if (session.SessionStatus != 0)
      {
        itemToUpdate.SessionStatus = session.SessionStatus;
      }
      else
      {
        itemToUpdate.SessionStatus = itemToUpdate.SessionStatus;
      }

      itemToUpdate.DateUpdated = session.DateUpdated;

      await _context.SaveChangesAsync();

    }



    public async Task<IEnumerable<Session>> GetByUserDate(int userId, DateTime date)
    {
      try
      {

        var sessionList = await _context.Sessions.Where(x => x.LecID == userId && x.Date == date).OrderBy(x => x.StartTime).ToListAsync();
        return sessionList;

      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return null;
        throw;
      }

    }
  }
}