using System;
using System.ComponentModel.DataAnnotations.Schema;
using mobile_attendance_api.Models;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace mobile_attendance_api.Models
{
  public class Session
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    [ForeignKey("FK_Lecture")]
    public int LecID { get; set; }

    [ForeignKey("FK_Course")]
    public int CourseID { get; set; }

    [ForeignKey("FK_Room")]
    public int RoomID { get; set; }
    public int SessionStatus { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}