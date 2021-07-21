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
  public class DeviceRepository : IDeviceRepository
  {
    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;

    public DeviceRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }

    public async Task Add(Device device)
    {
      _context.Devices.Add(device);
      await _context.SaveChangesAsync();
    }

    public async Task<Device> GetByUser(int id)
    {
      //   return await _context.Devices.Where(x => x.LecID == id && x.Status == true).ToListAsync();
      try
      {
        var device = await _context.Devices.FirstAsync(x => x.LecID == id && x.Status == true);
        return device;
        //   return await _context.Devices.Where(x => x.LecID == id && x.Status == true).ToListAsync();
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return null;
        throw;
      }
    }

    public async Task<Device> GetByDeviceCode(string deviceCode)
    {
      try
      {
        var device = await _context.Devices.FirstAsync(x => x.Code == deviceCode && x.Status == true);
        return device;
        //   return await _context.Devices.Where(x => x.LecID == id && x.Status == true).ToListAsync();
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return null;
        throw;
      }
    }

    public async Task Update(Device device)
    {
      //   return await _context.Devices.Where(x => x.LecID == id && x.Status == true).ToListAsync();
      var itemToUpdate = await _context.Devices.FindAsync(device.Id);

      if (itemToUpdate == null)
        throw new NullReferenceException();

      if (device.Status != itemToUpdate.Status)
      {
        itemToUpdate.Status = device.Status;
      }
      else
      {
        itemToUpdate.Status = itemToUpdate.Status;
      }
      //   itemToUpdate.Status = device.Status;

      await _context.SaveChangesAsync();
    }
  }
}