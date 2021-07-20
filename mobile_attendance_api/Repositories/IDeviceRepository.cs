using System.Collections.Generic;
using System.Threading.Tasks;
using mobile_attendance_api.Models;

namespace mobile_attendance_api.Repositories
{
  public interface IDeviceRepository
  {
    Task Add(Device device);
    Task<Device> GetByUser(int userId);
    Task<Device> GetByDeviceCode(string deviceCode);
    Task Update(Device device);
  }
}