namespace mobile_attendance_api.Dtos
{
  public class CreateDeviceDto
  {
    // public int LecID { get; set; }
    public string Code { get; set; }
    public string Token { get; set; }
    public string OS { get; set; }
    public bool Status { get; set; }

  }
}