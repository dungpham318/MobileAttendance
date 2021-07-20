using System;
using System.ComponentModel.DataAnnotations.Schema;
using mobile_attendance_api.Models;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mobile_attendance_api.Models
{
  public class Notification
  {
    public int Id { get; set; }

    [ForeignKey("FK_Lecture")]
    public int LecID { get; set; }
    public string NotificationTitle { get; set; }
    public string NotificationBody { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}