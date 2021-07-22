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
  public class RoomRepository : IRoomRepository
  {
    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;


    public RoomRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }

    public async Task Add(Room room)
    {
      _context.Rooms.Add(room);
      await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
      var itemToRemove = await _context.Rooms.FindAsync(id);
      if (itemToRemove == null)
        throw new NullReferenceException();

      _context.Rooms.Remove(itemToRemove);
      await _context.SaveChangesAsync();
    }

    public async Task<Room> Get(int id)
    {
      return await _context.Rooms.FindAsync(id);
    }

    public async Task<IEnumerable<Room>> GetAll()
    {
      return await _context.Rooms.ToListAsync();
    }

    public async Task Update(Room room)
    {
      var itemToUpdate = await _context.Sessions.FindAsync(room.Id);
      if (itemToUpdate == null)
        throw new NullReferenceException();

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