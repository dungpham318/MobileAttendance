using System;
using System.ComponentModel.DataAnnotations.Schema;
using mobile_attendance_api.Models;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mobile_attendance_api.Models
{
  public class Device
  {
    public int Id { get; set; }

    [ForeignKey("FK_Lecture")]
    public int LecID { get; set; }
    public string Code { get; set; }
    public string Token { get; set; }
    public string OS { get; set; }
    public bool Status { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}