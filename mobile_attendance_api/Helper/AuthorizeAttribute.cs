using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using mobile_attendance_api.Models;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
  private readonly string _role;
  public AuthorizeAttribute(string role) : base()
  {
    _role = role;
  }

  public void OnAuthorization(AuthorizationFilterContext context)
  {
    var user = (Lecture)context.HttpContext.Items["Lecture"];
    if (user == null || user.Role != _role)
    {
      context.Result = new JsonResult(new
      {
        resultCode = -1,
        message = "Unauthorized"
      })
      { StatusCode = StatusCodes.Status401Unauthorized };
    }
  }

  // public void requiredAdmin(AuthorizationFilterContext context)
  // {
  //   var user = (Lecture)context.HttpContext.Items["Lecture"];
  //   if (user == null || user.Role != "Admin")
  //   {
  //     context.Result = new JsonResult(new
  //     {
  //       resultCode = -1,
  //       message = "Unauthorized"
  //     })
  //     { StatusCode = StatusCodes.Status401Unauthorized };
  //   }
  // }
}