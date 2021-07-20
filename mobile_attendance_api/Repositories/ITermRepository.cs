using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Repositories
{
  public interface ITermRepository
  {
    // Task<Term> GetByUser();
    Task<Term> Get(int id);
    Task<IEnumerable<Term>> GetAll();
    Task Add(Term term);
    Task Delete(int id);
    Task Update(Term term);
  }
}