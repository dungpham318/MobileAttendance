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
  public class SubjectRepository : ISubjectRepository
  {
    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;

    public SubjectRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }

    public async Task Add(Subject subject)
    {
      _context.Subjects.Add(subject);
      await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
      var itemToRemove = await _context.Subjects.FindAsync(id);
      if (itemToRemove == null)
        throw new NullReferenceException();

      _context.Subjects.Remove(itemToRemove);
      await _context.SaveChangesAsync();
    }

    public async Task<Subject> Get(int id)
    {
      return await _context.Subjects.FindAsync(id);
    }

    public async Task<IEnumerable<Subject>> GetAll()
    {
      return await _context.Subjects.ToListAsync();
    }

    public async Task Update(Subject subject)
    {
      var itemToUpdate = await _context.Subjects.FindAsync(subject.Id);
      if (itemToUpdate == null)
        throw new NullReferenceException();

      if (subject.Name != null)
      {
        itemToUpdate.Name = subject.Name;
      }
      else
      {
        itemToUpdate.Name = itemToUpdate.Name;
      }

      await _context.SaveChangesAsync();

    }
  }
}