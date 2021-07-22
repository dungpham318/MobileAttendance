using System;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Dtos
{
  public class UpdateRoomDto
  {
    public string Name { get; set; }
    public string MACAddress { get; set; }
    public string QRCode { get; set; }
  }
}