using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;


namespace mobile_attendance_api.Repositories
{
  public interface IAttendanceRepository
  {
    // Task<Attendance> Get(int id);
    // Task<IEnumerable<Attendance>> GetAll();
    Task Add(Attendance attendance);
    // Task Delete(int id);
    Task Update(Attendance attendance);

    Task<Attendance> GetBySession(int sessionId);


  }
}