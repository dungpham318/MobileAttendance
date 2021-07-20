using Microsoft.EntityFrameworkCore;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Data
{
  public class DataContext : DbContext, IDataContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }
    public DbSet<Lecture> Lectures { get; init; }
    public DbSet<Term> Terms { get; init; }
    public DbSet<Subject> Subjects { get; init; }
    public DbSet<Course> Courses { get; init; }
    public DbSet<Room> Rooms { get; init; }
    public DbSet<Attendance> Attendances { get; init; }
    public DbSet<Session> Sessions { get; init; }
    public DbSet<Device> Devices { get; init; }
    public DbSet<Notification> Notifications { get; init; }
  }
}