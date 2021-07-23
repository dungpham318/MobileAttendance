using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace mobile_attendance_api.Models
{
  public class Course
  {
    public int Id { get; set; }
    public string Name { get; set; }

    [ForeignKey("FK_Subject")]
    public int SubID { get; set; }
    [ForeignKey("FK_Term")]
    public int TermID { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
    public Subject Subject { get; set; }
    public Term Term { get; set; }

  }
}