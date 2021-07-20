using System;

namespace mobile_attendance_api.Dtos
{
  public class CreateCourseDto
  {
    public string Name { get; set; }
    public int SubID { get; set; }
    public int TermID { get; set; }

  }
}