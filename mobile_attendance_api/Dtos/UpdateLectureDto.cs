using System;

namespace mobile_attendance_api.Dtos
{
  public class UpdateLectureDto
  {
    public string Name { get; set; }
    public string Email { get; set; }
    public string EmailToken { get; set; }
    public bool IsAdmin { get; set; }
    public string GoogleId { get; set; }
    public string Icon { get; set; }

  }
}