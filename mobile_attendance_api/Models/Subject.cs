using System;
using System.ComponentModel.DataAnnotations.Schema;
using mobile_attendance_api.Models;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mobile_attendance_api.Models
{
  public class Subject
  {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }

  }
}