using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Repositories
{
  public interface ISubjectRepository
  {
    Task<Subject> Get(int id);
    Task<IEnumerable<Subject>> GetAll();
    Task Add(Subject subject);
    Task Delete(int id);
    Task Update(Subject subject);
  }
}