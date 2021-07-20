
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Data
{
  public interface IDataContext
  {
    DbSet<Lecture> Lectures { get; init; }
    DbSet<Term> Terms { get; init; }
    DbSet<Subject> Subjects { get; init; }
    DbSet<Course> Courses { get; init; }
    DbSet<Room> Rooms { get; init; }
    DbSet<Attendance> Attendances { get; init; }
    DbSet<Session> Sessions { get; init; }
    DbSet<Device> Devices { get; init; }
    DbSet<Notification> Notifications { get; init; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
  }
}