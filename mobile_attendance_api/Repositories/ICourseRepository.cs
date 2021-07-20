using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;


namespace mobile_attendance_api.Repositories
{
  public interface ICourseRepository
  {
    Task<Course> Get(int id);
    Task<IEnumerable<Course>> GetAll();
    Task Add(Course course);
    Task Delete(int id);
    Task Update(Course course);
  }
}