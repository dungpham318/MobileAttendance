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

namespace mobile_attendance_api.Repositories
{
  public class AttendanceRepository : IAttendanceRepository
  {

    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;

    public AttendanceRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }
    public async Task Add(Attendance attendance)
    {
      _context.Attendances.Add(attendance);
      await _context.SaveChangesAsync();
    }

    // public async Task Delete(int id)
    // {
    //   var itemToRemove = await _context.Courses.FindAsync(id);
    //   if (itemToRemove == null)
    //     throw new NullReferenceException();

    //   _context.Courses.Remove(itemToRemove);
    //   await _context.SaveChangesAsync();
    // }

    public async Task<Attendance> Get(int id)
    {
      return await _context.Attendances.FindAsync(id);
    }

    public async Task<Attendance> GetBySession(int id)
    {
      try
      {
        return await _context.Attendances.FirstAsync(e => e.SessionID == id);
      }
      catch (System.Exception)
      {
        return null;
        throw;
      }

    }

    public async Task<IEnumerable<Attendance>> GetAll()
    {
      return await _context.Attendances.ToListAsync();
    }

    public async Task Update(Attendance attendance)
    {
      var itemToUpdate = await _context.Attendances.FindAsync(attendance.Id);
      if (itemToUpdate == null)
        throw new NullReferenceException();
      itemToUpdate.SessionID = itemToUpdate.SessionID;
      itemToUpdate.CheckinTime = itemToUpdate.CheckinTime;
      itemToUpdate.CheckoutTime = attendance.CheckoutTime;
      itemToUpdate.DateUpdated = attendance.DateUpdated;

      //   if (course.Name != null)
      //   {
      //     itemToUpdate.Name = course.Name;
      //   }
      //   else
      //   {
      //     itemToUpdate.Name = itemToUpdate.Name;
      //   }

      //   if (course.SubID != 0)
      //   {
      //     itemToUpdate.SubID = course.SubID;
      //   }
      //   else
      //   {
      //     itemToUpdate.SubID = itemToUpdate.SubID;
      //   }

      //   if (course.TermID != 0)
      //   {
      //     itemToUpdate.TermID = course.TermID;
      //   }
      //   else
      //   {
      //     itemToUpdate.TermID = itemToUpdate.TermID;
      //   }

      //   itemToUpdate.DateUpdated = course.DateUpdated;

      await _context.SaveChangesAsync();

    }
  }
}