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
  public class LectureRepository : ILectureRepository
  {
    private readonly IDataContext _context;
    private readonly AppSettings _appSettings;

    private const string URLCheckToken = "https://oauth2.googleapis.com/tokeninfo";


    public LectureRepository(IDataContext context, IOptions<AppSettings> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }

    private string generateJwtToken(Lecture lecture)
    {

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
      // string role;
      // if (lecture.IsAdmin == true)
      // {
      //   role = Roles.Admin;
      // }
      // else
      // {
      //   role = Roles.User;
      // }
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[] { new Claim("Id", lecture.Id.ToString()), new Claim(ClaimTypes.Role, lecture.Role) }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    public async Task<object> Login(Lecture lecture)
    {
      string email;
      string googleId;
      string icon;
      string name;

      var urlParameters = "?id_token=" + lecture.EmailToken;
      HttpClient client = new HttpClient();
      client.BaseAddress = new Uri(URLCheckToken);

      client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

      HttpResponseMessage response = client.GetAsync(urlParameters).Result;

      if (response.IsSuccessStatusCode)
      {
        var dataObjects = response.Content.ReadAsAsync<GoogleLoginData>().Result;
        if (dataObjects.hd != "fpt.edu.vn")
        {
          return null;
        }
        email = dataObjects.email;
        googleId = dataObjects.sub;
        icon = dataObjects.picture;
        name = dataObjects.name;
      }
      else
      {
        Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
        return null;
      }

      client.Dispose();

      var lecture1 = await _context.Lectures.SingleAsync(e => e.Email == email);
      if (lecture1 != null)
      {
        lecture1.GoogleId = googleId;
        lecture1.Icon = icon;
        lecture1.Name = name;
        await _context.SaveChangesAsync();

        var resLecture = await _context.Lectures.FindAsync(lecture1.Id);
        var token = generateJwtToken(resLecture);

        return new
        {
          token = token,
          userData = resLecture
        };

      }
      else
      {
        return null;
      }

    }

    public async Task Add(Lecture lecture)
    {
      _context.Lectures.Add(lecture);
      await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
      var itemToRemove = await _context.Lectures.FindAsync(id);
      if (itemToRemove == null)
        throw new NullReferenceException();

      _context.Lectures.Remove(itemToRemove);
      await _context.SaveChangesAsync();
    }

    public async Task<Lecture> Get(int id)
    {
      return await _context.Lectures.FindAsync(id);
    }

    public async Task<IEnumerable<Lecture>> GetAll()
    {
      return await _context.Lectures.ToListAsync();
    }

    public async Task Update(Lecture lecture)
    {
      var itemToUpdate = await _context.Lectures.FindAsync(lecture.Id);
      if (itemToUpdate == null)
        throw new NullReferenceException();

      if (lecture.Icon != null)
      {
        itemToUpdate.Icon = lecture.Icon;
      }
      else
      {
        itemToUpdate.Icon = itemToUpdate.Icon;
      }


      if (lecture.GoogleId != null)
      {
        itemToUpdate.GoogleId = lecture.GoogleId;
      }
      else
      {
        itemToUpdate.GoogleId = itemToUpdate.GoogleId;
      }

      if (lecture.Name != null)
      {
        itemToUpdate.Name = lecture.Name;
      }
      else
      {
        itemToUpdate.Name = itemToUpdate.Name;
      }


      if (lecture.Email != null)
      {
        itemToUpdate.Email = lecture.Email;
      }
      else
      {
        itemToUpdate.Email = itemToUpdate.Email;
      }


      if (lecture.EmailToken != null)
      {
        itemToUpdate.EmailToken = lecture.EmailToken;
      }
      else
      {
        itemToUpdate.EmailToken = itemToUpdate.EmailToken;
      }

      itemToUpdate.DateUpdated = lecture.DateUpdated;


      if (lecture.IsAdmin != null)
      {
        itemToUpdate.IsAdmin = lecture.IsAdmin;
      }
      else
      {
        itemToUpdate.IsAdmin = itemToUpdate.IsAdmin;
      }

      await _context.SaveChangesAsync();

    }
  }
}