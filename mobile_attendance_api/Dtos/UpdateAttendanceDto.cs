using System;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Dtos
{
  public class UpdateAttendanceDto
  {
    public int SessionID { get; set; }
    public string MACAddress { get; set; }
    public string deviceCode { get; set; }
    public string QRCode { get; set; }
  }
}