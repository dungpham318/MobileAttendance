using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace mobile_attendance_api.Repositories
{
  public interface IRoomRepository
  {
    Task<Room> Get(int id);
    Task Add(Room room);
    Task<IEnumerable<Room>> GetAll();
    Task Delete(int id);
    Task Update(Room room);
  }
}