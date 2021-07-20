using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Repositories
{
  public interface ILectureRepository
  {
    Task<object> Login(Lecture lecture);
    Task<Lecture> Get(int id);
    Task<IEnumerable<Lecture>> GetAll();
    Task Add(Lecture lecture);
    Task Delete(int id);
    Task Update(Lecture lecture);
  }
}