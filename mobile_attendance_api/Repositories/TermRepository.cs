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
  public class TermRepository : ITermRepository
  {
    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;

    public TermRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }

    public async Task Add(Term term)
    {
      _context.Terms.Add(term);
      await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
      var itemToRemove = await _context.Terms.FindAsync(id);
      if (itemToRemove == null)
        throw new NullReferenceException();

      _context.Terms.Remove(itemToRemove);
      await _context.SaveChangesAsync();
    }

    public async Task<Term> Get(int id)
    {
      return await _context.Terms.FindAsync(id);
    }

    public async Task<IEnumerable<Term>> GetAll()
    {
      return await _context.Terms.ToListAsync();
    }

    public async Task Update(Term term)
    {
      var itemToUpdate = await _context.Terms.FindAsync(term.Id);
      if (itemToUpdate == null)
        throw new NullReferenceException();

      if (term.Name != null)
      {
        itemToUpdate.Name = term.Name;
      }
      else
      {
        itemToUpdate.Name = itemToUpdate.Name;
      }

      await _context.SaveChangesAsync();

    }
  }
}