using System;
using System.ComponentModel.DataAnnotations.Schema;
using mobile_attendance_api.Models;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mobile_attendance_api.Models
{
  public class Lecture
  {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string EmailToken { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
    public Nullable<bool> IsAdmin { get; set; }
    public string GoogleId { get; set; }
    public string Icon { get; set; }
    public string Role { get; set; }
    public List<Device> Devices { get; set; }
    public List<Notification> Notifications { get; set; }
  }

  public class GoogleLoginData
  {
    public string iss { get; set; }
    public string azp { get; set; }
    public string aud { get; set; }
    public string sub { get; set; }
    public string hd { get; set; }
    public string email { get; set; }
    public string email_verified { get; set; }
    public string at_hash { get; set; }
    public string nonce { get; set; }
    public string name { get; set; }
    public string picture { get; set; }
    public string given_name { get; set; }
    public string family_name { get; set; }
    public string locale { get; set; }
    public string iat { get; set; }
    public string exp { get; set; }
    public string alg { get; set; }
    public string kid { get; set; }
    public string typ { get; set; }
  }
}