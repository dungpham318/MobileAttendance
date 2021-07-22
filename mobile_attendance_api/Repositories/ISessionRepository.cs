using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace mobile_attendance_api.Repositories
{
  public interface ISessionRepository
  {
    Task<Session> Get(int id);
    Task Add(Session session);
    Task<IEnumerable<Session>> GetAll();
    Task Delete(int id);
    Task Update(Session session);
    Task<IEnumerable<Session>> GetByUserDate(int userId, DateTime date);
  }
}