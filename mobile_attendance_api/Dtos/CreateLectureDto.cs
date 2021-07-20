using System;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Dtos
{
  public class CreateLectureDto
  {
    public string Name { get; set; }
    public string Email { get; set; }
    public string EmailToken { get; set; }
    public string GoogleId { get; set; }
    public string Icon { get; set; }
    public string Role { get; set; }
  }
}