using System;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Dtos
{
  public class UpdateSessionDto
  {
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int LecID { get; set; }
    public int CourseID { get; set; }
    public int RoomID { get; set; }
    public int SessionStatus { get; set; }
  }
}